import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";

const SignUp: React.FC = () => {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");
  const onSubmit = async (data: any) => {
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    if (data.password !== data.confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:5084/api/Auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
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

  return (
    <Box width="100%" maxWidth="400px" mx="auto" mt={10}>
      <Typography variant="h5" gutterBottom>
        Inscription
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          fullWidth
          label="Prénom"
          margin="normal"
          {...register("firstName", { required: "Prénom est requis" })}
          error={!!errors.firstName}
          helperText={String(errors.firstName?.message)}
        />
        <TextField
          fullWidth
          label="Nom"
          margin="normal"
          {...register("lastName", { required: "Nom est requis" })}
          error={!!errors.lastName}
          helperText={String(errors.lastName?.message)}
        />
        <TextField
          fullWidth
          label="Email"
          type="email"
          margin="normal"
          {...register("email", {
            required: "Email est requis",
            pattern: {
              value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Email invalide",
            },
          })}
          error={!!errors.email}
          helperText={String(errors.email?.message)}
        />
        <TextField
          fullWidth
          label="Mot de passe"
          type="password"
          margin="normal"
          {...register("password", {
            required: "Mot de passe requis",
            minLength: {
              value: 8,
              message: "Le mot de passe doit contenir au moins 8 caractères",
            },
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/,
              message:
                "Le mot de passe doit contenir une majuscule, une minuscule et un caractère spécial",
            },
          })}
          error={!!errors.password}
          helperText={String(errors.password?.message)}
        />
        <TextField
          fullWidth
          label="Confirmer le mot de passe"
          type="password"
          margin="normal"
          {...register("confirmPassword", {
            required: "La confirmation du mot de passe est requise",
            validate: (value) =>
              value === password || "Les mots de passe ne correspondent pas",
          })}
          error={!!errors.confirmPassword}
          helperText={String(errors.confirmPassword?.message)}
        />

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
