import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardBody, CardFooter, Image, Chip } from "@nextui-org/react";
import { Image as Imageicon } from "lucide-react";
import { Skeleton } from "@nextui-org/react";
import api from "@/api";

export default function UserCardList() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get("establisment/get_employees/");
        setUsers(response.data.employeesList || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) {
    return Array.from({ length: 3 }).map((_, index) => (
      <Card key={index} className="w-full h-fit space-y-5 p-4" radius="lg">
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
    ));
  }

  return users.map((user, index) => (
    <Card
      key={index}
      className="h-fit p-4"
      shadow="sm"
      isPressable
      onPress={() => navigate(`./services/${user.id}`, { relative: true })}
    >
      <CardBody className="overflow-visible p-0">
        {user.user?.image ? (
          <Image
            shadow="sm"
            radius="lg"
            width="100%"
            className="w-full object-cover aspect-square"
            src={user.user?.image}
          />
        ) : (
          <div className="w-full aspect-square flex items-center justify-center rounded-xl shadow-sm bg-neutral-100">
            <Imageicon className="w-12 h-auto text-neutral-400" />
          </div>
        )}
      </CardBody>
      <CardFooter className="text-small items-start flex-col whitespace-nowrap">
        <b>
          {user.user?.first_name} {user.user?.last_name}
        </b>
        <p className="text-default-500 text-xs">{user?.rating}/5⭐</p>
        <Chip className="text-xs mt-2" color="success" variant="flat" size="sm">
          Disponible
        </Chip>
      </CardFooter>
    </Card>
  ));
}
