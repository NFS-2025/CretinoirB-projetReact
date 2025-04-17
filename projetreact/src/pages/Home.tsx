import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Styles intégrés pour s'assurer qu'ils sont appliqués
const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    backgroundColor: "#1a202c",
    margin: 0,
    padding: 0,
  },
  gameboy: {
    position: "relative",
    width: "384px",
    height: "384px",
    backgroundColor: "#9ae6b4", // vert Game Boy
    border: "8px solid #4a5568",
    overflow: "hidden",
  },
  screen: {
    position: "absolute",
    inset: 0,
    padding: "8px",
    display: "flex",
    flexDirection: "column",
  },
  logo: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "16px",
    marginTop: "24px",
  },
  logoContainer: {
    textAlign: "center",
  },
  pokemonText: {
    fontSize: "2.25rem",
    fontWeight: "bold",
    color: "#2b6cb0", // bleu
  },
  versionText: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#c53030", // rouge
  },
  pokemonContainer: {
    display: "flex",
    justifyContent: "center",
    margin: "8px 0",
  },
  pokemonFrame: {
    width: "96px",
    height: "96px",
    backgroundColor: "#edf2f7",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "4px solid #4a5568",
  },
  pokemonSilhouette: {
    width: "64px",
    height: "64px",
    backgroundColor: "#4a5568",
  },
  pressStartContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: "-20px",
  },
  pressStartText: {
    fontSize: "1.125rem",
    fontWeight: "bold",
    color: "#000",
  },
  copyright: {
    position: "absolute",
    bottom: "8px",
    left: 0,
    right: 0,
    textAlign: "center",
  },
  copyrightText: {
    fontSize: "0.75rem",
    color: "#4a5568",
  },
  menu: {
    backgroundColor: "#fff",
    border: "4px solid #4a5568",
    padding: "8px",
    marginTop: "32px",
    marginLeft: "16px",
    marginRight: "16px",
  },
  menuItem: {
    display: "flex",
    alignItems: "center",
    marginBottom: "8px",
    cursor: "pointer",
  },
  menuItemActive: {
    display: "flex",
    alignItems: "center",
    marginBottom: "8px",
    cursor: "pointer",
    backgroundColor: "#edf2f7",
  },
  menuSquare: {
    width: "16px",
    height: "16px",
    backgroundColor: "#000",
    marginRight: "8px",
  },
  menuSquareInactive: {
    width: "16px",
    height: "16px",
    backgroundColor: "#fff",
    marginRight: "8px",
  },
  menuText: {
    color: "#000",
  },
  menuTextBold: {
    color: "#000",
    fontWeight: "bold",
  },
  controls: {
    position: "absolute",
    bottom: "16px",
    right: "16px",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  },
  controlButtons: {
    display: "flex",
    marginBottom: "4px",
  },
  buttonB: {
    width: "16px",
    height: "16px",
    backgroundColor: "#4a5568",
    borderRadius: "50%",
    marginRight: "4px",
  },
  buttonA: {
    width: "16px",
    height: "16px",
    backgroundColor: "#e53e3e",
    borderRadius: "50%",
  },
  controlLabels: {
    fontSize: "0.75rem",
    color: "#4a5568",
  },
};

export default function PokemonStartScreen() {
  const [showPressStart, setShowPressStart] = useState(true);
  const [showOptions, setShowOptions] = useState(false);
  const navigate = useNavigate();

  // Animation du texte "PRESS START"
  useEffect(() => {
    const interval = setInterval(() => {
      setShowPressStart((prev) => !prev);
    }, 800);

    return () => clearInterval(interval);
  }, []);

  const handleKeyPress = () => {
    setShowOptions(true);
  };

  const handleOptionSelect = (option) => {
    if (option === "new") {
      navigate("/pokemonList");
    } else if (option === "continue") {
      navigate("/pokeList");
    }
  };

  return (
    <div style={styles.container}>
      <div
        style={styles.gameboy}
        onClick={!showOptions ? handleKeyPress : undefined}
        tabIndex={0}
        onKeyDown={!showOptions ? handleKeyPress : undefined}
      >
        {/* Écran principal */}
        <div style={styles.screen}>
          {!showOptions ? (
            <>
              {/* Logo du jeu */}
              <div style={styles.logo}>
                <div style={styles.logoContainer}>
                  <h1 style={styles.pokemonText}>POKEMON</h1>
                  <h2 style={styles.versionText}>VERSION</h2>
                </div>
              </div>

              {/* Pokémon de démarrage */}
              <div style={styles.pokemonContainer}>
                <div style={styles.pokemonFrame}>
                  <div style={styles.pokemonSilhouette}></div>
                </div>
              </div>

              {/* Texte clignotant */}
              <div style={styles.pressStartContainer}>
                {showPressStart && (
                  <p style={styles.pressStartText}>PRESS START</p>
                )}
              </div>

              {/* Copyright */}
              <div style={styles.copyright}>
                <p style={styles.copyrightText}>©2025 Fan Project</p>
                <p style={styles.copyrightText}>Not affiliated with Nintendo</p>
              </div>
            </>
          ) : (
            /* Menu options */
            <div style={styles.menu}>
              <div
                style={styles.menuItemActive}
                onClick={() => handleOptionSelect("new")}
              >
                <div style={styles.menuSquare}></div>
                <p style={styles.menuTextBold}>NOUVELLE PARTIE</p>
              </div>
              <div
                style={styles.menuItem}
                onClick={() => handleOptionSelect("continue")}
              >
                <div style={styles.menuSquareInactive}></div>
                <p style={styles.menuText}>CONTINUER</p>
              </div>
              <div style={styles.menuItem}>
                <div style={styles.menuSquareInactive}></div>
                <p style={styles.menuText}>OPTIONS</p>
              </div>
            </div>
          )}
        </div>

        {/* Contrôles GameBoy */}
        <div style={styles.controls}>
          <div style={styles.controlButtons}>
            <div style={styles.buttonB}></div>
            <div style={styles.buttonA}></div>
          </div>
          <div style={styles.controlLabels}>B A</div>
        </div>
      </div>
    </div>
  );
}
