# Quiz Engine

This is a Quiz project created for a technical assessment for the React Developer role at SiPhox Health to display React and CSS/SCSS skills. The goal is to render quiz questions one by one based on a JSON structure. The quiz engine should support one-choice, multiple-choice and input questions. Additionally, it should support conditional navigation between questions based on user answers. Each slide can have an image, title, and description.

## Table of Contents

- [Demo](#demo)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)

## Demo

Check the live demo of the Quiz Engine [here](https://quiz-engine-three.vercel.app/)

## Features

- Quizzes with one-choice, multiple-choice and input questions
- Optional title, description and image in each question
- Progress tracking and result display
- Responsive design for all devices

## Tech Stack

- **Framework**: [Next.js 14.2.5](https://nextjs.org/)
- **Styling**: [Sass CSS](https://sass-lang.com/)
- **Language**: [JavaScript](https://www.javascript.com/)
- **Linter**: [Biome](https://biomejs.dev/pt-br/)
- **Package Manager**: [npm 10.7.0](https://www.npmjs.com/)

## Getting Started

To get this project running locally, follow these steps

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v20 or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Instalation

1. Clone the repository
   ```sh
   git clone https://github.com/booude/quiz-engine.git
   ```
2. Navigate to the project directory
   ```sh
   cd Quiz-Engine
   ```
3. Install dependencies
   ```sh
   npm install
   ```
   or
   ```sh
   yarn install
   ```
   or
   ```sh
   pnpm install
   ```
   or
   ```sh
   bun install
   ```

### Usage

1. Start the development server
   ```sh
   npm run dev
   ```
   or
   ```sh
   yarn dev
   ```
   or
   ```sh
   pnpm dev
   ```
   or
   ```sh
   bun dev
   ```
2. Open [http://localhost:3000](http://localhost:3000) to see the project running

### Building for Production

To create a production build, run:

```sh
npm run build
```

or

```sh
yarn build
```

or

```sh
pnpm run build
```

or

```sh
bun build
```
