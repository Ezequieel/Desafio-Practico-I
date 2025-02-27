"use client";

export default function SelectorDeporte({ deporteSeleccionado, setDeporteSeleccionado }) {
  return (
    <div className="mb-4">
      <h3>Selecciona un Deporte</h3>
      <select
        className="form-select"
        value={deporteSeleccionado}
        onChange={(e) => setDeporteSeleccionado(e.target.value)}
      >
        <option value="Fútbol">Fútbol</option>
        <option value="Baloncesto">Baloncesto</option>
        <option value="Tenis">Tenis</option>
      </select>
    </div>
  );
}
