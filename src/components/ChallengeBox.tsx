import { useContext } from "react";

import { ChallengesContext } from "../contexts/ChallengeContext";
import { CountDownContext } from "../contexts/CountDownContext";

import styles from "../styles/components/ChallengeBox.module.css";

export function ChallengeBox() {
  const { activeChallenge, resetChallenge, completedChallenge } = useContext(
    ChallengesContext
  ); //contexto de desafios
  const { resetCountDown, startCountDown } = useContext(CountDownContext); //contexto de countdown

  function handleChallengeSucceeded() { //completar o desafio
    completedChallenge();
    resetCountDown();

  }

  function handleChallengeFailed() { //falhar no desafio
    resetChallenge();
    resetCountDown();
  }

  return (
    <div className={styles.challengeBoxContainer}>
      {activeChallenge ? (
        <div className={styles.challengeActive}>
          <header>Ganhe {activeChallenge.amount} xp</header>

          <main>
            <img src={`icons/${activeChallenge.type}.svg`} alt="Icone" />
            <strong>Novo desafio</strong>
            <p>{activeChallenge.description}</p>
          </main>

          <footer>
            <button
              type="button"
              className={styles.challengeFailedButton}
              onClick={handleChallengeFailed}
            >
              Falhei
            </button>
            <button
              type="button"
              className={styles.challengeSucceededButton}
              onClick={handleChallengeSucceeded}
            >
              Completei
            </button>
          </footer>
        </div>
      ) : (
        <div className={styles.challengeNotActive}>
          <strong>
            Inicie um ciclo para receber desafios a serem completados
          </strong>
          <p>
            <img src="icons/level-up.svg" alt="Level up icon" />
            Avance de level completando desafios.
          </p>
        </div>
      )}
    </div>
  );
}
