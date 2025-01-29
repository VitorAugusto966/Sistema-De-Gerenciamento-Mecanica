import React from "react";
import { Card, CardContent, Typography, Box, Button, Chip } from "@mui/material";
import { useNavigate } from "react-router-dom";

const MaterialCard = ({ counter, id, nome, mecanico, valor, duracao, servicos, created, status, onFinalizar }) => {
  const navigate = useNavigate();

  // Definição de cores do status
  const statusColors = {
    "Em andamento": { bg: "#faff00", text: "#000" },
    "Finalizado": { bg: "#2de810", text: "#fff" },
  };

  return (
    <Card
      sx={{
        margin: "16px",
        boxShadow: 6,
        width: "320px",
        borderRadius: "12px",
        overflow: "hidden",
        transition: "transform 0.2s ease-in-out, box-shadow 0.2s",
        "&:hover": {
          transform: "scale(1.03)",
          boxShadow: "0px 8px 20px rgba(0, 136, 255, 0.3)",
        },
        cursor: "pointer",
      }}
      onClick={() => navigate(`/detalheOS/${id}`)}
    >
      <CardContent sx={{ padding: "20px" }}>
        {/* Badge de status */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h6">OS #{counter}</Typography>
          <Chip
            label={status}
            sx={{
              backgroundColor: statusColors[status]?.bg || "#999",
              color: statusColors[status]?.text || "#fff",
              fontWeight: "bold",
            }}
          />
        </Box>

        <Typography variant="body2" color="text.secondary" mb={2}>
          Criado em: {created}
        </Typography>

        <Typography variant="body1">
          <strong>Cliente:</strong> {nome}
        </Typography>
        <Typography variant="body1">
          <strong>Mecânico:</strong> {mecanico}
        </Typography>
        <Typography variant="body1">
          <strong>Valor:</strong> R${valor}
        </Typography>
        <Typography variant="body1">
          <strong>Duração:</strong> {duracao} horas
        </Typography>

        {/* Lista de serviços */}
        <Box mt={2}>
          <Typography variant="body2" fontWeight="bold">
            Serviços:
          </Typography>
          <ul style={{ paddingLeft: "20px", marginTop: "4px" }}>
            {servicos?.map((servico, index) => (
              <li key={index} style={{ fontSize: "14px", color: "#444" }}>
                {servico.nome}
              </li>
            ))}
          </ul>
        </Box>

        {/* Botão de Finalizar */}
        {status === "Em andamento" && (
          <Button
            variant="contained"
            color="success"
            fullWidth
            sx={{
              marginTop: "16px",
              fontWeight: "bold",
              padding: "10px",
              transition: "background 0.3s ease",
              "&:hover": {
                backgroundColor: "#1d8a32",
              },
            }}
            onClick={(e) => {
              e.stopPropagation(); // Evita clicar e navegar para a página de detalhes
              onFinalizar(id);
            }}
          >
            Finalizar
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default MaterialCard;
