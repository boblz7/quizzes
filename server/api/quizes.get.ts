import { quizPayloadPageCount } from "~/constants/appConfig";
import { GetAll, Quiz } from "./quizes.types";
import { removeAllWhitespace } from "~/utils/helpers";

const getAll = async (endpoint: string) => {
  const data = await $fetch<GetAll<Quiz[]>>(endpoint, {
    method: "GET",
    baseURL: process.env.BACKEND_ROOT_URL,
    headers: { "Content-Type": "application/json" },
  });

  const filteredData = data?.data;

  return { quizes: filteredData, meta: data.meta };
};

export default defineEventHandler(async (event) => {
  const { page = 1, pageCount = quizPayloadPageCount } = getQuery(event);
  const cookies = parseCookies(event);

  const pagination = `pagination[page]=${page}&pagination[pageSize]=${pageCount}`;
  const sort = "sort=createdAt:DESC";

  const endpoint = removeAllWhitespace(`/api/quizes?${pagination} & ${sort}`);

  return await getAll(endpoint);
});

export type AllQuizesPayload = Awaited<ReturnType<typeof getAll>>;
