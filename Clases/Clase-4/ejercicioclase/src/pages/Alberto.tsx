import DatosPersonales from "../Components/DatosPersonales";
import Link from "next/link";

const Alberto = () => {
    return (
        <>
            <Link href="/">Ir a home</Link> <br/>            

            <DatosPersonales nombre="Alberto" apellidos="Valero" edad={92} telefono="111111111" email="avalero@nebrija.es" fotoPersona="aa"/>
            <hr/>
        </>
    )
}


export default Alberto;