import { useId, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Asterisk,
  Code2,
  Gamepad2,
  Layers3,
  Moon,
  Mountain,
  MousePointer2,
  Snowflake,
  Sun,
  TreePine,
} from "lucide-react";
import { useContact } from "../components/ContactProvider";
import ProjectModal from "../components/ProjectModal";
import "./roblox.css";

const biomes = {
  forest: {
    label: "Floresta",
    icon: TreePine,
    top: "#91bd59",
    edge: "#465e37",
    side: "#34462f",
    tree: "#376c45",
    treeLight: "#558953",
    sky: "#252e28",
    water: "#76bcbd",
    detail: "Vale dos exploradores",
    temperature: "24°",
  },
  desert: {
    label: "Deserto",
    icon: Mountain,
    top: "#ddba79",
    edge: "#a87c50",
    side: "#755b3d",
    tree: "#738d52",
    treeLight: "#93a86a",
    sky: "#392f29",
    water: "#81c7ba",
    detail: "Dunas do sol eterno",
    temperature: "36°",
  },
  ice: {
    label: "Neve",
    icon: Snowflake,
    top: "#d7e6ec",
    edge: "#91b4cc",
    side: "#57748b",
    tree: "#507d83",
    treeLight: "#a1c7cf",
    sky: "#252e3a",
    water: "#87c9e4",
    detail: "Refúgio boreal",
    temperature: "−8°",
  },
};

function VoxelBlock({ x, y, width = 48, height = 36, top, left, right }) {
  return (
    <g>
      <path
        d={`M${x} ${y}l${width} ${width / 2}l-${width} ${width / 2}l-${width}-${width / 2}Z`}
        fill={top}
      />
      <path
        d={`M${x - width} ${y + width / 2}l${width} ${width / 2}v${height}l-${width}-${width / 2}Z`}
        fill={left}
      />
      <path
        d={`M${x} ${y + width}l${width}-${width / 2}v${height}l-${width} ${width / 2}Z`}
        fill={right}
      />
    </g>
  );
}

function WorldArt({
  biome = "forest",
  night = false,
  variant = "world",
  decorative = false,
}) {
  const uniqueId = useId().replace(/:/g, "");
  const palette = biomes[biome];
  const tiles = [];
  for (let row = 0; row < 6; row += 1) {
    for (let column = 0; column < 6; column += 1) {
      if (
        (row === 0 && column === 0) ||
        (row === 5 && column === 5) ||
        (row === 0 && column === 5)
      )
        continue;
      const x = 450 + (column - row) * 49;
      const y = 114 + (column + row) * 24.5;
      const water = (row === 3 && column > 2) || (row === 4 && column === 4);
      tiles.push(
        <VoxelBlock
          key={`${row}-${column}`}
          x={x}
          y={y}
          width={49}
          height={water ? 34 : 43}
          top={
            water
              ? palette.water
              : (row + column) % 3 === 0
                ? `${palette.top}`
                : palette.top
          }
          left={palette.edge}
          right={palette.side}
        />,
      );
    }
  }
  const trees = [
    [352, 163, 0.8],
    [401, 139, 1],
    [548, 211, 0.9],
    [303, 236, 1.1],
    [352, 310, 0.8],
    [450, 335, 0.7],
    [597, 284, 0.85],
  ];
  return (
    <svg
      className="roblox-world-svg"
      viewBox="0 0 900 550"
      role={decorative ? undefined : "img"}
      aria-hidden={decorative || undefined}
      aria-label={
        decorative
          ? undefined
          : `Ilha flutuante em estilo voxel: ${palette.label.toLowerCase()}, ${night ? "à noite" : "durante o dia"}`
      }
    >
      <defs>
        <radialGradient id={`${uniqueId}-glow`}>
          <stop
            offset="0%"
            stopColor={night ? "#a6abff" : palette.top}
            stopOpacity=".2"
          />
          <stop offset="100%" stopColor={palette.sky} stopOpacity="0" />
        </radialGradient>
        <filter
          id={`${uniqueId}-shadow`}
          x="-50%"
          y="-50%"
          width="200%"
          height="200%"
        >
          <feGaussianBlur stdDeviation="17" />
        </filter>
      </defs>
      <ellipse
        cx="450"
        cy="270"
        rx="380"
        ry="260"
        fill={`url(#${uniqueId}-glow)`}
      />
      <g
        className="roblox-world-orbits"
        fill="none"
        stroke={night ? "#c6b6fb" : "#c8f36b"}
        strokeOpacity=".12"
      >
        <ellipse cx="450" cy="320" rx="358" ry="156" />
        <ellipse cx="450" cy="320" rx="316" ry="132" strokeDasharray="3 12" />
      </g>
      {night && (
        <g fill="#e4e7ff" className="roblox-world-stars">
          <circle cx="184" cy="120" r="2" />
          <circle cx="702" cy="97" r="2.5" />
          <circle cx="650" cy="174" r="1.5" />
          <circle cx="267" cy="75" r="1.5" />
          <circle cx="584" cy="65" r="2" />
          <path d="M700 192v12m-6-6h12M210 215v10m-5-5h10" stroke="#e4e7ff" />
        </g>
      )}
      <ellipse
        cx="450"
        cy="448"
        rx="220"
        ry="35"
        fill="#000"
        opacity=".3"
        filter={`url(#${uniqueId}-shadow)`}
      />
      <g className="roblox-floating-island">
        <path
          d="M205 310l245 126 245-126-103 137-140 54-142-60Z"
          fill={palette.side}
        />
        <path
          d="M205 310l245 126 2 65-142-60Z"
          fill={palette.edge}
          opacity=".65"
        />
        <path
          d="M450 436l245-126-103 137-140 54Z"
          fill="#171c1d"
          opacity=".35"
        />
        {tiles}
        <path
          d="M397 285l51 25 48-24 49 24"
          fill="none"
          stroke={biome === "ice" ? "#acc7d5" : "#e5d2a1"}
          strokeWidth="21"
        />
        {trees.map(([x, y, scale], i) => (
          <g key={i} transform={`translate(${x},${y}) scale(${scale})`}>
            <path d="M-3 5h7v30h-7Z" fill="#6d5743" />
            {biome === "desert" ? (
              <>
                <path d="M-7 21v-64q0-12 14-12v76Z" fill={palette.tree} />
                <path
                  d="M-5-5h-17v-24h8v16h9M5-20h15v-20h-7v12H5"
                  fill={palette.treeLight}
                />
              </>
            ) : (
              <>
                <path d="M0-69L-31-11 0 4 31-11Z" fill={palette.tree} />
                <path d="M0-69V4L31-11Z" fill={palette.treeLight} />
                <path d="M0-44L-38 16 0 34 38 16Z" fill={palette.tree} />
                <path d="M0-44v78L38 16Z" fill={palette.treeLight} />
              </>
            )}
          </g>
        ))}
        <g transform="translate(450 217)">
          <VoxelBlock
            x={0}
            y={0}
            width={48}
            height={63}
            top="#bdbbb0"
            left="#8e9184"
            right="#d5d6bd"
          />
          <path
            d="M-57 23L0-45l57 68L0 51Z"
            fill={variant === "city" ? "#8b8bba" : "#c1d6a0"}
          />
          <path
            d="M0-45v96l57-28Z"
            fill={variant === "city" ? "#aeb2ed" : "#819c65"}
          />
          <path d="M10 61l14-7v28l-14 7Z" fill="#314839" />
          <path
            d="M30 51l11-5v14l-11 6Z"
            fill={night ? "#ffe69a" : "#7bb4a4"}
          />
          <path
            d="M-34 52l13 6v15l-13-6Z"
            fill={night ? "#ffe69a" : "#7bb4a4"}
          />
          <path d="M-10-28v-31l15-7v30Z" fill="#929c82" />
          <path d="M5-66l12 7v31L5-35Z" fill="#68755c" />
        </g>
        <g transform="translate(499 346)">
          <ellipse cx="0" cy="16" rx="13" ry="5" fill="#000" opacity=".2" />
          <path d="M-7-9h14v16H-7Z" fill="#e2c39e" />
          <path d="M-9 7H9v16H-9Z" fill="#b5c0f8" />
          <path d="M-7 23h5v9h-5m9-9h5v9H2" stroke="#3d465a" strokeWidth="3" />
        </g>
        <path d="M600 336l16 8-16 8-16-8Z" fill="#c8f36b" />
        <path d="M600 327v17" stroke="#e8ffbd" strokeWidth="3" />
      </g>
      <g
        className="roblox-world-clouds"
        fill={night ? "#6d7182" : "#d6e0d5"}
        opacity=".3"
      >
        <path d="M196 127l28-14 38 19-28 14Z" />
        <path d="M657 228l35-18 51 26-35 18Z" />
        <path d="M571 90l25-13 38 19-25 13Z" />
      </g>
    </svg>
  );
}

const projects = [
  {
    id: "wildlands",
    title: "Wildlands",
    category: "Experiências",
    eyebrow: "EXPLORAÇÃO · MUNDO ABERTO",
    description:
      "Um mundo persistente onde cada descoberta abre uma nova história. Exploração, crafting e aventuras cooperativas em uma ilha viva.",
    image: null,
    biome: "forest",
    tags: ["Luau", "Worldbuilding", "DataStore", "UI/UX"],
    stats: [
      { value: "2,4M", label: "visitas projetadas" },
      { value: "18 min", label: "sessão de referência" },
      { value: "60 FPS", label: "meta de desempenho" },
    ],
    details: [
      {
        title: "Um mundo que convida a explorar",
        text: "Conceito de experiência com biomas conectados, progressão por descoberta e eventos que mudam a paisagem. O jogador encontra novos motivos para voltar sem depender de tarefas repetitivas.",
      },
      {
        title: "Sistemas por trás da aventura",
        text: "Arquitetura proposta com inventário persistente, crafting modular, missões cooperativas e validação de ações no servidor. Streaming e níveis de detalhe orientam a construção do mapa.",
      },
      {
        title: "Direção e escopo",
        text: "Projeto conceitual de portfólio. As métricas são referências demonstrativas para apresentar a ambição do projeto; não representam resultados de um jogo publicado.",
      },
    ],
    accent: "#c8f36b",
  },
  {
    id: "neon",
    title: "Neon District",
    category: "Experiências",
    eyebrow: "ROLEPLAY · CIDADE SOCIAL",
    description:
      "Uma cidade que ganha vida com seus jogadores. Profissões, veículos e pequenas histórias se conectam em uma experiência social.",
    image: null,
    biome: "ice",
    night: true,
    tags: ["Luau", "Networking", "Game Design", "Veículos"],
    stats: [
      { value: "120", label: "jogadores por servidor, meta" },
      { value: "12", label: "profissões no conceito" },
      { value: "8", label: "distritos planejados" },
    ],
    details: [
      {
        title: "Um lugar para criar histórias",
        text: "Cidade social com distritos distintos, trabalhos cooperativos e eventos dinâmicos. A direção visual une arquitetura compacta, sinalização luminosa e percursos que favorecem encontros.",
      },
      {
        title: "Construído para escalar",
        text: "Proposta de sistemas de veículos, economia validada no servidor e interações sincronizadas. Módulos independentes permitem adicionar profissões e atividades sem reconstruir a experiência.",
      },
      {
        title: "Sobre este case",
        text: "Conceito fictício criado para demonstrar direção criativa e planejamento técnico. Números apresentados são metas de projeto, e não conquistas verificadas.",
      },
    ],
    accent: "#c8f36b",
  },
  {
    id: "core",
    title: "Core Framework",
    category: "Sistemas",
    eyebrow: "ARQUITETURA · FERRAMENTAS",
    description:
      "A base invisível de experiências memoráveis. Sistemas modulares para transformar boas ideias em jogos consistentes.",
    image: null,
    biome: "desert",
    tags: ["Luau", "Arquitetura", "Servidor", "Ferramentas"],
    stats: [
      { value: "16", label: "módulos planejados" },
      { value: "3", label: "camadas de arquitetura" },
      { value: "100%", label: "ações sensíveis no servidor" },
    ],
    details: [
      {
        title: "Menos repetição. Mais criação.",
        text: "Framework conceitual que reúne gerenciamento de dados, inventário, loja, missões e eventos. A proposta é permitir que novas experiências compartilhem uma base clara e extensível.",
      },
      {
        title: "Confiança começa no servidor",
        text: "Separação de responsabilidades entre cliente e servidor, validação de RemoteEvents e limites de frequência fazem parte da arquitetura proposta. Interfaces tipadas em Luau tornam a intenção de cada módulo explícita.",
      },
      {
        title: "Sobre este case",
        text: "Demonstração de arquitetura para o portfólio. Não é uma biblioteca publicada, e os números descrevem o escopo planejado do conceito.",
      },
    ],
    accent: "#c8f36b",
  },
];

export default function RobloxPortfolio() {
  const { openContact } = useContact();
  const [biome, setBiome] = useState("forest");
  const [night, setNight] = useState(false);
  const [filter, setFilter] = useState("Todos");
  const [project, setProject] = useState(null);
  const palette = biomes[biome];

  return (
    <main className="roblox-page">
      <section className="roblox-hero" aria-labelledby="roblox-title">
        <div className="roblox-hero-copy">
          <div className="roblox-eyebrow">
            <span /> DESENVOLVEDOR ROBLOX{" "}
            <span className="roblox-eyebrow-number">/ 02</span>
          </div>
          <h1 id="roblox-title">
            Não é só jogar.
            <br />É querer <span>ficar.</span>
            <svg viewBox="0 0 180 15" aria-hidden="true">
              <path d="M3 10Q86-4 175 8" />
            </svg>
          </h1>
          <p>
            Transformo linhas de código em mundos com vida. Experiências Roblox
            que conectam pessoas, despertam curiosidade e deixam vontade de
            voltar.
          </p>
          <div className="roblox-hero-actions">
            <a className="roblox-primary-button" href="#roblox-projetos">
              Explorar meus mundos <ArrowDown size={17} />
            </a>
            <button
              className="roblox-text-button"
              onClick={() => openContact("Roblox")}
            >
              Vamos criar juntos <ArrowUpRight size={17} />
            </button>
          </div>
          <div className="roblox-hero-signature">
            <span className="roblox-signature-symbol">
              K<ArrowUpRight size={12} />
            </span>
            <div>
              <strong>Kyrion MT</strong>
              <span>Desenvolvedor. Criador. Jogador.</span>
            </div>
          </div>
        </div>
        <div
          className={`roblox-playground ${night ? "roblox-playground-night" : ""}`}
          style={{ "--world-color": palette.sky }}
        >
          <div className="roblox-playground-top">
            <span>
              <span className="roblox-live-dot" /> WORLD PREVIEW
            </span>
            <span>BUILD 01.024</span>
          </div>
          <WorldArt biome={biome} night={night} />
          <div className="roblox-coordinate">
            X: 024 <span>Y: 128</span> Z: 076
          </div>
          <div className="roblox-world-label">
            <span>VOCÊ ESTÁ EM</span>
            <strong aria-live="polite">{palette.detail}</strong>
            <span className="roblox-world-temp">
              {palette.temperature} / {night ? "23:48" : "09:41"}
            </span>
          </div>
          <div className="roblox-world-controls">
            <div className="roblox-biome-options" aria-label="Escolher bioma">
              {Object.entries(biomes).map(([key, value]) => {
                const Icon = value.icon;
                return (
                  <button
                    key={key}
                    aria-pressed={biome === key}
                    onClick={() => setBiome(key)}
                  >
                    <Icon size={15} />
                    <span>{value.label}</span>
                  </button>
                );
              })}
            </div>
            <button
              className="roblox-time-toggle"
              aria-label={night ? "Mudar para o dia" : "Mudar para a noite"}
              aria-pressed={night}
              onClick={() => setNight(!night)}
            >
              {night ? <Moon size={17} /> : <Sun size={17} />}
            </button>
          </div>
          <div className="roblox-playground-hint">
            <MousePointer2 size={12} /> Um pequeno mundo. Experimente mudar o
            cenário.
          </div>
        </div>
      </section>

      <div className="roblox-capability-band" aria-label="Especialidades">
        <span>
          <Code2 size={18} /> LUAU & SCRIPTS
        </span>
        <span className="roblox-band-star" aria-hidden="true">
          <Asterisk size={17} />
        </span>
        <span>
          <Layers3 size={18} /> MUNDOS IMERSIVOS
        </span>
        <span className="roblox-band-star" aria-hidden="true">
          <Asterisk size={17} />
        </span>
        <span>
          <Gamepad2 size={18} /> GAME DESIGN
        </span>
        <span className="roblox-band-star" aria-hidden="true">
          <Asterisk size={17} />
        </span>
        <span>FEITO PARA CONECTAR</span>
      </div>

      <section
        className="roblox-projects roblox-section"
        id="roblox-projetos"
        aria-labelledby="roblox-projects-title"
      >
        <div className="roblox-section-top">
          <div>
            <div className="roblox-eyebrow">01 / UNIVERSOS EM CONSTRUÇÃO</div>
            <h2 id="roblox-projects-title">
              Ideias grandes.
              <br />
              <span>Mundos maiores.</span>
            </h2>
          </div>
          <p>
            Cada projeto tem seu próprio universo.
            <br />E um motivo para apertar o play.
          </p>
        </div>
        <div className="roblox-project-filter" aria-label="Filtrar projetos">
          {["Todos", "Experiências", "Sistemas"].map((item) => (
            <button
              key={item}
              aria-pressed={filter === item}
              onClick={() => setFilter(item)}
            >
              {item}
              <span>
                {item === "Todos"
                  ? "03"
                  : item === "Experiências"
                    ? "02"
                    : "01"}
              </span>
            </button>
          ))}
        </div>
        <div className="roblox-project-grid">
          {projects
            .filter((item) => filter === "Todos" || item.category === filter)
            .map((item, index) => (
              <button
                className={`roblox-project-card roblox-project-${item.id}`}
                key={item.id}
                onClick={() => setProject(item)}
                aria-label={`Ver case ${item.title}`}
              >
                <div className="roblox-project-visual">
                  <span className="roblox-project-tag">{item.category}</span>
                  <span className="roblox-project-number">
                    0{projects.indexOf(item) + 1}
                  </span>
                  {item.id === "core" ? (
                    <div className="roblox-code-art" aria-hidden="true">
                      <div className="roblox-code-top">
                        <i />
                        <i />
                        <i />
                        <span>Core.server.luau</span>
                      </div>
                      <div className="roblox-code-lines">
                        <span>
                          <em>local</em> Core = {"{}"}
                        </span>
                        <span>&nbsp;</span>
                        <span>
                          <em>function</em> Core:<b>init</b>()
                        </span>
                        <span>
                          &nbsp; self:<b>loadWorld</b>()
                        </span>
                        <span>
                          &nbsp; self:<b>connectPlayers</b>()
                        </span>
                        <span>
                          &nbsp; <em>return</em> <b>possibilities</b>
                        </span>
                        <span>
                          <em>end</em>
                        </span>
                        <span>&nbsp;</span>
                        <span className="roblox-code-comment">
                          -- Grandes mundos começam aqui.
                        </span>
                      </div>
                      <div className="roblox-code-status">
                        <span /> All systems ready <Code2 size={15} />
                      </div>
                    </div>
                  ) : (
                    <WorldArt
                      biome={item.biome}
                      night={item.night}
                      variant={item.id === "neon" ? "city" : "world"}
                      decorative
                    />
                  )}
                  <span className="roblox-project-open">
                    <ArrowUpRight size={22} />
                  </span>
                </div>
                <div className="roblox-project-info">
                  <span>{item.eyebrow}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <div className="roblox-project-tags">
                    {item.tags.slice(0, 3).map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              </button>
            ))}
        </div>
        <p className="roblox-demo-note">
          Projetos conceituais para apresentação. Escopos e métricas
          ilustrativos.
        </p>
      </section>

      <section
        className="roblox-toolkit roblox-section"
        aria-labelledby="roblox-toolkit-title"
      >
        <div className="roblox-toolkit-intro">
          <div className="roblox-eyebrow">02 / POR TRÁS DO MUNDO</div>
          <h2 id="roblox-toolkit-title">
            Criatividade no olhar.
            <br />
            <span>Lógica nas mãos.</span>
          </h2>
          <p>
            O detalhe que o jogador sente e a estrutura que ele nunca precisa
            ver. Cuido dos dois.
          </p>
          <button
            className="roblox-text-button"
            onClick={() => openContact("Roblox")}
          >
            Tem um desafio em mente? <ArrowUpRight size={18} />
          </button>
        </div>
        <div className="roblox-skill-grid">
          <article>
            <Code2 />
            <span>01</span>
            <h3>Scripts com propósito</h3>
            <p>
              Sistemas modulares em Luau, persistência de dados e comunicação
              entre cliente e servidor.
            </p>
            <div>
              Luau <i /> DataStore <i /> Networking
            </div>
          </article>
          <article>
            <Layers3 />
            <span>02</span>
            <h3>Universos com identidade</h3>
            <p>
              Mapas que contam histórias, direção de arte e ambientes pensados
              para explorar.
            </p>
            <div>
              Roblox Studio <i /> Level Design
            </div>
          </article>
          <article>
            <Gamepad2 />
            <span>03</span>
            <h3>Diversão por design</h3>
            <p>
              Progressão que faz sentido, loops envolventes e interfaces que
              deixam o jogo fluir.
            </p>
            <div>
              Game Loops <i /> UI/UX <i /> Economia
            </div>
          </article>
          <article>
            <MousePointer2 />
            <span>04</span>
            <h3>Detalhes que importam</h3>
            <p>
              Interações responsivas, atenção ao desempenho e experiências para
              diferentes dispositivos.
            </p>
            <div>
              Mobile <i /> Otimização <i /> Polish
            </div>
          </article>
        </div>
      </section>

      <section
        className="roblox-process roblox-section"
        aria-labelledby="roblox-process-title"
      >
        <div className="roblox-eyebrow">03 / DO PRIMEIRO BLOCO AO PLAY</div>
        <div className="roblox-section-top">
          <h2 id="roblox-process-title">
            Uma ideia. <span>Infinitos caminhos.</span>
          </h2>
        </div>
        <div className="roblox-process-grid">
          {[
            {
              number: "01",
              title: "Imaginar",
              text: "Entender a visão, encontrar o diferencial e definir o que vai fazer alguém voltar.",
            },
            {
              number: "02",
              title: "Construir",
              text: "Prototipar a diversão primeiro. Depois, dar forma ao mundo e aos seus sistemas.",
            },
            {
              number: "03",
              title: "Refinar",
              text: "Jogar, ouvir, ajustar. Lapidar cada interação até tudo fazer sentido.",
            },
            {
              number: "04",
              title: "Evoluir",
              text: "Preparar a experiência para crescer com novos conteúdos e com sua comunidade.",
            },
          ].map((step) => (
            <article key={step.number}>
              <div>
                <span>{step.number}</span>
                <ArrowRight size={18} />
              </div>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="roblox-cta roblox-section">
        <div className="roblox-cta-orb" aria-hidden="true">
          <Asterisk width="1em" height="1em" strokeWidth={1} />
        </div>
        <div className="roblox-eyebrow">
          <span /> PRÓXIMO MUNDO: O SEU
        </div>
        <h2>
          Vamos construir algo
          <br />
          que ainda <span>não existe?</span>
        </h2>
        <p>Sua ideia pode ser o próximo lugar favorito de alguém.</p>
        <button
          className="roblox-primary-button"
          onClick={() => openContact("Roblox")}
        >
          Começar uma conversa <ArrowUpRight size={19} />
        </button>
        <Link className="roblox-other-world" to="/video">
          Conheça também meu lado editor <ArrowRight size={15} />
        </Link>
      </section>
      <ProjectModal project={project} onClose={() => setProject(null)} />
    </main>
  );
}
