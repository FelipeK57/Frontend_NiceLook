// ServicesTab.js
import { Suspense, lazy } from "react";
import Categories from "@/components/services/Categories";
import SelectCategorie from "@/components/services/SelectCategorie";

import { Skeleton, Card } from "@nextui-org/react";

// Carga lazy del componente UserCardList
const UserCardList = lazy(() =>
  import("@/components/establishment/services/UserCardList")
);

export default function ServicesTab() {
  return (
    <>
      <article className="md:flex md:gap-6 px-3 py-4">
        <section className="w-full md:w-1/3">
          <div className="block lg:hidden pb-4">
            <SelectCategorie />
          </div>
          <div className="hidden lg:block sticky top-[140px]">
            <Categories />
          </div>
        </section>
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
            <UserCardList />
          </Suspense>
        </section>
      </article>
    </>
  );
}
