import React, { useState, useEffect } from 'react';
import { getFullLeaderboard } from '../lib/supabase';

// Reutilizamos la misma constante de medallas
const MEDAL = ["🥇", "🥈", "🥉"];

export function LeaderboardList({ onClose }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getFullLeaderboard().then((res) => {
            setData(res);
            setLoading(false);
        });
    }, []);

    return (
        <>
            <div className="scroll-area">
                {loading ? (
                    <div className="lb-loading">Cargando ranking...</div>
                ) : (
                    <ul className="lb-list" style={{ marginTop: '0' }}>
                        {data.map((row, i) => (
                            <li key={row.id} className="lb-row">
                                {/* Lógica de medallas igual a ResultsScreen */}
                                <span className="lb-rank">
                                    {i < 3 ? MEDAL[i] : `#${i + 1}`}
                                </span>

                                <span className="lb-name">{row.name}</span>

                                <span className="lb-score">
                                    <span className="lb-pts">{row.score}/{row.total}</span>

                                    {/* Colores dinámicos iguales a ResultsScreen */}
                                    <span className="lb-pct-badge" style={{
                                        background: row.pct >= 75 ? "#dcfce7" : row.pct >= 60 ? "#fef3c7" : "#fee2e2",
                                        color: row.pct >= 75 ? "#16a34a" : row.pct >= 60 ? "#b45309" : "#dc2626",
                                    }}>
                                        {row.pct}%
                                    </span>
                                </span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <button className="btn-close-modal" onClick={onClose}>
                Cerrar
            </button>
        </>
    );
}