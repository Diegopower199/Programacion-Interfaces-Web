import App from "next/app";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { useRouter } from "next/router";

const Login = () => {
  const router = useRouter();

   const fetchLoginWithJson = async () => {
    try {
      // POST request using fetch with async/await
      const requestOptions = {
        method: "POST",
        body: JSON.stringify({
          username: nombreUsuario,
          password: contrasena,
        })
      };
      
      const response = await fetch(`http://localhost:8080/LogInJSON`, requestOptions);
      const data = await response.text();

      if (response.status === 200) {
        router.push(`./informacionTablaUsuario?nombreUsuario=${nombreUsuario}`);
        console.log("funciona")
      } 
      else {
        setUsuarioIncorrecta(true);
        setMensajeError(data);
      }
    } 
    catch {
        
    }
  };

  const fetchLoginWithParametros = async () => {
    try {
      // POST request using fetch with async/await
      const requestOptions = {
        method: "POST",
      };
      console.log(nombreUsuario, "  ", contrasena)
      const response = await fetch(`http://localhost:8080/LogInParametros?username=${encodeURIComponent(nombreUsuario)}&password=${encodeURIComponent(contrasena)}`, requestOptions);
      const data = await response.text();

      if (response.status === 200) {
        router.push(`./informacionTablaUsuario?nombreUsuario=${nombreUsuario}`);
      } 
      else {
        setUsuarioIncorrecta(true);
        setMensajeError(data);
      }
    } 
    catch {
        
    }
  };

  const [nombreUsuario, setNombreUsuario] = useState<string>("");
  const [contrasena, setContrasena] = useState<string>("");
  const [usuarioIncorrecta, setUsuarioIncorrecta] = useState<boolean>(false);
  const [mensajeError, setMensajeError] = useState<string>("");

  return (
    <>
      <Formulario>
        <TituloH1>Login</TituloH1>
        <Contenedor>
          <ContenedorInput>
            <ImagenesIconos
              src={"/user-solid.png"}
              alt={"Esta cargando"}
            ></ImagenesIconos>
            <InputEmailUsuarioPassword
              type="text"
              placeholder="Usuario"
              onChange={(e) => setNombreUsuario(e.target.value)}
            />
          </ContenedorInput>

          <ContenedorInput>
            <ImagenesIconos
              src={"/lock-solid.png"}
              alt={"Esta cargando"}
            ></ImagenesIconos>
            <InputEmailUsuarioPassword
              type="password"
              placeholder="Contraseña"
              onChange={(e) => setContrasena(e.target.value)}
            />
          </ContenedorInput>

          {usuarioIncorrecta && (
            <>
              <ErrorMessage>{mensajeError}</ErrorMessage>
            </>
          )}

          <BotonLogin
            type="submit"
            value="Login"
            onClick={async () => {
              console.log(
                "Nombre: ",
                nombreUsuario,
                "\nContraseña: ",
                contrasena
              );

              try {
                console.log("Antes del fetch", usuarioIncorrecta);
                //await fetchLoginWithJson();
                await fetchLoginWithParametros();
                console.log("Despues del fetch", usuarioIncorrecta);
              } catch {}
            }}
          />
          <Parrafo>
            Al registrarte, aceptas nuestras Condiciones de uso y Política de
            privacidad.
          </Parrafo>
          <Parrafo>
            ¿No tienes una cuenta?{" "}
            <Link href={"./registrarUser"}>Registrate</Link>
          </Parrafo>
        </Contenedor>
      </Formulario>
    </>
  );
};

export default Login;

const PaginaGlobal = styled.div``;

const Contenedor = styled.div`
  width: 100%;
  padding: 15px;
  box-sizing: border-box;
`;

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
`;

const TituloH1 = styled.h1`
  text-align: center;
  color: #1a2537;
  font-size: 40px;
  box-sizing: border-box;
`;

const InputEmailUsuarioPassword = styled.input`
  font-size: 20px;
  width: 800px;
  padding: 10px;
  border: none;
  box-sizing: border-box;
`;

const ContenedorInput = styled.div`
  margin-bottom: 15px;
  border: 1px solid #aaa;
  box-sizing: border-box;
`;

const ImagenesIconos = styled.img`
  margin: 3px;
  width: 40px;
  height: 60px;
  text-align: center;
  color: #999;
  box-sizing: border-box;
`;

const BotonLogin = styled.input`
  border: none;
  width: 100%;
  color: white;
  font-size: 20px;
  background: #1a2537;
  padding: 15px 20px;
  border-radius: 5px;
  box-sizing: border-box;
  cursor: pointer;
  :hover {
    background: cadetblue;
  }
`;

const Parrafo = styled.p`
  text-align: center;
  box-sizing: border-box;
`;

const LinkPaginaLogin = styled.link`
  text-decoration: none;
  color: #1a2537;
  font-weight: 600;
  box-sizing: border-box;
  :hover {
    color: cadetblue;
  }
`;

export const ErrorMessage = styled.p`
  color: red;
  font-weight: 600;
`;
