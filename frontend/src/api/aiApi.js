import api from "./axios";

export const analyzeSymptoms = (symptoms) =>
  api.post("/ai/analyze", {
    symptoms
  });