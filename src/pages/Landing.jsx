import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowUpRight,
  Asterisk,
  ArrowDown,
  MoveUpRight,
  Sparkles,
  Clapperboard,
  Box,
  Code2,
  Aperture,
  AudioLines,
  MousePointer2,
} from "lucide-react";
import WorldScene from "../components/WorldScene";
import { useContact } from "../components/ContactProvider";

function UniverseCard({ type, children }) {
  const ref = useRef(null);
  const isVideo = type === "video";
  function move(event) {
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      event.pointerType === "touch"
    )
      return;
    const box = ref.current.getBoundingClientRect();
    ref.current.style.setProperty(
      "--pointer-x",
      `${((event.clientX - box.left) / box.width) * 100}%`,
    );
    ref.current.style.setProperty(
      "--pointer-y",
      `${((event.clientY - box.top) / box.height) * 100}%`,
    );
  }
  return (
    <Link
      ref={ref}
      onPointerMove={move}
      to={`/${type}`}
      className={`universe-card ${type}-card`}
      aria-label={`Explorar portfólio de ${isVideo ? "edição de vídeo" : "desenvolvimento Roblox"}`}
    >
      <div className="universe-art">{children}</div>
      <div className="universe-shade" />
      <div className="card-spotlight" />
      <div className="universe-card-top">
        <span className="universe-index">
          0{isVideo ? "1" : "2"}
          <span> / </span>
          {isVideo ? "FRAME BY FRAME" : "WORLD BY WORLD"}
        </span>
        <span className="universe-icon">
          {isVideo ? (
            <Clapperboard size={20} strokeWidth={1.5} />
          ) : (
            <Box size={20} strokeWidth={1.5} />
          )}
        </span>
      </div>
      {isVideo ? (
        <div className="film-details">
          <span>
            <i />
            REC
          </span>
          <span>4K · 24 FPS</span>
        </div>
      ) : (
        <div className="world-details">
          <span className="world-coordinate">X: 128 / Y: ∞</span>
          <span className="world-build">
            <span />
            IMAGINATION LOADED
          </span>
        </div>
      )}
      <div className="universe-card-content">
        <div className="universe-tags">
          {(isVideo
            ? ["NARRATIVA", "COR", "MOVIMENTO"]
            : ["LUAU", "GAME DESIGN", "IMERSÃO"]
          ).map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <h2>
          {isVideo ? (
            <>
              Histórias que
              <br />
              <em>prendem o olhar.</em>
            </>
          ) : (
            <>
              Mundos que você
              <br />
              <em>quer habitar.</em>
            </>
          )}
        </h2>
        <div className="universe-card-bottom">
          <div>
            <span className="universe-role">
              {isVideo ? "Edição de vídeo" : "Desenvolvimento Roblox"}
            </span>
            <p>
              {isVideo
                ? "Do primeiro frame ao último arrepio."
                : "Da primeira ideia ao próximo universo."}
            </p>
          </div>
          <span className="universe-arrow">
            <ArrowUpRight size={25} />
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function Landing() {
  const navigate = useNavigate();
  const { openContact } = useContact();
  useEffect(() => {
    const handler = (event) => {
      if (
        event.altKey ||
        event.ctrlKey ||
        event.metaKey ||
        document.querySelector('[role="dialog"]') ||
        /INPUT|TEXTAREA|SELECT/.test(event.target.tagName)
      )
        return;
      if (event.key === "1") navigate("/video");
      if (event.key === "2") navigate("/roblox");
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [navigate]);
  return (
    <main className="landing">
      <section className="landing-intro">
        <div className="intro-orbit" aria-hidden="true" />
        <div className="eyebrow intro-eyebrow">
          <span /> BEM-VINDO AO MEU MULTIVERSO
        </div>
        <h1>
          UM CRIATIVO.
          <br />
          <span>DOIS UNIVERSOS.</span>
          <Sparkles className="heading-spark" size={43} strokeWidth={1.1} />
        </h1>
        <p>
          Eu sou Kyrion MT. Transformo ideias em histórias
          <br className="desktop-break" /> que você sente e experiências que
          você vive.
        </p>
        <a href="#universos" className="choose-prompt">
          ESCOLHA POR ONDE COMEÇAR
          <ArrowDown size={14} />
        </a>
        <div className="intro-side-note">
          <span>PORTFÓLIO INDEPENDENTE</span>
          <i />
          EST. 2021
        </div>
      </section>
      <section
        id="universos"
        className="universe-grid"
        aria-label="Escolha seu universo"
      >
        <UniverseCard type="video">
          <img
            src="/images/cinematic-drive.svg"
            alt="Arte cinematográfica de um carro esportivo em uma estrada ao pôr do sol"
            className="film-scene"
          />
          <div className="viewfinder top-left" />
          <div className="viewfinder top-right" />
        </UniverseCard>
        <UniverseCard type="roblox">
          <WorldScene />
        </UniverseCard>
      </section>
      <div className="landing-under-cards">
        <span>
          <span className="availability-dot" />
          ABERTO A IDEIAS FORA DA CAIXA
        </span>
        <span className="keyboard-hint">
          Também vale apertar <kbd>1</kbd> ou <kbd>2</kbd>
          <MousePointer2 size={12} />
        </span>
        <span>DOIS CAMINHOS. A MESMA OBSESSÃO POR CRIAR.</span>
      </div>
      <section className="creative-strip" aria-label="Especialidades">
        <div>
          <Aperture />
          <span>VISÃO CINEMATOGRÁFICA</span>
          <i aria-hidden="true">
            <Asterisk />
          </i>
          <Code2 />
          <span>EXPERIÊNCIAS INTERATIVAS</span>
          <i aria-hidden="true">
            <Asterisk />
          </i>
          <AudioLines />
          <span>CADA DETALHE IMPORTA</span>
          <i aria-hidden="true">
            <Asterisk />
          </i>
          <Box />
          <span>IMAGINAÇÃO SEM LIMITES</span>
        </div>
      </section>
      <section className="landing-about">
        <div className="about-side">
          <span className="eyebrow">ALÉM DE UMA ÚNICA DEFINIÇÃO</span>
          <div className="about-monogram" aria-hidden="true">
            K<ArrowUpRight strokeWidth={1.3} />
            <div className="monogram-orbit" />
          </div>
          <span className="about-location">
            CRIANDO DO BRASIL PARA QUALQUER LUGAR.
          </span>
        </div>
        <div className="about-copy">
          <h2>
            A ferramenta muda.
            <br />O olhar <span>continua único.</span>
          </h2>
          <p>
            Às vezes, a ideia precisa de um corte preciso. Outras, de um mundo
            inteiro. Eu gosto dos dois lados: da emoção de uma boa história à
            liberdade de criar algo que alguém pode explorar.
          </p>
          <p>
            Direção criativa, curiosidade e uma atenção quase obsessiva aos
            detalhes. É isso que conecta tudo o que faço.
          </p>
          <button
            className="text-button about-cta"
            onClick={() => openContact()}
          >
            E se a próxima ideia for a sua?
            <MoveUpRight size={20} />
          </button>
        </div>
      </section>
      <section className="landing-outro">
        <span className="eyebrow">TEM ALGO EM MENTE?</span>
        <button onClick={() => openContact()}>
          Vamos tirar
          <br />
          do <span>imaginário.</span>
          <ArrowUpRight />
        </button>
        <p>Um vídeo. Um mundo. Algo que ainda nem tem nome.</p>
      </section>
    </main>
  );
}
