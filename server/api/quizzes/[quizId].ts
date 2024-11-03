import { getLocalQuiz } from "~/utils/localQuizzes";
import { Quiz } from "./quizzes.types";

const getQuiz = async (endpoint: string) => {
  const data = await $fetch<Quiz>(endpoint, {
    method: "GET",
    baseURL: process.env.BACKEND_ROOT_URL,
    headers: { "Content-Type": "application/json" },
  });

  return data;
};

export default defineEventHandler(async (event) => {
  const quizId = getRouterParam(event, "quizId");
  if (!quizId) return "Bad parameter";

  try {
    const result = await getQuiz(`/quizzes/${quizId}`);
    return result;
  } catch (error) {
    const localQuiz = await getLocalQuiz(quizId);

    console.error("getQuiz - API ERROR - (Will use local data)", { localQuiz });

    return localQuiz;
  }
});
