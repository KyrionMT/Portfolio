import { useEffect } from "react";
import { Link, NavLink, Route, Routes, useLocation } from "react-router-dom";
import { ArrowUpRight, ArrowUp, ArrowLeft } from "lucide-react";
import Landing from "./pages/Landing";
import VideoPortfolio from "./pages/VideoPortfolio";
import RobloxPortfolio from "./pages/RobloxPortfolio";
import { ContactProvider, useContact } from "./components/ContactProvider";

function Header() {
  const { pathname } = useLocation();
  const { openContact } = useContact();
  return (
    <header className="site-header">
      <Link to="/" className="wordmark" aria-label="Kyrion MT — início">
        <span className="brand-symbol" aria-hidden="true">
          k<ArrowUpRight strokeWidth={1.8} />
        </span>
        <span>
          KYRION<span className="brand-mt"> MT</span>
          <span className="brand-period">.</span>
        </span>
      </Link>
      {pathname === "/" ? (
        <span className="header-descriptor">
          INDEPENDENTE POR NATUREZA.
          <br />
          CRIATIVO POR ESCOLHA.
        </span>
      ) : (
        <nav className="page-nav" aria-label="Portfólios">
          <NavLink to="/video">Vídeo</NavLink>
          <span>/</span>
          <NavLink to="/roblox">Roblox</NavLink>
        </nav>
      )}
      <button
        className="contact-link"
        onClick={() =>
          openContact(
            pathname === "/roblox"
              ? "Roblox"
              : pathname === "/video"
                ? "Vídeo"
                : "",
          )
        }
      >
        <span className="availability-dot" />
        Vamos criar algo
        <ArrowUpRight size={17} />
      </button>
    </header>
  );
}

function Footer() {
  const { pathname } = useLocation();
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <Link to="/" className="footer-brand">
          KYRION MT<span>®</span>
        </Link>
        <p>
          Um olhar diferente.
          <br />
          Infinitas possibilidades.
        </p>
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          De volta ao topo
          <ArrowUp size={17} />
        </button>
      </div>
      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} Kyrion MT · Feito para sair do comum.
        </span>
        <span>Projetos e resultados conceituais, para demonstração.</span>
        {pathname !== "/" && (
          <Link to="/">
            <ArrowLeft size={13} />
            Trocar de universo
          </Link>
        )}
      </div>
    </footer>
  );
}

function RouteEffects() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title =
      pathname === "/video"
        ? "Edição de vídeo — Kyrion MT"
        : pathname === "/roblox"
          ? "Desenvolvimento Roblox — Kyrion MT"
          : "Kyrion MT — Um criativo. Dois universos.";
    document.documentElement.dataset.universe =
      pathname === "/roblox" ? "roblox" : "video";
  }, [pathname]);
  return null;
}

function NotFound() {
  return (
    <main className="not-found">
      <span className="eyebrow">COORDENADAS DESCONHECIDAS / 404</span>
      <h1>
        Este universo ainda
        <br />
        não foi criado.
      </h1>
      <Link className="primary-button" to="/">
        Voltar ao início <ArrowUpRight size={20} />
      </Link>
    </main>
  );
}

export default function App() {
  return (
    <ContactProvider>
      <a className="skip-link" href="#main-content">
        Pular para o conteúdo
      </a>
      <RouteEffects />
      <Header />
      <div id="main-content" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/video" element={<VideoPortfolio />} />
          <Route path="/roblox" element={<RobloxPortfolio />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </ContactProvider>
  );
}
