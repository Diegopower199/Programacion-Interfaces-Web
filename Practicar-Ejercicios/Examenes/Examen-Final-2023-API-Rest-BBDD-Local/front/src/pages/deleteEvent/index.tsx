import Link from "next/link";
import React, { useEffect, useState } from "react";
import styled from "styled-components";


type GetEvento = {
  titulo: string;
  descripcion: string;
  fecha: Date;
  inicio: number;
  fin: number;
  invitados: string[];
  _id: string;
};

const RemoveEvent = () => {
  const [data, setData] = useState<GetEvento[]>([]);
  const [errorBack, setErrorBack] = useState<{ error: string | undefined }>({ error: undefined, });
  const [idRemove, setIdRemove] = useState<string>("");
  const [responseRemoveFetch, setResponseRemoveFetch ] = useState<string>("");

  const removeEvent = async (idRemove: string) => {
    try {
      const requestOptions = {
        method: "DELETE",
      };
      console.log("requestOptions: ", requestOptions, "\nId remove: ", idRemove);

      const response = await fetch(
        `http://localhost:8080/deleteEvent/${idRemove}`,
        requestOptions
      );

      if (response.ok) {
        const result = await response.json();
        console.log("Resultado", result.message);
        setResponseRemoveFetch(result.message);
        setErrorBack({ error: undefined });
      } else {
        const result = await response.json();
        setErrorBack({ error: result.message }); // Esto es porque esta así en el back, un json con una variable que es message
        console.log("Error", await response.json());
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  const allEvents = async () => {
    try {
      const requestOptions = {
        method: "GET",
      };

      const response = await fetch(
        "http://localhost:8080/events",
        requestOptions
      );

      if (response.ok) {
        const result = await response.json();

        setData(result); // Esto es asi porque no devolvemos un JSON, si lo devolvemos debemos poner '.' y la variable que pongamos
        console.log("Informacion de result", result);
      } else {
        console.log("Error", await response.statusText);
        setErrorBack({ error: await response.statusText });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    allEvents();
  }, []);

  return (
    <>
      <Link href={"/"}>
        <BotonMenuPrincipal>Ir al menu principal</BotonMenuPrincipal>
      </Link>
      <BlueBorderMenu>
      <H1Titulo>Remove Event</H1Titulo>

      {errorBack.error !== undefined ? (
        <>
          <ErrorMessage>{errorBack.error}</ErrorMessage>
        </>
      ) : (
        <>
          { (!data || data.length === 0) ? (
            <>
              <p>No hay ningun evento a partir de la fecha actual</p>
            </>
          ) : (
            <>
              {data.map((event) => {
                return (
                  <>
                    <DivElementosSlot>
                      <DivElemento>
                        <ParrafoTitulo>Title</ParrafoTitulo>
                        <ParrafoValores>{event.titulo}</ParrafoValores>
                      </DivElemento>

                      <DivElemento>
                        <ParrafoTitulo>Description</ParrafoTitulo>
                        <ParrafoValores>{event.descripcion}</ParrafoValores>
                      </DivElemento>

                      <DivElemento>
                        <ParrafoTitulo>Date</ParrafoTitulo>
                        <ParrafoValores>
                          {event.fecha.toString().substring(0, 10)}
                        </ParrafoValores>
                      </DivElemento>

                      <DivElemento>
                        <ParrafoTitulo>Start hour</ParrafoTitulo>
                        <ParrafoValores>{event.inicio}</ParrafoValores>
                      </DivElemento>

                      <DivElemento>
                        <ParrafoTitulo>End hour</ParrafoTitulo>
                        <ParrafoValores>{event.fin}</ParrafoValores>
                      </DivElemento>

                      <DivElemento>
                        <ParrafoTitulo>Invitados</ParrafoTitulo>
                        <ParrafoValores>{event.invitados.toString()}</ParrafoValores>
                      </DivElemento>

                      <BotonBorrar
                        onClick={ async (e) => {
                            setIdRemove(event._id)
                            console.log("Id remove", idRemove)
                            await removeEvent(event._id);
                            console.log("todo bien")
                            await allEvents();
                        }}
                      >
                        <ImagenesIconos
                          src={"/trash.png"}
                          alt={"Esta cargando"}
                        ></ImagenesIconos>
                      </BotonBorrar>
                    </DivElementosSlot>
                  </>
                );
              })}
            </>
          )}
        </>
      )}
      </BlueBorderMenu>
    </>
  );
};

export default RemoveEvent;

const BlueBorderMenu = styled.div`
  font-weight: 600;
  font-size: 20px;
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 100px;
  padding-right: 100px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  overflow: hidden;
  white-space: nowrap;
  border: 7px solid #3b82f6;
  border-radius: 15px;
  margin: 10px;
`;

const H1Titulo = styled.h1`
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
`

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

export const ErrorMessage = styled.p`
  color: red;
  font-weight: 600;
`;

export const ItemsList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  width: 600px;
`;

export const BotonBorrar = styled.button`
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
  line-height: 1.5em;
  text-align: justify;
  color: #2f2f2f;
  border-radius: 5px;
`;

const ImagenesIconos = styled.img`
  margin: 3px;
  width: 50px;
  height: 60px;
  text-align: center;
  color: #999;
  box-sizing: border-box;
`;
