import { gql } from "@apollo/client";
import getApolloCLient from "@/libs/client";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";




export const getStaticProps: GetStaticProps = async() => {

  const client = getApolloCLient();
  const {data}  = await client.query({
    query: gql`
      query {
        characters {
          results {
            id
            name
            status
            species
            type
            gender
            origin {
              name
            }
            location {
              name
            }
            image
            episode {
              id
            }
            created
          }
        }
      }
    `,
  });

  console.log("Toda la informacion en getStaticPaths: ", data.characters.results)
  
    
    
    return { 
        props: { 
            characters: data.characters.results
        } 
    };
}

type CharacterType = {
  id: string;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: { name: string };
  location: { name: string };
  image: string;
  episode: string[];
  created: string;
};


const Characters: NextPage<{ characters: CharacterType[] }> = ({
    characters,
}) => {
  return (
    <div>
      <h1>Characters</h1>
      <ul>
        {characters.map((character) => (
          <li key={character.id}>
            <img src={character.image} alt={character.name} />
            <p>{character.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Characters;
