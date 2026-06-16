export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-8">
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between flex-wrap gap-4">
        <span className="text-slate-400 text-sm">Jeton Games © 2026</span>
        <div className="flex items-center gap-6">
          <a
            href="/catalogue"
            className="text-slate-500 hover:text-white text-sm transition-colors"
          >
            Catalogue
          </a>
          <a
            href="/login"
            className="text-slate-500 hover:text-white text-sm transition-colors"
          >
            Connexion
          </a>
        </div>
      </div>
    </footer>
  );
}
