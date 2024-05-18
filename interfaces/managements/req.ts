export interface IEmployeeListProps {
  token: string
  params: {
    page: number
    page_size: number
  }
}

export interface IEmployeeProps {
  id: string
}

export interface IEmployeeSearch {
  char: string
}
