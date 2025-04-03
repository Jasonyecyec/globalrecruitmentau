import api from "./client";

export const fetchCompanies = async () => {
  const response = await api.get("/company/list");
  return response.data;
};
