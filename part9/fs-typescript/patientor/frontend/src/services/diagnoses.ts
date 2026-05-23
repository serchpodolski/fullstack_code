import axios from "axios";
import { Diagnosis } from "../types";
import { apiBaseUrl } from "../constants";

export const getAll = async (): Promise<Diagnosis[]> => {
  const { data } = await axios.get<Diagnosis[]>(
    `${apiBaseUrl}/diagnoses`
  );

  return data;
};

const diagnosisService = {
  getAll
};

export default diagnosisService;