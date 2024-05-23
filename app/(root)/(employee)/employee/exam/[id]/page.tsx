import { auth } from "@/auth";
import styles from "./styles.module.scss";
import { getEmployeeExam, getEmployeeRemainingExams } from "@/services";
import { IGetEmployeeExam, IGetEmployeeRemainingExams } from "@/interfaces";
import { TestForm } from "@/components/Form";

async function getEmployeeExams(
  token: string,
  id: string
): Promise<IGetEmployeeExam> {
  try {
    const data = await getEmployeeExam(id, token);
    return data;
  } catch (error) {
    console.log(error, "error");
    throw new Error("Failed to fetch data");
  }
}

export default async function ExamPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const session = await auth();
  const data = await getEmployeeExams(session?.user.accessToken!, id);

  return (
    <div className={styles.wrapper}>
      <h1>{data.Exam.name}</h1>

      <div className={styles.questionsOuterWrapper}>
        <TestForm questions={data.questions} />
      </div>
    </div>
  );
}
