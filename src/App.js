import React, { Fragment, useState, useEffect } from "react";
import Header from "./components/Header";
import Formulario from "./components/Formulario";
import Clima from "./components/Clima";
import Error from "./components/Error";

function App() {

  const [busquedad, setBusquedad] = useState({
    ciudad: '',
    pais: ''
  });
  const { ciudad, pais } = busquedad;

  const [consultar, setConsultar] = useState(false);
  const [resultado, setResultado] = useState({});
  const [error, setError] = useState(false)

  useEffect(() => {
    const consultarAPI = async () => {
      if (consultar) {
        const apiID = 'c6b60aba7240768afcf660c59e575457';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${apiID}`;
        const respuesta = await fetch(url);
        const result = await respuesta.json();
        setResultado(result);
        setConsultar(false);

        if(resultado.cod==="404"){
          setError(true);
        }
        else{
          setError(false);
        }
      }
    }
    //llamamos a la API
    consultarAPI();
  }, [consultar, pais, ciudad, resultado]);
  let componentes;
  if(error){
    componentes = <Error mensaje="No hay Resultados" />
  }else{
    componentes=  <Clima resultado={resultado} />
  }


  return (
    <Fragment>
      <Header titulo="Clima" />
      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col m6 s12">
              <Formulario setConsultar={setConsultar} busquedad={busquedad} setBusquedad={setBusquedad} />
            </div>
            <div className="col m6 s12">{componentes}</div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
