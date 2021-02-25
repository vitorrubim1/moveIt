import { useContext } from "react";

import { CountDownContext } from "../contexts/CountDownContext";

import styles from "../styles/components/CountDown.module.css";

export function CountDown() {
  const { 
    hasFinished, 
    startCountDown, 
    resetCountDown, 
    minutes, 
    seconds, 
    isActive
  } = useContext(CountDownContext);

  const [secondsLeft, secondsRight] = String(seconds).padStart(2, "0").split("");
  const [minuteLeft, minuteRight] = String(minutes).padStart(2, "0").split(""); /*
    transformando o "minutes" em String()
    .padStart(2, '0'): verifica se há dois digitos, ex: 25, se houver faz o split(''). Se não acrescenta o '0' a esquerda
    split(''): separa os dois digítos, ex: '2' '5'.
  */

  return (
    <div>
      <div className={styles.countDownContainer}>
        <div>
          <span>{minuteLeft}</span> {/*representa o primeiro digito do minuto*/}
          <span>{minuteRight}</span> {/*representa o segundo digito do minuto*/}
        </div>
        <span>:</span>
        <div>
          <span>{secondsLeft}</span>
          {/*representa o primeiro digito do segundo*/}
          <span>{secondsRight}</span>
          {/*representa o segundo digito do segundo*/}
        </div>
      </div>

      {hasFinished ? (
        <button
          disabled
          type="button"
          className={`${styles.countDownButton}`}
          onClick={resetCountDown}
        >
          Ciclo encerrado
          <img src="icons/completed.svg" alt="Icone de conclusão"/>
        </button>
      ) : (
        <>
          {isActive ? (
            <button
              type="button"
              className={`${styles.countDownButton} ${styles.countDownButtonActive}`}
            >
              Abandonar ciclo
            </button>
          ) : (
            <button
              type="button"
              className={styles.countDownButton}
              onClick={startCountDown}
            >
              Iniciar ciclo
            </button>
          )}
        </>
      )}
    </div>
  );
}
