import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/react";
import PropTypes from "prop-types";

function ProductDetails({ isOpen, onOpenChange, product }) {
  ProductDetails.propTypes = {
    isOpen: PropTypes.bool,
    onOpenChange: PropTypes.func,
    product: PropTypes.object,
  };

  const collumns = [
    {
      key: "code",
      label: "Codigo",
    },
    {
      key: "name",
      label: "Nombre",
    },
    {
      key: "brand",
      label: "Marca",
    },
    {
      key: "distributor",
      label: "Distribuidor",
    },
    {
      key: "expiration_date",
      label: "Fecha de vencimiento",
    },
    {
      key: "price",
      label: "Precio",
    },
    {
      key: "quantity",
      label: "Cantidad",
    },
  ];

  const rows = product.details.map((product) => ({
    key: product.id,
    code: product.product.code,
    name: product.product.name,
    brand: product.product.brand,
    distributor: product.product.distributor,
    expiration_date: product.product.expiration_date,
    price: product.product.price,
    quantity: product.quantity,
  }));

  return (
    <Modal
      size="5xl"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      backdrop="blur"
      classNames={{ closeButton: "hidden" }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-3xl">
              Detalles de la compra
            </ModalHeader>
            <ModalBody>
              <Table
                aria-label="Products"
                classNames={{
                  td: "lg:text-lg text-sm text-center",
                  th: "lg:text-lg text-sm",
                }}
              >
                <TableHeader columns={collumns}>
                  {collumns.map((column) => (
                    <TableColumn key={column.key}>{column.label}</TableColumn>
                  ))}
                </TableHeader>
                <TableBody items={rows}>
                  {rows.map((row) => (
                    <TableRow key={row.key}>
                      {(columnKey) => (
                        <TableCell>{getKeyValue(row, columnKey)}</TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ModalBody>
            <ModalFooter>
              <Button
                variant="light"
                color="danger"
                className="text-xl"
                onPress={onClose}
              >
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default ProductDetails;
