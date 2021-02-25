import { useContext } from "react";

import { ChallengesContext } from "../contexts/ChallengeContext";

import styles from "../styles/components/Profile.module.css";

export function Profile() {
  const { level } = useContext(ChallengesContext);

  return (
    <div className={styles.profileContainer}>
      <img
        src="https://github.com/vitorrubim1.png"
        alt="Avatar do Vitor Rubim"
      />
      <div>
        <strong>Vitor Rubim</strong>
        <p>
          <img src="icons/level.svg" alt="Icone de level"/>
          Level {level}
        </p>
      </div>
    </div>
  );
}
