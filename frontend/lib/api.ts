import axios from "axios";
import { EDASRequest, EDASResponse } from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

export const calculateEDAS = async (data: EDASRequest): Promise<EDASResponse> => {
  const response = await axios.post<EDASResponse>(`${API_URL}/calculate`, data);
  return response.data;
};

export const getEDASDefaults = async (): Promise<EDASRequest> => {
  const response = await axios.get<EDASRequest>(`${API_URL}/defaults`);
  return response.data;
};
