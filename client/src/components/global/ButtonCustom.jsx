import { Button } from "@nextui-org/react";
function ButtonCustom({ name, primary, secondary }) {
  return (
    <Button
      className={`font-bold ${primary ? "bg-primary text-slate-950" : ""}${
        secondary ? "bg-transparent border-2 border-slate-200" : ""
      }`}
    >
      {name}
    </Button>
  );
}

export default ButtonCustom;
