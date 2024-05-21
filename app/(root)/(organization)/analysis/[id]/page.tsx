import Link from "next/link";
import styles from "./styles.module.scss";
import ArrowRightIcon from "@/components/svg/arrow-right.svg";
import DownloadIcon from "@/components/svg/download.svg";
import { ResultAnalysis } from "@/components/ResultAnalysis";

const page = ({ params }: { params: { id: string } }) => {
  const {} = params;
  const results: {
    type: "pie" | "bar";
    title: string;
    data: { title: string; value: number }[];
    color: string | string[];
  }[] = [
    {
      type: "bar",
      title:
        "در مقایسه با سازمان‌های مشابه و کار و فعالیتم، احساس می­کنم حقوق و مزایایم در محدوده قابل قبول است.",
      data: [
        { title: "کاملا مخالفم", value: 13 },
        { title: "مخالفم", value: 74 },
        { title: "نظری ندارم", value: 91 },
        { title: "موافقم", value: 122 },
        { title: "کاملا موافقم", value: 53 },
      ],
      color: "#ABDFF3",
    },
    {
      type: "pie",
      title: "چه میزان سازمان خود را به سایر متقاضیان کار پیشنهاد می دهید؟",
      data: [
        { title: "۱", value: 22 },
        { title: "۲", value: 18 },
        { title: "۳", value: 12 },
        { title: "۴", value: 11 },
        { title: "۵", value: 10 },
        { title: "۶", value: 9 },
        { title: "۷", value: 6 },
        { title: "۸", value: 5 },
        { title: "۹", value: 4 },
        { title: "۱۰", value: 4 },
      ],
      color: [
        "#FFDDBD",
        "#FFF0F0",
        "#D5D9D7",
        "#AEC0F5",
        "#F08EC8",
        "#B9E4F4",
        "#A5B8F0",
        "#DFFFF2",
        "#ABDFF3",
        "#6D7CFF",
      ],
    },
  ];

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
            <h1>تحلیل آزمون رضایت شغلی</h1>
            <h3>دیزاین استودیو</h3>
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
            <p>
              پرسشنامه رضایت شغلی مینه سوتا (MSQ) از ۱۹ گویه و ۶ خرده مقیاس نظام
              پرداخت (۳ سوال)، نوع شغل (۴ سوال)، فرصت های پیشرفت (۳ سوال)، جو
              سازمانی (۲ سوال)، سبک رهبری (۴ سوال) و شرایط فیزیکی (۳ سوال) تشکیل
              شده است که به منظور سنجش رضایت شغلی بکار می رود. علاوه بر ۱۹ سوال
              ذکر شده که پاسخ آنها به صورت 5 گزینه ای می باشد، در پایان پرسشنامه
              ۳ سوال دیگر نیز وجود دارد که پاسخ دو سوال آن بصورت رتبه بندی 10
              گزینه ای و یک سوال نیز به صورت تشریحی می باشد.
            </p>
            <p>
              رضایت شغلی تعاریف یا به عبارتی «واکنش احساسی و نگرشی» کارکنان به
              شغل، به معنای « میزانی است که مردم شغلشان را دوست دارند»؛ به طوری
              که بعضی از مردم از کار لذت می‌برند و آن را یک بخش مهم زندگی
              می‌دانند. و برخی دیگر از کار متنفرند و آن را تنها به این دلیل
              انجام می‌دهند که مجبور به انجام آن هستند.
            </p>
          </div>
        </div>
      </div>
      <div className={styles.testDescription}>
        <h2>تحلیل آزمون</h2>
        <ResultAnalysis results={results} />
      </div>
    </div>
  );
};

export default page;
