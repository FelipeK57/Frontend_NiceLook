import { create } from "zustand";

const useAddCart = create((set) => ({
    items: (() => {
      // Recuperar la cantidad desde localStorage al inicializar
      const savedItems = localStorage.getItem("cart-items");
      return savedItems ? JSON.parse(savedItems) : 0;
    })(),
    setItems: (items) => {
      // Guardar la cantidad en el estado y en localStorage
      localStorage.setItem("cart-items", items);
      set({ items });
    },
  }));
  
  export default useAddCart;