import { getLocalQuizzes } from "~/utils/localQuizzes";
import { Quiz } from "./quizzes.types";

const getAll = async (endpoint: string = "") => {
  const data = await $fetch<Quiz[]>(endpoint, {
    method: "GET",
    baseURL: process.env.BACKEND_ROOT_URL,
    headers: { "Content-Type": "application/json" },
  });

  return data;
};

export default defineEventHandler(async (event) => {
  try {
    const data = await getAll("/quizzes");

    return data;
  } catch (error) {
    const localData = await getLocalQuizzes();
    return localData;
  }
});
