import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PokemonList from "./pages/PokemonList";
import PokemonDetail from "./pages/PokemonDetail";
import Navigation from "./pages/Navigation";
import PokeList from "./pages/PokeList";

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<PokemonList />} />
        <Route path="/pokemon/:name" element={<PokemonDetail />} />
        <Route path="/pokeList" element={<PokeList />} />
      </Routes>
    </Router>
  );
}

export default App;
