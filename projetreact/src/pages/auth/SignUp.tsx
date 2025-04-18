import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress,
  LinearProgress,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";

const SignUp: React.FC = () => {
  const {
    // Auth context (à compléter si besoin)
  } = useAuth();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [passwordStrength, setPasswordStrength] = useState<number>(0);
  const [regexValidity, setRegexValidity] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    specialChar: false,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    trigger,
  } = useForm<FieldValues>({
    shouldUnregister: true,
  });

  const password = watch("password");

  useEffect(() => {
    trigger("confirmPassword");
  }, [password, trigger]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    if (data.password !== data.confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        "https://soothing-enchantment-frontreact.up.railway.app/api/Auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

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

  const checkPasswordStrength = (password: string) => {
    const lengthCriteria = password.length >= 8;
    const upperCaseCriteria = /[A-Z]/.test(password);
    const lowerCaseCriteria = /[a-z]/.test(password);
    const specialCharCriteria = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    setPasswordStrength(
      (lengthCriteria ? 1 : 0) +
        (upperCaseCriteria ? 1 : 0) +
        (lowerCaseCriteria ? 1 : 0) +
        (specialCharCriteria ? 1 : 0)
    );

    setRegexValidity({
      length: lengthCriteria,
      uppercase: upperCaseCriteria,
      lowercase: lowerCaseCriteria,
      specialChar: specialCharCriteria,
    });
  };

  const getPasswordStrengthText = (strength: number) => {
    switch (strength) {
      case 0:
        return "Très faible";
      case 1:
        return "Faible";
      case 2:
        return "Moyenne";
      case 3:
        return "Forte";
      default:
        return "Très forte";
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
          helperText={errors.firstName?.message?.toString() || ""}
        />
        <TextField
          fullWidth
          label="Nom"
          margin="normal"
          {...register("lastName", { required: "Nom est requis" })}
          error={!!errors.lastName}
          helperText={errors.lastName?.message?.toString() || ""}
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
          helperText={errors.email?.message?.toString() || ""}
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
          onChange={(e) => checkPasswordStrength(e.target.value)}
          error={!!errors.password}
          helperText={errors.password?.message?.toString() || ""}
        />

        <Box mt={1}>
          <LinearProgress
            variant="determinate"
            value={(passwordStrength / 4) * 100}
            sx={{
              height: 5,
              borderRadius: 2,
              backgroundColor: "#e0e0e0",
              "& .MuiLinearProgress-bar": {
                backgroundColor:
                  passwordStrength >= 3
                    ? "green"
                    : passwordStrength === 2
                    ? "orange"
                    : "red",
              },
            }}
          />
          <Typography variant="body2" color="textSecondary" mt={1}>
            {getPasswordStrengthText(passwordStrength)}
          </Typography>
        </Box>

        <Box mt={2}>
          {[
            {
              label: "Le mot de passe doit contenir au moins 8 caractères",
              successLabel: "Longueur suffisante",
              isValid: regexValidity.length,
            },
            {
              label: "Une majuscule est requise",
              successLabel: "Majuscule présente",
              isValid: regexValidity.uppercase,
            },
            {
              label: "Une minuscule est requise",
              successLabel: "Minuscule présente",
              isValid: regexValidity.lowercase,
            },
            {
              label: "Un caractère spécial est requis",
              successLabel: "Caractère spécial présent",
              isValid: regexValidity.specialChar,
            },
          ].map((item, index) => (
            <Typography
              key={index}
              variant="body2"
              color={item.isValid ? "green" : "red"}
            >
              {item.isValid ? item.successLabel : item.label}
            </Typography>
          ))}
        </Box>

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
          helperText={errors.confirmPassword?.message?.toString() || ""}
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
