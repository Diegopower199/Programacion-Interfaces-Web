import DatosPersonales from "../Components/DatosPersonales";
import Link from "next/link";

const Persona = () => {
    return (
        <>
            <Link href="/">Ir a home</Link> <br/>
               

            

            <DatosPersonales nombre="Alberto" apellidos="Valero" edad={92} telefono="111111111" email="avalero@nebrija.es" fotoPersona="aa"/>
            <hr/>
            <DatosPersonales nombre="Lucia" apellidos = "Rojas" edad={12} telefono="111111111" email="lucia@nebrija.es" fotoPersona="aa"/>
            <hr/>
            <DatosPersonales nombre="Diego" apellidos = "Gonzalez" edad={20} telefono="111112111" email="diego@nebrija.es" fotoPersona="aa"/>
            <hr/>
        </>
    )
}


export default Persona;