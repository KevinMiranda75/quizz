import React from "react";
import "../styles/StartScreen.css";

const CHIPS = [
  { label: "Materia", color: "#7c3aed", bg: "#ede9fe" },
  { label: "Masa", color: "#0369a1", bg: "#e0f2fe" },
  { label: "Energía", color: "#b45309", bg: "#fef3c7" },
  { label: "Conservación", color: "#065f46", bg: "#d1fae5" },
  { label: "Peso vs Masa", color: "#be123c", bg: "#ffe4e6" },
];

export default function StartScreen({ onStart, totalQuestions }) {
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
              <span
                key={c.label}
                className="chip"
                style={{ color: c.color, background: c.bg }}
              >
                {c.label}
              </span>
            ))}
          </div>
        </div>

        <button className="btn-start" onClick={onStart}>
          ¡Comenzar quiz! →
        </button>
        <p className="start-hint">Sin límite de tiempo · Puedes repetirlo</p>
      </div>
    </div>
  );
}
