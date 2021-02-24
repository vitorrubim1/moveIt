import { useEffect, useState } from "react";

import styles from "../styles/components/CountDown.module.css";

let countDownTimeOut: NodeJS.Timeout;

export function CountDown() {
  const [time, setTime] = useState(0.1 * 60); //25minutos * 60segundos
  const [isActive, setIsActive] = useState(false); //estado que armazena se o countDown está ativo ou não
  const [hasFinished, setHasFinished] = useState(false); //state pra quando o countDown tiver finalizado

  const minutes = Math.floor(time / 60); //número de minutos, arredondando pra baixo
  const seconds = time % 60; //pegando o "resto", ex: 17:32, 32: resto

  const [secondsLeft, secondsRight] = String(seconds)
    .padStart(2, "0")
    .split("");
  const [minuteLeft, minuteRight] = String(minutes)
    .padStart(2, "0")
    .split(
      ""
    ); /*
    transformando o "minutes" em String()
    .padStart(2, '0'): verifica se há dois digitos, ex: 25, se houver faz o split(''). Se não acrescenta o '0' a esquerda
    split(''): separa os dois digítos, ex: '2' '5'.
  */

  function startCountDown() {
    setIsActive(true); //vai startar o countDown
  }

  function resetCountDown() {
    clearTimeout(countDownTimeOut); //cancelando a execução do setTimeout
    setIsActive(false); //vai parar o countDown
    setTime(0.1 * 60); //zerando o contador
  }

  useEffect(() => {
    if (isActive && time > 0) {
      countDownTimeOut = setTimeout(() => {
        setTime(time - 1); //reduz um segundo do tempo
      }, 1000); //espera um segundo
    } else if (isActive && time === 0) {
      setHasFinished(true);
      setIsActive(false);
    }
  }, [isActive, time]);

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
