import { useState, useEffect } from "react";
import styled from "styled-components";
import Link from "next/link";

type CharType = {
    name: string,
    id: string,
}

const Formulario = () => {
    const [data, setData] = useState<CharType[]>([]);
    const [name, setName] = useState<string>("");
    const [page, setPage] = useState<number>(1);

    const fetchData = async () => {
        try {
            const chars = await fetch(`https://rickandmortyapi.com/api/character/?page=${page}&name=${name}`);
            const json = await chars.json();

            //const names = json.results.map( (char: any) => char.name)
            const results = json.results.map( (char: any) => ({id: char.id, name: char.name}))
            setData(results);
        }

        catch (e) {
            setData([{ id: "0", name: "Error bajandome los personajes"}]);
        }
        
    };


    useEffect ( () => {
        fetchData();
        console.log(name)
    }, [page])



    if (data.length === 0) {
        return <>Loading data</>
    }


    return (
        <>
        {data.map(item => (
            <div>
                <Link  key={item.id} href={`/character/${item.id}`}>
                    {item.name}
                </Link>
            </div>
        ))}

        El nombre: <input type="text" placeholder="Nombre a buscar" onChange={(e) => setName(e.target.value)}></input>

        <button 
            onClick={ () => {
                setPage(1); 
                fetchData();
            }} 
        > Buscar
        </button>
        <button onClick={() => setPage(page - 1)}>Anterior Pagina</button>

        <button onClick={() => setPage(page + 1)}>Siguiente Pagina</button>
        </>
    )
}

export default Formulario;

/*
const [numero1, setNumero1] = useState<number>(0);
    const [numero2, setNumero2] = useState<number>(0);

    useEffect( () => {
        setTimeout( () => setNumero1(numero1 + 1), 1000)
    }, [numero2]) // los corchetes significan que estas centrados a que variables de estados estan prestando atencion

    useEffect( () => {
        if (numero1 > 10) setNumero1(0);
    }, [numero1]) 

    return (
        <>
            <div>{numero1} <button onClick={() => setNumero1(numero1 + 1)}>Incrementar</button></div>
            <div>{numero2} <button onClick={() => setNumero2(numero2 + 1)}>Incrementar</button></div>
        </>
    )
*/



/* EJERCICIO CON USE EFECT

const Formulario = () => {
    const [data, setData] = useState<string[]>([]);
    const [nameEncontrar, setNameEncontrar] = useState<string>("");
    const [page, setPage] = useState<number>(0);


    useEffect ( () => {
        const fetchData = async () => {
            try {
                const chars = await fetch(`https://rickandmortyapi.com/api/character/?page=${page}&name=${nameEncontrar}`);
                const json = await chars.json();

                const names = json.results.map( (char: any) => char.name)
                setData(names);
            }

            catch (e) {
                setData(["Error bajandome los personajes"]);
            }
            
        };

        fetchData();
        console.log(nameEncontrar)
    }, [page])



    if (data.length === 0) {
        return <>Loading data</>
    }


    return (
        <>
        {data.map(item => (<div>{item}</div>))}

        El nombre: <input type="text" placeholder="Nombre a buscar" onChange={(e) => setNameEncontrar(e.target.value)}></input> <button>DALE AL BOTON</button>

        <button onClick={() => setPage(page - 1)}>Anterior Pagina</button>

        <button onClick={() => setPage(page + 1)}>Siguiente Pagina</button>
        </>
    )
}
*/