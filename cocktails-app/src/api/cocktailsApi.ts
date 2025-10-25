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
  const response = await api.get(`/cocktails/${id}`);
  return response.data;
};

export const getCategories = async () => {
  const response = await api.get("/categories");
  return response.data;
};

export const getIngredients = async () => {
  const response = await api.get("/ingredients");
  return response.data;
};
