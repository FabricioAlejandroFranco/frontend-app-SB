import { useState, useEffect } from "react";
import axios from "axios";
import Button from "./components/Button";

import "./App.css";

export default function App() {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [logger, setLogger] = useState([]);

  let userName = "Fabricio";
  //extraigo los logs y y los convierto (JSON.parse)
  const savedLogs = localStorage.getItem("logs");

  useEffect(() => {
    const savedLogs = JSON.parse(localStorage.getItem("logs")) || [];
    setLogger(savedLogs);
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

    setFilteredArticles(titulosMasDe5);
    handleLogger(userName, "filter by number of comments");
  };

  const filtrarTitulosMenosDeCinco = () => {
    const titulosMenosDe5 = articles
      .filter((articulo) => conteoPalabras(articulo.title) <= 5)
      .sort((artA, artB) => {
        const pointsA = parseInt(artA.points.split(" ")[0]);
        const pointsB = parseInt(artB.points.split(" ")[0]);
        return pointsB - pointsA;
      });

    setFilteredArticles(titulosMenosDe5);
    handleLogger(userName, "filter by points");
  };

  const resetArticles = () => {
    setFilteredArticles(articles);
  };

  const handleLogger = (userName, filterName) => {
    const date = new Date(Date.now());
    const message = `The User: ${userName} has selected the ${filterName} on ${date}`;
    //creo array
    const updateLogs = [...logger, message];
    localStorage.setItem("logs", JSON.stringify(updateLogs));
    // envio mensaje y seteo estado
    saveLogsToLocalStorage(updateLogs);
    setLogger(updateLogs);
  };

  const saveLogsToLocalStorage = (message) => {
    //convierto message to string
    localStorage.setItem("logs", JSON.stringify(message));
  };
  // console.log("loggeer state", logger);
  // console.log("saved log", savedLogs);
  return (
    <>
      <div className="container">
        <Button onSelect={() => FiltrarTitulosMasDeCinco()}>
          Filter articles by number of comments.
        </Button>
        <Button onSelect={() => filtrarTitulosMenosDeCinco()}>
          Filter articles by points.
        </Button>
        <Button onSelect={() => resetArticles()}>Reset</Button>
      </div>
      <div>
        <h3>Log of selected filters by User:</h3>
        <ul>
          {logger.map((log, index) => (
            <li key={index}>
              <a>{log}</a>
            </li>
          ))}
          <h3>Saved Log</h3>
          <ul>
            {savedLogs}
            {/* {savedLogs.map((log, index) => (
                <li key={index}>
                  <a>{log}</a>
                </li>
              ))} */}
          </ul>
        </ul>
      </div>
      <div>
        <div style={{ textAlign: "center" }}>
          <h1>Articles</h1>
        </div>
        <ul>
          {filteredArticles.map((article, index) => (
            <li key={index}>
              <p>
                {article.number} {article.title}
              </p>
              <p>
                <strong>Points:</strong> {article.points}
              </p>
              <p>
                <strong>Comments:</strong> {article.numberComments}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
