import { gql, useMutation, useQuery } from "@apollo/client";
import Link from "next/link";
import { useState } from "react";
import styled from "styled-components";

export type UpdateEventResponse = {
  updateEvent: {
    id: string;
    title: string;
    description: string;
    date: Date;
    startHour: number;
    endHour: number;
  };
};

export type QueryResponse = {
  events: {
    id: string;
    title: string;
    description: string;
    date: Date;
    startHour: number;
    endHour: number;
  }[];
};

let ErrorBack: { error?: string } = { error: undefined };

const UpdateEvent = () => {
  const mutation = gql`
    mutation Mutation(
      $updateEventId: ID!
      $title: String!
      $description: String!
      $date: Date!
      $startHour: Int!
      $endHour: Int!
    ) {
      updateEvent(
        id: $updateEventId
        title: $title
        description: $description
        date: $date
        startHour: $startHour
        endHour: $endHour
      ) {
        date
        endHour
        description
        id
        startHour
        title
      }
    }
  `;

  const query = gql`
    query Query {
      events {
        description
        date
        id
        endHour
        startHour
        title
      }
    }
  `;

  const [errorFecha, setErrorFecha] = useState<boolean>(false);
  const [errorHoraInicioFinalizacion, setErrorHoraInicioFinalizacion] =
    useState<boolean>(false);
  const [errorDatos, setErrorDatos] = useState<boolean>(false);

  const [editSelected, setEditSelected] = useState<string>("");

  // de la misma forma, este estado guarda la fecha del evento a editar
  // para posteriormente mostrarla en el formulario
  const [auxDate, setAuxDate] = useState<Date>(new Date());

  // estados para gestionar los parámetros de los eventos a editar
  const [updateEventDate, setUpdateEventDate] = useState<string>("");
  const [updateEventTitle, setUpdateEventTitle] = useState<string>("");
  const [updateEventDesc, setUpdateEventDesc] = useState<string>("");
  const [updateEventStart, setUpdateEventStart] = useState<string>("");
  const [updateEventEnd, setUpdateEventEnd] = useState<string>("");

  const [updateEventMutation, updateEventMutationAnswer] =
    useMutation<UpdateEventResponse>(mutation);
  const queryAnswer = useQuery<QueryResponse>(query, {
    fetchPolicy: "network-only",
  });

  if (updateEventMutationAnswer.loading) {
    <>Loading...</>;
  }

  return (
    <>
      <Link href={"/"}>
        <BotonMenuPrincipal>Ir al menu principal</BotonMenuPrincipal>
      </Link>
      <h1>Update Event</h1>

      {queryAnswer.error ? (
        <ErrorMessage>{queryAnswer.error.message}</ErrorMessage>
      ) : (
        <>
          {queryAnswer.data?.events.length === 0 ? (
            <>
              <p>No hay ningun evento a partir de la fecha actual</p>
            </>
          ) : (
            <>
              {queryAnswer.data?.events.map((event) => {
                return (
                  <>
                    <DivElementosSlot>
                      <DivElemento>
                        <ParrafoTitulo>Title</ParrafoTitulo>
                        <ParrafoValores>{event.title}</ParrafoValores>
                      </DivElemento>

                      <DivElemento>
                        <ParrafoTitulo>Description</ParrafoTitulo>
                        <ParrafoValores>{event.description}</ParrafoValores>
                      </DivElemento>

                      <DivElemento>
                        <ParrafoTitulo>Date</ParrafoTitulo>
                        <ParrafoValores>
                          {event.date.toString().substring(0, 10)}
                        </ParrafoValores>
                      </DivElemento>

                      <DivElemento>
                        <ParrafoTitulo>Start hour</ParrafoTitulo>
                        <ParrafoValores>{event.startHour}</ParrafoValores>
                      </DivElemento>

                      <DivElemento>
                        <ParrafoTitulo>End hour</ParrafoTitulo>
                        <ParrafoValores>{event.endHour}</ParrafoValores>
                      </DivElemento>

                      <BotonActualizar
                        onClick={() => {
                          const date = new Date(event.date);
                          setEditSelected(event.id);
                          setAuxDate(new Date(event.date));
                          setUpdateEventDate(`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`);
                          setUpdateEventTitle(event.title);
                          setUpdateEventDesc(event.description);
                          setUpdateEventStart(`${event.startHour}`);
                          setUpdateEventEnd(`${event.endHour}`);
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

      {updateEventDate}

      {editSelected ? (
        <>
          <DivFormulario>
            <DivElementoFormulario>
              <LabelIdentificar>Titulo: </LabelIdentificar>
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
              <LabelIdentificar>Descripcion: </LabelIdentificar>
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
              <LabelIdentificar>Fecha: </LabelIdentificar>
              <InputValores
                type="date"
                defaultValue={auxDate.toISOString().substring(0, 10)}
                placeholder="Date"
                onChange={(e) => {
                  setUpdateEventDate(e.target.value);
                  console.log(updateEventDate)
                }}
              ></InputValores>
            </DivElementoFormulario>

            <DivElementoFormulario>
              <LabelIdentificar>Hora de inicio </LabelIdentificar>
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
              <LabelIdentificar>Hora de finalizacion </LabelIdentificar>
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
            <InputSubmit
              type="submit"
              value={"Añadir evento"}
              onClick={async () => {
                try {
                  let yearSeleccionado = updateEventDate.slice(0, 4);
                  if (
                    updateEventTitle === "" ||
                    updateEventDesc === "" ||
                    updateEventDate === "" ||
                    updateEventStart === "" ||
                    updateEventEnd === ""
                  ) {
                    console.log("Error de datos");
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
                    await updateEventMutation({
                      variables: {
                        updateEventId: editSelected,
                        date: new Date(updateEventDate),
                        title: updateEventTitle,
                        description: updateEventDesc,
                        startHour: parseInt(updateEventStart),
                        endHour: parseInt(updateEventEnd),
                      },
                    });
                    setEditSelected('');
                    await queryAnswer.refetch();
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
            ) : updateEventMutationAnswer.error ? (
              <>
                <ParrafoErrores>{ErrorBack.error}</ParrafoErrores>
              </>
            ) : (
              <></>
            )}
          </DivFormulario>
        </>
      ) : (
        <>
          <div></div>
        </>
      )}
    </>
  );
};

export default UpdateEvent;

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

export const BotonActualizar = styled.button`
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
