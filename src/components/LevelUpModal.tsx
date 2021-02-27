import { useContext } from "react";

import { ChallengesContext } from "../contexts/ChallengeContext";

import styles from "../styles/components/LevelUpModal.module.css";

export function LevelUpModal({ handleCloseModalLevelUp }) {
  const { level } = useContext(ChallengesContext);

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <header>{level}</header>
        <strong>Parabéns</strong>
        <p>Você alcançou um novo level</p>
      
        <button type="button" onClick={handleCloseModalLevelUp}>
          <img src="/icons/close.svg" alt="Icone de fechar o botão do modal"/>
        </button>
      </div>
    </div>
  );
}
