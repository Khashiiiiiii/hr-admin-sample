export interface IPostCreateExamProps {
  token: string;
  body: {
    employee_id_list: number[];
    Exam: string[];
  };
}
