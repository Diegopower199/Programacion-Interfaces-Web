import Link from "next/link";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useRouter } from 'next/router'

const Registrar = () => {

    const router = useRouter();

    const fetchRegistrar = async () => {
        // POST request using fetch with async/await
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nombreUsuario: nombreUsuario, email: email,contrasena: contrasena})
            };
    
            const response = await fetch("http://localhost:8080/addUser", requestOptions);
            const data = await response.json();
            console.log("Informacion data: ", data);
            console.log("El dato de response.status es: ", response.status);
            //setCreacionUsuarioCorrecta(response.ok);
            
            if (response.status === 200) {
                router.push("./loginUser");
            }
            else {
                setCreacionUsuarioIncorrecta(true);
                setMensajeError(data)
            }
            console.log(response)
        
    }
    
            
    const [nombreUsuario, setNombreUsuario] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [contrasena, setContrasena] = useState<string>("");
    const [creacionUsuarioIncorrecta, setCreacionUsuarioIncorrecta] = useState<boolean>(false);
    const [mensajeError, setMensajeError] = useState<string>("");
    

    return (
        <>
            
            
                <Formulario>
                    
        
                <TituloH1>Registrar</TituloH1>
                    <Contenedor>
            
                        <ContenedorInput>
                            <ImagenesIconos src={"/user-solid.png"} alt={'Esta cargando'}></ImagenesIconos>
                            <InputEmailUsuarioPassword type="text" placeholder="Nombre usuario" onChange={(e) => setNombreUsuario(e.target.value)}/>
                        </ContenedorInput>
                        
                        <ContenedorInput>
                            <ImagenesIconos src={"/envelope-solid.png"} alt={'Esta cargando'}></ImagenesIconos>
                            <InputEmailUsuarioPassword type="text" placeholder="Correo Electronico" onChange={(e) => setEmail(e.target.value)}/>  
                        </ContenedorInput>
                        
                        <ContenedorInput>
                            <ImagenesIconos src={"/lock-solid.png"} alt={'Esta cargando'}></ImagenesIconos>
                            <InputEmailUsuarioPassword type="password" placeholder="Contraseña" onChange={(e) => setContrasena(e.target.value)}/>
                        </ContenedorInput>

                        { creacionUsuarioIncorrecta && (
                            <>
                                <ErrorMessage>{mensajeError}</ErrorMessage>
                            </>
                        )}

                        <BotonRegistrar type="submit" value="Registrate" onClick={ async () => {
                            try {
                                console.log("Nombre: ", nombreUsuario, "\nEmail: ", email, "\nContraseña: ", contrasena);
                            
                                console.log("Antes del fetch", creacionUsuarioIncorrecta);
                                await fetchRegistrar();
                                console.log("Despues del fetch", creacionUsuarioIncorrecta);
                            }
                            catch {
                                
                            }

                        }}/>
                        <Parrafo>Al registrarte, aceptas nuestras Condiciones de uso y Política de privacidad.</Parrafo>
                        <Parrafo>¿Ya tienes una cuenta? <Link href={"./loginUser"}>Iniciar sesion</Link></Parrafo>
                    </Contenedor>

                   
                    
                </Formulario>
            
        </>
    )
}

export default Registrar;


const Contenedor = styled.div`
    width: 100%;
    padding: 15px;
    box-sizing: border-box;
`

const Formulario = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    background: #fff;
    margin-top: 150px;
    margin-left: 200px;
    margin-right: 200px;
    padding: 3px;
    box-sizing: border-box;
`


const TituloH1 = styled.h1`
    text-align: center;
    color: #1a2537;
    font-size: 40px;
    box-sizing: border-box;
`

const InputEmailUsuarioPassword = styled.input`
    font-size: 20px;
    width: 800px;
    padding: 10px;
    border: none;
    box-sizing: border-box;
`

const ContenedorInput = styled.div`
    
    margin-bottom: 15px;
    border: 1px solid #aaa;
    box-sizing: border-box;
`

const ImagenesIconos = styled.img`
    margin: 3px;
    width: 40px;
    height: 60px;
    text-align: center;
    color: #999;
    box-sizing: border-box;
`

const BotonRegistrar = styled.input`
    border: none;
    width: 100%;
    color: white;
    font-size: 20px;
    background:  #1a2537;
    padding: 15px 20px;
    border-radius: 5px;
    box-sizing: border-box;
    cursor: pointer;
    :hover {
        background: cadetblue;
    }
`

const Parrafo = styled.p`
    text-align: center;
    box-sizing: border-box;
`

const LinkPaginaLogin = styled.link`
    text-decoration: none;
    color: #1a2537;
    font-weight: 600;
    box-sizing: border-box;
    :hover {
        color: cadetblue;
    }
`

export const ErrorMessage = styled.p`
  color: red;
  font-weight: 600;
`;