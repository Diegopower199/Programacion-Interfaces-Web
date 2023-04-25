import { Film } from "@/type";
import Link from "next/link";

const FilmComponent = ({ data }: { data: Film }) => (
  <div>
    <Link href="/">Back</Link>
    <h1>{data.title}</h1>
    <p>Episode id: {data.episode_id}</p>
    <p>Opening crawl: {data.opening_crawl}</p>
    <p>Director: {data.director}</p>
    <p>Producer: {data.producer}</p>
    <p>Release data: {data.release_date}</p>
    <h2>Characters</h2>
    <ul>
      {data.characters.map((character) => (
        <li key={character.url}>{character.url}</li>
      ))}
    </ul>
    <h2>Planets</h2>
    <ul>
      {data.planets.map((planet) => (
        <li key={planet.url}>{planet.url}</li>
      ))}
    </ul>
    <h2>Starships</h2>
    <ul>
      {data.starships.map((starship) => (
        <li key={starship.url}>{starship.url}</li>
      ))}
    </ul>
    <h2>Vehicles</h2>
    <ul>
      {data.vehicles.map((vehicle) => (
        <li key={vehicle.url}>{vehicle.url}</li>
      ))}
    </ul>
    <h2>Species</h2>
    <ul>
      {data.species.map((specie) => (
        <li key={specie.url}>{specie.url}</li>
      ))}
    </ul>
    <p>Created: {data.created}</p>
    <p>Edited: {data.edited}</p>
    <p>Url: {data.url}</p>
  </div>
);

export default FilmComponent;