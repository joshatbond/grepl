import Link from "next/link";

export default function Header() {
  return (
    <header>
      <nav
        aria-label="Grepl Game"
        role="menubar"
        className="relative flex items-baseline justify-between bg-accent px-4 py-4"
      >
        <Link href="/" role="menuitem">
          <h1 className="nav__link--logo relative flex font-amatic text-[2.5rem] font-bold tracking-[0.25rem] text-primary">
            <span className="nav__link--g">G</span>
            <span className="nav__link--r">r</span>
            <span className="nav__link--e">e</span>
            <span className="nav__link--p">p</span>
            <span className="nav__link--l">l</span>
          </h1>
        </Link>
      </nav>
    </header>
  );
}
