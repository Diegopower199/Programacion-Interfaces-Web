import { useState } from "react";
import { Menu, Title, BlueBorderMenu, EventsList, BlueButton, ErrorMessage, RedButton, EventDiv, EventButtonsDiv, GreenButton } from "../styles/myStyledComponents";
import { gql, useMutation, useQuery } from "@apollo/client";

type QueryResponse = {events: {
    date: Date,
    description: string,
    endHour: number,
    id: string,
    startHour: number,
    title: string
}[]};

type CreateEventResponse = {createEvent:{
    date: Date
}}

type UpdateEventResponse = {updateEvent:{
    date: Date
}}

type DeleteEventResponse = {deleteEvent:{
    date: Date
}}

const Events = () => {

    const query = gql`
    query {
        events {
          date
          description
          endHour
          id
          startHour
          title
        }
      }
    `;

    const mutationCreateEvent = gql`
    mutation CreateEvent($title: String!, $description: String!, $date: Date!, $startHour: Int!, $endHour: Int!) {
        createEvent(title: $title, description: $description, date: $date, startHour: $startHour, endHour: $endHour) {
          date
        }
      }  
    `;

    const mutationUpdateEvent = gql`
    mutation UpdateEvent($updateEventId: ID!, $title: String!, $description: String!, $date: Date!, $startHour: Int!, $endHour: Int!) {
        updateEvent(id: $updateEventId, title: $title, description: $description, date: $date, startHour: $startHour, endHour: $endHour) {
          date
        }
      }  
    `;

    const mutationDeleteEvent = gql`
    mutation DeleteEvent($deleteEventId: ID!) {
        deleteEvent(id: $deleteEventId) {
          date
        }
      }  
    `;

    const queryAnswer = useQuery<QueryResponse>(query, {
        fetchPolicy: "network-only",
    });

    const [createEvent] = useMutation<CreateEventResponse>(mutationCreateEvent)
    const [updateEvent] = useMutation<UpdateEventResponse>(mutationUpdateEvent)
    const [deleteEvent] = useMutation<DeleteEventResponse>(mutationDeleteEvent)


    // estados para los parámetros de los nuevos eventos
    const [newEventDate, setNewEventDate] = useState<string>("");
    const [newEventTitle, setNewEventTitle] = useState<string>("");
    const [newEventDesc, setNewEventDesc] = useState<string>("");
    const [newEventStart, setNewEventStart] = useState<string>("");
    const [newEventEnd, setNewEventEnd] = useState<string>("");

    // este parámetro guarda el ID del evento seleccionado para editarlo
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

    // estados para gestionar errores
    const [addShowError, setAddShowError] = useState<boolean>(false);
    const [updateShowError, setUpdateShowError] = useState<boolean>(false);

    if(queryAnswer.loading){
        return(
            <>
            <h1>Loading..</h1>
            </>
        )
    }

    if(queryAnswer.error){
      return(
          <>
          <h1>Error: {queryAnswer.error.message}</h1>
          </>
      )
  }

    return(
        <>
        <Menu>
            <BlueBorderMenu>
                {
                    <>
                    <Title>Your events:</Title>

                    {
                        <EventsList>
                            {
                                queryAnswer.data?.events.map(event => {
                                  const date = new Date(event.date)
                                    return(
                                    <>
                                    <EventDiv>
                                        <p style={{fontSize: '16px'}}>{date.getMonth()+1}/{date.getDate()}/{date.getFullYear()}</p>
                                        <h1 style={{fontSize: '23px'}}>{event.title}</h1>
                                        <p style={{fontSize: '16px'}}>Description: {event.description}</p>
                                        <p style={{fontSize: '16px'}}>Start hour: {event.startHour}</p>
                                        <p style={{fontSize: '16px'}}>End hour: {event.endHour}</p>
                                        <EventButtonsDiv>
                                          <RedButton onClick={async () => {

                                            // con el botón rojo se borran eventos a partir de su ID
                                            await deleteEvent({variables:{
                                              deleteEventId: event.id
                                            }});
                                            if(event.id === editSelected){
                                              setEditSelected('');
                                            }
                                            await queryAnswer.refetch();
                                          }}>
                                            <i className="gg-trash"></i>
                                          </RedButton>
                                          <GreenButton onClick={() => {

                                            // con el botón verde se prepara el formulario para editar un evento
                                            setEditSelected(event.id);
                                            setAuxDate(new Date(event.date));
                                            setUpdateEventDate(`${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`)
                                            setUpdateEventTitle(event.title);
                                            setUpdateEventDesc(event.description);
                                            setUpdateEventStart(`${event.startHour}`);
                                            setUpdateEventEnd(`${event.endHour}`);

                                            console.log(updateEventDate)
                                            console.log(auxDate)
                                            }}>
                                            Edit
                                          </GreenButton>
                                        </EventButtonsDiv>
                                    </EventDiv>
                                    </>
                                    )
                                  })
                            }
                        </EventsList>
                    }


                    

                    </>
                }

            </BlueBorderMenu>
            <div style={{display: "flex", flexDirection: "row", gap: "20px"}}>
            <BlueBorderMenu>
                <Title>Add events</Title>

                <div style={{display: "flex", flexDirection: "column", gap: "5px"}}>
                        <p style={{margin: 0}}>Date: </p>
                        <input value={newEventDate} type='date' onChange={(e) => {setNewEventDate(e.target.value)}}></input>
                        <p style={{margin: 0}}>Title: </p>
                        <input value={newEventTitle} placeholder={'Title goes here :)'} onChange={(e) => {setNewEventTitle(e.target.value)}}></input>
                        <p style={{margin: 0}}>Description: </p>
                        <input value={newEventDesc} placeholder={'And description goes here..'} onChange={(e) => {setNewEventDesc(e.target.value)}}></input>
                        <p style={{margin: 0}}>Start hour: </p>
                        <input value={newEventStart} type='number' placeholder={'0-24'} onChange={(e) => {setNewEventStart(e.target.value)}}></input>
                        <p style={{margin: 0}}>End hour: </p>
                        <input value={newEventEnd} type='number' placeholder={'0-24'} onChange={(e) => {setNewEventEnd(e.target.value)}}></input>
                        <BlueButton onClick={async () => {
                          try{
                            await createEvent({variables:{
                              date: new Date(newEventDate),
                              title: newEventTitle,
                              description: newEventDesc,
                              startHour: parseInt(newEventStart),
                              endHour: parseInt(newEventEnd)
                          }});
                          await queryAnswer.refetch();
                          setAddShowError(false);
                          setNewEventDate('');
                          setNewEventTitle('');
                          setNewEventDesc('');
                          setNewEventStart('');
                          setNewEventEnd('');
                          } catch{
                            setAddShowError(true);
                          }
                            
                        } }>
                          <div style={{display: "flex", justifyContent: "center"}}>
                            <i className="gg-add-r"></i>
                          </div>
                        </BlueButton>
                    </div>
                    {
                      addShowError && <ErrorMessage>Invalid date or overlapping events!</ErrorMessage>
                    }

            </BlueBorderMenu>
            <BlueBorderMenu style={{borderColor: "green"}}>
              <Title style={{background: "green"}}>Edit Event</Title>
              {
                editSelected ?
                <>
                <div style={{display: "flex", flexDirection: "column", gap: "5px"}}>
                        <p style={{margin: 0}}>Date: </p>
                        <input defaultValue={auxDate.toISOString().substring(0, 10)} type='date' onChange={(e) => {setUpdateEventDate(e.target.value)}}></input>
                        <p style={{margin: 0}}>Title: </p>
                        <input value={updateEventTitle} placeholder={'Title goes here :)'} onChange={(e) => {setUpdateEventTitle(e.target.value)}}></input>
                        <p style={{margin: 0}}>Description: </p>
                        <input value={updateEventDesc} placeholder={'And description goes here..'} onChange={(e) => {setUpdateEventDesc(e.target.value)}}></input>
                        <p style={{margin: 0}}>Start hour: </p>
                        <input value={updateEventStart} type='number' placeholder={'0-24'} onChange={(e) => {setUpdateEventStart(e.target.value)}}></input>
                        <p style={{margin: 0}}>End hour: </p>
                        <input value={updateEventEnd} type='number' placeholder={'0-24'} onChange={(e) => {setUpdateEventEnd(e.target.value)}}></input>
                        <GreenButton onClick={async () => {
                          try{
                            await updateEvent({variables:{
                              updateEventId: editSelected,
                              date: new Date(updateEventDate),
                              title: updateEventTitle,
                              description: updateEventDesc,
                              startHour: parseInt(updateEventStart),
                              endHour: parseInt(updateEventEnd)
                          }});
                          await queryAnswer.refetch();
                          setUpdateShowError(false);
                          setEditSelected('');
                          } catch{
                            setUpdateShowError(true);
                          }
                            
                        } }>Update</GreenButton>
                    </div>
                    {
                      updateShowError && <ErrorMessage>Invalid date or overlapping events!</ErrorMessage>
                    }
                </>
                :
                <>
                <p>Select an event to edit :)</p>
                </>
              }
            </BlueBorderMenu>
            </div>
            
        </Menu>
        </>
        
    )
}

export default Events;