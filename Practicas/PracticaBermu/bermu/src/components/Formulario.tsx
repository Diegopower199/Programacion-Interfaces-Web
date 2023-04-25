
import { useState } from "react";
import styled from "styled-components";




const Registro = () => {
    //me estoy creando una estado variable que se llama edad y que tiene un valor inicial de 0 y que tiene un metodo setEdad
    
    const [nombre, setNombre] = useState<string>("");
    const [dni, setDni] = useState<string>("");
    const [list, setList] = useState<string[]>([]);
    const [listNombre, setListNombre] = useState<string[]>([]);
    

  



    

    return(
        <>
        
    
        
       
        <h1 id="fonty">Formulario</h1>
        
        <div className="Registro">
        Introduce DNI: <Input type="Text" onChange={(e)=> setDni(e.target.value)}/>
        Introduce nombre: <Input type="Text" onChange={(e)=> setNombre (e.target.value)}/>

       
        <div>
        <button id="btn" onClick={() => {
            setList([...list, dni]);
            setListNombre([...listNombre, nombre]);
        }}>+</button>
        </div>


        </div>
        
       
      



     <div id="container">


        <div id="caja">
            DNI: 
            {list.map((item, index) => (
                <div id="caja1" key={index}>{item}</div>
            ))}
    
         </div>
         <div id="caja">
            Nombre:
        {listNombre.map((item, index) => (
                <div id="caja1" key={index}>{item}</div>
            ))}
        </div>

       
        <div id="caja1">
            <hr/>
        
        {list.map((item, index) => (
            <button id="btn2" onClick={() => {
                setList(list.filter((_, i) => i !== index));
                setListNombre(listNombre.filter((_, i) => i !== index));
            }}>-</button>
        ))}
        </div>
    </div>
            
            
        

        </>   
    )




}





type imputProps = {
    error?: boolean;

}
const Input = styled.input<imputProps>`
    background-color: ${(props) => (props.error ? "red" : "white")};
    color : ${(props) => (props.error ? "white" : "black")};
   
 `






export default Registro;