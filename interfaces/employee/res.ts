export interface IExam {
  id: number;
  name: string;
  date_created: string;
  date_filled: string | null;
  answer: string | null;
  owner: number;
}

export interface IGetEmployeeRemainingExams {
  count: number;
  result: IExam[];
}

export interface IGetEmployeeExam {
  Exam: IExam;
  questions: Array<IQuestion>;
}

export interface IQuestion {
  id: number;
  question: string;
  answers: { title: string; value: number }[];
}
