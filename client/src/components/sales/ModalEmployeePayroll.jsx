import ButtonCustom from "../../components/global/ButtonCustom";
import { Button } from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import InputCustom from "../global/InputCustom";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

function ModalEmployeePayroll({ isOpen, onClose, day, month, year }) {
  const [payroll, setPayroll] = useState(0);
  const [code, setCode] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [employee, setEmployee] = useState("");

  const handleButtonClick = async () => {
    const establismentId = Cookies.get("establishmentId");
    if (code === "0" || code === "") {
      setError("El codigo es requerido");
      return;
    }
    setLoading(true);
    const response = await axios.get(
      `http://localhost:8000/receptionist/sales/`,
      {
        params: {
          code_employee: code,
          day: day,
          month: month,
          year: year,
          id_establisment: establismentId,
        },
      }
    );
    console.log(response.data);
    setPayroll(response.data.total);
    setEmployee(
      response.data.employee.user.first_name +
        " " +
        response.data.employee.user.last_name
    );
    setLoading(false);
  };

  const handleCloseModal = () => {
    onClose();
    setLoading(false);
    setCode("");
    setEmployee("");
    setError("");
    setPayroll(0);
  };

  return (
    <Modal size="md" backdrop="blur" isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          <h1 className="text-4xl font-bold">Pago del empleado</h1>
        </ModalHeader>
        <ModalBody className="gap-6">
          <div
            className={`flex flex-row gap-2 ${
              !!error ? "items-center" : "items-end"
            }`}
          >
            <InputCustom
              placeholder={"Codigo del empleado"}
              label="Generar nómina"
              type={"number"}
              onChange={(e) => {
                setCode(e.target.value);
                setError("");
              }}
              value={code}
              isInvalid={!!error}
              errorMessage={error}
            />
            <ButtonCustom
              isLoading={loading}
              classStyles={"py-5 border-2 border-primary"}
              name="Buscar"
              action={handleButtonClick}
              primary
            />
          </div>
          <div>
            <p className="text-md font-semibold">Profesional: {employee}</p>
            <p className="text-md font-semibold">Pago: ${payroll}</p>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            className="font-semibold"
            onPress={handleCloseModal}
            color="danger"
            variant="light"
          >
            Salir
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ModalEmployeePayroll;
