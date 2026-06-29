import React, { useState } from "react";
import { LeaderboardList } from './LeaderboardList';
import "../styles/StartScreen.css";

const CHIPS = [
  { label: "Materia", color: "#7c3aed", bg: "#ede9fe" },
  { label: "Masa", color: "#0369a1", bg: "#e0f2fe" },
  { label: "Energía", color: "#b45309", bg: "#fef3c7" },
  { label: "Conservación", color: "#065f46", bg: "#d1fae5" },
  { label: "Peso vs Masa", color: "#be123c", bg: "#ffe4e6" },
];

export default function StartScreen({ onStart, totalQuestions }) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleStart = () => {
    const trimmed = name.trim();
    if (!trimmed) {
      setError("Ingresa tu nombre para continuar.");
      return;
    }
    if (trimmed.length < 2) {
      setError("El nombre debe tener al menos 2 caracteres.");
      return;
    }
    onStart(trimmed);
  };

  const handleKey = (e) => {
    if (e.key === "Enter") handleStart();
  };

  return (
    <div className="start-wrapper">
      <div className="start-card">

        <div className="start-hero">
          <div className="hero-orbs">
            <div className="orb orb-1" />
            <div className="orb orb-2" />
            <div className="orb orb-3" />
          </div>
          <div className="hero-icon">⚗️</div>
          <h1>Materia, masa<br />y energía</h1>
          <p className="start-subtitle">
            Pon a prueba tus conocimientos sobre conceptos<br />fundamentales de ciencias naturales.
          </p>
        </div>

        <div className="start-meta">
          <div className="meta-item meta-purple">
            <span className="meta-emoji">📝</span>
            <span className="meta-val">{totalQuestions}</span>
            <span className="meta-lbl">preguntas</span>
          </div>
          <div className="meta-item meta-blue">
            <span className="meta-emoji">⏱️</span>
            <span className="meta-val">5</span>
            <span className="meta-lbl">minutos</span>
          </div>
          <div className="meta-item meta-amber">
            <span className="meta-emoji">🏆</span>
            <span className="meta-val">1pt</span>
            <span className="meta-lbl">por pregunta</span>
          </div>
        </div>

        <div className="start-topics">
          <p className="topics-label">Temas cubiertos</p>
          <div className="topics-chips">
            {CHIPS.map((c) => (
              <span key={c.label} className="chip" style={{ color: c.color, background: c.bg }}>
                {c.label}
              </span>
            ))}
          </div>
        </div>

        <div className="name-section pt-2">
          <label className="name-label" htmlFor="player-name">
            ¿Cómo te llamas?
          </label>
          <input
            id="player-name"
            className={`name-input ${error ? "name-input-error" : ""}`}
            type="text"
            placeholder="Tu nombre aquí..."
            value={name}
            onChange={(e) => { setName(e.target.value); setError(""); }}
            onKeyDown={handleKey}
            maxLength={30}
            autoComplete="off"
          />
          {error && <p className="name-error">{error}</p>}
        </div>

        <button className="btn-start" onClick={handleStart}>
          ¡Comenzar quiz! →
        </button>
        {/* Botón para abrir el ranking */}
        <button className="btn-rank-link" onClick={() => setShowModal(true)}>
          🏆 Ver Ranking Completo
        </button>
        <p className="start-hint">Sin límite de tiempo · Puedes repetirlo</p>
      </div>

      {/* El Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <h3 style={{ marginTop: 0 }}>🏆 Ranking General</h3>
            <LeaderboardList onClose={() => setShowModal(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
