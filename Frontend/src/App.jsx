import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import { createGlobalStyle } from "styled-components";
import Index from "./pages/index";

const GlobalStyle = createGlobalStyle`
*{
margin: 0;

}
body{
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  max-width: 1440px;
  min-width: 1024px;
  min-height: 780px;
  width: 100%;
  height: 100%;
  margin:auto;
}
`;

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Header />
      <Routes>
        {/* Route pour la page d'accueil */}
        <Route path="/" element={<Index />} />
        <Route path="/user/:id" element={<Index />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
