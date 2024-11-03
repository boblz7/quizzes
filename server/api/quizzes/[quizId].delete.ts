import { removeLocalQuiz } from "~/utils/localQuizzes";
import { Quiz } from "./quizzes.types";

const removeQuiz = async (endpoint: string) => {
  const data = await $fetch<Quiz[]>(endpoint, {
    method: "DELETE",
    baseURL: process.env.BACKEND_ROOT_URL,
    headers: { "Content-Type": "application/json" },
  });

  return data;
};

export default defineEventHandler(async (event) => {
  const quizId = getRouterParam(event, "quizId");
  if (!quizId) return "Bad parameter";

  try {
    await removeQuiz(`/quizzes/${quizId}`);

    return { success: true, data: quizId };
  } catch (error) {
    const isRemoved = await removeLocalQuiz(quizId);

    console.error("removeQuiz - API ERROR - (Will use local data)", { quizId });

    return { success: isRemoved, data: quizId, usingLocalData: true };
  }
});
