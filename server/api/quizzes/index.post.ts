import { addNewLocalQuiz } from "~/utils/localQuizzes";
import { Quiz } from "./quizzes.types";

const addQuiz = async (endpoint: string = "", newQuiz: JSON) => {
  const data = await $fetch<Quiz[]>(endpoint, {
    method: "POST",
    baseURL: process.env.BACKEND_ROOT_URL,
    headers: { "Content-Type": "application/json" },
    body: newQuiz,
  });

  return data;
};

export default defineEventHandler(async (event) => {
  const newQuiz = await readBody(event);

  try {
    const data = await addQuiz("/quizzes", newQuiz);

    return data;
  } catch (error) {
    const isDataSaved = await addNewLocalQuiz(newQuiz);
    console.error("addQuiz - API ERROR: using local data", { isDataSaved });

    return isDataSaved;
  }
});
