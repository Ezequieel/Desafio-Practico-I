"use client";
import { useState, useEffect } from "react";

export default function ResumenReserva({ canchas, setCanchas, deporteSeleccionado }) {
  const [reservadas, setReservadas] = useState([]);
  const [duracion, setDuracion] = useState(1);
  const [mensaje, setMensaje] = useState("");
  const precioPorHora = 10; // Precio por hora

  useEffect(() => {
    setReservadas(canchas.filter((c) => c.estado === "reservada"));
  }, [canchas]);

  const total = reservadas.length * duracion * precioPorHora;

  const confirmarReserva = () => {
    if (reservadas.length === 0) {
      setMensaje("No hay canchas reservadas para confirmar.");
      return;
    }

    // Simula el envío de datos y limpia la reserva
    setMensaje(`✅ Reserva confirmada para ${reservadas.length} cancha(s) por ${duracion} hora(s).`);
    
    // Reiniciar canchas después de la reserva
    const nuevasCanchas = canchas.map((cancha) => ({ ...cancha, estado: "disponible" }));
    setCanchas(nuevasCanchas);
    localStorage.setItem(`reservas-${deporteSeleccionado}`, JSON.stringify(nuevasCanchas));
  };

  return (
    <div className="container fade-in">
      <h3 className="mt-4 text-dark">Resumen de Reserva</h3>
      {reservadas.length > 0 ? (
        <>
          <ul className="list-group">
            {reservadas.map((cancha) => (
              <li key={cancha.id} className="list-group-item mb-3 shadow-sm rounded-3">
                Cancha {cancha.id} - Reservada
              </li>
            ))}
          </ul>
          <div className="mt-3">
            <label className="form-label">Duración de la Reserva (horas):</label>
            <select 
              className="form-select" 
              value={duracion} 
              onChange={(e) => setDuracion(Number(e.target.value))}
            >
              <option value="1">1 hora</option>
              <option value="2">2 horas</option>
              <option value="3">3 horas</option>
            </select>
          </div>
          <h4 className="mt-3">Total: ${total}</h4>
          <button 
            className="btn btn-primary btn-custom mt-3" 
            onClick={confirmarReserva}
          >
            Confirmar Reserva
          </button>
        </>
      ) : (
        <p>No hay canchas reservadas.</p>
      )}
      {mensaje && <div className="alert alert-info mt-3 fade-in">{mensaje}</div>}
    </div>
  );
}
