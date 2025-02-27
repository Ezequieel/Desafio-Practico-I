"use client";
import { useState, useEffect } from "react";
import Cancha from "./Cancha";
import ResumenReserva from "./ResumenReserva";
import SelectorDeporte from "./SelectorDeporte";

const canchasPorDeporte = {
  Fútbol: Array.from({ length: 10 }, (_, i) => ({ id: i + 1, estado: "disponible" })),
  Baloncesto: Array.from({ length: 10 }, (_, i) => ({ id: i + 1, estado: "disponible" })),
  Tenis: Array.from({ length: 10 }, (_, i) => ({ id: i + 1, estado: "disponible" })),
};

export default function PlanoDeportivo() {
  const [deporteSeleccionado, setDeporteSeleccionado] = useState("Fútbol");
  const [canchas, setCanchas] = useState([]);

  useEffect(() => {
    // Limpiar localStorage al inicio para evitar datos antiguos
    localStorage.clear();

    const reservasGuardadas = localStorage.getItem(`reservas-${deporteSeleccionado}`);
    if (reservasGuardadas) {
      setCanchas(JSON.parse(reservasGuardadas));
    } else {
      setCanchas(canchasPorDeporte[deporteSeleccionado]);
    }
  }, [deporteSeleccionado]);

  useEffect(() => {
    if (canchas.length > 0) {
      localStorage.setItem(`reservas-${deporteSeleccionado}`, JSON.stringify(canchas));
    }
  }, [canchas, deporteSeleccionado]);

  const manejarReserva = (id) => {
    setCanchas((prevCanchas) =>
      prevCanchas.map((cancha) =>
        cancha.id === id
          ? { ...cancha, estado: cancha.estado === "disponible" ? "reservada" : "disponible" }
          : cancha
      )
    );
  };

  return (
    <div className="container">
      <SelectorDeporte deporteSeleccionado={deporteSeleccionado} setDeporteSeleccionado={setDeporteSeleccionado} />
      <h2>Plano Deportivo - {deporteSeleccionado}</h2>
      <div className="row">
        {canchas.map((cancha) => (
          <div key={cancha.id} className="col-2 cancha-container">
            <Cancha id={cancha.id} estado={cancha.estado} manejarReserva={manejarReserva} deporte={deporteSeleccionado} />
          </div>
        ))}
      </div>
      <ResumenReserva canchas={canchas} setCanchas={setCanchas} deporteSeleccionado={deporteSeleccionado} />
    </div>
  );
}
