export interface IEmployee {
  id: number | string
  firstname: string | null
  lastname: string | null
  gender: 'M' | 'F' | null
  position: string | null
  company: string | null
  email: string
}

export interface IEmployeeList {
  count: number
  next: string | null
  previous: string | null
  results: Array<IEmployee>
}

export interface IOrganizationFilters {
  filters: Array<string>
}
