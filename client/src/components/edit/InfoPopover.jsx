import {Popover, PopoverTrigger, PopoverContent, Button} from "@nextui-org/react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { EnvelopeIcon, PlusIcon } from "@heroicons/react/24/outline";
import WhatsappIcon from "../icons/WhatsappIcon";
import InstagramIcon from "../icons/IntagramIcon";
import FacebookIcon from "../icons/FacebookIcon";

export default function InfoPopover(props) {
    InfoPopover.propTypes = {
        children: PropTypes.node,
        redirectTo: PropTypes.string,
        placement: PropTypes.string,
        icon: PropTypes.string  
    }
    const renderIcon = () => {
        switch (props.icon) {
            case "mail":
                return <EnvelopeIcon className="h-7 w-7 stroke-2" />;
            case "instagram":
                return <InstagramIcon size={"size-6"} />;
            case "whatsapp":
                return <WhatsappIcon size={"size-6"} />;
            case "facebook":
                return <FacebookIcon size={"size-6"} />;
            case "more":
                return <PlusIcon className="h-6 w-6" />;
            default:
                return null;
        }
    };
  return (
    <Popover placement={"top"}>
      <PopoverTrigger>
      <Button {...props}>{renderIcon()}</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="px-1 py-2">
        <Link target="_blank" to={props.redirectTo}>{props.icon}</Link>
        </div>
      </PopoverContent>
    </Popover>
  );
}