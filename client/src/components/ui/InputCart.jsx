import { Input } from "@nextui-org/react";
import SearchIcon from "../icons/SearchIcon";

export default function InputCart({ className, ...props }) {
    return (
        <Input
          placeholder="Shampoo, Acondicionador..."
          variant="bordered"
          classNames={{
            label: "",
            input: [],            innerWrapper: "",
            inputWrapper: ["border-2", "border-slate-200", "px-6", "py-5"],
          }}
          {...props}
          className={`place-self-center max-w-2xl ${className}`}
          endContent={<SearchIcon />}
        />
      );
}
