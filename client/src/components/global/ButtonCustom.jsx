import { Button } from "@nextui-org/react";
import PropTypes from "prop-types";
function ButtonCustom({ name, primary, secondary, classStyles, ...props }) {

  ButtonCustom.propTypes = {
    name: PropTypes.string,
    primary: PropTypes.bool,
    secondary: PropTypes.bool,
    classStyles: PropTypes.string,
    children: PropTypes.node,
  };

  return (
    <Button
      {...props}
      className={`font-bold ${primary ? "bg-primary text-slate-950" : ""}${
        secondary ? "bg-transparent border-2 border-slate-200" : ""}
        ${classStyles}`}
    >
      {name}
      {props.children}
    </Button>
  );
}

export default ButtonCustom;
