import React, { useState } from "react";
import "../styles/QuizScreen.css";

const LABELS = ["A", "B", "C", "D"];

export default function QuizScreen({ question, index, total, score, onAnswer }) {
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);

  const handleSelect = (i) => {
    if (answered) return;
    setSelected(i);
    setAnswered(true);
  };

  const handleNext = () => {
    onAnswer(selected === question.correct);
    setSelected(null);
    setAnswered(false);
  };

  const progress = ((index) / total) * 100;

  const getOptionClass = (i) => {
    if (!answered) return "option-btn";
    if (i === question.correct) return "option-btn correct";
    if (i === selected && selected !== question.correct) return "option-btn wrong";
    return "option-btn dimmed";
  };

  return (
    <div className="quiz-wrapper">
      <div className="quiz-header">
        <div className="quiz-progress-bar">
          <div
            className="quiz-progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="quiz-meta">
          <span className="q-counter">
            Pregunta {index + 1} <span className="q-of">/ {total}</span>
          </span>
          <span className="q-score">⭐ {score} pts</span>
        </div>
      </div>

      <div className="quiz-body">
        <p className="question-text">{question.question}</p>

        <div className="options-list">
          {question.options.map((opt, i) => (
            <button
              key={i}
              className={getOptionClass(i)}
              onClick={() => handleSelect(i)}
              disabled={answered}
            >
              <span className="opt-label">{LABELS[i]}</span>
              <span className="opt-text">{opt}</span>
              {answered && i === question.correct && (
                <span className="opt-icon">✓</span>
              )}
              {answered && i === selected && selected !== question.correct && (
                <span className="opt-icon">✗</span>
              )}
            </button>
          ))}
        </div>

        {answered && (
          <div className={`feedback ${selected === question.correct ? "feedback-ok" : "feedback-bad"}`}>
            <span className="feedback-emoji">
              {selected === question.correct ? "🎉" : "💡"}
            </span>
            <p>{question.explanation}</p>
          </div>
        )}

        {answered && (
          <button className="btn-next" onClick={handleNext}>
            {index + 1 < total ? "Siguiente pregunta →" : "Ver resultados →"}
          </button>
        )}
      </div>
    </div>
  );
}
