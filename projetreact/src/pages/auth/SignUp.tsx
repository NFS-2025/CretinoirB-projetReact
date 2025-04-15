import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const SignUp: React.FC = () => {
  const { login } = useAuth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null); 
  const [passwordMatch, setPasswordMatch] = useState<boolean | null>(null);

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null); 

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      setLoading(false);
      return;
    }

    if (!email || !password || !firstName || !lastName) {
      setError("Tous les champs doivent être remplis.");
      setLoading(false);
      return;
    }

    if (!emailRegex.test(email)) {
      setError("Adresse email invalide.");
      setLoading(false);
      return;
    }

    if (!passwordRegex.test(password)) {
      setError(
        "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule et un caractère spécial."
      );
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:5084/api/Auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData?.message || "Erreur lors de l'inscription");
      } else {
        setSuccessMessage("Inscription réussie !");
      }
    } catch (err) {
      setError("Erreur lors de l'inscription.");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordMatch(value === confirmPassword);
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setConfirmPassword(value);
    setPasswordMatch(password === value);
  };

  return (
    <Box width="100%" maxWidth="400px" mx="auto" mt={10}>
      <Typography variant="h5" gutterBottom>
        Inscription
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Prénom"
          margin="normal"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <TextField
          fullWidth
          label="Nom"
          margin="normal"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <TextField
          fullWidth
          label="Email"
          type="email"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          helperText="L'adresse email doit être valide"
        />
        <TextField
          fullWidth
          label="Mot de passe"
          type="password"
          margin="normal"
          value={password}
          onChange={handlePasswordChange}
          required
          helperText="Le mot de passe doit contenir 8 caractères, une majuscule, une minuscule et un caractère spécial"
        />
        <TextField
          fullWidth
          label="Confirmer le mot de passe"
          type="password"
          margin="normal"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          required
        />

        {passwordMatch === false && (
          <Typography color="error" variant="body2">
            Les mots de passe ne correspondent pas.
          </Typography>
        )}

        <Box mt={2}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "S'inscrire"
            )}
          </Button>
        </Box>

        {error && (
          <Box mt={2}>
            <Typography color="error">{error}</Typography>
          </Box>
        )}

        {successMessage && (
          <Box mt={2}>
            <Typography color="primary">{successMessage}</Typography>
          </Box>
        )}
      </form>

      <Box mt={2}>
        <Typography variant="body2" align="center">
          Vous avez déjà un compte ? <Link to="/">Se connecter</Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default SignUp;
