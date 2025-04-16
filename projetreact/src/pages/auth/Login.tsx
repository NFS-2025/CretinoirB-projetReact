import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";

type LoginForm = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:5084/api/Auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData?.message || "Email ou mot de passe invalide.");
      } else {
        const responseData = await response.json();
        // Stockage du token ou autre information nécessaire
        localStorage.setItem("authToken", responseData.token);
        login();
        navigate("/dashboard");
      }
    } catch (err) {
      setError("Erreur lors de la connexion. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box width="100%" maxWidth="400px" mx="auto" mt={10}>
      <Typography variant="h5" gutterBottom>
        Connexion
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          fullWidth
          label="Email"
          type="email"
          margin="normal"
          {...register("email", {
            required: "L'email est requis",
            pattern: {
              value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Adresse email invalide",
            },
          })}
          error={!!errors.email}
          helperText={errors.email ? errors.email.message : ""}
        />
        <TextField
          fullWidth
          label="Mot de passe"
          type="password"
          margin="normal"
          {...register("password", {
            required: "Le mot de passe est requis",
          })}
          error={!!errors.password}
          helperText={errors.password ? errors.password.message : ""}
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
              "Se connecter"
            )}
          </Button>
        </Box>

        {error && (
          <Box mt={2}>
            <Typography color="error">{error}</Typography>
          </Box>
        )}
      </form>

      <Box mt={2}>
        <Typography variant="body2" align="center">
          Vous n'avez pas de compte ? <Link to="/signup">S'inscrire</Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default Login;
