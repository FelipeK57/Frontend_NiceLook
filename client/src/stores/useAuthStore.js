import { create } from "zustand";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../constants";

const useAuthStore = create((set) => {
  const accessToken = Cookies.get(ACCESS_TOKEN);
  let userData = null;

  if (accessToken) {
    try {
      userData = jwtDecode(accessToken);
    } catch (error) {
      console.error("Error decodificando el token", error);
    }
  }

  return {
    user: userData,
    accessToken: accessToken || null,
    refreshToken: Cookies.get(REFRESH_TOKEN) || null,

    // Acción para iniciar sesión y guardar los tokens
    login: (userData, access, refresh) => {
      set({
        user: userData,
        id_establishment: userData.establishment,
        accessToken: access,
        refreshToken: refresh,
      });

      // Guardar tokens en cookies
      Cookies.set(ACCESS_TOKEN, access, { expires: 7 });
      Cookies.set(REFRESH_TOKEN, refresh, { expires: 7 });
      Cookies.set("establishmentId", userData.establishment, { expires: 7 });
    },

    // Acción para cerrar sesión
    logout: () => {
      set({
        user: null,
        accessToken: null,
        refreshToken: null,
      });
      Cookies.remove(ACCESS_TOKEN);
      Cookies.remove(REFRESH_TOKEN);
    },
  };
});

export default useAuthStore;
