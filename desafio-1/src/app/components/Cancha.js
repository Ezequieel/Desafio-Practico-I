"use client";

export default function Cancha({ id, estado, manejarReserva, deporte }) {
  const esReservada = estado === "reservada";

  const imagenesDeporte = {
    Fútbol: "/futbol.png",  //estás imagenes están en la carpeta de public por si acaso
    Baloncesto: "/baloncesto.png",
    Tenis: "/tenis.png",
  };

  return (
    <button
      className={`btn cancha-btn ${esReservada ? "reservada" : ""}`}
      onClick={() => manejarReserva(id)}
      style={{
        backgroundImage: `url(${imagenesDeporte[deporte]})`,
      }}
    >
      <div className="cancha-overlay">Cancha {id}</div>
    </button>
  );
}
