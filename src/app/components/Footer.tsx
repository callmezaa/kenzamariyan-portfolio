export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950">
      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-zinc-500">© {new Date().getFullYear()} Ken Zamariyan. All rights reserved.</p>

          <div className="flex gap-6 text-sm text-zinc-400">
            <a href="https://github.com/callmezaa" target="_blank" className="transition hover:text-white">
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/ken-zamariyan-10b140318/" target="_blank" className="transition hover:text-white">
              LinkedIn
            </a>
            <a href="mailto:kenzamariyan32@gmail.com" className="transition hover:text-white">
              Email
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
