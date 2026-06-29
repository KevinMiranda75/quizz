import React, { useEffect, useState } from "react";
import { saveScore, getTop3 } from "../lib/supabase";
import "../styles/ResultsScreen.css";

function getGrade(pct) {
  if (pct >= 90) return { label: "¡Excelente!", emoji: "🏆", color: "#16a34a" };
  if (pct >= 75) return { label: "¡Muy bien!", emoji: "🎉", color: "#2563eb" };
  if (pct >= 60) return { label: "Buen esfuerzo", emoji: "👍", color: "#d97706" };
  return { label: "Sigue practicando", emoji: "📚", color: "#dc2626" };
}

const MEDAL = ["🥇", "🥈", "🥉"];

export default function ResultsScreen({ name, score, total, history, onRestart }) {
  const pct = Math.round((score / total) * 100);
  const grade = getGrade(pct);
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);
  const [dbError, setDbError] = useState(false);

  useEffect(() => {
    async function submit() {
      try {
        await saveScore({ name, score, total, pct });
        setSaved(true);
      } catch (e) {
        setDbError(true);
      }
      try {
        // Ahora llamamos específicamente a getTop3 para el resumen de resultados
        const data = await getTop3();
        setLeaderboard(data);
      } catch (e) {
        console.error("Error al cargar el Top 3:", e);
      }
      setLoading(false);
    }
    submit();
  }, [name, score, total, pct]);

  return (
    <div className="results-wrapper">
      <div className="results-card">

        {/* HERO */}
        <div className="results-hero" style={{ borderColor: grade.color }}>
          <div className="score-ring" style={{ borderColor: grade.color }}>
            <span className="score-emoji">{grade.emoji}</span>
            <span className="score-num">{score}</span>
            <span className="score-denom">de {total}</span>
          </div>
          <h2 className="grade-label" style={{ color: grade.color }}>{grade.label}</h2>
          <p className="player-name">¡Bien jugado, <strong>{name}</strong>!</p>
          <p className="grade-pct">{pct}% de respuestas correctas</p>
        </div>

        {/* STATS */}
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

        {/* LEADERBOARD */}
        <div className="lb-section">
          <h3 className="lb-title">🏅 Tabla de resultados</h3>

          {dbError && (
            <div className="db-error">
              ⚠️ Configura tu URL de Supabase en <code>src/lib/supabase.js</code> para ver el ranking.
            </div>
          )}

          {loading && !dbError && (
            <div className="lb-loading">
              <div className="lb-spinner" />
              Cargando ranking...
            </div>
          )}

          {!loading && !dbError && leaderboard.length === 0 && (
            <p className="lb-empty">Aún no hay resultados registrados.</p>
          )}

          {!loading && !dbError && leaderboard.length > 0 && (
            <ul className="lb-list">
              {leaderboard.map((row, i) => {
                const isMe = saved && row.name === name && row.pct === pct;
                return (
                  <li key={row.id} className={`lb-row ${isMe ? "lb-row-me" : ""}`}>
                    <span className="lb-rank">
                      {i < 3 ? MEDAL[i] : `#${i + 1}`}
                    </span>
                    <span className="lb-name">{row.name}</span>
                    <span className="lb-score">
                      <span className="lb-pts">{row.score}/{row.total}</span>
                      <span className="lb-pct-badge" style={{
                        background: row.pct >= 75 ? "#dcfce7" : row.pct >= 60 ? "#fef3c7" : "#fee2e2",
                        color: row.pct >= 75 ? "#16a34a" : row.pct >= 60 ? "#b45309" : "#dc2626",
                      }}>
                        {row.pct}%
                      </span>
                    </span>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* BREAKDOWN */}
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
