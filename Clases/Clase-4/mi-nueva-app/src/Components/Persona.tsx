// Props son los parametros que reciben la funcion

type PersonaProps = {
    nombre: string,
    apellidos: string,
}

const Persona = (props: PersonaProps) => {
    return (
        <> 
            Nombre: {props.nombre}   <br/> 
            Apellidos: {props.apellidos} <br/>
        </>
    )
}

export default Persona;