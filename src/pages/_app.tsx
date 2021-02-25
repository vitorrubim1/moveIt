import "../styles/global.css";

//Arquivo onde coloco as coisas que irão se repetir na aplicação, como header, sidebar...

import { ChallengesProvider } from "../contexts/ChallengeContext";

function MyApp({ Component, pageProps }) {
  return (
    <ChallengesProvider>
      <Component {...pageProps} />
    </ChallengesProvider>
  );
}

export default MyApp;
