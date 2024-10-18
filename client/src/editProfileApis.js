import axios from 'axios';

// Base URL para la API (cambiar según sea necesario)
const BASE_URL = "http://localhost:8000";

// Función para obtener los datos del establecimiento (GET)
export const obtenerEstablemiento = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/establisment/get-establisment/${id}/`);
    return response;
  } catch (error) {
    console.error("Error obteniendo el establecimiento:", error);
    throw error;
  }
};

// Función para editar los datos del establecimiento (PUT)
export const editarEstablemiento = async (id, name, address, city, contact_methods) => {
  console.log(id, name, address, city);
  try {
    const response = await axios.patch(`${BASE_URL}/establisment/update-establisment/${id}/`, {
      name,
      address,
      city,
      contact_methods,
    });
    return response;
  } catch (error) {
    console.error("Error editando el establecimiento:", error);
    throw error;
  }
};

// Función para obtener la imagen del establecimiento (GET)
export const obtenerImagen = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/image/get-logo/${id}/`);
    return response;
  } catch (error) {
    console.error("Error obteniendo la imagen:", error);
    throw error;
  }
};

// Función para subir el logo del establecimiento (POST)
export const subirLogo = async (id, formData) => {
  try {
    const response = await axios.post(`${BASE_URL}/image/upload-logo/${id}/`, formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });
    return response;
  } catch (error) {
    console.error("Error subiendo el logo:", error);
    throw error;
  }
};

// Función para obtener el banner del establecimiento (GET)
export const obtenerBanner = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/image/get-banner/${id}/`);
    return response;
  } catch (error) {
    console.error("Error obteniendo el banner:", error);
    throw error;
  }
};

// Función para subir el banner del establecimiento (POST)
export const subirBanner = async (id, formData) => {
  try {
    const response = await axios.post(`${BASE_URL}/image/upload-banner/${id}/`, formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });
    return response;
  } catch (error) {
    console.error("Error subiendo el banner:", error);
    throw error;
  }
};

// Puedes añadir más funciones como DELETE según sea necesario
