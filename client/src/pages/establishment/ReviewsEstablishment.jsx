import ButtonCustom from "@/components/global/ButtonCustom";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import axios from "axios";
import ModalAddReview from "@/components/establishment/review/ModalAddReview";

function ReviewsEstablishment() {
  const [reviews, setReviews] = useState([]);
  const establishmentId = Cookies.get("establishmentId");
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/reviews_establisment/get_reviews/${establishmentId}/`
        );
        console.log("Reseñas:", response.data.reviews);
        setReviews(response.data.reviews);
      } catch (error) {
        console.error("Error al obtener las reseñas:", error);
      }
    };

    fetchReviews();
  }, [reload]);

  return (
    <main className="flex flex-col gap-4 w-full">
      <header className="flex flex-row items-center justify-between w-full">
        <h2 className="text-xl font-semibold">Reseñas del establecimiento</h2>
        <ModalAddReview reload={reload} setReload={setReload} />
      </header>
      <section className="grid grid-cols-4 gap-6">
        {reviews?.map((review) => (
          <div
            className="border-2 border-slate-200 rounded-xl p-4 flex gap-2 flex-col justify-between shadow"
            key={review.id}
          >
            <div className="flex flex-row justify-start items-center gap-4">
              <div className="inline-flex items-center justify-center w-8 h-8 text-sm text-black font-bold bg-primary rounded-full">
                {review.autor.user.first_name.charAt(0) + review.autor.user.last_name.charAt(0)}
              </div>
              <h3 className="font-bold text-lg">
                {review.autor.user.first_name}
              </h3>
            </div>
            <p className="text-base font-light">{review.comment}</p>
            <p className="font-semibold">{review.rating}/5⭐</p>
          </div>
        ))}
      </section>
    </main>
  );
}

export default ReviewsEstablishment;
