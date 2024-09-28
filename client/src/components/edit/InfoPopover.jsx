import {Popover, PopoverTrigger, PopoverContent} from "@nextui-org/react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import ContactButton from "../global/ContactButton";

export default function InfoPopover(props) {
    InfoPopover.propTypes = {
        children: PropTypes.node,
        redirectTo: PropTypes.string,
        placement: PropTypes.string
    }
  return (
    <Popover placement={"right"}>
      <PopoverTrigger>
      <ContactButton icon="mail" />
      </PopoverTrigger>
      <PopoverContent>
        <div className="px-1 py-2">
        <Link to={props.redirectTo}>Facebook</Link>
        </div>
      </PopoverContent>
    </Popover>
  );
}