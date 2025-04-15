import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Grid,
  Button,
  Box,
  CircularProgress,
  Modal,
  Typography,
} from "@mui/material";

interface Card {
  id: string;
  name: string;
  image: string;
  set: string;
  description?: string;
  hp?: number;
  types?: string[];
  attacks?: { name: string; effect: string; damage?: number }[];
  weaknesses?: { type: string; value: string }[];
  retreat?: number;
}

const getCardImageUrl = (card: Card) => {
  return `${card.image}/low.webp`;
};

const PokemonCards: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const cardsPerPage = 40;

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await axios.get(
          `https://api.tcgdex.net/v2/en/cards/?set=base`
        );
        if (response.data && Array.isArray(response.data)) {
          setCards(response.data);
        } else {
          console.error("Structure de réponse inattendue:", response);
        }
      } catch (error) {
        console.error("Erreur lors du chargement des cartes :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, []);
  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1));
  };

  const displayedCards = cards.slice(
    (page - 1) * cardsPerPage,
    page * cardsPerPage
  );

  const handleCardClick = async (card: Card) => {
    console.log("Carte sélectionnée:", card);

    try {
      const response = await axios.get(
        `https://api.tcgdex.net/v2/en/cards/${card.id}`
      );
      const detailedCard = response.data;

      setSelectedCard(detailedCard);
      setOpenModal(true); 
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des détails de la carte :",
        error
      );
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false); 
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Grid container spacing={2} justifyContent="center">
        {displayedCards.map((card) => (
          <Grid item xs={12} sm={6} md={3} key={card.id} textAlign="center">
            <img
              src={getCardImageUrl(card)}
              alt={card.name}
              className="pokemon-card-image"
              style={{
                width: "100%",
                maxHeight: "200px",
                objectFit: "contain",
                cursor: "pointer",
              }}
              onClick={() => handleCardClick(card)} 
            />
            <h3>{card.name}</h3>
          </Grid>
        ))}
      </Grid>

      <Box display="flex" justifyContent="center" marginTop={3}>
        <Button
          onClick={handlePrevPage}
          variant="contained"
          color="primary"
          disabled={page === 1}
        >
          Précédent
        </Button>
        <Button
          onClick={handleNextPage}
          variant="contained"
          color="primary"
          disabled={page * cardsPerPage >= cards.length}
          style={{ marginLeft: "16px" }}
        >
          Suivant
        </Button>
      </Box>

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-card-title"
        aria-describedby="modal-card-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          {selectedCard && (
            <>
              <Typography variant="h6" id="modal-card-title">
                {selectedCard.name}
              </Typography>
              <img
                src={getCardImageUrl(selectedCard)}
                alt={selectedCard.name}
                style={{
                  width: "100%",
                  maxHeight: "300px",
                  objectFit: "contain",
                }}
              />
              <Typography id="modal-card-description" sx={{ mt: 2 }}>
                {selectedCard.description}
              </Typography>
              <Typography sx={{ mt: 2 }}>
                <strong>HP:</strong> {selectedCard.hp || "Non spécifié"}
              </Typography>
              <Typography sx={{ mt: 1 }}>
                <strong>Types:</strong>{" "}
                {selectedCard.types?.join(", ") || "Non spécifié"}
              </Typography>
              {selectedCard.attacks && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle1">Attaques:</Typography>
                  {selectedCard.attacks.map((attack, index) => (
                    <Box key={index}>
                      <Typography>
                        <strong>{attack.name}</strong>
                      </Typography>
                      <Typography>{attack.effect}</Typography>
                      {attack.damage && (
                        <Typography>
                          <strong>Damage:</strong> {attack.damage}
                        </Typography>
                      )}
                    </Box>
                  ))}
                </Box>
              )}
            </>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default PokemonCards;
