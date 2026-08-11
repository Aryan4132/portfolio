<div align="center">

<img src="github_banner_v2.png" alt="Aryan Shukla" width="100%" />

[![Typing SVG](https://readme-typing-svg.herokuapp.com?font=Outfit&weight=600&size=22&duration=3000&pause=800&color=58A6FF&center=true&vCenter=true&width=700&lines=Building+Meridian-X+%E2%80%94+Offline+Desktop+AI+%F0%9F%9A%80;Local-First+LLMs+%7C+Knowledge+Graphs+%7C+MCP;Rust+%7C+Python+%7C+TypeScript+%7C+React+19;Systems+Where+AI+Runs+Without+the+Cloud)](https://git.io/typing-svg)

<br/>

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/aryanshukla4132)
[![Gmail](https://img.shields.io/badge/Gmail-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:aryanshukla4132@gmail.com)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Aryan4132)
[![Profile Views](https://komarev.com/ghpvc/?username=Aryan4132&label=Profile+Views&color=58A6FF&style=for-the-badge)](https://github.com/Aryan4132)

</div>

<br/>

## 🧑‍💻 About Me

> *I build tools that make AI work for you — offline, fast, and on your own terms.*

Computer Engineering student at **Don Bosco Institute of Technology, Mumbai** *(graduating May 2028)*, specialising in autonomous agents, local-first AI systems, and high-performance full-stack applications.

```yaml
name:       Aryan Shukla
location:   Mumbai, Maharashtra 🇮🇳
education:  B.E. Computer Engineering @ DBIT (2024 – 2028)
focus:      Local-First AI · Agentic Systems · Knowledge Graphs · Systems Programming
building:   Meridian-X — an offline autonomous desktop AI agent
exploring:  Rust · MCP Protocol · Custom Canvas Rendering Engines
```

<br/>

## ⚡ Tech Arsenal

<div align="center">

**Systems & Backend**

[![Systems](https://skillicons.dev/icons?i=python,rust,cpp,nodejs,fastapi,sqlite,postgres,mongodb&theme=dark)](https://skillicons.dev)

**Frontend & Desktop**

[![Frontend](https://skillicons.dev/icons?i=ts,js,react,tauri,vite,tailwind&theme=dark)](https://skillicons.dev)

**Infrastructure & Tools**

[![Tools](https://skillicons.dev/icons?i=git,github,docker,linux,vscode&theme=dark)](https://skillicons.dev)

<br/>

**AI / Local Inference**

![Ollama](https://img.shields.io/badge/Ollama-000000?style=flat-square&logo=ollama&logoColor=white)
![Vector RAG](https://img.shields.io/badge/Vector%20RAG-8B5CF6?style=flat-square&logoColor=white)
![TF-IDF Search](https://img.shields.io/badge/TF--IDF%20Search-0EA5E9?style=flat-square&logoColor=white)
![ReAct Agent](https://img.shields.io/badge/ReAct%20Agent%20Loop-F43F5E?style=flat-square&logoColor=white)
![SSE Streaming](https://img.shields.io/badge/SSE%20Streaming-FF9800?style=flat-square&logoColor=white)
![MCP Protocol](https://img.shields.io/badge/Model%20Context%20Protocol-10B981?style=flat-square&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-764ABC?style=flat-square&logoColor=white)
![HTML5 Canvas](https://img.shields.io/badge/HTML5%20Canvas-E34F26?style=flat-square&logo=html5&logoColor=white)

</div>

<br/>

## 🏆 GitHub Trophies

<div align="center">

[![Trophies](https://github-profile-trophy.vercel.app/?username=Aryan4132&theme=radical&no-frame=true&no-bg=true&margin-w=6&column=7)](https://github.com/ryo-ma/github-profile-trophy)

</div>

<br/>

## 🚀 Flagship Projects

<img src="https://capsule-render.vercel.app/api?type=rect&color=gradient&customColorList=6,11,20&height=2&section=header" width="100%"/>

### 🧠 [Meridian-X](https://github.com/Aryan4132/Meridian-X) &nbsp;—&nbsp; Offline Desktop AI Agent

<table>
<tr>
<td>

**Stack:** `Tauri` `React 19` `FastAPI` `Ollama` `SQLite` `Python`

A local-first AI workspace companion that runs **100% offline** — automating tasks, parsing documents (PDF, DOCX, CSV, Markdown), and reasoning through multi-step workflows without a single cloud call.

- **Engineered** a runtime signature validator using `inspect.signature` to dynamically inspect tool functions and repair hallucinated arguments, eliminating LLM tool-call crashes
- **Architected** async execution paths separating read-only and write actions, enabling concurrent background scans without file-system locks
- Initializes Python/FastAPI sidecar services in **~1.5s** with zero cloud API dependencies

</td>
</tr>
</table>

<br/>

### 🕸️ [AI Knowledge Graph](https://github.com/Aryan4132/Knowledge_Graph) &nbsp;—&nbsp; Local Workspace Visualizer & MCP Server

<table>
<tr>
<td>

**Stack:** `Node.js` `Express` `SQLite` `React` `Chokidar` `HTML5 Canvas` `TypeScript`

A local knowledge graph server that watches workspace directories in real time and renders files, notes, and database schemas as an interactive 2D graph.

- **Engineered** a custom force-directed graph engine in TypeScript directly on HTML5 Canvas — without D3 dependencies — rendering **40–50 workspace nodes** smoothly without UI latency
- **Engineered** a 200ms debounced event pipeline in Chokidar to eliminate UI node flashing caused by OS-level atomic file system churn on Windows
- Implemented a native **Model Context Protocol (MCP)** server over stdio and SSE transport streams, exposing live graph data to external AI tools

</td>
</tr>
</table>

<br/>

### 📈 [InvestIQ](https://github.com/Aryan4132/InvestIQ) &nbsp;—&nbsp; Full-Stack Portfolio Tracker & AI Advisor

<table>
<tr>
<td>

**Stack:** `React 19` `Express.js` `MongoDB` `Ollama` `Recharts` `Zustand`

Real-time financial analytics platform with live equity feeds, transaction logging, and a locally-hosted streaming AI advisor for portfolio allocation.

- **Implemented** a resilient backend caching layer in Express to mitigate Yahoo Finance API rate limits, reducing stock quote latency from **~800ms to <50ms** and serving last-known quotes on fetch failures
- Streaming AI advisor runs **100% locally** via Ollama — zero external inference costs
- Secured with JWT authentication, bcrypt password hashing, and HTTP-only cookies

</td>
</tr>
</table>

<br/>

### 🛠️ [JavaMini](https://github.com/Aryan4132/javamini) &nbsp;—&nbsp; Compiler Experiment

<table>
<tr>
<td>

**Stack:** `JavaScript` `Node.js`

A lightweight interpreter translating subsets of JavaScript & Java into intermediate execution models — custom **lexer → parser → AST evaluator** pipeline, built from scratch to understand compiler internals end-to-end.

</td>
</tr>
</table>

<img src="https://capsule-render.vercel.app/api?type=rect&color=gradient&customColorList=6,11,20&height=2&section=footer" width="100%"/>

<br/>

## 📊 Contribution Activity

<div align="center">

[![Activity Graph](https://github-readme-activity-graph.vercel.app/graph?username=Aryan4132&bg_color=0D1117&color=58A6FF&line=58A6FF&point=FF7B72&area=true&area_color=58A6FF&hide_border=true&custom_title=Aryan's%20Contribution%20Graph)](https://github.com/ashutosh00710/github-readme-activity-graph)

</div>

<br/>

<div align="center">

<img src="https://raw.githubusercontent.com/Aryan4132/Aryan4132/output/github-contribution-grid-snake-dark.svg" alt="Contribution Snake" width="100%"/>

</div>

<br/>

## 📫 Let's Connect

<div align="center">

[![LinkedIn](https://img.shields.io/badge/LinkedIn%20—%20aryanshukla4132-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/aryanshukla4132)
[![Email](https://img.shields.io/badge/Email%20—%20aryanshukla4132%40gmail.com-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:aryanshukla4132@gmail.com)

</div>

<br/>

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=120&section=footer&text=Built%20with%20%F0%9F%92%99%20in%20Mumbai&fontSize=18&fontColor=ffffff&animation=twinkling&fontAlignY=65" width="100%"/>

</div>
