import Link from "next/link";
import router from "next/router";

type ServerSideProps = {
    params: {
        id:string;
    }
}


export async function getServerSideProps(props: ServerSideProps){
    const id = props.params.id;
    console.log(router.query.id);
    const data = await fetch(`https://swapi.dev/api/planets/${id}`);
    const json = await data.json();
    return {props:json};
}

type PlanetSideProps = {
    name: string,
    diameter: string,
    rotation_period: string,
    orbital_period: string,
    gravity: string,
    population : string,
    climate: string,
    terrain: string,
    surface_water: string,
    residents: string[],
    films: string[],
    url: string,
    created: string,
    edited: string,
}
const Planet = (props:PlanetSideProps) => {
    return(
        <>
        <Link href="/">Ir a la lista</Link>
            <div>name : {props.name}</div><br/>
            <div>diameter : {props.diameter}</div><br/>
            <div>rotation_period : {props.rotation_period}</div><br/>
            <div>orbital_period : {props.orbital_period}</div><br/>
            <div>gravity : {props.gravity}</div><br/>
            <div>population : {props.population}</div><br/>
            <div>climate : {props.climate}</div><br/>
            <div>terrain : {props.terrain}</div><br/>
            <div>surface_water : {props.surface_water}</div><br/>
            <div>residents : {props.residents}</div><br/>
            <div>films : {props.films}</div><br/>
            <div>url : {props.url}</div><br/>
            <div>created : {props.created}</div><br/>
            <div>edited : {props.edited}</div><br/>
        </>
    );
};
export default Planet;