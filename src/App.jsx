import { useState, useEffect } from "react";
import axios from "axios";

import "./App.css";

function App() {
  const [articles, setArticles] = useState([]);
  const [tituloFiltradoMasDe5, setTituloFiltradoMasDe5] = useState([]);
  const [tituloFiltradoMenosDe5, setTituloFiltradoMenosDe5] = useState([]);

  //funcion para contar palabras en un texto
  const conteoPalabras = (elemento) => {
    return elemento
      .replace(/[^a-zA-Z\s]/g, "")
      .trim()
      .split(/\s+/).length;
  };

  const init = async () => {
    try {
      const responseApi = await axios.get("http://localhost:3000/api");
      //en data ya recibe el arreglo.
      const data = responseApi.data;

      setArticles(data);

      const titulosMasDe5 = data
        .filter((articulo) => conteoPalabras(articulo.title) > 5)
        .sort((artA, artB) => {
          const commentsA = parseInt(artA.numberComments.split(" ")[0]);
          const commentsB = parseInt(artB.numberComments.split(" ")[0]);
          return commentsB - commentsA;
        });
      setTituloFiltradoMasDe5(titulosMasDe5);

      const titulosMenosDe5 = data
        .filter((articulo) => conteoPalabras(articulo.title) <= 5)
        .sort((artA, artB) => {
          const pointsA = parseInt(artA.points.split(" ")[0]);
          const pointsB = parseInt(artB.points.split(" ")[0]);
          return pointsB - pointsA;
        });
      setTituloFiltradoMenosDe5(titulosMenosDe5);

      console.log("setTituloFiltradoMasDe5", data);
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <>
      <div>
        <h1>Lista de Artículos</h1>
        <ul>
          {articles.map((article, index) => (
            <li key={index}>
              <h3>
                {article.number} {article.title}
              </h3>
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

      <p>
        <h2>Articulos con mas de 5 palabras y ordenado por comentarios</h2>
        <ul></ul>
      </p>
      <ul>
        {tituloFiltradoMasDe5.map((article, index) => (
          <li key={index}>
            <h3>
              {article.number} {article.title}
            </h3>

            <p>
              <strong>Comentarios:</strong> {article.numberComments}
            </p>
          </li>
        ))}
      </ul>

      <p>
        <span>
          Articulos con menos o igual a 5 palabras y ordenado por puntos
        </span>
        <ul></ul>
      </p>
      <ul>
        {tituloFiltradoMenosDe5.map((article, index) => (
          <li key={index}>
            <h3>
              {article.number} {article.title}
            </h3>
            <p>
              <strong>Puntos:</strong> {article.points}
            </p>
            <p>
              <strong>Comentarios:</strong> {article.numberComments}
            </p>
          </li>
        ))}
      </ul>
    </>
  );
}
export default App;
