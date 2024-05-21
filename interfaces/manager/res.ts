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
