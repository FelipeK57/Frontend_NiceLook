import { PencilIcon } from "@heroicons/react/24/outline"; 

const EditButton = ({ position }) => {
  return (
    <div className={position}>
      <button className="bg-white hover:bg-gray-100 p-2 rounded-full shadow">
        <PencilIcon className="h-5 w-5 text-gray-700" />
      </button>
    </div>
  );
};

export default EditButton;
