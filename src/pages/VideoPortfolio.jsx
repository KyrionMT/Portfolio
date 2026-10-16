import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowDown,
  ArrowLeft,
  ArrowUpRight,
  Asterisk,
  AudioLines,
  Check,
  ChevronDown,
  Clapperboard,
  Film,
  MoveHorizontal,
  Sparkles,
} from "lucide-react";
import { useContact } from "../components/ContactProvider";
import ProjectModal from "../components/ProjectModal";
import "./video.css";

const images = {
  car: "/images/cinematic-drive.svg",
  mountain: "/images/cinematic-nature.svg",
  music: "/images/cinematic-orbit.svg",
  city: "/images/cinematic-city.svg",
};

const projects = [
  {
    title: "NIGHTSHIFT",
    category: "FILME DE MARCA",
    collection: "Filmes",
    year: "2025",
    image: images.car,
    description:
      "A cidade desacelera. A história, não. Um filme de marca sobre a liberdade de encontrar o próprio caminho depois que as luzes se apagam.",
    stats: [
      { value: "2,4M", label: "visualizações na campanha" },
      { value: "+38%", label: "retenção vs. formato anterior" },
      { value: "06", label: "versões para diferentes telas" },
    ],
    tags: ["Direção de montagem", "Color grading", "Sound design"],
    accent: "#beabff",
    details: [
      {
        title: "O desafio",
        text: "Transformar cenas automotivas em uma narrativa com identidade. O objetivo era fazer o espectador sentir o movimento antes de conhecer o produto.",
      },
      {
        title: "A construção",
        text: "Uma montagem de 45 segundos guiada pela textura do motor, transições por movimento e uma paleta de sombras frias com luzes âmbar. O filme principal ganhou versões de 6, 15 e 30 segundos, além de recortes verticais.",
      },
      {
        title: "O resultado proposto",
        text: "Uma campanha consistente do primeiro impacto à última assinatura, com resultados ilustrativos de 2,4 milhões de visualizações e crescimento de 38% na retenção. Projeto conceitual de portfólio.",
      },
    ],
  },
  {
    title: "ALÉM DO HORIZONTE",
    category: "CURTA DOCUMENTAL",
    collection: "Filmes",
    year: "2025",
    image: images.mountain,
    description:
      "Uma jornada sobre o que encontramos quando nos permitimos ir mais longe. Paisagens imensas, histórias íntimas e espaço para respirar.",
    stats: [
      { value: "08 min", label: "de narrativa documental" },
      { value: "14h", label: "de material organizado" },
      { value: "92%", label: "de aprovação em exibição piloto" },
    ],
    tags: ["Montagem documental", "Tratamento de áudio", "DaVinci Resolve"],
    accent: "#beabff",
    details: [
      {
        title: "O desafio",
        text: "Encontrar uma história humana em 14 horas de imagens de expedição, entrevistas e registros espontâneos, respeitando o silêncio e o tempo de cada personagem.",
      },
      {
        title: "A construção",
        text: "A narrativa foi organizada em três atos. Entrevistas costuram a viagem sem interromper a contemplação; ambiências reais e uma trilha discreta conectam paisagem e emoção.",
      },
      {
        title: "O resultado proposto",
        text: "Curta de oito minutos com legendas acessíveis, mixagem para web e versão de festival. A aprovação de 92% representa uma meta demonstrativa de uma exibição piloto neste projeto conceitual.",
      },
    ],
  },
  {
    title: "FREQUÊNCIA 03",
    category: "VISUAL MUSICAL",
    collection: "Música",
    year: "2024",
    image: images.music,
    description:
      "Quando o som vira imagem. Um experimento visual que acompanha cada virada, pausa e explosão de uma faixa eletrônica.",
    stats: [
      { value: "03:42", label: "de experiência audiovisual" },
      { value: "120", label: "batidas por minuto" },
      { value: "12", label: "loops visuais originais" },
    ],
    tags: ["Motion design", "Montagem musical", "After Effects"],
    accent: "#beabff",
    details: [
      {
        title: "O desafio",
        text: "Criar um universo visual completo para o lançamento de um artista independente, com uma linguagem que funcionasse no videoclipe e nas telas de um show.",
      },
      {
        title: "A construção",
        text: "Camadas de luz, tipografia cinética e efeitos analógicos respondem às frequências da música. Os cortes acompanham a estrutura da faixa sem depender exclusivamente da batida.",
      },
      {
        title: "O resultado proposto",
        text: "Um visual musical de 3min42s, doze loops de palco e três teasers verticais. Projeto autoral conceitual com direção visual e pós-produção completas.",
      },
    ],
  },
  {
    title: "UM MINUTO NO FUTURO",
    category: "SÉRIE DIGITAL",
    collection: "Conteúdo digital",
    year: "2024",
    image: images.city,
    description:
      "Grandes ideias cabem em um minuto. Uma série que transforma assuntos complexos em histórias que dão vontade de continuar assistindo.",
    stats: [
      { value: "24", label: "episódios em série" },
      { value: "76%", label: "retenção média projetada" },
      { value: "03", label: "formatos de entrega" },
    ],
    tags: ["Conteúdo vertical", "Legendas animadas", "Storytelling"],
    accent: "#beabff",
    details: [
      {
        title: "O desafio",
        text: "Traduzir temas de tecnologia e criatividade para um público curioso, sem simplificar demais a ideia nem perder o ritmo da plataforma.",
      },
      {
        title: "A construção",
        text: "Cada episódio começa com uma pergunta, desenvolve uma única ideia e termina com uma descoberta. Animações explicativas, pesquisa de referências e um sistema modular de edição mantêm a série consistente.",
      },
      {
        title: "O resultado proposto",
        text: "Uma temporada conceitual de 24 episódios, com masters 16:9, 9:16 e 1:1. A retenção de 76% é uma projeção demonstrativa para apresentar a estratégia editorial.",
      },
    ],
  },
];

const process = [
  {
    title: "Primeiro, a intenção.",
    label: "01 / DESCOBRIR",
    text: "Antes da timeline, vem a conversa. Entendo a ideia, o público e a sensação que o vídeo precisa deixar. Referências e um mapa de narrativa dão direção ao projeto.",
  },
  {
    title: "Depois, o ritmo.",
    label: "02 / CONSTRUIR",
    text: "Organizo o material e encontro a história. Cada corte, pausa e movimento existe por um motivo. Você acompanha a primeira montagem e participa das decisões que importam.",
  },
  {
    title: "Por último, o arrepio.",
    label: "03 / REFINAR",
    text: "Cor, som e movimento se encontram. Finalizo a identidade visual, equilibro o áudio e preparo cada formato de entrega, com legendas e atenção aos detalhes.",
  },
];

export default function VideoPortfolio() {
  const { openContact } = useContact();
  const [filter, setFilter] = useState("Todos");
  const [selectedProject, setSelectedProject] = useState(null);
  const [colorPosition, setColorPosition] = useState(50);
  const [activeProcess, setActiveProcess] = useState(0);
  const visibleProjects =
    filter === "Todos"
      ? projects
      : projects.filter((project) => project.collection === filter);

  return (
    <main className="video-page">
      <section
        className="video-hero video-container"
        aria-labelledby="video-title"
      >
        <div className="video-topline">
          <Link to="/" className="video-back">
            <ArrowLeft size={15} /> Os dois lados de Kyrion
          </Link>
          <span className="video-availability">
            <span /> Aberto a novos projetos
          </span>
        </div>
        <div className="video-hero-copy">
          <div>
            <p className="video-eyebrow">
              <Clapperboard size={15} /> EDIÇÃO DE VÍDEO & DIREÇÃO CRIATIVA
            </p>
            <h1 id="video-title">
              Histórias que
              <br />
              <span>ficam.</span>
              <span className="video-title-star" aria-hidden="true">
                <Asterisk width="1em" height="1em" strokeWidth={1.2} />
              </span>
            </h1>
          </div>
          <div className="video-hero-intro">
            <p>
              Um bom vídeo chama atenção.
              <br />
              Uma boa história faz sentir.
            </p>
            <p>
              Sou Kyrion MT. Transformo imagens, sons e ideias em experiências
              que continuam com você depois do último frame.
            </p>
            <a href="#video-projetos" className="video-text-link">
              Conheça meu trabalho <ArrowDown size={16} />
            </a>
          </div>
        </div>
        <button
          type="button"
          className="video-feature"
          onClick={() => setSelectedProject(projects[0])}
          aria-label="Explorar o projeto Nightshift"
        >
          <img
            src={images.car}
            alt="Automóvel esportivo em uma paisagem aberta, cena do conceito Nightshift"
            fetchPriority="high"
          />
          <div className="video-feature-shade" />
          <span className="video-feature-top">
            <span>
              <i /> SELEÇÃO DO DIRETOR
            </span>
            <span>01 — 04</span>
          </span>
          <span className="video-feature-center">
            <span>NIGHTSHIFT</span>
            <span>O movimento começa no corte.</span>
          </span>
          <span className="video-feature-bottom">
            <span>FILME DE MARCA / 2025</span>
            <span className="video-feature-action">
              Explorar projeto <ArrowUpRight size={22} />
            </span>
          </span>
          <span className="video-film-corner video-film-corner--tl" />
          <span className="video-film-corner video-film-corner--br" />
        </button>
        <div className="video-hero-footnote">
          <span>CRIADO PARA SER SENTIDO.</span>
          <span>
            EST. 2021 <span className="video-dot">·</span> BASEADO NO BRASIL{" "}
            <span className="video-dot">·</span> CRIANDO PARA O MUNDO
          </span>
        </div>
      </section>

      <section
        className="video-manifesto video-container"
        aria-labelledby="video-manifesto-title"
      >
        <p className="video-eyebrow">O QUE EU COLOCO NA TIMELINE</p>
        <div className="video-manifesto-main">
          <h2 id="video-manifesto-title">
            Não é só sobre cortes.
            <br />É sobre <span>conexão.</span>
          </h2>
          <p>
            Entre um frame e outro existe a oportunidade de fazer alguém parar,
            pensar ou sentir. Meu trabalho é encontrar esse instante — e fazer
            ele acontecer.
          </p>
        </div>
        <div className="video-numbers">
          <div>
            <strong>
              40<span>+</span>
            </strong>
            <span>histórias na timeline</span>
          </div>
          <div>
            <strong>
              08<span>M</span>
            </strong>
            <span>visualizações em projetos</span>
          </div>
          <div>
            <strong>04</strong>
            <span>anos explorando narrativas</span>
          </div>
          <div>
            <AudioLines strokeWidth={1} size={52} aria-hidden="true" />
            <span>cada detalhe importa</span>
          </div>
        </div>
      </section>

      <section
        id="video-projetos"
        className="video-projects video-container"
        aria-labelledby="video-projects-title"
      >
        <div className="video-section-heading">
          <div>
            <p className="video-eyebrow">TRABALHOS SELECIONADOS / 2024—2025</p>
            <h2 id="video-projects-title">
              Cada projeto,
              <br />
              <span>um universo.</span>
            </h2>
          </div>
          <span className="video-section-aside">
            IMAGEM. SOM. INTENÇÃO.
            <br />
            DO PRIMEIRO FRAME AO ÚLTIMO.
          </span>
        </div>
        <div
          className="video-filters"
          aria-label="Filtrar projetos por categoria"
        >
          {["Todos", "Filmes", "Música", "Conteúdo digital"].map((category) => (
            <button
              key={category}
              type="button"
              className={filter === category ? "is-active" : ""}
              aria-pressed={filter === category}
              onClick={() => setFilter(category)}
            >
              {category}
              {category === "Todos" && <span>04</span>}
            </button>
          ))}
        </div>
        <p className="video-sr-only" role="status">
          {visibleProjects.length}{" "}
          {visibleProjects.length === 1
            ? "projeto exibido"
            : "projetos exibidos"}
        </p>
        <div className="video-project-grid">
          {visibleProjects.map((project) => (
            <button
              type="button"
              className="video-project"
              key={project.title}
              onClick={() => setSelectedProject(project)}
              aria-label={`Explorar projeto ${project.title}`}
            >
              <span className="video-project-image">
                <img
                  src={project.image}
                  alt={
                    project.title === "ALÉM DO HORIZONTE"
                      ? "Ilustração de montanhas junto a um lago"
                      : project.title === "FREQUÊNCIA 03"
                        ? "Composição espacial com planeta e luzes, conceito do visual musical"
                        : project.title === "UM MINUTO NO FUTURO"
                          ? "Cidade futurista iluminada ao anoitecer"
                          : "Ilustração de um automóvel esportivo em uma estrada"
                  }
                  loading="lazy"
                />
                <span className="video-project-number">
                  0{projects.indexOf(project) + 1}
                </span>
                <span className="video-project-open">
                  <ArrowUpRight size={28} />
                </span>
                <span className="video-project-image-label">
                  EXPLORAR PROJETO
                </span>
              </span>
              <span className="video-project-meta">
                <span>{project.category}</span>
                <span>{project.year}</span>
              </span>
              <span className="video-project-name">
                {project.title}
                <ArrowUpRight size={23} />
              </span>
              <span className="video-project-tags">
                {project.tags.slice(0, 2).join(" / ")}
              </span>
            </button>
          ))}
        </div>
      </section>

      <section className="video-craft" aria-labelledby="video-craft-title">
        <div className="video-container">
          <div className="video-section-heading">
            <div>
              <p className="video-eyebrow">
                <Sparkles size={14} /> O DETALHE MUDA TUDO
              </p>
              <h2 id="video-craft-title">
                A mesma cena.
                <br />
                <span>Outra sensação.</span>
              </h2>
            </div>
            <p className="video-craft-description">
              Cor é linguagem. Arraste e descubra como uma imagem encontra a sua
              atmosfera.
            </p>
          </div>
          <div
            className="video-color-compare"
            style={{ "--compare-position": `${colorPosition}%` }}
          >
            <img
              className="video-color-after"
              src={images.mountain}
              alt="Ilustração de montanhas com tratamento de cor cinematográfico em tons frios e contrastantes"
              loading="lazy"
            />
            <div
              className="video-color-before"
              style={{ clipPath: `inset(0 ${100 - colorPosition}% 0 0)` }}
            >
              <img src={images.mountain} alt="" loading="lazy" />
            </div>
            <span className="video-color-label video-color-label--before">
              ORIGINAL
            </span>
            <span className="video-color-label video-color-label--after">
              KYRION COLOR
            </span>
            <div className="video-color-divider">
              <span>
                <MoveHorizontal size={22} />
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={colorPosition}
              onChange={(event) => setColorPosition(Number(event.target.value))}
              aria-label="Comparar imagem original com tratamento de cor"
              aria-valuetext={`${colorPosition}% da imagem original visível`}
            />
          </div>
          <div className="video-color-caption">
            <span>
              <MoveHorizontal size={15} /> ARRASTE PARA EXPLORAR
            </span>
            <span>COLOR GRADING / ESTUDO DE ATMOSFERA</span>
          </div>
        </div>
      </section>

      <section
        className="video-process video-container"
        aria-labelledby="video-process-title"
      >
        <div className="video-process-intro">
          <p className="video-eyebrow">DA IDEIA AO ÚLTIMO FRAME</p>
          <h2 id="video-process-title">
            Criatividade
            <br />
            com <span>direção.</span>
          </h2>
          <p>
            Um processo claro dá liberdade para criar. Você sabe onde estamos, o
            que vem a seguir e por que cada decisão faz sentido.
          </p>
          <div className="video-tools">
            <span>Premiere Pro</span>
            <span>After Effects</span>
            <span>DaVinci Resolve</span>
            <span>Audition</span>
          </div>
        </div>
        <div className="video-process-list">
          {process.map((item, index) => (
            <div
              key={item.label}
              className={`video-process-item ${activeProcess === index ? "is-open" : ""}`}
            >
              <button
                type="button"
                aria-expanded={activeProcess === index}
                aria-controls={`video-process-panel-${index}`}
                onClick={() =>
                  setActiveProcess(activeProcess === index ? -1 : index)
                }
              >
                <span>
                  <small>{item.label}</small>
                  <strong>{item.title}</strong>
                </span>
                <ChevronDown size={23} />
              </button>
              <div
                id={`video-process-panel-${index}`}
                hidden={activeProcess !== index}
              >
                <p>{item.text}</p>
                <span className="video-process-detail">
                  <Check size={13} /> COLABORAÇÃO EM CADA ETAPA
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section
        className="video-journey video-container"
        aria-labelledby="video-journey-title"
      >
        <div className="video-section-heading">
          <div>
            <p className="video-eyebrow">A HISTÓRIA ATÉ AQUI</p>
            <h2 id="video-journey-title">
              Sempre em
              <br />
              <span>movimento.</span>
            </h2>
          </div>
          <Film size={62} strokeWidth={0.8} aria-hidden="true" />
        </div>
        <div className="video-timeline">
          <div className="video-timeline-row">
            <span>2025 — AGORA</span>
            <h3>
              Histórias maiores.
              <br />
              Olhar mais apurado.
            </h3>
            <p>
              Direção de pós-produção para campanhas e filmes de marca. Criação
              de identidades audiovisuais completas, da montagem ao último
              ajuste de cor.
            </p>
          </div>
          <div className="video-timeline-row">
            <span>2023 — 2024</span>
            <h3>
              Do conteúdo
              <br />à conexão.
            </h3>
            <p>
              Expansão para documentários, visuais musicais e séries digitais.
              Desenvolvimento de um fluxo de produção com narrativa,
              acessibilidade e consistência visual.
            </p>
          </div>
          <div className="video-timeline-row">
            <span>2021 — 2022</span>
            <h3>
              O primeiro corte.
              <br />A mesma curiosidade.
            </h3>
            <p>
              Experimentos com conteúdo de games, motion design e montagem. O
              início de uma obsessão por entender por que algumas imagens ficam
              na memória.
            </p>
          </div>
        </div>
      </section>

      <section
        className="video-cta video-container"
        aria-labelledby="video-cta-title"
      >
        <p className="video-eyebrow">
          <span className="video-status-dot" /> SUA PRÓXIMA HISTÓRIA COMEÇA AQUI
        </p>
        <div>
          <h2 id="video-cta-title">
            Vamos dar <span>play</span>
            <br />
            na sua ideia?
          </h2>
          <button
            type="button"
            onClick={() => openContact("Vídeo")}
            className="video-cta-button"
          >
            <ArrowUpRight size={38} strokeWidth={1.4} />
            <span>Vamos conversar</span>
          </button>
        </div>
        <p>
          Uma ideia no papel. Uma pasta de takes.
          <br />
          Um “e se?”. É tudo o que precisamos para começar.
        </p>
      </section>
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </main>
  );
}
