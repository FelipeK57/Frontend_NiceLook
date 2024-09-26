import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";

function createEmployeeModal(props) {
    return (
        <Modal {...props}>
            <ModalContent>
                {(onClose) => (<>
                    <ModalHeader className="flex flex-col gap-1">
                        <h2 className="text-4xl text-zinc-950 font-bold">Crear Empleado</h2>
                    </ModalHeader>
                    <ModalBody>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Nullam pulvinar risus non risus hendrerit venenatis.
                            Pellentesque sit amet hendrerit risus, sed porttitor quam.
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Nullam pulvinar risus non risus hendrerit venenatis.
                            Pellentesque sit amet hendrerit risus, sed porttitor quam.
                        </p>
                        <p>
                            Magna exercitation reprehenderit magna aute tempor cupidatat
                            consequat elit dolor adipisicing. Mollit dolor eiusmod sunt ex
                            incididunt cillum quis. Velit duis sit officia eiusmod Lorem
                            aliqua enim laboris do dolor eiusmod. Et mollit incididunt
                            nisi consectetur esse laborum eiusmod pariatur proident Lorem
                            eiusmod et. Culpa deserunt nostrud ad veniam.
                        </p>
                    </ModalBody>
                    <ModalFooter>
                        <Button  color="danger" variant="light" onPress={onClose}>
                            Cancelar
                        </Button>
                        <Button color="primary" onPress={onClose}>
                            Guardar
                        </Button>
                    </ModalFooter>
                </>)}
            </ModalContent>
        </Modal>
    );
}

export default createEmployeeModal;