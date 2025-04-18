import styles from "./app.module.css";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useCallback, useEffect, useState } from "react";

import { WORDS, Challenge } from "./utils/words";

import { Header } from "./components/Header";
import { Tip } from "./components/Tip";
import { Letter } from "./components/Letter";
import { Input } from "./components/Input";
import { Button } from "./components/Button";
import { LettersUsed, LettersUsedProps } from "./components/LettersUsed";

const ATTEMPTS_MAX = 5;

export default function App() {
  const [score, setScore] = useState(0);
  const [letter, setLetter] = useState("");
  const [lettersUsed, setLettersUsed] = useState<LettersUsedProps[]>([]);
  const [challenge, setChallenge] = useState<Challenge | null>(null);

  // function handleRestartGame() {
  //   const isConfirmed = window.confirm("Você realmente deseja reiniciar o jogo?");
  //   if (isConfirmed) {
  //     startGame();
  //   }
  // }
  function handleRestartGame() {
    startGame();
    toast.info("Jogo reiniciado.");
  }

  function startGame() {
    const index = Math.floor(Math.random() * WORDS.length);
    const randomWord = WORDS[index];
    setChallenge(randomWord);
    setScore(0);
    setLetter("");
    setLettersUsed([]);
  }

  function handleConfirm() {
    if (!challenge) {
      return;
    }

    if (!letter.trim()) {
      toast.warn("Digite uma letra");
    }

    const value = letter.toUpperCase();
    const exists = lettersUsed.find((used) => used.value.toUpperCase() === value);

    if (exists) {
      setLetter("");
      return toast.info("Você já utilizou a letra " + value);
    }

    const hits = challenge.word
      .toUpperCase()
      .split("")
      .filter((char) => char === value).length;

    const correct = hits > 0;
    const currentScore = score + hits

    setLettersUsed((prevState) => [...prevState, { value, correct }])
    setScore(currentScore);
    setLetter("");
  }

  const endGame = useCallback((message: string, success = true) => {
    if (success) {
      toast.success(message);
    } else {
      toast.error(message);
    }
    
    setTimeout(() => startGame(), 2000);
  }, []);

  useEffect(() => {
    startGame();
  }, [])

  useEffect(() => {
    if (!challenge) {
      return;
    }

    const timeout =setTimeout(() => {
      if (score === challenge.word.length) {
        return endGame("Parabéns, você adivinhou a palavra!", true);
      }

      const attemptLimit = challenge.word.length + ATTEMPTS_MAX;
      if (lettersUsed.length === attemptLimit) {
        return endGame("Que pena, você usou todas as tentativas. Tente novamente!", false);
      }
    }, 200)

    return () => clearTimeout(timeout);
  }, [score, lettersUsed.length, challenge, endGame]);

  if (!challenge) {
    return
  }

  return (
    <>
      <div className={styles.container}>
        <main>
          <Header 
            current={lettersUsed.length} 
            max={challenge.word.length + ATTEMPTS_MAX} 
            onRestart={handleRestartGame} 
          />
          <Tip tip={challenge.tip} />
          <div className={styles.word}>
            {
              challenge.word.split("").map((letter, index) => {
                const letterUsed = lettersUsed.find((used) => used.value.toUpperCase() === letter.toUpperCase());

                return (<Letter key={index} value={letterUsed?.value} color={letterUsed?.correct ? "correct" : "default"} />
                )
              })
            }
          </div>

          <h4>Palpite</h4>

          <div className={styles.guess}>
            <Input
              autoFocus
              maxLength={1}
              placeholder="?"
              value={letter}
              onChange={(e) => setLetter(e.target.value)}
            />
            <Button title="Confirmar" onClick={handleConfirm} />
          </div>

          <LettersUsed data={lettersUsed} />
        </main>
      </div>
      <ToastContainer position="top-center" />
    </>
  )
}
