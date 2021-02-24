import { useEffect, useState } from "react";

import styles from "../styles/components/CountDown.module.css";

export function CountDown() {
  const [time, setTime] = useState(25 * 60); //25minutos * 60segundos
  const [active, setActive] = useState(false); //estado que armazena se o countDown está ativo ou não

  const minutes = Math.floor(time / 60); //número de minutos, arredondando pra baixo
  const seconds = time % 60; //pegando o "resto", ex: 17:32, 32: resto

  const [secondsLeft, secondsRight] = String(seconds).padStart(2, '0').split('');
  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split(''); /*
    transformando o "minutes" em String()
    .padStart(2, '0'): verifica se há dois digitos, ex: 25, se houver faz o split(''). Se não acrescenta o '0' a esquerda
    split(''): separa os dois digítos, ex: '2' '5'.
  */

  function startCountDown(){
    setActive(true); //vai startar o countDown
  }

  useEffect(() => {
    if(active && time > 0) {
      setTimeout(() => {
        setTime(time - 1); //reduz um segundo do tempo
      }, 1000) //espera um segundo
    }
  }, [active, time]);

  return (
    <div>
      <div className={styles.countDownContainer}>
        <div>
          <span>{minuteLeft}</span> {/*representa o primeiro digito do minuto*/}
          <span>{minuteRight}</span> {/*representa o segundo digito do minuto*/}
        </div>
        <span>:</span>
        <div>
          <span>{secondsLeft}</span> {/*representa o primeiro digito do segundo*/}
          <span>{secondsRight}</span> {/*representa o segundo digito do segundo*/}
        </div>
      </div>

      <button 
        type="button" 
        className={styles.countDownButton} 
        onClick={startCountDown}
      >
        Iniciar um ciclo
      </button>
    </div>
  );
}
