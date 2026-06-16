export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-zinc-800/50 py-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-zinc-500 text-sm">
          &copy; {year} Saiyed Muhammad Abdullah Maududi. All rights reserved.
        </p>
        <p className="text-zinc-600 text-sm">
          Built with{" "}
          <span className="text-emerald-400">Next.js</span> &amp;{" "}
          <span className="text-emerald-400">Tailwind CSS</span>
        </p>
      </div>
    </footer>
  );
}
