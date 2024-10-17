import { useEffect, useState } from "react";
import EditButton from "../../components/global/EditButton"; // Componente para el botón de editar
import ContactButton from "../../components/global/ContactButton"; // Componente para los botones de contacto
import ButtonCustom from "../../components/global/ButtonCustom";
import { Input } from "@nextui-org/react";
import { useDisclosure } from "@nextui-org/react";
import GestModal from "../../components/edit/GestModal";
import InfoPopover from "../../components/edit/InfoPopover";
import ReviewComponent from "../../components/global/ReviewComponent";
import { obtenerEstablemiento, editarEstablemiento, obtenerImagen, obtenerBanner, subirLogo, subirBanner } from "../../api/editProfile/editProfile";

const EstablishmentProfile = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [bannerImage, setBannerImage] = useState("/path-to-banner.jpg");
  const [logoImage, setLogoImage] = useState("/path-to-logo.jpg");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [contact_methods, setContact_methods] = useState([]);
  const [prevewLogo, setPrevewLogo] = useState("");
  const [prevewBanner, setPrevewBanner] = useState("");


  useEffect(() => {

    const editImagen = async () => {
      try {
        await obtenerBanner(1).then((data) => {
          setBannerImage(data.data.image_base64);
        })
      }
      catch (error) {
        console.log("banner", error.response.data);
      }
      try {
        await obtenerImagen(1).then((data) => {
          setLogoImage(data.data.imagen_base64);
        })
      }
      catch (error) {
        console.error("logo", error.response.data);
      }
    }

    const timer = setTimeout(() => {
      editImagen();
    }, 1000);

    const getEstablismentData = async () => {
      try {
        await obtenerEstablemiento(1).then((data) => {
          setName(data.data.name);
          setAddress(data.data.address);
          setCity(data.data.city);
          setContact_methods(data.data.contact_methods);
        })
      }
      catch (error) {
        console.error(error);
      }
    }

    getEstablismentData();
    return () => {
      clearTimeout(timer);
    };
  }, []);


  const editEstablecimiento = async () => {
    try {
      const formData = new FormData();
      formData.append("image", bannerImage);
      await subirBanner(1, formData).then((data) => {
        console.log(data.data)
      })
      window.location.reload();
    }
    catch (error) {
      console.error(error.response.data);
    }
    try {
      const formData = new FormData();
      formData.append("image", logoImage);
      await subirLogo(1, formData).then((data) => {
        console.log(data.data)
      })
      window.location.reload();
    }
    catch (error) {
      console.error(error.response.data);
    }
    try {
      await editarEstablemiento(1, name, address, city).then(() => {
        alert("Se han guardado los cambios exitosamente");
      })
    }
    catch (error) {
      console.error(error);
    }

  }

  // Función para actualizar la imagen del banner con previsualización
  const handleBannerChange = (event) => {
    const file = event.target.files[0];
    setBannerImage(file);
    setPrevewBanner(URL.createObjectURL(file));  // Previsualiza el banner
  };

  // Función para actualizar la imagen del logo con previsualización
  const handleLogoChange = (event) => {
    const file = event.target.files[0];
    setLogoImage(file);
    setPrevewLogo(URL.createObjectURL(file));  // Previsualiza el logo
  };

  return (
    <div className="px-8 pt-3">
      {/* Contenedor principal */}
      <div>
        <div className="flex m-4">
          <h1 className="text-4xl font-bold text-gray-800">
            Edita el perfil del establecimiento
          </h1>
        </div>

        {/* Sección de edición del banner */}
        <div className="relative w-full h-[30rem] bg-gray-50 rounded-md border-2 border-slate-200">
          <img
            src={prevewBanner || bannerImage} // Usa la imagen previsualizada o la imagen original
            alt="Banner"
            className="w-full h-full object-cover rounded-md"
          />
          <EditButton
            position="absolute right-4 top-4"
            onChange={handleBannerChange}
            id="bannerInput" // ID único para el input del banner
          />
        </div>

        {/* Sección del logo y nombre */}
        <div className="flex -translate-y-20 items-center ml-6 mt-6 justify-between">
          <div className="flex items-center">
            <div className="relative w-48 h-48 bg-gray-100 rounded-md border-2 border-slate-200 overflow-hidden shadow-sm">
              <img
                src={prevewLogo || logoImage} // Usa la imagen previsualizada o la imagen original
                alt="Logo"
                className="w-full h-full object-cover"
              />
              <EditButton
                position="absolute right-2 bottom-2"
                onChange={handleLogoChange}
                id="logoInput" // ID único para el input del logo
              />
            </div>

            <div className="ml-6 mt-32">
              <Input
                placeholder="Nombre de establecimiento"
                value={name}
                onChange={(event) => setName(event.target.value)}
                variant="bordered"
                classNames={{
                  label: "",
                  input: ["text-3xl font-bold text-gray-800"],
                  innerWrapper: "",
                  inputWrapper: [
                    "border-2",
                    "border-slate-200",
                    "px-8",
                    "py-8",
                  ],
                }}
              />
            </div>
          </div>

          <div className="flex justify-end">
            <ReviewComponent
              reviews="4.5"
              size="size-10"
              text="text-2xl font-bold text-gray-800"
            />
          </div>
        </div>

        {/* Sección de dirección */}
        <div className="flex items-center justify-between -translate-y-16 ml-6">
          <div className="relative w-1/3">
            <Input
              type="text"
              label="Ciudad, Departamento"
              value={city}
              onChange={(event) => setCity(event.target.value)}
              classNames={{
                inputWrapper:
                  "bg-transparent border-2 border-slate-200 rounded-xl w-full",
              }}
            />
            <Input
              type="text"
              label="Dirección de establecimiento"
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              classNames={{
                inputWrapper:
                  "bg-transparent border-2 border-slate-200 rounded-xl w-full mt-2",
              }}
            />
          </div>
          <div className="flex flex-col justify-end">
            <h1 className="flex justify-end text-3xl font-bold text-gray-800">
              Contacto
            </h1>
            <div className="flex justify-end items-center mt-4 space-x-4">
              {contact_methods.mail ? <InfoPopover
                icon="mail"
                placement={"top"}
                isIconOnly
                className="border-2 border-slate-200 rounded-full p-2"
                variant="bordered"
                redirectTo={`mailto:${contact_methods?.mail}`}
              /> : null}
              {contact_methods.instagram ? <InfoPopover
                icon="instagram"
                placement={"top"}
                isIconOnly
                className="border-2 border-slate-200 rounded-full p-2"
                variant="bordered"
                redirectTo={`https://www.instagram.com/${contact_methods?.instagram}/`}
              /> : null}
              {contact_methods.whatsapp ? <InfoPopover
                icon="whatsapp"
                placement={"top"}
                isIconOnly
                className="border-2 border-slate-200 rounded-full p-2"
                variant="bordered"
                redirectTo={`https://wa.me/${contact_methods?.whatsapp}`}
              /> : null}
              {contact_methods.facebook ? <InfoPopover
                icon="facebook"
                placement={"top"}
                isIconOnly
                className="border-2 border-slate-200 rounded-full p-2"
                variant="bordered"
                redirectTo={'https://www.facebook.com/${contact_methods?.facebook}'}
              /> : null}
              <ContactButton type="button" icon="more" onClick={onOpen} />
            </div>
          </div>
        </div>

        {/* Botón de guardar cambios */}
        <div className="absolute bottom-10 right-[30%]">
          <div className="flex justify-center">
            <ButtonCustom
              onPress={editEstablecimiento}
              name="Guardar cambios"
              classStyles={"w-60 text-lg"}
              primary
            />
          </div>
        </div>
      </div>
      <GestModal isOpen={isOpen} backdrop={"blur"} onClose={onClose} contact_methods={contact_methods} setContact_methods={setContact_methods} />
    </div>
  );
};

export default EstablishmentProfile;