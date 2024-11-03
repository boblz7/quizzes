import { getLocalQuestions, getLocalQuizzes } from "~/utils/localQuizzes";
import { Quiz } from "../quizzes/quizzes.types";

const getAll = async (endpoint: string = "") => {
  const data = await $fetch<Quiz["questions"]>(endpoint, {
    method: "GET",
    baseURL: process.env.BACKEND_ROOT_URL,
    headers: { "Content-Type": "application/json" },
  });

  return data;
};

export default defineEventHandler(async (event) => {
  try {
    const data = await getAll("/questions");

    return data;
  } catch (error) {
    const localData = await getLocalQuestions();
    return localData;
  }
});

export type AllQuizesPayload = Awaited<ReturnType<typeof getAll>>;
