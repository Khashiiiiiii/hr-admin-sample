import { IEmployeeList, IOrganizationFilters } from '@/interfaces'
import { IEmployeeListProps } from '@/interfaces/managements'

import { get, del, post } from '@/utils'

export const getEmployeeSearch = async (token: string, char: string) =>
  await get<[]>(`managements/employeeSearch/${char}`, token)

export const getEmployeeDetail = async (token: string, id: string) =>
  await get<[]>(`managements/employeedetail/${id}`, token)

export const deleteEmployeeDetail = async (token: string, id: string) =>
  await del<[]>(`managements/employeedetail/${id}`, token)

export const getEmployeeList = async ({ token, params }: IEmployeeListProps) =>
  await get<IEmployeeList>(`managements/employeelist/`, token, params)

export const postEmployeeList = async (token: string, file: FileSystem) =>
  await post<[]>('managements/employeelist/', file, token)

export const getOrganizationDepartmentsFilters = async (token: string) =>
  await get<IOrganizationFilters>(
    'managements/getOrganizationDepartmentFilters',
    token
  )

export const getOrganizationPositionsFilters = async (token: string) =>
  await get<IOrganizationFilters>(
    'managements/getOrganizationPositionFilters',
    token
  )

export const getOrganization = async (token: string) =>
  await get<[]>('managements/organization', token)
