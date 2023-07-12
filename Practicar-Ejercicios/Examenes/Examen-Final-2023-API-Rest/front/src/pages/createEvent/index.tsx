import { gql, useMutation } from "@apollo/client";
import Link from "next/link";
import { ChangeEvent, useEffect, useState } from "react";
import styled from "styled-components";

export type AddEventResponse = {
  addEvent: {
    id: string;
    title: string;
    description: string;
    date: Date;
    startHour: number;
    endHour: number;
  };
};

let ErrorBack: { error?: string } = { error: undefined };

const AddEvent = () => {
  

  const [initialized, setInitialized] = useState(false);
  const [addEvent, setAddEvent] = useState(false);
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

  const createEvent = async () => {
    try {
      const objetoFecha = new Date(fecha)
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
      console.log("requestOptions: ",requestOptions)
  
      const response = await fetch(
        "http://localhost:8080/addEvent",
        requestOptions
      );
  
      if (response.ok) {
        const result = await response.json();
        console.log(result);
      } else {
        console.log("Error", await response.json());
        //ErrorBack.error = response.text();
      }
    }

    catch (error) {
      console.log(error)
    }
  };

  /*useEffect(() => {
    if (initialized) {
      console.log("Initialized true");
      createEvent();
    }
  }, [addEvent, initialized]);*/

  return (
    <>
      <Link href={"/"}>
        <BotonMenuPrincipal>Ir al menu principal</BotonMenuPrincipal>
      </Link>
      <h1>Add Event</h1>
      <DivFormulario>
        <DivElementoFormulario>
          <LabelIdentificar>Titulo: </LabelIdentificar>
          <InputValores
            type="text"
            value={titulo}
            placeholder="Titulo"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
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
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setDescripcion(e.target.value);
            }}
          ></InputValores>
        </DivElementoFormulario>
        <DivElementoFormulario>
          <LabelIdentificar>Fecha: </LabelIdentificar>
          <InputValores
            type="date"
            value={fecha}
            placeholder="Date"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setFecha(e.target.value);
            }}
          ></InputValores>
        </DivElementoFormulario>
        <DivElementoFormulario>
          <LabelIdentificar>Hora de inicio </LabelIdentificar>
          <InputValores
            type="number"
            value={horaInicio}
            placeholder="Hora de inicio"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
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
          <LabelIdentificar>Hora de finalizacion </LabelIdentificar>
          <InputValores
            type="number"
            value={horaFinalizacion}
            placeholder="Hora de finalizacion"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
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
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              const inputValue = e.target.value;
              console.log("Invitados", invitados)
              const strings = inputValue.split(",");
              setInvitados(strings.map((invitado: string) => invitado.trim()));
            }}
          ></InputValores>
        </DivElementoFormulario>
        Los invitados son:{" "}
        {invitados.map((invitado) => {
          return <>
            <p>Invitado: {invitado}</p>
          </>;
        })}
        <InputSubmit
          type="submit"
          value={"Añadir evento"}
          onClick={async () => {
            try {
              let yearSeleccionado = fecha.slice(0, 4);
              if (
                titulo === "" ||
                descripcion === "" ||
                fecha === "" ||
                horaInicio === "" ||
                horaFinalizacion === ""
              ) {
                console.log("Error de datos");
                setErrorDatos(true);
                setErrorHoraInicioFinalizacion(false);
                setErrorFecha(false);
                setAddEvent(false);
              } else if (Number(yearSeleccionado) < 1970) {
                setErrorFecha(true);
                setErrorDatos(false);
                setErrorHoraInicioFinalizacion(false);
                setAddEvent(false);
              } else if (Number(horaInicio) >= Number(horaFinalizacion)) {
                setErrorHoraInicioFinalizacion(true);
                setErrorDatos(false);
                setErrorFecha(false);
                setAddEvent(false);
              } else {
                await createEvent();

                
                setInitialized(true);
                setAddEvent(true);
                setErrorDatos(false);
                setErrorFecha(false);
                setErrorHoraInicioFinalizacion(false);

                setTitulo("");
                setDescripcion("");
                setFecha("");
                setHoraInicio("");
                setHoraFinalizacion("");
                setInvitados([""])
              }
            } catch {}
          }}
        ></InputSubmit>
        {errorDatos ? (
          <>
            <ParrafoErrores>Hay un error de datos</ParrafoErrores>
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
        )  : ErrorBack.error !== undefined ? (
          <>
            <ParrafoErrores>{ErrorBack.error}</ParrafoErrores>
          </>
        ) : (
          <></>
        )}
      </DivFormulario>
    </>
  );
};

export default AddEvent;

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
