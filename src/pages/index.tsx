import { GetServerSideProps } from "next";
import Head from "next/head";

import { CompletedChallenges } from "../components/CompletedChallenges";
import { ExperienceBar } from "../components/ExperienceBar";
import { ChallengeBox } from "../components/ChallengeBox";
import { CountDown } from "../components/CountDown";
import { Profile } from "../components/Profile";

import styles from "../styles/pages/Home.module.css";

import { ChallengesProvider } from "../contexts/ChallengeContext";
import { CountDownProvider } from "../contexts/CountDownContext";

interface HomeProps {
  level: number,
  currentExperience: number,
  challengesCompleted: number,
}

export default function Home(props: HomeProps) {
  return (
    <ChallengesProvider 
      level={props.level} 
      currentExperience={props.currentExperience} 
      challengesCompleted={props.challengesCompleted}
    >
      <div className={styles.container}>
        <Head>
          <title>Início | move.it</title>
        </Head>

        <ExperienceBar />

        <CountDownProvider>
          {/*contexto do countDown só está por volta dos componentes que utiliza informações do contexto dele*/}
          <section>
            <div> {/*primeira coluna*/}
              <Profile />
              <CompletedChallenges />
              <CountDown />
            </div>

            <div> {/*segunda coluna*/}
              <ChallengeBox />
            </div>
          </section>
        </CountDownProvider>
      </div>
    </ChallengesProvider>
  );
}

//essa função é como se fosse um servidor node
//ela só pode retornar informações pra páginas, não componentes
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  //a função precisa ter esse nome e ser assíncrona
  //ctx: contexto

  const { level, currentExperience, challengesCompleted } = ctx.req.cookies; //pegando as informações do cookie

  return {
    //retorno pra função Home() nesse file mesmo
    props: {
      level: Number(level), //vem string, transformo em número
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted),
    },
  };
};
