import DatosPersonales from "../Components/Persona";
import Link from "next/link";

const Persona = () => {
    return (
        <>
            <Link href="/">Ir a home</Link>
            <DatosPersonales nombre="Alberto" apellidos="Valero"/>
            <hr/>
            <DatosPersonales nombre="Lucia" apellidos = "Rojas" />
            <hr/>
        </>
    )
}

export default Persona;