import { useState } from "react";

import Categories from "@/components/services/Categories";
import SelectCategorie from "@/components/services/SelectCategorie";
import { Image as Imageicon } from "lucide-react";

import {
  Card,
  //   CardHeader,
  CardBody,
  CardFooter,
  Image,
  Chip,
} from "@nextui-org/react";

export default function ServicesTab() {
  const [user, setUser] = useState({
    name: "Felipe",
    last_name: "Gonzalez",
    image: "",
    email: "",
    phone: "",
    password: "",
    rating: 4.5,
    status: "Disponible",
  });

  return (
    <>
      <article className="md:flex md:gap-6 px-3 py-4">
        <section className=" w-full md:w-1/3">
          <div className="block lg:hidden pb-4">
            <SelectCategorie />
          </div>
          <div className="hidden lg:block sticky top-[140px]">
            <Categories />
          </div>
        </section>
        <section className="w-full grid grid-cols-2 gap-4 md:grid-cols-3">
          {Array.from({ length: 9 }).map((_, index) => (
            <Card
              key={index}
              shadow="sm"
              isPressable
              onPress={() => console.log("item pressed")}
            >
              <CardBody className="overflow-visible p-0">
                {user?.image ? (
                  <Image
                    shadow="sm"
                    radius="lg"
                    width="100%"
                    //   alt={item.title}
                    className="w-full object-cover h-40"
                    src={user.image}
                  />
                ) : (
                  <div className="w-full h-40 flex items-center justify-center rounded-xl shadow-sm bg-neutral-100">
                    <Imageicon className="w-12 h-autoc text-neutral-400" />
                  </div>
                )}
              </CardBody>
              <CardFooter className="text-small items-start flex-col whitespace-nowrap">
                <b>
                  {user.name} {user.last_name}
                </b>
                <p className="text-default-500 text-xs">
                  {user.rating}/5⭐ (23)
                </p>
                <Chip
                  className="text-xs mt-2"
                  color={user.status === "Disponible" ? "success" : "danger"}
                  variant="flat"
                  size="sm"
                >
                  {user.status}
                </Chip>
              </CardFooter>
            </Card>
          ))}
        </section>
      </article>
    </>
  );
}
