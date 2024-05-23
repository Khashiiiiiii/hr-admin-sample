import styles from "./ResultAnalysis.module.scss";
import { Result } from "./Result";
import { IGetReport } from "@/interfaces/manager";

const ResultAnalysis = ({ results }: { results: IGetReport[] }) => {
  console.log(results, "sdasidn");
  return (
    <div className={styles.wrapper}>
      {results.map((result, index) => (
        <Result item={result} key={index} index={index} />
      ))}
    </div>
  );
};

export default ResultAnalysis;
