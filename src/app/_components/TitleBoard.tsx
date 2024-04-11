import { cx } from 'class-variance-authority'

import styles from '~/styles/titleBoard.module.css'

const cubes = 'gqvxkrwtyewlbopm'.split('')
const getColor = (n: number) =>
  styles.cubeActive
    ? [0, 5, 9, 11, 14].includes(n)
      ? styles.cubeActive
      : ''
    : ''
const getDelay = (n: number) => styles[`delay-${(n + 1) * 100}`] ?? ''

export default function TitleBoard() {
  return (
    <div className={styles.board}>
      {cubes.map((letter, i) => (
        <Cube color={getColor(i)} delay={getDelay(i)} letter={letter} key={i} />
      ))}

      <div className={styles.base}></div>
    </div>
  )
}

function Cube({
  color,
  delay,
  letter,
}: {
  color: string
  delay: string
  letter: string
}) {
  return <div className={cx(styles.cube, color, delay)}>{letter}</div>
}
