import gameStore from '../_store/store'

export default function Score() {
  const score = gameStore().score

  return (
    <div className=" place-self-center">
      <p>Score</p>
      <p className="text-center text-xl font-bold">{score}</p>
    </div>
  )
}
