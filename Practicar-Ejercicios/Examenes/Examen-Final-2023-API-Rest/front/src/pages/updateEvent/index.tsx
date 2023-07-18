import { gql, useMutation, useQuery } from "@apollo/client";
import Link from "next/link";
import { useEffect, useState } from "react";
import styled from "styled-components";
import React from "react";

type GetEvento = {
  _id: string;
  titulo: string;
  descripcion: string;
  fecha: Date;
  inicio: number;
  fin: number;
  invitados: string[];
};

const UpdateEvent = () => {
  const [errorBackGet, setErrorBackGet] = useState<{
    error: string | undefined;
  }>({
    error: undefined,
  });
  const [errorBackUpdate, setErrorBackUpdate] = useState<{
    error: string | undefined;
  }>({
    error: undefined,
  });

  const [errorFecha, setErrorFecha] = useState<boolean>(false);
  const [errorHoraInicioFinalizacion, setErrorHoraInicioFinalizacion] =
    useState<boolean>(false);
  const [errorDatos, setErrorDatos] = useState<boolean>(false);

  const [data, setData] = useState<GetEvento[]>([]);

  const [editIdSelected, setEditIdSelected] = useState<string>("");

  // de la misma forma, este estado guarda la fecha del evento a editar
  // para posteriormente mostrarla en el formulario
  const [auxDate, setAuxDate] = useState<Date>(new Date());

  // estados para gestionar los parámetros de los eventos a editar
  const [updateEventDate, setUpdateEventDate] = useState<string>("");
  const [updateEventTitle, setUpdateEventTitle] = useState<string>("");
  const [updateEventDesc, setUpdateEventDesc] = useState<string>("");
  const [updateEventStart, setUpdateEventStart] = useState<string>("");
  const [updateEventEnd, setUpdateEventEnd] = useState<string>("");
  const [updateEventInvitados, setUpdateEventInvitados] = useState<string[]>([
    "",
  ]);

  const updateEvent = async () => {
    try {
      console.log("Update Event Date: ", updateEventDate);

      let partesFecha = updateEventDate.split(/[\/-]/); // Expresion regular para eliminar cuando hay '/' o '-'
      let day = "";
      let month = "";
      let year = "";

      let fechaCorrecta = "";

      if (updateEventDate.includes("/")) {
        day = partesFecha[0];
        month = partesFecha[1];
        year = partesFecha[2];

        console.log("Día:", day, "Mes:", month, "Año:", year);
        fechaCorrecta = `${year}/${month.toString().padStart(2, "0")}/${day
          .toString()
          .padStart(2, "0")}`;
        console.log("Fecha correcta: ", fechaCorrecta);
      } else if (updateEventDate.includes("-")) {
        year = partesFecha[0];
        month = partesFecha[1];
        day = partesFecha[2];
        // Convertir los valores a números
        let numericDay = parseInt(day, 10);
        let numericMonth = parseInt(month, 10);
        let numericYear = parseInt(year, 10);

        // Agregar un día a la fecha
        numericDay = numericDay + 1;

        // Verificar si es necesario actualizar el mes y el año
        if (numericDay > 31) {
          numericDay = 1;
          numericMonth = numericMonth + 1;
          if (numericMonth > 12) {
            numericMonth = 1;
            numericYear = numericYear + 1;
          }
        }

        console.log("Día:", day, "Mes:", month, "Año:", year);

        fechaCorrecta = `${numericYear}/${numericMonth
          .toString()
          .padStart(2, "0")}/${numericDay.toString().padStart(2, "0")}`;

        //fechaCorrecta = `${year}/${month.toString().padStart(2, "0")}/${day.toString().padStart(2, "0")}`;
        console.log("Fecha correcta: ", fechaCorrecta);
      }

      const objetoFecha = new Date(fechaCorrecta);

      console.log("Objeto fecha: ", objetoFecha);

      const requestOptions = {
        method: "PUT",
        body: JSON.stringify({
          id: editIdSelected,
          titulo: updateEventTitle,
          descripcion: updateEventDesc,
          fecha: objetoFecha,
          inicio: Number(updateEventStart),
          fin: Number(updateEventEnd),
          invitados: updateEventInvitados,
        }),
      };
      console.log("requestOptions: ", requestOptions);

      const response = await fetch(
        "http://localhost:8080/updateEvent",
        requestOptions
      );

      if (response.ok) {
        const result = await response.json();
        console.log("Result response ok true: ", result);
        setErrorBackUpdate({ error: undefined });
      } else {
        const result = await response.json();
        console.log("Result response ok false: ", result);
        setErrorBackUpdate({ error: result.message }); // Esto es porque esta así en el back, un json con una variable que es message
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

        setData(result.eventos);
        console.log("Informacion de result", result);
        setErrorBackGet({ error: undefined });
      } else {
        const result = await response.json();
        console.log("Error", result.message);
        setErrorBackGet({ error: result.message });
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
      <RedBorderMenu>
        <H1Titulo>Update Event</H1Titulo>
        {errorBackGet.error ? (
          <ErrorMessage>{errorBackGet.error}</ErrorMessage>
        ) : (
          <>
            {!data || data.length === 0 ? (
              <>
                <p>No hay ningun evento a partir de la fecha actual</p>
              </>
            ) : (
              <>
                {data.map((event) => {
                  const date = new Date(event.fecha);
                  return (
                    <>
                      <DivElementosSlot>
                        <DivElemento>
                          <ParrafoTitulo>Titulo</ParrafoTitulo>
                          <ParrafoValores>{event.titulo}</ParrafoValores>
                        </DivElemento>

                        <DivElemento>
                          <ParrafoTitulo>Descripcion</ParrafoTitulo>
                          <ParrafoValores>{event.descripcion}</ParrafoValores>
                        </DivElemento>

                        <DivElemento>
                          <ParrafoTitulo>Fecha</ParrafoTitulo>
                          <ParrafoValores>
                            {event.fecha.toString().substring(0, 10)}
                          </ParrafoValores>
                        </DivElemento>

                        <DivElemento>
                          <ParrafoTitulo>Inicio</ParrafoTitulo>
                          <ParrafoValores>{event.inicio}</ParrafoValores>
                        </DivElemento>

                        <DivElemento>
                          <ParrafoTitulo>Fin</ParrafoTitulo>
                          <ParrafoValores>{event.fin}</ParrafoValores>
                        </DivElemento>

                        <DivElemento>
                          <ParrafoTitulo>Invitados</ParrafoTitulo>
                          <ParrafoValores>
                            {event.invitados.toString()}
                          </ParrafoValores>
                        </DivElemento>

                        <BotonActualizar
                          onClick={() => {
                            setEditIdSelected(event._id);

                            setAuxDate(
                              new Date(
                                date.getFullYear(),
                                date.getMonth(),
                                date.getDate()
                              )
                            );
                            setUpdateEventDate(
                              `${date.getDate()}/${
                                date.getMonth() + 1
                              }/${date.getFullYear()}`
                            );
                            setUpdateEventTitle(event.titulo);
                            setUpdateEventDesc(event.descripcion);
                            setUpdateEventStart(`${event.inicio}`);
                            setUpdateEventEnd(`${event.fin}`);
                            setUpdateEventInvitados(event.invitados);
                          }}
                        >
                          <ImagenesIconos
                            src={"/reservar.png"}
                            alt={"Esta cargando"}
                          ></ImagenesIconos>
                        </BotonActualizar>
                      </DivElementosSlot>
                    </>
                  );
                })}
              </>
            )}
          </>
        )}

        {editIdSelected ? (
          <>
            <DivFormulario>
              <p>Los campos que tengan * son obligatorios</p>
              <DivElementoFormulario>
                <LabelIdentificar>Titulo *: </LabelIdentificar>
                <InputValores
                  type="text"
                  value={updateEventTitle}
                  placeholder="Titulo"
                  onChange={(e) => {
                    setUpdateEventTitle(e.target.value);
                  }}
                ></InputValores>
              </DivElementoFormulario>
              <DivElementoFormulario>
                <LabelIdentificar>Descripcion : </LabelIdentificar>
                <InputValores
                  type="text"
                  value={updateEventDesc}
                  placeholder="Descripcion"
                  onChange={(e) => {
                    setUpdateEventDesc(e.target.value);
                  }}
                ></InputValores>
              </DivElementoFormulario>

              <DivElementoFormulario>
                <LabelIdentificar>Fecha *: </LabelIdentificar>
                <InputValores
                  type="date"
                  defaultValue={auxDate.toISOString().substring(0, 10)}
                  placeholder="Date"
                  onChange={(e) => {
                    setUpdateEventDate(e.target.value);
                  }}
                ></InputValores>
              </DivElementoFormulario>

              <DivElementoFormulario>
                <LabelIdentificar>Hora de inicio *: </LabelIdentificar>
                <InputValores
                  type="number"
                  value={updateEventStart}
                  placeholder="Hora de inicio"
                  onChange={(e) => {
                    console.log(Number(e.target.value));
                    if (e.target.value.includes("-")) {
                      e.target.value = "";
                    } else if (Number(e.target.value) >= 25) {
                      e.target.value = e.target.value.slice(0, 2);
                      if (Number(e.target.value) > 24) {
                        e.target.value = e.target.value.slice(0, 1);
                      }
                      console.log("Cambio de valor", e.target.value);
                    } else {
                      setUpdateEventStart(e.target.value);
                    }
                  }}
                ></InputValores>
              </DivElementoFormulario>

              <DivElementoFormulario>
                <LabelIdentificar>Hora de finalizacion *:</LabelIdentificar>
                <InputValores
                  type="number"
                  value={updateEventEnd}
                  placeholder="Hora de finalizacion"
                  onChange={(e) => {
                    console.log(Number(e.target.value));
                    if (e.target.value.includes("-")) {
                      e.target.value = "";
                    } else if (Number(e.target.value) >= 25) {
                      e.target.value = e.target.value.slice(0, 2);
                      if (Number(e.target.value) > 24) {
                        e.target.value = e.target.value.slice(0, 1);
                      }
                      console.log("Cambio de valor", e.target.value);
                    } else {
                      setUpdateEventEnd(e.target.value);
                    }
                  }}
                ></InputValores>
              </DivElementoFormulario>

              <DivElementoFormulario>
                <LabelIdentificar>Invitados: </LabelIdentificar>
                <InputValores
                  type="text"
                  value={updateEventInvitados.toString()}
                  placeholder="Invitados"
                  onChange={(e) => {
                    const inputValue = e.target.value;
                    console.log("Invitados", updateEventInvitados);
                    const strings = inputValue.split(",");
                    setUpdateEventInvitados(
                      strings.map((invitado: string) => invitado.trim())
                    );
                  }}
                ></InputValores>
              </DivElementoFormulario>

              <InputSubmit
                type="submit"
                value={"Actualizar evento"}
                onClick={async () => {
                  try {
                    let yearSeleccionado = updateEventDate.slice(0, 4);
                    if (
                      updateEventTitle === "" ||
                      updateEventDate === "" ||
                      updateEventStart === "" ||
                      updateEventEnd === ""
                    ) {
                      console.log("Faltan datos por poner");
                      setErrorDatos(true);
                      setErrorHoraInicioFinalizacion(false);
                      setErrorFecha(false);
                    } else if (Number(yearSeleccionado) < 1970) {
                      setErrorFecha(true);
                      setErrorDatos(false);
                      setErrorHoraInicioFinalizacion(false);
                    } else if (
                      Number(updateEventStart) >= Number(updateEventEnd)
                    ) {
                      setErrorHoraInicioFinalizacion(true);
                      setErrorDatos(false);
                      setErrorFecha(false);
                    } else {
                      await updateEvent();
                      console.log(errorBackUpdate);
                      if (errorBackUpdate.error === undefined) {
                        setEditIdSelected("");
                      }

                      console.log(errorBackUpdate);
                      setErrorHoraInicioFinalizacion(false);
                      setErrorDatos(false);
                      setErrorFecha(false);

                      await allEvents();
                      console.log(errorBackUpdate);
                    }
                  } catch {}
                }}
              ></InputSubmit>

              {errorDatos ? (
                <>
                  <ParrafoErrores>
                    Faltan datos obligatorios por poner
                  </ParrafoErrores>
                </>
              ) : errorFecha ? (
                <>
                  <ParrafoErrores>
                    El año tiene que ser igua o superior a 1970
                  </ParrafoErrores>
                </>
              ) : errorHoraInicioFinalizacion ? (
                <>
                  <ParrafoErrores>
                    La hora de inicio es mayor o igual que la hora de
                    finalizacion
                  </ParrafoErrores>
                </>
              ) : errorBackUpdate.error ? (
                <>
                  <ParrafoErrores>{errorBackUpdate.error}</ParrafoErrores>
                </>
              ) : (
                <></>
              )}
            </DivFormulario>
          </>
        ) : (
          <></>
        )}
      </RedBorderMenu>
    </>
  );
};

export default UpdateEvent;

const RedBorderMenu = styled.div`
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
  border: 7px solid #e72720;
  border-radius: 15px;
  margin: 10px;
`;

const H1Titulo = styled.h1`
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
`;

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

const BotonActualizar = styled.button`
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
