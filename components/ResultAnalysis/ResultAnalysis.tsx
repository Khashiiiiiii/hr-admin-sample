import { BarChart, PieChart } from '../Charts'
import styles from './ResultAnalysis.module.scss'

const ResultAnalysis = ({
  results
}: {
  results: {
    type: 'pie' | 'bar'
    title: string
    data: { title: string; value: number }[]
    color: string | string[]
  }[]
}) => {
  return (
    <div className={styles.wrapper}>
      {results.map((result, index) => (
        <div className={styles.resultChart} key={index}>
          <h3>
            {index + 1}- {result.title}
          </h3>
          {result.type === 'pie' ? (
            <PieChart data={result.data} colors={result.color as string[]} />
          ) : (
            <BarChart data={result.data} color={result.color as string} />
          )}
        </div>
      ))}
    </div>
  )
}

export default ResultAnalysis
