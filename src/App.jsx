import { useState, useEffect } from "react";
import axios from "axios";
import Button from "./components/Button";

import "./App.css";

function App() {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]); //funcion para contar palabras en un texto

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    try {
      const responseApi = await axios.get("http://localhost:3000/api");
      //en data ya recibe el arreglo.
      const data = responseApi.data;

      setArticles(data);
      setFilteredArticles(data);
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };

  const conteoPalabras = (elemento) => {
    return elemento
      .replace(/[^a-zA-Z\s]/g, "")
      .trim()
      .split(/\s+/).length;
  };

  const FiltrarTitulosMasDeCinco = () => {
    const titulosMasDe5 = articles
      .filter((articulo) => conteoPalabras(articulo.title) > 5)
      .sort((artA, artB) => {
        // Se utiliza parseInt para convertir lo que devuelve el metodo split en la primera posicion del array
        const commentsA = parseInt(artA.numberComments.split(" ")[0]);
        const commentsB = parseInt(artB.numberComments.split(" ")[0]);
        return commentsB - commentsA;
      });
    console.log("FiltrarTitulosMasDeCinco");
    setFilteredArticles(titulosMasDe5);
  };

  const filtrarTitulosMenosDeCinco = () => {
    const titulosMenosDe5 = articles
      .filter((articulo) => conteoPalabras(articulo.title) <= 5)
      .sort((artA, artB) => {
        const pointsA = parseInt(artA.points.split(" ")[0]);
        const pointsB = parseInt(artB.points.split(" ")[0]);
        return pointsB - pointsA;
      });
    console.log("filtrarTitulosMenosDeCinco");
    setFilteredArticles(titulosMenosDe5);
  };
  const resetArticles = () => {
    setFilteredArticles(articles);
  };

  return (
    <>
      <div>
        <div style={{ textAlign: "center" }}>
          <h1>Lista de Artículos</h1>
        </div>
        <div className="container">
          <Button onSelect={() => FiltrarTitulosMasDeCinco()}>
            Filtrar mas de 5
          </Button>
          <Button onSelect={() => filtrarTitulosMenosDeCinco()}>
            Filtrar menos de 5
          </Button>
          <Button onSelect={() => resetArticles()}>Reset</Button>
        </div>

        <ul>
          {filteredArticles.map((article, index) => (
            <li key={index}>
              <p>
                {article.number} {article.title}
              </p>
              <p>
                <strong>Puntos:</strong> {article.points}
              </p>
              <p>
                <strong>Comentarios:</strong> {article.numberComments}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
export default App;
