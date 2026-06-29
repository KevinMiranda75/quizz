import React, { useState } from "react";
import "./styles/global.css";
import { questions } from "./data/questions";
import StartScreen from "./components/StartScreen";
import QuizScreen from "./components/QuizScreen";
import ResultsScreen from "./components/ResultsScreen";

const SCREENS = { START: "start", QUIZ: "quiz", RESULTS: "results" };

export default function App() {
  const [screen, setScreen] = useState(SCREENS.START);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [history, setHistory] = useState([]);

  const handleStart = () => {
    setScreen(SCREENS.QUIZ);
    setCurrentIndex(0);
    setScore(0);
    setHistory([]);
  };

  const handleAnswer = (correct) => {
    const newScore = correct ? score + 1 : score;
    const newHistory = [
      ...history,
      { question: questions[currentIndex].question, correct },
    ];

    if (currentIndex + 1 >= questions.length) {
      setScore(newScore);
      setHistory(newHistory);
      setScreen(SCREENS.RESULTS);
    } else {
      setScore(newScore);
      setHistory(newHistory);
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleRestart = () => {
    setScreen(SCREENS.START);
  };

  return (
    <>
      {screen === SCREENS.START && (
        <StartScreen onStart={handleStart} totalQuestions={questions.length} />
      )}
      {screen === SCREENS.QUIZ && (
        <QuizScreen
          question={questions[currentIndex]}
          index={currentIndex}
          total={questions.length}
          score={score}
          onAnswer={handleAnswer}
        />
      )}
      {screen === SCREENS.RESULTS && (
        <ResultsScreen
          score={score}
          total={questions.length}
          history={history}
          onRestart={handleRestart}
        />
      )}
    </>
  );
}
