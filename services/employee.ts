import { get, post } from '@/utils'

export const getEmployeeExam = async (id: string, token: string) =>
  await get<[]>(`questionaries/getEmployeeExam/${id}`, token)

export const getEmployeeRemainingExams = async (token: string) =>
  await get<[]>(`questionaries/getEmployeeUnfillExams/`, token)

export const postEmployeeExam = async (id: string, token: string, body: {}) =>
  await post<[]>(`questionaries/setEmployeeExam/${id}`, body, token)
