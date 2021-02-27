import "../styles/global.css";

//Arquivo onde coloco as coisas que irão se repetir na aplicação, como header, sidebar...

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
