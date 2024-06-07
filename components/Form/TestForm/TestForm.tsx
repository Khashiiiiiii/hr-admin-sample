"use client";

import { IQuestion } from "@/interfaces/employee";
import { useEffect, useState } from "react";
import styles from "./TestForm.module.scss";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import DoneSvg from "@/components/svg/done.svg";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { postEmployeeExam } from "@/services";
import { useSession } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

type FormInputs = {
  [key: string]: string;
};

const TestForm = ({
  questions,
  examId,
}: {
  questions: IQuestion[];
  examId: string;
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const session = useSession();
  const { toast } = useToast();
  const router = useRouter();

  const questionSchema = z.object({
    ...questions.reduce((acc, { id, answers }) => {
      if (answers === null) {
        return {
          ...acc,
          [`${id}`]: z.string().max(1000),
        };
      }
      return {
        ...acc,
        [`${id}`]: z.enum([
          String(id),
          ...answers.map((item) => String(item.value)),
        ]),
      };
    }, {}),
  });

  const resolver = zodResolver(questionSchema);

  const form = useForm<FormInputs>({
    resolver,
    defaultValues: {
      ...questions.reduce((acc, { id }) => ({ ...acc, [`${id}`]: "" }), {}),
    },
  });

  const pageSize = Math.ceil(questions.length / 5);

  const indexOfLastQuestion = currentPage * pageSize;
  const indexOfFirstQuestion = indexOfLastQuestion - pageSize;
  const currentQuestions = questions.slice(
    indexOfFirstQuestion,
    indexOfLastQuestion
  );

  const onSubmit = async (data: FormInputs) => {
    const isValid = await form.trigger().then((res) => res);
    if (isValid) {
      router.push("/employee");
      const response = Object.values(data);
      setLoading(true);
      postEmployeeExam(examId, session.data?.user.accessToken!, response)
        .then(() => {
          toast({
            duration: 3500,
            children: (
              <div className={styles.toastWrapper}>
                <div className={styles.icon}>
                  <DoneSvg />
                </div>
                <p>نتایج آزمون ارسال شد.</p>
              </div>
            ),
            style: {
              background: "#EAFFF0",
              borderColor: "#007132",
              borderRadius: "12px",
              borderWidth: "2px",
              color: "#007132",
            },
          });
          router.push("/employee");
        })
        .finally(() => setLoading(false));
    }
  };

  const handleNextPage = async () => {
    const isValid = await form.trigger([
      ...currentQuestions.map((item) => String(item.id)),
    ]);

    if (isValid) setCurrentPage(currentPage + 1);
  };

  const renderQuestions = () => {
    return currentQuestions.map((question, index) => (
      <div key={question.id} className={styles.questionWrapper}>
        <h3>
          {(5 * (currentPage - 1) + (index + 1)).toLocaleString("fa-IR")}-{" "}
          {question.question}
        </h3>
        {question.answers === null ? (
          <FormField
            // name={answers[question.id]}
            name={`${question.id}`}
            control={form.control}
            key={question.id}
            render={({ field }) => (
              <FormItem className={styles.emailInput}>
                <FormControl>
                  <Textarea placeholder="اینجا بنویسید..." {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        ) : question.answers.length > 5 ? (
          <FormField
            name={`${question.id}`}
            control={form.control}
            key={question.id}
            render={({ field }) => (
              <FormItem className={styles.emailInput}>
                <FormControl>
                  <RadioGroup
                    className={styles.radioGroup}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    {question.answers.map((answer) => (
                      <FormItem className={styles.radioItem1}>
                        <FormControl>
                          <RadioGroupItem
                            className={styles.radio}
                            value={`${answer.value}`}
                          />
                        </FormControl>
                        <FormLabel
                          className="font-normal"
                          htmlFor={answer.title}
                        >
                          {answer.title}
                        </FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />
        ) : (
          <FormField
            name={`${question.id}`}
            control={form.control}
            key={question.id}
            render={({ field }) => (
              <FormItem className={styles.emailInput}>
                <FormControl>
                  <RadioGroup
                    className={styles.radioGroup}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    {question.answers.map((answer) => (
                      <FormItem className={styles.radioItem}>
                        <FormControl>
                          <RadioGroupItem
                            className={styles.radio}
                            value={`${answer.value}`}
                          />
                        </FormControl>
                        <FormLabel
                          className="font-normal"
                          htmlFor={answer.title}
                        >
                          {answer.title}
                        </FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />
        )}
      </div>
    ));
  };

  return (
    <Form {...form}>
      <form className={styles.wrapper}>
        <div className={styles.counter}>
          سوال{" "}
          {(currentPage * 5 > questions.length
            ? questions.length - (currentQuestions.length - 1)
            : currentPage * 5 - (currentQuestions.length - 1)
          ).toLocaleString("fa-IR")}{" "}
          تا{" "}
          {(currentPage * 5 > questions.length
            ? questions.length
            : currentPage * 5
          ).toLocaleString("fa-IR")}{" "}
          از {questions.length.toLocaleString("fa-IR")}{" "}
        </div>
        <div className={styles.questionsWrapper}>{renderQuestions()}</div>
        <div className={styles.btnGroup}>
          {currentPage === pageSize ? (
            <Button
              type="button"
              className={cn(styles.submit, loading && styles.disabled)}
              onClick={form.handleSubmit(onSubmit)}
              disabled={loading}
            >
              ارسال
            </Button>
          ) : (
            <Button
              onClick={handleNextPage}
              disabled={indexOfLastQuestion >= questions.length}
              className={styles.next}
              type="button"
            >
              بعدی
            </Button>
          )}

          <Button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className={styles.prev}
            type="button"
          >
            قبلی
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default TestForm;
