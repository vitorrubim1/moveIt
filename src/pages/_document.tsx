import Document, { Html, Head, Main, NextScript } from "next/document";

//esse arquivo só carrega uma vez assim que o usuário carrega a aplicação, por isso as fontes vem aqui.

export default class MyDocument extends Document {
  //exporta um classe, pq é o recomendado pela doc
  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Rajdhani:wght@600&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript /> 
        </body>
      </Html>
    );
  }
}
