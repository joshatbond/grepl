import TitleBoard from './_components/TitleBoard'

export default function HomePage() {
  return (
    <main className="">
      <div className="">
        <TitleBoard />
      </div>

      <article className="px-4 text-center">
        <p>
          <span className="text-xl font-bold">Meet Grepl,</span> a classic
          word-finding game.
        </p>
        <p className="mt-4">
          Sign in to earn achievements and keep your progress across devices!
        </p>
      </article>
    </main>
  )
}
