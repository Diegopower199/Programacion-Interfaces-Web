import { gql } from "@apollo/client";
import getApolloCLient from "@/libs/client";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";

export const getStaticProps: GetStaticPaths = async () => {
    const client = getApolloCLient();
    const { data } = await client.query({
        query: gql`
            query GetCharacters {
                characters {
                    results {
                        id
                        name
                        image
                    }
                }
            }
        `,
    });
    return {
        props: {
            characters: data.characters.results,
        },
    };
}

type CharacterType = {
  id: string
  name: string
  image: string
}

const Characters: NextPage<{ characters: CharacterType[] }> = ({ characters }) => {
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
