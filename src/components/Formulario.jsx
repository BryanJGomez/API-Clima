import React, { useState } from "react";
import Error from "./Error";
const Formulario = ({setBusquedad, busquedad, setConsultar}) => {


    const [error, SetError] = useState(false);

    //extraemos ciudad y busquedad
    const { ciudad, pais } = busquedad

    //funcion que coloca los elementos en el state
    const handChange = (e) => {
        //actualizamos sl state
        setBusquedad({
            ...busquedad,
            [e.target.name]: e.target.value
        });
    }

    //funcion para el evento submt
    const handleSubmit = (e) => {
        e.preventDefault();

        //validamos
        if (ciudad.trim() === '' || pais.trim() === '') {
            SetError(true);
            return;
        }

        SetError(false);
        //pasamos al componente principañ
        setConsultar(true);
    }

    return (
        <form onSubmit={handleSubmit}>
            {error ? <Error mensaje="Ambos campos son obligatorios" />: null}
            <div className="input-field col s12">
                <input
                    type="text"
                    name="ciudad"
                    id="ciudad"
                    value={ciudad}
                    onChange={handChange}
                />
                <label htmlFor="ciudad">Ciudad: </label>
            </div>

            <div className="input-field col s12">
                <select
                    name="pais"
                    id="pais"
                    value={pais}
                    onChange={handChange}
                >
                    <option value="">-- Seleccione un país --</option>
                    <option value="US">Estados Unidos</option>
                    <option value="MX">México</option>
                    <option value="SV">El Salvador</option>
                    <option value="AR">Argentina</option>
                    <option value="CO">Colombia</option>
                    <option value="CR">Costa Rica</option>
                    <option value="ES">España</option>
                    <option value="PE">Perú</option>
                </select>
                <label htmlFor="pais">País: </label>
            </div>
            <button
                    types="submit"
                    value="Buscar Clima"
                    className="waves-effect waves-light btn-large btn-block yellow accent-4 col s12"
                >Buscar Clima
                </button>
        </form>
    );
};

export default Formulario;
