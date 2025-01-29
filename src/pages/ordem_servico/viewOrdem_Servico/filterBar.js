import React from "react";
import { Box } from "@mui/material";

const FilterBar = ({ onFilterChange }) => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: "30%",
        right: "3px",
        transform: "translateY(-50%)",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        zIndex: 1000,
      }}
    >
      <Box
        sx={{
          width: "40px",
          height: "40px",
          backgroundColor: "#ffffff", 
          border: "2px solid #cccccc", 
          borderRadius: "50%", 
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)", 
          transition: "transform 0.2s ease",
          "&:hover": {
            transform: "scale(1.1)", 
          },
        }}
        onClick={() => onFilterChange("Todos")}
      />

      <Box
        sx={{
          width: "40px",
          height: "40px",
          backgroundColor: "#faff00", 
          borderRadius: "50%", 
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)", 
          transition: "transform 0.2s ease",
          "&:hover": {
            transform: "scale(1.1)", 
          },
        }}
        onClick={() => onFilterChange("Em andamento")}
      />

      <Box
        sx={{
          width: "40px",
          height: "40px",
          backgroundColor: "#2de810", 
          borderRadius: "50%", 
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)", 
          transition: "transform 0.2s ease",
          "&:hover": {
            transform: "scale(1.1)", 
          },
        }}
        onClick={() => onFilterChange("Finalizado")}
      />
    </Box>
  );
};

export default FilterBar;
