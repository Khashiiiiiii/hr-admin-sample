import { IGetEmployeeAllExamsList, IGetExamsList } from '@/interfaces'
import { get, post } from '@/utils'

export const getExams = async (token: string) =>
  await get<IGetExamsList>(`questionaries/Exams`, token)

export const postCreateExam = async (token: string, body: {}) => {
  const data = await post<[]>('questionaries/createExam', body, token)
}

export const getAllExams = async (token: string, id: string) => {
  const data = await get<[]>(`questionaries/getAllExam/${id}`, token)
}

export const getEmployeeAllExams = async (token: string, id: string) =>
  await get<IGetEmployeeAllExamsList>(
    `questionaries/getEmployeeAllExams/${id}`,
    token
  )

export const getEmployeeExamDetail = async (token: string, id: string) => {
  const data = await get<[]>(`questionaries/getEmployeeExamdetail/${id}`, token)
}
