import styles from "./LoadingBalls.module.scss";

const LoadingBalls = () => {
  const renderBalls = () => {
    const balls = [];

    for (let i = 0; i < 3; i++) {
      const animationDelay = `${i * 0.2}s`; // Delay each ball animation by 0.2s

      balls.push(
        <div key={i} className={styles.ball} style={{ animationDelay }} />
      );
    }

    return balls;
  };

  return <div className={styles.wrapper}>{renderBalls()}</div>;
};
export default LoadingBalls;
