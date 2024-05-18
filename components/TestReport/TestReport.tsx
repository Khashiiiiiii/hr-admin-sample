import Link from "next/link";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import styles from "./TestReport.module.scss";
import DownloadIcon from "@/components/svg/download.svg";

const TestReport = () => {
  const questions = [
    {
      type: "radio",
      title:
        "۱-در مقایسه با سازمانهای مشابه و کار و فعالیتم، احساس می­کنم حقوق و مزایایم در محدوده قابل قبول است",
      defaultValue: "disagreed",
    },
    {
      type: "radio",
      title:
        "۲- در درون سازمان، در مقایسه با دیگر کارکنان حقوق و مزایایم عادلانه است.",
      defaultValue: "fully agreed",
    },
    {
      type: "radio",
      title:
        "۳- در این سازمان امکانات رفاهی به طور عادلانه بین کارکنان توزیع می­ شود.",
      defaultValue: "somehow",
    },
    {
      type: "radio",
      title: "۴- شغل و مسئولیت من با توانایی هایم متناسب است.",
      defaultValue: "fully disagreed",
    },
    {
      type: "radio",
      title: "۵- اکثر اوقات از مشاهده نتایج کارم احساس خشنودی می­ کنم.",
      defaultValue: "fully agreed",
    },
  ];
  return (
    <div className={styles.wrapper}>
      <Link
        className={styles.downloadLink}
        aria-disabled
        href=""
        download="Filename.xlsx"
        target="_blank"
      >
        <span>
          <DownloadIcon />
        </span>
        دانلود پاسخ
      </Link>
      <ol className={styles.questionsWrapper}>
        {questions.map((item) => (
          <li key={item.title}>
            <p>{item.title}</p>
            <RadioGroup
              className={styles.radioGroup}
              defaultValue={item.defaultValue}
            >
              <div className={styles.radioItem}>
                <Label htmlFor="fully-agreed">کاملا موافقم</Label>
                <RadioGroupItem
                  value="fully agreed"
                  id="fully-agreed"
                  className={styles.radio}
                />
              </div>
              <div className={styles.radioItem}>
                <Label htmlFor="agreed">موافقم</Label>
                <RadioGroupItem
                  value="agreed"
                  id="agreed"
                  className={styles.radio}
                />
              </div>
              <div className={styles.radioItem}>
                <Label htmlFor="somehow">تاحدودی</Label>
                <RadioGroupItem
                  value="somehow"
                  id="somehow"
                  className={styles.radio}
                />
              </div>
              <div className={styles.radioItem}>
                <Label htmlFor="disagreed">مخالفم</Label>
                <RadioGroupItem
                  value="disagreed"
                  id="disagreed"
                  className={styles.radio}
                />
              </div>
              <div className={styles.radioItem}>
                <Label htmlFor="fully-disagreed">کاملا مخالفم</Label>
                <RadioGroupItem
                  value="fully disagreed"
                  id="fully-disagreed"
                  className={styles.radio}
                />
              </div>
            </RadioGroup>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default TestReport;
