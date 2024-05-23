export interface IGetExamsList {
  count: number;
  next: string | null;
  previous: string | null;
  results: { key: string; name: string }[];
}

export interface IGetEmployeeAllExamsList {
  count: number;
  next: string | null;
  previous: string | null;
  results: IExam[];
}

export interface IExam {
  id: number;
  name: string;
  date_created: string;
  date_filled: string | null;
  answer: string | null;
  owner: number;
}

export interface IPostCreateExam {
  recipent: string;
  title: string;
}

export interface IGetAllOrganizationExam {
  count: number;
  next: string;
  previous: string;
  results: IGetOrganizationExam[];
}

export interface IGetOrganizationExam {
  title: string;
  departements: {
    name: string;
    totalEmployees: number;
    participants: number;
  }[];
}

export interface IGetExamFullAnalysis {
  title: string;
  organization: string;
  description: string;
  reports: IGetReport[];
}
export interface IGetReport {
  id: number;
  type: "bar" | "table" | "pie";
  title: string;
  data: { title: string; value: number }[];
}
