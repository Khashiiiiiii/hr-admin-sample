"use client";

import { IQuestion } from "@/interfaces/employee";
import { useState } from "react";
import styles from "./TestForm.module.scss";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";

const TestForm = ({ questions }: { questions: IQuestion[] }) => {
  const {
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = questions.length / 5 + 1;

  const indexOfLastQuestion = currentPage * pageSize;
  const indexOfFirstQuestion = indexOfLastQuestion - pageSize;
  const currentQuestions = questions.slice(
    indexOfFirstQuestion,
    indexOfLastQuestion
  );

  const renderQuestions = () => {
    return currentQuestions.map((question, index) => (
      <div key={question.id} className={styles.questionWrapper}>
        <h3>
          {(index + 1).toLocaleString("fa-IR")}- {question.question}
        </h3>
        {question.answers === null ? (
          <Textarea placeholder="اینجا بنویسید..." />
        ) : question.answers.length > 5 ? (
          <RadioGroup className={styles.radioGroup}>
            {question.answers.map((answer) => (
              <div className={styles.radioItem1}>
                <Label htmlFor={answer.title}>{answer.title}</Label>
                <RadioGroupItem
                  value={`${answer.value}`}
                  id={answer.title}
                  className={styles.radio}
                />
              </div>
            ))}
          </RadioGroup>
        ) : (
          <RadioGroup className={styles.radioGroup}>
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
      </div>
    ));
  };

  const onSubmit = (data: any) => {
    // Here you can send the form data through an API call
    console.log("Form data:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.wrapper}>
      <div className={styles.counter}>
        سوال {currentPage * currentQuestions.length} از{" "}
        {questions.length.toLocaleString("fa-IR")}
      </div>
      <div className={styles.questionsWrapper}>{renderQuestions()}</div>
      <div className={styles.btnGroup}>
        {currentPage === pageSize ? (
          <Button type="submit" className={styles.submit}>
            ارسال
          </Button>
        ) : (
          <Button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={indexOfLastQuestion >= questions.length}
            className={styles.next}
          >
            بعدی
          </Button>
        )}

        <Button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className={styles.prev}
        >
          قبلی
        </Button>
      </div>
    </form>
  );
};

export default TestForm;
