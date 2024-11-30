import UserCardList from "@/components/establishment/services/UserCardList";
import { Suspense } from "react";
import { Skeleton, Card } from "@nextui-org/react";

function StaffPresentation() {
  return (
    <main className="p-2 flex flex-col gap-2">
      <h1 className="font-semibold text-lg">Conoce a nuestros Profesionales</h1>
      <section className="w-full grid grid-cols-2 gap-4 md:grid-cols-3">
        <Suspense
          fallback={Array.from({ length: 3 }).map((_, index) => (
            <Card
              key={index}
              className="w-full h-fit space-y-5 p-4"
              radius="lg"
            >
              <Skeleton className="rounded-lg aspect-square">
                <div className="h-24 rounded-lg bg-secondary"></div>
              </Skeleton>
              <div className="space-y-3">
                <Skeleton className="w-3/5 rounded-lg">
                  <div className="h-5 w-full rounded-lg bg-secondary"></div>
                </Skeleton>
                <Skeleton className="w-4/5 rounded-lg">
                  <div className="h-3 w-full rounded-lg bg-secondary-300"></div>
                </Skeleton>
                <Skeleton className="w-2/5 rounded-lg">
                  <div className="h-3 w-full rounded-lg bg-secondary-200"></div>
                </Skeleton>
              </div>
            </Card>
          ))}
        >
          <UserCardList presentationStaff />
        </Suspense>
      </section>
    </main>
  );
}

export default StaffPresentation;
