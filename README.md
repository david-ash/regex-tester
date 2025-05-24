# Regex Tester

A web app to test and learn Regular Expressions, built with React, Vite, and Materialize CSS.

## Features

- **Regex Tester:** Enter a regex and test it against your input text.
- **Highlight Matches:** Matches are highlighted in the test text.
- **Save Regexes:** Save your favorite regex patterns for later use (stored in your browser).
- **Copy Matches:** Copy all matches to your clipboard.
- **Learn Regex:** Quick reference for common regex syntax.

## Getting Started

### Install dependencies

```sh
npm install
```

### Start the development server

```sh
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for production

```sh
npm run build
```

### Preview production build

```sh
npm run preview
```

## Project Structure

- `src/App.jsx` - Main app and routing
- `src/components/RegexTester.jsx` - Regex tester UI
- `src/components/Learn.jsx` - Regex reference/learning page
- `src/components/Home.jsx` - Home page

## Dependencies

- [React](https://react.dev/)
- [React Router DOM](https://reactrouter.com/)
- [Vite](https://vitejs.dev/)
- [Materialize CSS](https://materializecss.com/)

## License

MIT