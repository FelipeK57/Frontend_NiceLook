import { PencilIcon } from "@heroicons/react/24/outline"; 

const EditButton = ({ position, onChange, id }) => {
  const handleClick = () => {
    // Simular el click en el input file cuando se hace click en el botón
    document.getElementById(id).click();
  };

  return (
    <div className={position}>
      {/* Botón de editar */}
      <button 
        className="bg-white hover:bg-gray-100 p-2 rounded-full shadow" 
        onClick={handleClick}
      >
        <PencilIcon className="h-5 w-5 text-gray-700" />
      </button>

      {/* Input file invisible */}
      <input 
        id={id} // Usamos el id único para diferenciar entre logo y banner
        type="file"
        accept="image/*"
        onChange={onChange}
        style={{ display: 'none' }} // Ocultamos el input
      />
    </div>
  );
};

export default EditButton;