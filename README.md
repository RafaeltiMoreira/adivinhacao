# 🧠 Jogo de Adivinhação de Palavras - Desenvolvedor Front-end e Back-end

Uma aplicação interativa construída com **React** onde o jogador tenta adivinhar palavras relacionadas ao mundo da **programação**, como linguagens, frameworks e ferramentas, com base em dicas. O jogo exibe feedbacks visuais e mensagens usando **React Toastify**.

## 🚀 Tecnologias Utilizadas

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [React Toastify](https://fkhadra.github.io/react-toastify/)
- [CSS Modules](https://github.com/css-modules/css-modules)

## 🧩 Funcionalidades

- Geração aleatória de palavras com dicas.
- Validação de letras digitadas.
- Marcação de letras já utilizadas.
- Controle de tentativas (limite baseado no tamanho da palavra + tentativas extras).
- Reinício do jogo com confirmação via toast.
- Feedback visual para acertos e erros.
- Interface responsiva e amigável.

## 📂 Estrutura de Pastas

```

src/ 
├── components/ # Componentes reutilizáveis (Header, Letter, Tip, etc.) 
├── utils/ # Palavras e tipo Challenge 
├── App.tsx # Componente principal do jogo 
├── app.module.css # Estilos principais via CSS Modules

```

## 📦 Instalação e Execução

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/nome-do-repo.git
cd nome-do-repo

Instale as dependências:

npm install
# ou
yarn 

Inicie o servidor de desenvolvimento:

npm run dev
# ou
yarn dev
```

## 🔧 Customização

```bash
src/utils/words.ts

Exemplo:

export const WORDS: Challenge[] = [
  { id: 1, word: "REACT", tip: "Biblioteca para criar interfaces Web" },
  { id: 2, word: "NODE", tip: "Ambiente de execução JavaScript no servidor" },
];

```

## Feito com 💻 + ☕