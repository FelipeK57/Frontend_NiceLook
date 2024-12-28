/* eslint-disable react/prop-types */
import { toast } from "react-toastify";

function ToastBody({ closeToast, data }) {
  return (
    <div className={`flex flex-col w-full m-0 p-0`}>
      <h3 className="text-zinc-800 text-sm font-semibold flex items-center gap-1">
        {data.icon} {data.title}
      </h3>

      <div className="pl-5 mt-2">
        <p className="text-sm">{data.content}</p>

        <div className="flex items-center gap-2">
          {/* <button
              onClick={closeToast}
              className="transition-all border-none text-sm font-semibold bg-transparent border rounded-md py-2 text-indigo-600 active:scale-[.95] "
            >
              Deshacer
            </button> */}
          <button
            onClick={closeToast}
            className="transition-all border-none text-sm bg-transparent border font-semibold rounded-md py-2 text-grey-400 active:scale-[.95] "
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * Muestra una notificación según el nivel de severidad indicado.
 *
 * @function NiceToast
 * @param {string} severity - El nivel de severidad (valores: "success", "error", "warning", "info").
 * @param {string} header - El título o encabezado de la notificación.
 * @param {string} body - El contenido o mensaje principal que se mostrará en la notificación.
 * @returns {void} - No retorna ningún valor.
 */
export function NiceToast(severity, header, body) {
  const options = {
    data: {
      title: header,
      content: body,
    },
    className: "border border-neutral-300 shadow-lg",
    closeButton: false,
  };

  switch (severity) {
    case "success":
      return toast.success(ToastBody, options);
    case "error":
      return toast.error(ToastBody, options);
    case "warning":
      return toast.warning(ToastBody, options);
    case "info":
      return toast.info(ToastBody, options);
    default:
      return toast(ToastBody, options);
  }
}
