import { Input } from "@nextui-org/input";

function InputCustom({
  value,
  onChange,
  type,
  label,
  isInvalid,
  errorMessage,
  placeholder,
  required,
}) {
  if (required) {
    label = label + "*";
  }
  return (
    <Input
      className="m-0"
      value={value}
      onChange={onChange}
      type={type}
      label={label}
      labelPlacement="outside"
      variant="bordered"
      classNames={{
        label: "font-semibold text-base 2xl:text-lg",
        inputWrapper: ["border-2", "border-slate-200", "px-4", "py-5", "m-0"],
      }}
      isInvalid={isInvalid}
      errorMessage={errorMessage}
      placeholder={placeholder}
      min={type === "number" ? 1 : undefined}
    />
  );
}

export default InputCustom;
