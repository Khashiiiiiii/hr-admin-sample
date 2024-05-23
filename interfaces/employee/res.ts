export interface IGetEmployeeRemainingExams {
  id: number;
  name: string;
  date_created: string;
  date_filled: string | null;
  answer: string | null;
  owner: number;
}

export interface IGetEmployeeExam {
  Exam: IGetEmployeeRemainingExams;
  questions: Array<IQuestion>;
}

export interface IQuestion {
  id: number;
  question: string;
  answers: { title: string; value: number }[];
}
