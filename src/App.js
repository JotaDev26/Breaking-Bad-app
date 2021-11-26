// debemos realizar una llamada a la api por medio de nuestro hook useEffect
import React, { useState, useEffect } from "react";
import Quote from "./componentes/Quote";
import Spinner from "./componentes/Spinner";

// abajo crearemos nuestra initialQuote que sera un objeto
const initialQuote = {
  // contendra 2 parammetros, el texto y el autor
  // le damos un valir inicial a cada uno para que la app no se vea en blanco
  text: "Quote",
  author: "Author",
};

function App() {
  // crearmos un nuevo estado para vincular la información de la nota especifica

  const [quote, setQuote] = useState(initialQuote); //este es nuestro parametro de hookState

  // cremos un loading
  const [loading, setLoading] = useState(false);

  // useEffect no acepta procesos asyncronos, así que toca crearlo desde afuera

  const updateQuote = async () => {
    // ahora haremos que nuestro estado cuando este actualizando se ponga en true
    setLoading(true);

    // esta ejecutara la llamada de la api y la actualización del estado

    // creamos una constante que almacene la url a la cual haremos la peticion
    const url = "https://www.breakingbadapi.com/api/quote/random";
    // ahora necesitamos realizar un fetch
    // como es un proceso asincrono necesitamos usar async await
    const res = await fetch(url);
    // para extraer la data necesitaremos:
    const [newQuote] = await res.json();
    // podemos destructurar el newQuote para lograr lo mismo
    const { quote, author } = newQuote;

    // almacenamos el nuevo estado del quote para que imprima en pantalla
    setQuote({
      // así es como vamos a obtener uestros datos
      text: quote,
      author: author,
    });

    // cuando nuestro estado termine de actualziar se pondra en false nuevamente
    setLoading(false);
  };

  // para poder utilizarlo lo llamamos
  // le pasamos una funcion que se ejecutara cuando algún parametro de nuestra dependencias cambie
  useEffect(() => {
    // desde aca llamaremos la función que llama a la api y actualiza el estado
    updateQuote();
  }, []);

  return (
    // le vamos dando modelo a nuestra app
    <div className="app">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/7/77/Breaking_Bad_logo.svg"
        alt="Logo"
      />
      {/* ahora haremos que el estado se actualice cada que presionemos un boton */}
      <button onClick={() => updateQuote()}>Get Another</button>
      {/* colocamos un operador ternario */}
      {loading ? <Spinner /> : <Quote quote={quote} />}

      {/* para hacer uso del componente que se acaba de crear toca importarlo y llamarlo */}
      {/* le indicamos de donde debe tomar los quote */}
      {/* <Quote quote={quote} /> */}
    </div>
  );
}

export default App;
