import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import PokemonList from "./pages/PokemonList";
import PokemonDetail from "./pages/PokemonDetail";
import Navigation from "./pages/Navigation";
import PokeList from "./pages/PokeList";
import PrivateRoute from "./pages/PrivateRoutes";
import PokemonStartScreen from "./pages/Home"; 

function App() {
  return (
    <AuthProvider>
      <Router>
        <AuthRoutes />
      </Router>
    </AuthProvider>
  );
}

const AuthRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <>
      {isAuthenticated && <Navigation />}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route element={<PrivateRoute />}>
          <Route path="/welcome" element={<PokemonStartScreen />} />
          <Route path="/pokemonList" element={<PokemonList />} />
          <Route path="/pokeList" element={<PokeList />} />
          <Route path="/pokemon/:name" element={<PokemonDetail />} />
        </Route>
        <Route
          path="*"
          element={<Navigate to={isAuthenticated ? "/welcome" : "/"} />}
        />
      </Routes>
    </>
  );
};

export default App;