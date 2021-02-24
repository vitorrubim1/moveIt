import Head from "next/head";

import { CompletedChallenges } from "../components/CompletedChallenges";
import { ExperienceBar } from "../components/ExperienceBar";
import { CountDown } from "../components/CountDown";
import { Profile } from "../components/Profile";

import styles from "../styles/pages/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Inícion | moveIt</title>
      </Head>

      <ExperienceBar />

      <section>
        <div>{/*primeira coluna*/}
          <Profile />
          <CompletedChallenges />
          <CountDown />
        </div>

        <div> {/*segunda coluna*/}</div>
      </section>
    </div>
  );
}
