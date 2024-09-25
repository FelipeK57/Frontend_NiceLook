import { Button } from "@nextui-org/react";
import PropTypes from "prop-types";
function IconButtonCustom({ icon, name, primary, secondary }) {
  return (
    <div className="flex gap-2 items-center">
      <Button
        className={`font-bold ${primary ? "bg-slate-950 text-slate-50" : ""}${
          secondary ? "bg-transparent border-2 border-slate-200" : ""
        }`}
      >
        {icon}
      </Button>
      <p>{name}</p>
    </div>
  );
}

IconButtonCustom.propTypes = {
  icon: PropTypes.node,
  name: PropTypes.string,
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
};

export default IconButtonCustom;