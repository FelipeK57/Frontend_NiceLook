/* eslint-disable react/prop-types */
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";

import ManageProduct from "./ManageProduct";

export default function ManageProductDrawer({
  isOpen,
  setIsOpen,
  children,
  product,
}) {
  return (
    <>
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerTrigger asChild>
          {/* <Button variant="outline">Queso</Button> */}
          {children}
        </DrawerTrigger>
        <DrawerContent>
          <ManageProduct product={product} />
        </DrawerContent>
      </Drawer>
    </>
  );
}
