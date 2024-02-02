import TitleBoard from "./_components/TitleBoard";

export default function HomePage() {
  return (
    <main className="wrapper place-content-center gap-y-12">
      <div className="wrapper__full-bleed">
        <TitleBoard />
      </div>

      <article className="text-center">
        <p>
          <span className="text-xl font-bold">Meet Grepl,</span> a classic
          word-finding game.
        </p>
        <p className="mt-4">
          Sign in to earn achievements and keep your progress across devices!
        </p>
      </article>
    </main>
  );
}
