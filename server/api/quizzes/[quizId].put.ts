import { updateLocalQuiz } from "~/utils/localQuizzes";
import { Quiz } from "./quizzes.types";

const updateQuiz = async (endpoint: string) => {
  const data = await $fetch<Quiz[]>(endpoint, {
    method: "PUT",
    baseURL: process.env.BACKEND_ROOT_URL,
    headers: { "Content-Type": "application/json" },
  });

  return data;
};

export default defineEventHandler(async (event) => {
  const quizId = getRouterParam(event, "quizId");
  const updatedQuiz = await readBody(event);

  if (!quizId) return "Bad parameter";

  try {
    const data = await updateQuiz(`/quizzes/${quizId}`);

    return data;
  } catch (error) {
    const isDataSaved = await updateLocalQuiz(updatedQuiz);

    console.error("updateQuiz - API ERROR - (Will use local data)", { quizId });

    return isDataSaved;
  }
});
