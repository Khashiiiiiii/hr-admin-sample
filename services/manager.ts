import {
  IGetEmployeeAllExamsList,
  IGetExamsList,
  IPostCreateExamProps,
  IPostCreateExam,
} from "@/interfaces";

import { get, post } from "@/utils";

export const getExams = async (token: string) =>
  await get<IGetExamsList>(`questionaries/Exams`, token);

export const postCreateExam = async ({ token, body }: IPostCreateExamProps) =>
  await post<IPostCreateExam>("questionaries/createExam", body, token, {
    headers: {
      "Content-Type": "application/json",
    },
  });

export const getAllExams = async (token: string, id: string) =>
  await get<[]>(`questionaries/getAllExam/${id}`, token);

export const getEmployeeAllExams = async (token: string, id: string) =>
  await get<IGetEmployeeAllExamsList>(
    `questionaries/getEmployeeAllExams/${id}`,
    token
  );

export const getEmployeeExamDetail = async (token: string, id: string) =>
  await get<[]>(`questionaries/getEmployeeExamdetail/${id}`, token);
