import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { ChallengesContext } from "./ChallengeContext";

interface CountDownContextData {
  //dados
  minutes: number;
  seconds: number;
  hasFinished: boolean;
  isActive: boolean;

  //funções
  startCountDown: () => void;
  resetCountDown: () => void;
}

interface CountDownProviderProps {
  children: ReactNode;
}

export const CountDownContext = createContext({} as CountDownContextData); //criando o contexto

let countDownTimeOut: NodeJS.Timeout; //pra pausar o setTimeout

export function CountDownProvider({ children }: CountDownProviderProps) {
  const { startNewChallenge } = useContext(ChallengesContext); //contexto de challenge

  const [time, setTime] = useState(0.1 * 60); //25minutos * 60segundos
  const [isActive, setIsActive] = useState(false); //estado que armazena se o countDown está ativo ou não
  const [hasFinished, setHasFinished] = useState(false); //state pra quando o countDown tiver finalizado

  const minutes = Math.floor(time / 60); //número de minutos, arredondando pra baixo
  const seconds = time % 60; //pegando o "resto", ex: 17:32, 32: resto

  function startCountDown() {
    setIsActive(true); //vai startar o countDown
  }

  function resetCountDown() {
    clearTimeout(countDownTimeOut); //cancelando a execução do setTimeout
    setIsActive(false); //vai parar o countDown
    setTime(0.1 * 60); //zerando o contador
    setHasFinished(false); //pro botão poder iniciar o countdown novamente
  }

  useEffect(() => {
    if (isActive && time > 0) {
      countDownTimeOut = setTimeout(() => {
        setTime(time - 1); //reduz 1s do tempo
      }, 1000); //espera um segundo
    } else if (isActive && time === 0) {
      setHasFinished(true);
      setIsActive(false);
      startNewChallenge(); //chamo uma função do context pra começar um novo desafio
    }
  }, [isActive, time]);

  return (
    <CountDownContext.Provider
      value={{
        //dados
        minutes,
        seconds,
        hasFinished,
        isActive,

        //funções
        startCountDown,
        resetCountDown
      }}
    >
      {children}
    </CountDownContext.Provider>
  );
}
