import { cx } from 'class-variance-authority'

import styles from '~/styles/titleBoard.module.css'

export default function TitleBoard() {
  return (
    <div className={styles.board}>
      <Cubes />
      <div className={styles.base}></div>
    </div>
  )
}

function Cubes() {
  const cubes = 'gqvxkrwtyewlbopm'.split('')
  const getColor = (n: number) =>
    [0, 5, 9, 11, 14].includes(n) ? styles.cubeActive : ''
  const getDelay = (n: number) => styles[`delay-${(n + 1) * 100}`] ?? ''

  return (
    <>
      {cubes.map((e, i) => (
        <div key={i} className={cx(styles.cube, getColor(i), getDelay(i))}>
          {e}
        </div>
      ))}
    </>
  )
}
