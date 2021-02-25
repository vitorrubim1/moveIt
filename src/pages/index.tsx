import Head from "next/head";

import { CompletedChallenges } from "../components/CompletedChallenges";
import { ExperienceBar } from "../components/ExperienceBar";
import { ChallengeBox } from "../components/ChallengeBox";
import { CountDown } from "../components/CountDown";
import { Profile } from "../components/Profile";

import styles from "../styles/pages/Home.module.css";
import { CountDownProvider } from "../contexts/CountDownContext";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Início | move.it</title>
      </Head>

      <ExperienceBar />

      <CountDownProvider> {/*contexto do countDown só está por volta dos componentes que utiliza informações do contexto dele*/}
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
  );
}
