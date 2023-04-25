// Props son los parametros que reciben la funcion

type PersonaProps = {
    nombre: string,
    apellidos: string,
    edad: number,
    telefono: string,
    email: string,
    fotoPersona: string,
}

const DatosPersonales = (props: PersonaProps) => {
    return (
        <> 
            <p>Nombre: {props.nombre}</p>  <br/> 
            <p>Apellidos: {props.apellidos}</p>  <br/>
            <p> Edad: {props.edad}</p>  <br/>
            <p> Telefono: {props.telefono}</p>  <br/>
            <p>Email: {props.email}</p>  <br/>
            Foto: {props.fotoPersona} <br/>
        </>
    )
}

export default DatosPersonales;