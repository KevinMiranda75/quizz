import React from "react";
import "../styles/ResultsScreen.css";

function getGrade(pct) {
  if (pct >= 90) return { label: "¡Excelente!", emoji: "🏆", color: "#22c55e" };
  if (pct >= 75) return { label: "¡Muy bien!", emoji: "🎉", color: "#3b82f6" };
  if (pct >= 60) return { label: "Buen esfuerzo", emoji: "👍", color: "#f59e0b" };
  return { label: "Sigue practicando", emoji: "📚", color: "#ef4444" };
}

export default function ResultsScreen({ score, total, history, onRestart }) {
  const pct = Math.round((score / total) * 100);
  const grade = getGrade(pct);

  return (
    <div className="results-wrapper">
      <div className="results-card">
        <div className="results-hero">
          <div className="score-ring" style={{ borderColor: grade.color }}>
            <span className="score-emoji">{grade.emoji}</span>
            <span className="score-num">{score}</span>
            <span className="score-denom">de {total}</span>
          </div>
          <h2 className="grade-label" style={{ color: grade.color }}>
            {grade.label}
          </h2>
          <p className="grade-pct">{pct}% de respuestas correctas</p>
        </div>

        <div className="stats-row">
          <div className="stat-box stat-ok">
            <span className="stat-num">{score}</span>
            <span className="stat-lbl">Correctas</span>
          </div>
          <div className="stat-box stat-bad">
            <span className="stat-num">{total - score}</span>
            <span className="stat-lbl">Incorrectas</span>
          </div>
          <div className="stat-box">
            <span className="stat-num">{pct}%</span>
            <span className="stat-lbl">Puntaje</span>
          </div>
        </div>

        <div className="breakdown-section">
          <h3 className="breakdown-title">Resumen de respuestas</h3>
          <ul className="breakdown-list">
            {history.map((item, i) => (
              <li key={i} className={`bd-item ${item.correct ? "bd-ok" : "bd-bad"}`}>
                <span className="bd-icon">{item.correct ? "✓" : "✗"}</span>
                <span className="bd-text">{item.question}</span>
              </li>
            ))}
          </ul>
        </div>

        <button className="btn-retry" onClick={onRestart}>
          🔄 Intentar de nuevo
        </button>
      </div>
    </div>
  );
}
