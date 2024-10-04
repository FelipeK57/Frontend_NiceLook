import { Button } from "@nextui-org/react";
import { useDisclosure } from "@nextui-org/react";
import ModalEditService from "./ModalEditService";
import PropTypes from "prop-types";

/**
 * Service component displays the details of a service including its name, price, commission, state, reviews, and score.
 * It also provides buttons to view details and delete the service.
 *
 * @component
 * @param {Object} props - The properties object.
 * @param {string} props.name - The name of the service.
 * @param {number} props.price - The price of the service.
 * @param {number} props.commission - The commission percentage of the service.
 * @param {boolean} props.state - The state of the service (active or inactive).
 * @param {number} props.reviews - The number of reviews for the service.
 * @param {number} props.score - The score of the service out of 5.
 * @returns {JSX.Element} The rendered Service component.
 */
function Service({ id, name, price, commission }) {
  const service = {
    id: id,
    name: name,
    price: price,
    commission: commission,
  };
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleOpen = () => {
    onOpen();
  };
  return (
    <article
      className="flex border-2 border-slate-200 rounded-xl gap-4
     p-4"
    >
      {" "}
      {/* Image */}
      <div className="hidden lg:block w-[100px] h-[100px] rounded-lg bg-slate-300" />
      {/* Skeleton  */}
      <div className="flex flex-col gap-4 flex-grow lg:flex-row justify-between w-5/6">
        {/* Main details  */}
        <div className="flex flex-col gap-2 lg:flex-col w-full lg:justify-between">
          <h1 className="text-base lg:text-2xl font-bold">{name}</h1>
          <div className="flex lg:flex-col gap-3">
            <p className="text-zinc-500 text-sm lg:text-base">
              Precio: ${price}
            </p>
            <p className="text-zinc-500 text-sm lg:text-base">
              Comisión: {commission}%
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-4 justify-between">
          {/* State and reviews */}
          <div className="flex gap-4 lg:justify-end">
            <p className={`text-green-500 pr-4 font-semibold text-sm lg:text-base`}>
              Activo
            </p>
          </div>
          {/* Buttons */}
          <div className="flex gap-2">
            <Button
              onPress={() => handleOpen()}
              className="font-semibold border-2 border-slate-200 rounded-xl bg-transparent"
            >
              Ver detalles
            </Button>
            <ModalEditService isOpen={isOpen} onClose={onClose} />
            <Button className="font-semibold text-red-500 rounded-xl bg-transparent">
              Eliminar
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}

Service.propTypes = {
  name: PropTypes.string,
  price: PropTypes.number,
  commission: PropTypes.number,
  category: PropTypes.string,
  id: PropTypes.number,
};

export default Service;
