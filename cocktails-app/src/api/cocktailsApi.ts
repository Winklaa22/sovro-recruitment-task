import axios from "axios";

const API_URL = "https://cocktails.solvro.pl";

export const api = axios.create({
  baseURL: API_URL,
});

export const getCocktails = async () => {
  const response = await api.get("/api/v1/cocktails");
  return response.data.data;
};

export const getCocktailById = async (id: number) => {
  const response = await api.get(`/api/v1/cocktails/${id}`);
  return response.data;
};

export const getCategories = async () => {
  const response = await api.get("/api/v1/categories");
  return response.data;
};

export const getIngredients = async () => {
  const response = await api.get("/api/v1/ingredients");
  return response.data;
};
