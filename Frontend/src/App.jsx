import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import { createGlobalStyle } from "styled-components";
import Home from "./pages/Home/Home";
import Landing from "./pages/Landing/Landing";
import PageNotFound from "./pages/PageNotFound/PageNotFound";

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
  overflow-y: auto;
}
`;

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Header />
      <Routes>
        {/* Route dynamique pour l'ID utilisateur */}
        <Route path="/" element={<Landing />} />
        <Route path="/user/:id" element={<Home />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
