import { use, useState } from "react";
import styled from "styled-components";
import Image from 'next/image';
import ReactDOM from "react-dom";
import app from "next/app";
import { NormalizeError } from "next/dist/shared/lib/utils";


const TablaFormulario = ()  => {

    const [nombreError, setNombreError] = useState<boolean>(false);
    const [dniError, setDniError] = useState<boolean>(false);
    const [nombre, setNombre] = useState<string>("");
    const [dni, setDni] = useState<string>("");
    const [listaNombre, setListaNombre] = useState<string[]>([]);
    const [listaDni, setListaDni] = useState<string[]>([]);


    let inicializarNombre: boolean = false;
    let inicializarDni: boolean = false;

    const validateNameConError = (name: string) : boolean => {
        console.log(name);
        inicializarNombre = true;
        console.log("inicializarNombre: ", inicializarNombre, " \n\ninicializarDni: ", inicializarDni)
        if (/^([A-ZÁÉÍÓÚ]{1}[a-zñáéíóú]+[\s]*)+$/.test(name)) {
            return false;
        }
        else {
            return true;
        }
    }


    const validateDniConError = (dni: string) : boolean => {
        const validDni = "/^[0-9]{8}[BCDFGHJKLMNPRSTVWXYZ]{1}$/";
        inicializarDni = true;
        console.log("validateDniConError\ninicializarNombre: ", inicializarNombre, " \n\ninicializarDni: ", inicializarDni, "\n")

        if (/^[0-9]{8}[BCDFGHJKLMNPRSTVWXYZ]{1}$/.test(dni)) {
            return false;
        }
        else {
            return true;
        }
    }

    const addToTable = () => {
        console.log(nombreError, "\n", dniError, "\n", inicializarNombre, "\n", inicializarDni);


        if ((nombreError || dniError) || ((inicializarNombre === false) || (inicializarDni === false))) {
            console.log("Algun dato esta mal");
            alert("El nombre o Dni no estan completos y estan incorrectos")
        }


    }


    return (
        <>


        <h1>Informacion de personas</h1>

        <DivContainerTable id="tablaInformacion">

            <DivTitle>Datos del usuario</DivTitle>

            <DivHeader>Nombre</DivHeader>            
            <DivHeader>DNI</DivHeader>
            <DivHeader>Borrar informacion</DivHeader>

            <DivElementosPorColumna>
            {listaNombre.map((item, index) => (
                <DivContainerElementos key={index}>{item}</DivContainerElementos>
            ))}
            </DivElementosPorColumna>
            
            <DivElementosPorColumna>
            {listaDni.map((item, index) => (
                <DivContainerElementos key={index}>{item}</DivContainerElementos>
            ))}
            </DivElementosPorColumna>

            <DivElementosPorColumna>
            {listaNombre.map((item, index) => (
                <DivContainerElementos>
                <Image src="/Imagenes/papelera.jpg" alt="una foto" width={30} height={18} onClick={() => {
                setListaDni(listaDni.filter((_, i) => i !== index));
                setListaNombre(listaNombre.filter((_, i) => i !== index));
                }}></Image>
                </DivContainerElementos>
            ))}
            </DivElementosPorColumna>


            

            
            
            
        </DivContainerTable>


        
        <DivFormulario>
            <DivSepararComponentesFormulario>
                Introdude tu nombre: <InputFormulario id="textoNombre" type="text" placeholder="Nombre" onBlur={(e) => setNombreError(validateNameConError(e.target.value))}
                onChange={(e) => {
                    if (nombreError) {
                        console.log(nombreError)
                        setNombreError(validateNameConError(e.target.value))}
                        setNombre(e.target.value);
                    }
                }/>
                
                {nombreError && <>  El nombre es incorrecto</>}
            </DivSepararComponentesFormulario>
                
            <DivSepararComponentesFormulario>
                Introdude tu dni: <InputFormulario id="textoDni" type="text" placeholder="Dni" maxLength={9} onBlur={(e) => setDniError(validateDniConError(e.target.value))}
                onChange={(e) => {
                    if (dniError) {
                        console.log(dniError)
                        setDniError(validateDniConError(e.target.value))}
                        setDni(e.target.value);
                    }
                }/>
                
                {dniError && <>  El Dni es incorrecto</>}
            </DivSepararComponentesFormulario>

            <BotonAdd type="button" onClick={() => {
                setListaNombre( [...listaNombre, nombre] );
                setListaDni( [...listaDni, dni] );
                console.log("hola");
            }}>Añadir a la tabla estos valores</BotonAdd>

        </DivFormulario>

                <h3>Nombre Error: {nombreError ? "True" : "False"}</h3>
                <h3>Dni Error: {dniError ? "True" : "False"}</h3>
                <h3>Inicializar nombre: {inicializarNombre ? "True" : "False"}</h3>
                <h3>Inicializar Dni: {inicializarDni ? "True" : "False"}</h3>
        </>
    )
}

const InputFormulario = styled.input`
    background-color: white;
`

const DivContainerTable = styled.div`
    background-color: white;
    margin: 50px auto;
    box-shadow: 0 0 20px #333;
    border: 3px solid black;


    width: 1650px;

    display: grid;
    grid-template-columns: repeat(3, 1fr); // Significa que se hagan 2 columnas y se repartan en 2 fracciones
    grid-auto-rows: 55px; // El alto de cada filas es de 50 pixeles
`

const DivTitle = styled.div`
    grid-column-start: 1;
    grid-column-end: 4; // Ponemos 4 porque la el borde de la tabla cuenta como linea

    background: rgba(40, 65, 120, 1);
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    font-size: 30px;
    border: 2px solid black;
`

const DivHeader = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    

    font-weight: bold;
    font-size: 25px;
    border: 3px solid black;
    background-color: rgba(208, 31, 31, 1);
`

const DivElementosPorColumna = styled.div`
    display: flex;
    flex-direction: column;
    background-color: pink;
    

`

const DivContainerElementos = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    background-color: yellow;

    height: 50px;
    width: 524px;
    font-size: 16px;
    padding: 10px;
    border: 3px solid black;
`


const DivFormulario = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    margin: 10px;
`

const DivSepararComponentesFormulario = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;

    padding: 10px;
`

const BotonAdd = styled.button`
    min-width: 130px;
    height: 40px;
    color: #fff;
    padding: 5px 10px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    display: inline-block;
    outline: none;
    border-radius: 5px;
    border: 2px solid #212529;
    background: #212529;
        
`





export default TablaFormulario;

/*
<DivContainerElementos id="gonza" className="sanz">Diego</DivContainerElementos>
    Estamos creado esto porque necesitamos que next genere la clase asociada, y el diseño lo hacemos con los styled-components
*/

/*
<DivContainerElementos>Diego</DivContainerElementos>
            <DivContainerElementos>05953694Y</DivContainerElementos>
            <DivContainerElementos> <Image src="/Imagenes/papelera.jpg" alt="una foto" width={40} height={40} onClick={eliminarDatoTabla}/> </DivContainerElementos>

            <DivContainerElementos>Julio</DivContainerElementos>
            <DivContainerElementos>12345678U</DivContainerElementos>
            <DivContainerElementos> <Image src="/Imagenes/papelera.jpg" alt="una foto" width={40} height={40} onClick={eliminarDatoTabla}/></DivContainerElementos>
*/