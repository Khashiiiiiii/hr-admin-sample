export interface IEmployeeListProps {
  token: string;
  params: {
    page?: number;
    page_size?: number;
    position_filter?: string;
    department_filter?: string;
  };
}

export interface IEmployeeProps {
  id: string;
}

export interface IEmployeeSearch {
  char: string;
}
