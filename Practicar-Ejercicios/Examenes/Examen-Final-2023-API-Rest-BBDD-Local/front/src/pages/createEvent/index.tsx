import Link from "next/link";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

type AddEventResponse = {
  id: string;
  titulo: string;
  descripcion: string;
  fecha: Date;
  inicio: number;
  fin: number;
  invitados: string[];
};


const AddEvent = () => {
  const [initialized, setInitialized] = useState(false);
  const [responseAddEvent, setResponseAddEvent] = useState<AddEventResponse>();
  const [titulo, setTitulo] = useState<string>("");
  const [descripcion, setDescripcion] = useState<string>("");
  const [fecha, setFecha] = useState<string>("");
  const [horaInicio, setHoraInicio] = useState<string>("");
  const [horaFinalizacion, setHoraFinalizacion] = useState<string>("");
  const [invitados, setInvitados] = useState<string[]>([""]);

  const [errorFecha, setErrorFecha] = useState<boolean>(false);
  const [errorHoraInicioFinalizacion, setErrorHoraInicioFinalizacion] =
    useState<boolean>(false);
  const [errorDatos, setErrorDatos] = useState<boolean>(false);
  const [errorBack, setErrorBack] = useState<{ error: string | undefined }>({
    error: undefined,
  });

  

  const createEvent = async () => {
    try {
      const objetoFecha = new Date(fecha);
      const requestOptions = {
        method: "POST",
        body: JSON.stringify({
          titulo: titulo,
          descripcion: descripcion,
          fecha: objetoFecha,
          inicio: Number(horaInicio),
          fin: Number(horaFinalizacion),
          invitados: invitados,
        }),
      };
      console.log("requestOptions: ", requestOptions);

      const response = await fetch(
        "http://localhost:8080/addEvent",
        requestOptions
      );

      if (response.ok) {
        const result = await response.json();
        setResponseAddEvent(result)
        console.log(result);
        setErrorBack({ error: undefined });
      } else {
        const result = await response.text();
        setErrorBack({ error: result }); // Esto es porque esta así en el back, un json con una variable que es message
        console.log("Error", result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Link href={"/"}>
        <BotonMenuPrincipal>Ir al menu principal</BotonMenuPrincipal>
      </Link>
      <PurpleBorderMenu>
        <H1Titulo>Add Event</H1Titulo>
        <DivFormulario>
          <p>Los campos que tengan * son obligatorios</p>
          <DivElementoFormulario>
            <LabelIdentificar>Titulo *: </LabelIdentificar>
            <InputValores
              type="text"
              value={titulo}
              placeholder="Titulo"
              onChange={(e) => {
                setTitulo(e.target.value);
              }}
            ></InputValores>
          </DivElementoFormulario>
          <DivElementoFormulario>
            <LabelIdentificar>Descripcion: </LabelIdentificar>
            <InputValores
              type="text"
              value={descripcion}
              placeholder="Descripcion"
              onChange={(e) => {
                setDescripcion(e.target.value);
              }}
            ></InputValores>
          </DivElementoFormulario>
          <DivElementoFormulario>
            <LabelIdentificar>Fecha *: </LabelIdentificar>
            <InputValores
              type="date"
              value={fecha}
              placeholder="Date"
              onChange={(e) => {
                setFecha(e.target.value);
              }}
            ></InputValores>
          </DivElementoFormulario>
          <DivElementoFormulario>
            <LabelIdentificar>Hora de inicio *: </LabelIdentificar>
            <InputValores
              type="number"
              value={horaInicio}
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
                  setHoraInicio(e.target.value);
                }
              }}
            ></InputValores>
          </DivElementoFormulario>
          <DivElementoFormulario>
            <LabelIdentificar>Hora de finalizacion *:</LabelIdentificar>
            <InputValores
              type="number"
              value={horaFinalizacion}
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
                  setHoraFinalizacion(e.target.value);
                }
              }}
            ></InputValores>
          </DivElementoFormulario>
          <DivElementoFormulario>
            <LabelIdentificar>Invitados: </LabelIdentificar>
            <InputValores
              type="text"
              value={invitados.toString()}
              placeholder="Invitados"
              onChange={(e) => {
                const inputValue = e.target.value;
                console.log("Invitados", invitados);
                const strings = inputValue.split(",");
                setInvitados(
                  strings.map((invitado: string) => invitado.trim())
                );
              }}
            ></InputValores>
          </DivElementoFormulario>

          <InputSubmit
            type="submit"
            value={"Añadir evento"}
            onClick={async () => {
              try {
                let yearSeleccionado = fecha.slice(0, 4);
                if (
                  titulo === "" ||
                  fecha === "" ||
                  horaInicio === "" ||
                  horaFinalizacion === ""
                ) {
                  console.log("Error de datos");
                  setErrorDatos(true);
                  setErrorHoraInicioFinalizacion(false);
                  setErrorFecha(false);
                } else if (Number(yearSeleccionado) < 1970) {
                  setErrorFecha(true);
                  setErrorDatos(false);
                  setErrorHoraInicioFinalizacion(false);
                } else if (Number(horaInicio) >= Number(horaFinalizacion)) {
                  setErrorHoraInicioFinalizacion(true);
                  setErrorDatos(false);
                  setErrorFecha(false);
                } else {
                  await createEvent();

                  setInitialized(true);
                  setErrorDatos(false);
                  setErrorFecha(false);
                  setErrorHoraInicioFinalizacion(false);

                  setTitulo("");
                  setDescripcion("");
                  setFecha("");
                  setHoraInicio("");
                  setHoraFinalizacion("");
                  setInvitados([""]);
                }
              } catch {}
            }}
          ></InputSubmit>
          {errorDatos ? (
            <>
              <ParrafoErrores>Faltan datos obligatorios por poner</ParrafoErrores>
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
                La hora de inicio es mayor o igual que la hora de finalizacion
              </ParrafoErrores>
            </>
          ) : errorBack.error !== undefined ? (
            <>
              <ParrafoErrores>{errorBack.error}</ParrafoErrores>
            </>
          )  : (
            <>
            
            </>
          )}
        </DivFormulario>
      </PurpleBorderMenu>

      {responseAddEvent !== undefined ? (
            <>
              <h2>Informacion añadida</h2>
              <DivElementosSlot>
                <DivElemento>
                  <ParrafoTitulo>Titulo</ParrafoTitulo>
                  <ParrafoValores>{responseAddEvent?.titulo}</ParrafoValores>
                </DivElemento>

                <DivElemento>
                  <ParrafoTitulo>Descripcion</ParrafoTitulo>
                  <ParrafoValores>
                    {responseAddEvent?.descripcion}
                  </ParrafoValores>
                </DivElemento>

                <DivElemento>
                  <ParrafoTitulo>Fecha</ParrafoTitulo>
                  <ParrafoValores>
                    {responseAddEvent?.fecha.toString().substring(0, 10)}
                  </ParrafoValores>
                </DivElemento>

                <DivElemento>
                  <ParrafoTitulo>Inicio</ParrafoTitulo>
                  <ParrafoValores>{responseAddEvent?.inicio}</ParrafoValores>
                </DivElemento>

                <DivElemento>
                  <ParrafoTitulo>Fin</ParrafoTitulo>
                  <ParrafoValores>{responseAddEvent?.fin}</ParrafoValores>
                </DivElemento>

                <DivElemento>
                  <ParrafoTitulo>Invitados</ParrafoTitulo>
                  <ParrafoValores>
                    {responseAddEvent?.invitados.toString()}
                  </ParrafoValores>
                </DivElemento>
              </DivElementosSlot>
            </>
          ) : (
            <>
            </>
          )}
    </>
  );
};

export default AddEvent;

const PurpleBorderMenu = styled.div`
  font-weight: 600;
  font-size: 20px;
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 100px;
  padding-right: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;
  overflow: hidden;
  white-space: nowrap;
  border: 7px solid #733bf6;
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
  display: flex;
  justify-content: flex-start;
  align-items: center;

  border: 1px solid #2e518b; /*anchura, estilo y color borde*/
  padding: 10px; /*espacio alrededor texto*/
  background-color: #2e518b; /*color botón*/
  color: #ffffff; /*color texto*/
  text-decoration: none; /*decoración texto*/
  text-transform: uppercase; /*capitalización texto*/
  font-family: "Helvetica", sans-serif; /*tipografía texto*/
  border-radius: 50px; /*bordes redondos*/
  width: 225px;

  :hover {
    cursor: pointer;
  }
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
