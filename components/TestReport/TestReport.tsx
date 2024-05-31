import Link from "next/link";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import styles from "./TestReport.module.scss";
import DownloadIcon from "@/components/svg/download.svg";
import { IQuestion } from "@/interfaces";
import { Textarea } from "../ui/textarea";

const TestReport = ({
  data,
  answers,
}: {
  data: IQuestion[];
  answers: string[];
}) => {
  return (
    <div className={styles.wrapper}>
      <Link
        className={styles.downloadLink}
        aria-disabled
        href=""
        // download="Filename.xlsx"
        // target="_blank"
      >
        <span>
          <DownloadIcon />
        </span>
        دانلود پاسخ
      </Link>
      <ol className={styles.questionsWrapper}>
        {data.map((question, index) => (
          <li key={question.id}>
            <p>
              {(index + 1).toLocaleString("fa-IR")}- {question.question}
            </p>
            {question.answers === null ? (
              <Textarea defaultValue={answers[index]} disabled />
            ) : question.answers.length > 5 ? (
              <RadioGroup
                className={styles.radioGroup}
                defaultValue={`${answers[index]}`}
                disabled
              >
                {question.answers.map((answer) => (
                  <div className={styles.radioItem1}>
                    <Label htmlFor={answer.title}>
                      {typeof answer.title === "string"
                        ? (+answer.title).toLocaleString("fa-IR")
                        : answer.title}
                    </Label>
                    <RadioGroupItem
                      id={answer.title}
                      className={styles.radio}
                      value={`${answer.value}`}
                    />
                  </div>
                ))}
              </RadioGroup>
            ) : (
              <RadioGroup
                className={styles.radioGroup}
                defaultValue={`${answers[index]}`}
                disabled
              >
                {question.answers.map((answer) => (
                  <div className={styles.radioItem}>
                    <Label htmlFor={answer.title}>{answer.title}</Label>
                    <RadioGroupItem
                      value={`${answer.value}`}
                      id={answer.title}
                      className={styles.radio}
                    />
                  </div>
                ))}
              </RadioGroup>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default TestReport;
