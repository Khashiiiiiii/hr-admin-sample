import styles from "./styles.module.scss";
import QualiaLogo from "@/components/svg/qualia.svg";

const Loading = () => {
  return (
    <div className={styles.loadingWrapper}>
      <QualiaLogo />
    </div>
  );
};

export default Loading;
