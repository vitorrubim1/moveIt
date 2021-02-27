import { createContext, useState, ReactNode, useEffect } from "react";
import Cookies from "js-cookie";

import challenges from "../../challenges.json";

interface Challenge {
  //tipagem do challenge que retornarei do context
  type: "body" | "eye";
  description: string;
  amount: number;
}

interface ChallengeContextData {
  //dados
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  activeChallenge: Challenge;
  experienceToNextLevel: number;

  //funções
  levelUp: () => void; //pq é uma função sem retorno
  startNewChallenge: () => void;
  resetChallenge: () => void;
  completedChallenge: () => void;
}

interface ChallengesProviderProps {
  children: ReactNode;
}

export const ChallengesContext = createContext({} as ChallengeContextData); //crio o contexto

export function ChallengesProvider({ children }: ChallengesProviderProps) {
  const [level, setLevel] = useState(0);
  const [currentExperience, setCurrentExperience] = useState(0); //xp do user
  const [challengesCompleted, setChallengesCompleted] = useState(0); //desafios completos
  const [activeChallenge, setActiveChallenge] = useState(null); //challenge que foi sorteado

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2); //calculo de potencia pra subir o level


  useEffect(() => {
    //salvando nos cookies
    Cookies.set('level', String(level)); 
    Cookies.set('currentExperience', String(currentExperience)); 
    Cookies.set('challengesCompleted', String(challengesCompleted));
  }, [level, currentExperience, challengesCompleted]); //oq será observado é oq será gravado nos cookies

  useEffect(() => {
    Notification.requestPermission(); //pedindo permissão pra enviar notificação pro usuário
  }, []);

  function levelUp() {
    setLevel(level + 1);
  }

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(
      Math.random() * challenges.length
    ); /*
      challenges.lenght = vejo a quantidade de desafios dentro do arquivo
      Math.random() = sorteia um número aleatorio, entre 0 e a quantidade total de arquivos
      Math.floor() = pra não permitir números quebrados, somente inteiros
    */

    const challenge = challenges[randomChallengeIndex]; //pegando o numero sorteado aleatoriamente do array e desacoplando na variavel

    setActiveChallenge(challenge);

    new Audio('/notification.mp3').play(); //pra tocar o áudio

    if(Notification.permission === 'granted') { //caso o user permita a notificação
      new Notification("Novo desafio 💥️💪️", {
        body: `Valendo ${challenge.amount}xp!`
      })
    }
  }

  function resetChallenge() {
    setActiveChallenge(null);
  }

  function completedChallenge() {
    if (!activeChallenge) return; //o user tem que ter um desafio ativo, se não sai dessa função

    const { amount } = activeChallenge; //buscando a quantidade de xp que o challenge dá

    let finalExperience = currentExperience + amount; //experiencia final do user, experiencia atual + xp do desafio

    //se o xp for maior ou igual ao que falta pra subir de nível, upa o level
    if (finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel; /*
        se o user tiver com 80xp e o challenge tiver um xp de 80, mas oq falta pra upar é 120xp
        então vai ser 160xp - 120px
      */
      levelUp();
    }

    setCurrentExperience(finalExperience);
    setActiveChallenge(null);
    setChallengesCompleted(challengesCompleted + 1); //desafios completos
  }

  return (
    <ChallengesContext.Provider
      value={{
        //dados
        level,
        currentExperience,
        challengesCompleted,
        activeChallenge,
        experienceToNextLevel,

        //funções
        levelUp,
        startNewChallenge,
        resetChallenge,
        completedChallenge,
      }}
    >
      {/*uso o contexto, com o provider, que é pra prover os dados do value pra aplicação*/}
      {children}
    </ChallengesContext.Provider>
  );
}
