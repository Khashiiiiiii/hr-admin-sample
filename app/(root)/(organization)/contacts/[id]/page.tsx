import Link from "next/link";
import styles from "./styles.module.scss";
import { Metadata } from "next";
import ArrowRightIcon from "@/components/svg/arrow-right.svg";
import { TestReport } from "@/components/TestReport";
import { auth } from "@/auth";
import { getEmployeeExamDetail } from "@/services";
import { IGetEmployeeExamDetail } from "@/interfaces";

async function getExamAnswers(
  token: string,
  id: string
): Promise<IGetEmployeeExamDetail> {
  try {
    const data = await getEmployeeExamDetail(token, id);
    return data;
  } catch (error) {
    console.log(error, "error");
    throw new Error("Failed to fetch data");
  }
}

export const metadata: Metadata = {
  title: "اورگانومتر کوآلیا |پاسخ آزمون",
};

export default async function TestReportById({
  params: { id },
}: {
  params: { id: string };
}) {
  const session = await auth();
  const data = await getExamAnswers(session?.user.accessToken!, id);

  return (
    <div className={styles.wrapper}>
      <Link href="/contacts" className={styles.backBtn}>
        <span className={styles.iconWrapper}>
          <ArrowRightIcon />
        </span>
        بازگشت
      </Link>

      <div className={styles.testInfo}>
        <h1>پاسخ نامه آزمون {data.exam.name}</h1>
        <div>
          <h3>{data.exam.ownerName}</h3>
          <h4>{data.exam.department}</h4>
        </div>
      </div>
      <TestReport data={data.questions} answers={data.exam.answer!} />
    </div>
  );
}
