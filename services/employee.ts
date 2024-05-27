import { IGetEmployeeRemainingExams, IGetEmployeeExam } from "@/interfaces";

import { get, post } from "@/utils";

export const getEmployeeExam = async (examId: string, token: string) =>
  await get<IGetEmployeeExam>(`questionaries/getEmployeeExam/${examId}`, token);

export const getEmployeeRemainingExams = async (token: string) =>
  await get<IGetEmployeeRemainingExams>(
    `questionaries/getEmployeeUnfillExams`,
    token
  );

export const postEmployeeExam = async (
  id: string,
  token: string,
  answers: {}
) =>
  await post(`questionaries/setEmployeeExam/${id}`, { answers }, token, {
    headers: {
      "Content-Type": "application/json",
    },
  });
