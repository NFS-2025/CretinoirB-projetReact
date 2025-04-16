import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Grid,
  Button,
  Box,
  CircularProgress,
  Modal,
  Typography,
  Fade,
  Backdrop,
  Chip,
  Stack,
  Divider,
} from "@mui/material";

interface Attack {
  name: string;
  effect: string;
  damage?: number;
}

interface Weakness {
  type: string;
  value: string;
}

interface Card {
  id: string;
  name: string;
  image: string;
  set: string;
  description?: string;
  hp?: number;
  types?: string[];
  attacks?: Attack[];
  weaknesses?: Weakness[];
  retreat?: number;
}

const getCardImageUrl = (card: Card) => `${card.image}/low.webp`;

const PokemonCards: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const cardsPerPage = 40;

  useEffect(() => {
    const fetchCards = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://api.tcgdex.net/v2/en/cards/?set=base`
        );
        if (response.data && Array.isArray(response.data)) {
          setCards(response.data);
        }
      } catch (error) {
        console.error("Erreur chargement des cartes :", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCards();
  }, []);

  const displayedCards = cards.slice(
    (page - 1) * cardsPerPage,
    page * cardsPerPage
  );

  const handlePageChange = async (direction: "next" | "prev") => {
    setIsLoading(true);
    try {
      await new Promise((res) => setTimeout(res, 400));
      setPage((prevPage) =>
        direction === "next" ? prevPage + 1 : Math.max(prevPage - 1, 1)
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCardClick = async (card: Card) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://api.tcgdex.net/v2/en/cards/${card.id}`
      );
      setSelectedCard(response.data);
      setOpenModal(true);
    } catch (error) {
      console.error("Erreur chargement détails carte :", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <Box>
      <Fade in={isLoading} timeout={300} unmountOnExit>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          position="fixed"
          top={0}
          left={0}
          width="100vw"
          height="100vh"
          bgcolor="rgba(0,0,0,0.5)"
          zIndex={9999}
        >
          <CircularProgress color="secondary" size={60} />
        </Box>
      </Fade>
      <Grid container spacing={2} justifyContent="center">
        {displayedCards.map((card) => (
          <Grid item xs={12} sm={6} md={3} key={card.id} textAlign="center">
            <img
              src={getCardImageUrl(card)}
              alt={card.name}
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
          onClick={() => handlePageChange("prev")}
          variant="contained"
          color="primary"
          disabled={page === 1}
        >
          Précédent
        </Button>
        <Button
          onClick={() => handlePageChange("next")}
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
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 300, sx: { bgcolor: "rgba(0,0,0,0.6)" } }}
      >
        <Fade in={openModal}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 500,
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
            }}
          >
            {selectedCard && (
              <>
                <Typography variant="h5" gutterBottom>
                  {selectedCard.name}
                </Typography>
                <img
                  src={getCardImageUrl(selectedCard)}
                  alt={selectedCard.name}
                  style={{
                    width: "100%",
                    maxHeight: "300px",
                    objectFit: "contain",
                    marginBottom: "16px",
                  }}
                />
                <Divider sx={{ my: 2 }} />
                <Stack spacing={1}>
                  {selectedCard.hp && (
                    <Typography>❤️ PV : {selectedCard.hp}</Typography>
                  )}
                  {selectedCard.types?.length && (
                    <Typography>
                      🔥 Type(s) :{" "}
                      {selectedCard.types.map((t) => (
                        <Chip key={t} label={t} size="small" sx={{ mr: 1 }} />
                      ))}
                    </Typography>
                  )}
                  {selectedCard.attacks?.length && (
                    <Box>
                      <Typography>🌀 Attaques :</Typography>
                      {selectedCard.attacks.map((atk, index) => (
                        <Box key={index} sx={{ ml: 2 }}>
                          <Typography variant="subtitle2">
                            - {atk.name}{" "}
                            {atk.damage ? `(${atk.damage} dégâts)` : ""}
                          </Typography>
                          <Typography variant="body2" sx={{ mb: 1 }}>
                            {atk.effect}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  )}
                  {selectedCard.weaknesses?.length && (
                    <Box>
                      <Typography>⚠️ Faiblesses :</Typography>
                      {selectedCard.weaknesses.map((w, index) => (
                        <Chip
                          key={index}
                          label={`${w.type} (${w.value})`}
                          size="small"
                          sx={{ mr: 1 }}
                        />
                      ))}
                    </Box>
                  )}
                  {typeof selectedCard.retreat === "number" && (
                    <Typography>
                      🏃 Coût de retraite : {selectedCard.retreat}
                    </Typography>
                  )}
                </Stack>
              </>
            )}
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default PokemonCards;
