import { EnvelopeIcon, PlusIcon } from "@heroicons/react/24/outline";
import WhatsappIcon from "../icons/WhatsappIcon";
import InstagramIcon from "../icons/IntagramIcon";
import FacebookIcon from "../icons/FacebookIcon";
const ContactButton = ({ icon, ...props }) => {
    const renderIcon = () => {
        switch (icon) {
            case "mail":
                return <EnvelopeIcon className="h-7 w-7 stroke-2" />;
            case "instagram":
                return <InstagramIcon size={"size-6"} />;
            case "whatsapp":
                return <WhatsappIcon size={"size-6"} />;
            case "facebook":
                return <FacebookIcon size={"size-6"}  />;
            case "more":
                return <PlusIcon className="h-6 w-6" />;
            default:
                return null;
        }
    };

    return (
        <button {...props} className="bg-gray-200 hover:bg-gray-300 p-2 rounded-full">
            {renderIcon()}
        </button>
    );
};

export default ContactButton;