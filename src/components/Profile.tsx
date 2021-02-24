import styles from "../styles/components/Profile.module.css";

export function Profile() {
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
          Level 1
        </p>
      </div>
    </div>
  );
}
