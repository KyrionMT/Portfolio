# Kyrion MT — Um criativo. Dois universos.

Portfólio em português com uma entrada e duas experiências independentes:

- `/`: apresentação e escolha entre os universos.
- `/video`: projetos de edição, comparação de cor, processo e trajetória.
- `/roblox`: mundos interativos, cases de desenvolvimento e habilidades.

## Desenvolvimento

Requer Node.js 22.12+ ou 24 e npm. Ambiente validado com Node.js 24.19.0.

```sh
npm ci
npm run dev -- --port 5173 --strictPort
```

## Produção

```sh
npm run build
npm run preview -- --port 4173 --strictPort
```

Publique a pasta `dist` em uma hospedagem de sites estáticos. Rotas desconhecidas devem servir `index.html`, preservando o caminho da URL. Há configurações de fallback para Netlify (`public/_redirects`) e Vercel (`vercel.json`). Não é necessário backend, banco de dados ou segredo para executar o site.

## Personalização

- Os conteúdos e cases estão em `src/pages/VideoPortfolio.jsx` e `src/pages/RobloxPortfolio.jsx`.
- A entrada está em `src/pages/Landing.jsx`; identidade global em `src/styles.css`.
- Artes SVG originais estão em `public/images`; fontes são servidas localmente com Fontsource.
- Projetos, experiências e métricas são fictícios, criados como base demonstrativa. Substitua pelas informações reais antes de apresentar essas realizações como verificadas.
- O contato gera um briefing em texto que pode ser copiado ou baixado. Nenhuma mensagem é enviada: para contato direto, conecte um canal real do Kyrion MT ou um serviço de formulário.

## Interações e acessibilidade

Filtros de projetos, cases em diálogos, comparação de cor por slider, processo expansível, mudança de bioma e dia/noite, navegação por teclado, foco controlado nos diálogos e respeito à preferência por movimento reduzido. Na entrada, as teclas `1` e `2` abrem os dois portfólios.

Este projeto usa React, Vite, React Router e Lucide. As ilustrações e fontes não dependem de serviços externos em tempo de execução.
