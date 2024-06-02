import Link from "next/link";
import styles from "./styles.module.scss";
import ArrowRightIcon from "@/components/svg/arrow-right.svg";
import DownloadIcon from "@/components/svg/download.svg";
import { ResultAnalysis } from "@/components/ResultAnalysis";
import { getExamFullAnalys } from "@/services";
import { Metadata } from "next";
import { auth } from "@/auth";
import { IGetExamFullAnalysis } from "@/interfaces";

async function getAnalysis(
  token: string,
  { exam, department }: { exam: string; department: string }
): Promise<IGetExamFullAnalysis> {
  try {
    const data = await getExamFullAnalys(token, {
      Exam: exam,
      Department: department,
    });
    return data;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
}

export const metadata: Metadata = {
  title: "اورگانومتر کوآلیا | تحلیل کلی",
};

const page = async ({
  params: { exam, department },
}: {
  params: { exam: string; department: string };
}) => {
  const session = await auth();
  const data = await getAnalysis(session?.user.accessToken!, {
    exam,
    department: department === "all" ? "" : department,
  });

  return (
    <div className={styles.wrapper}>
      <Link href="/analysis" className={styles.backBtn}>
        <span className={styles.iconWrapper}>
          <ArrowRightIcon />
        </span>
        بازگشت
      </Link>
      <div className={styles.testHeader}>
        <div className={styles.topSection}>
          <div className={styles.testInfo}>
            <h1>{data.title}</h1>
            <h3>{data.organization}</h3>
            <h3>
              {department === "all"
                ? "همه دپارتمان‌ها"
                : decodeURIComponent(department)}
            </h3>
          </div>
          {/* <Link
            className={styles.downloadLink}
            aria-disabled
            href=''
            download='Filename.xlsx'
            target='_blank'
          >
            <span>
              <DownloadIcon />
            </span>
            دانلود نمودار
          </Link> */}
        </div>
        <div className={styles.bottomSection}>
          <h2>روش انجام تست</h2>
          <div className={styles.paragraphGroup}>
            <p>{data.description}</p>
          </div>
        </div>
      </div>
      <div className={styles.testDescription}>
        <h2>تحلیل آزمون</h2>
        <ResultAnalysis results={data.reports} />
      </div>
    </div>
  );
};

export default page;
