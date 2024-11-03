import type { Question, Quiz } from "~/server/api/quizzes/quizzes.types";
import { readFile, writeFile } from "fs/promises";
import { v4 as uuidv4 } from "uuid";
import { QUESTIONS_FILE_PATH, QUIZZES_FILE_PATH } from "~/lib/constants";

// Quizzes
export const getLocalQuizzes = async (): Promise<Quiz[]> => {
  try {
    const data = await readFile(QUIZZES_FILE_PATH, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading quizzes:", error);
    return [];
  }
};

export const getLocalQuiz = async (quizId: string) => {
  try {
    const localQuizzes = await getLocalQuizzes();
    const localQuiz = localQuizzes.find((quiz) => quiz.id === quizId);

    return localQuiz;
  } catch (error) {
    console.error("Error reading quiz:", error);
  }
};

export const addNewLocalQuiz = async (newQuiz: Quiz) => {
  try {
    const localQuizzes = await getLocalQuizzes();
    const updatedQuizzes = [...localQuizzes, newQuiz];

    await writeFile(QUIZZES_FILE_PATH, JSON.stringify(updatedQuizzes), "utf-8");

    const isDataSaved = await addNewLocalQuestions(newQuiz.questions);

    return { isLocalQuizSaved: true, isLocalQuestionsSaved: isDataSaved };
  } catch (error) {
    console.error("Error writing quizzes:", error);

    return false;
  }
};

export const removeLocalQuiz = async (quizId: string) => {
  try {
    const localQuizzes = await getLocalQuizzes();
    const updatedQuizzes = localQuizzes.filter((quiz) => quiz.id !== quizId);

    await writeFile(QUIZZES_FILE_PATH, JSON.stringify(updatedQuizzes), "utf-8");

    return true;
  } catch (error) {
    console.error("Error removing quiz:", error);

    return false;
  }
};

export const updateLocalQuiz = async (updatedQuiz: Quiz) => {
  try {
    const localQuizzes = await getLocalQuizzes();
    const quizIndex = localQuizzes.findIndex(
      (quiz) => quiz.id === updatedQuiz.id,
    );
    if (quizIndex === -1) {
      throw createError({ statusCode: 404, statusMessage: "Quiz not found" });
    }

    localQuizzes[quizIndex] = updatedQuiz;

    await writeFile(QUIZZES_FILE_PATH, JSON.stringify(localQuizzes), "utf-8");

    const isDataSaved = await addNewLocalQuestions(updatedQuiz.questions);

    return { isLocalQuizSaved: true, isLocalQuestionsSaved: isDataSaved };
  } catch (error) {
    console.error("Error updating quiz:", error);
  }
};

// Questions
export const getLocalQuestions = async (): Promise<Question[]> => {
  try {
    const data = await readFile(QUESTIONS_FILE_PATH, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading questions:", error);
    return [];
  }
};

export const addNewLocalQuestions = async (newQuestions: Question[]) => {
  try {
    const localQuestions = await getLocalQuestions();
    const filteredQuestions = newQuestions.filter((newQuestion) => {
      const isDuplicate = localQuestions.some(
        (question) => question.answer === newQuestion.answer,
      );

      return !isDuplicate;
    });

    const updatedQuestions = [...localQuestions, ...filteredQuestions];

    await writeFile(
      QUESTIONS_FILE_PATH,
      JSON.stringify(updatedQuestions),
      "utf-8",
    );

    return true;
  } catch (error) {
    console.error("Error writing questions:", error);

    return false;
  }
};
