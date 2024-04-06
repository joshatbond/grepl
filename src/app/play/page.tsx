import Game from './_components'
import WordList from './_components/WordList'

export const metadata = {
  title: 'Grepl | Play',
}

export default function Page() {
  return (
    <main className="wrapper scrollbar gap-12">
      <Game />
      <WordList />
    </main>
  )
}
