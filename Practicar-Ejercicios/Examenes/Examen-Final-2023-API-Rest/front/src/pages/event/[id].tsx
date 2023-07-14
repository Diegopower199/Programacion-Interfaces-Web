import { gql, useMutation, useQuery } from "@apollo/client";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";

type Evento = {
  titulo: string;
  descripcion: string;
  fecha: Date;
  inicio: number;
  fin: number;
  invitados: string[];
  _id: string;
};

const Event = () => {
  const router = useRouter();
  const [data, setData] = useState<Evento | undefined>();
  const [errorBack, setErrorBack] = useState<{ error: string | undefined }>({
    error: undefined,
  });
  const [errorDatos, setErrorDatos] = useState<boolean>(false);
  

  const eventById = async (id: string) => {
    try {
      const requestOptions = {
        method: "GET",
      };

      const response = await fetch(
        `http://localhost:8080/event/${id}`,
        requestOptions
      );

      if (response.ok) {
        const result = await response.json();

        setData(result.evento);
        console.log("Informacion de result", result);
        setErrorBack({ error: undefined });
      } else {
        console.log("Error", await response.statusText);
        setErrorBack({ error: await response.statusText });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(
      "Solo estamos la primera vez, despues cada 5 segundos se carga la informacion"
    );
    const id = location.pathname.split('/').pop(); // Lo hacemos para coger la ultima parte de la ruta
    console.log("ID: ", id)
    if (id === undefined) {
        setErrorDatos(true);
    }
    else {
        eventById(id);
    }
    
    const intervalId = setInterval(() => {
      console.log("Initialized true");
      if (id === undefined) {
        setErrorDatos(true);
    }
    else {
        eventById(id);
    }
      console.log("HOLA: ", errorBack.error);
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <>
      <Link href={"/events"}>
        <BotonMenuPrincipal>
          Ir donde estan todos los eventos
        </BotonMenuPrincipal>
      </Link>
      <h1>Informacion del evento </h1>

      {errorBack.error !== undefined ? (
        <>
          <ErrorMessage>{errorBack.error}</ErrorMessage>
        </>
      ) : (
        <>
          {data === undefined ? (
            <>Cargando informacion</>
          ) : (
            <>
              <DivElementosSlot>
                <DivElemento>
                  <ParrafoTitulo>Title</ParrafoTitulo>
                  <ParrafoValores>{data.titulo}</ParrafoValores>
                </DivElemento>

                <DivElemento>
                  <ParrafoTitulo>Description</ParrafoTitulo>
                  <ParrafoValores>{data.descripcion}</ParrafoValores>
                </DivElemento>

                <DivElemento>
                  <ParrafoTitulo>Date</ParrafoTitulo>
                  <ParrafoValores>
                    {data.fecha.toString().substring(0, 10)}
                  </ParrafoValores>
                </DivElemento>

                <DivElemento>
                  <ParrafoTitulo>Start hour</ParrafoTitulo>
                  <ParrafoValores>{data.inicio}</ParrafoValores>
                </DivElemento>

                <DivElemento>
                  <ParrafoTitulo>End hour</ParrafoTitulo>
                  <ParrafoValores>{data.fin}</ParrafoValores>
                </DivElemento>
              </DivElementosSlot>
            </>
          )}
        </>
      )}
    </>
  );
};

export default Event;

const DivFormulario = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  background-color: #ffffff;
  padding: 20px;
  margin: 20px auto;
  width: 50%;
  box-shadow: 0px 0px 10px #aaaaaa;
`;

const DivElementoFormulario = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  margin: 3px;
`;

const InputSubmit = styled.input`
  border: none;
  padding: 10px 20px;
  color: white;
  font-size: 20px;
  background: #1a2537;
  //padding: 15px 20px;
  border-radius: 5px;
  box-sizing: border-box;
  cursor: pointer;
  transition: background-color 0.3s;
  :hover {
    background: cadetblue;
  }
`;

const LabelIdentificar = styled.label`
  display: block;
  margin-bottom: 10px;
  color: #333333;
  font-weight: bold;
  margin: 2px;
`;
const InputValores = styled.input`
  padding: 15px;
  border: 1px solid #aaaaaa;
  border-radius: 5px;
  width: 100%;
  box-sizing: border-box;
  //margin-bottom: 20px;
`;

const ParrafoErrores = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 4px;
  font-size: 20px;
  color: red;
`;

const BotonMenuPrincipal = styled.div`
  border: 1px solid #2e518b; /*anchura, estilo y color borde*/
  padding: 10px; /*espacio alrededor texto*/
  background-color: #2e518b; /*color botón*/
  color: #ffffff; /*color texto*/
  text-decoration: none; /*decoración texto*/
  text-transform: uppercase; /*capitalización texto*/
  font-family: "Helvetica", sans-serif; /*tipografía texto*/
  border-radius: 50px; /*bordes redondos*/

  width: 180px;

  :hover {
    cursor: pointer;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-weight: 600;
`;

const ItemsList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  width: 600px;
`;

const BotonBorrar = styled.button`
  font-weight: 600;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  transition: 0.3s;
`;

const DivElementosSlot = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: space-around;
  align-items: center;
  flex-direction: row;
  background-color: #424632;
  margin: 5px;
`;

const DivElemento = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: aqua;

  border: black 5px solid;
  height: 81px;
  width: 96px;
`;

const ParrafoTitulo = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  border: black 5px solid;
  width: 91px;
  height: 70px;
  margin: 0px;
  background-color: blueviolet;
`;

const ParrafoValores = styled.p`
  font-family: Arial, sans-serif;
  font-size: 18px;
  color: #333;
  line-height: 1.6em;
  text-align: justify;
  color: #2f2f2f;
  border-radius: 5px;
`;
