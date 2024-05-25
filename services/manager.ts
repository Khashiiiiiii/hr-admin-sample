import {
  IGetEmployeeAllExamsList,
  IGetExamsList,
  IPostCreateExamProps,
  IPostCreateExam,
  IGetAllOrganizationExam,
  IGetExamFullAnalysis,
  IGetEmployeeExamDetail,
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

export const getAllOrganizationExam = async (token: string) =>
  await get<IGetAllOrganizationExam>(
    `questionaries/getAllOrganizationExam`,
    token
  );

export const getEmployeeAllExams = async (token: string, id: string) =>
  await get<IGetEmployeeAllExamsList>(
    `questionaries/getEmployeeAllExams/${id}`,
    token
  );

export const getEmployeeExamDetail = async (token: string, id: string) =>
  await get<IGetEmployeeExamDetail>(
    `questionaries/getEmployeeExamdetail/${id}`,
    token
  );

export const getExamFullAnalys = async (
  token: string,
  params: { Exam: string; Department: string }
) =>
  await get<IGetExamFullAnalysis>(
    "questionaries/getExamFullAnalys",
    token,
    params
  );
