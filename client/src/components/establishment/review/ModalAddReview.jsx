import { useState } from "react";
import ButtonCustom from "@/components/global/ButtonCustom";
import InputCustom from "@/components/global/InputCustom";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import axios from "axios";
import Cookies from "js-cookie";

function ModalAddReview({ reload, setReload }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const client_id = Cookies.get("client_id");
  const establishment_id = Cookies.get("establishmentId");

  const handleCompleteReview = async () => {
    try {
      const response = await axios.post(
        `${process.env.API_URL}/reviews_establisment/create_review/${client_id}/${establishment_id}/`,
        {
          comment: comment,
          rating: rating,
        }
      );
      console.log("Reseña añadida:", response.data);
      setReload(!reload);
      onOpenChange();
      setComment("");
      setRating(0);
    } catch (error) {
      setComment("");
      setRating(0);
      console.error("Error al añadir reseña:", error);
    }
  };

  return (
    <>
      <ButtonCustom primary onPress={onOpen}>
        Dejar mi reseña
      </ButtonCustom>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-2xl font-bold">
                Dejar reseña
              </ModalHeader>
              <ModalBody>
                <InputCustom
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder={"Que buen establecimiento..."}
                  type={"text"}
                  label="Comentario"
                  description={"No olvides ser respetuoso con tu mensaje."}
                />
                <p>Calificación</p>
                <RatingStar rating={rating} onRatingChange={setRating} />
              </ModalBody>
              <ModalFooter>
                <ButtonCustom
                  color="danger"
                  variant="light"
                  onPress={() => {
                    onClose();
                    setComment("");
                    setRating(0);
                  }}
                >
                  Cancelar
                </ButtonCustom>
                <ButtonCustom primary onPress={handleCompleteReview}>
                  Añadir
                </ButtonCustom>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

function RatingStar({ rating, onRatingChange }) {
  const [hoverRating, setHoverRating] = useState(0);

  const handleMouseEnter = (index) => {
    setHoverRating(index);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const handleClick = (index) => {
    onRatingChange(index);
  };

  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, index) => {
        const starIndex = index + 1;
        const isFilled = starIndex <= (hoverRating || rating);

        return (
          <div
            key={starIndex}
            onMouseEnter={() => handleMouseEnter(starIndex)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(starIndex)}
            className="cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill={isFilled ? "#FAC215" : "none"}
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke={isFilled ? "#FAC215" : "black"}
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
              />
            </svg>
          </div>
        );
      })}
    </div>
  );
}

export default ModalAddReview;
