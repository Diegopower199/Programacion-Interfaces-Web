import CharactersList from "@/components/CharactersList";
import { CharactersAPI } from "@/type";
import type { GetServerSideProps, GetServerSidePropsContext } from "next";


export const getServerSideProps: GetServerSideProps = async (context) => {
  const props: Array<{
    name: string;
    id: string;
    image: string;
    page: number,

  }> = [];
  try {
    // https://swapi.dev/api/planets
    const page = context.query.page;
    console.log(page)
    const res = await fetch(`https://rickandmortyapi.com/api/character?page=${context.query.page}`);
    const data: CharactersAPI = await res.json();
    
    props.push(
      ...data.results.map((character) => {
        const name = character.name;
        const id = character.id;
        const image = character.image;
        
        //console.log(image)

        

        
        return { name: name, id: id, image: image, page: parseInt(`${context.query.page}`)};
      })
    );

  } catch (error) {
    console.log(error);
  }
  return {
    props: {
      data: props,
    },
  };
};

type HomeProps = {
  data: Array<{
    name: string;
    id: string;
    image: string;
    page: number,
  }>;
};

export default function Page(props: HomeProps) {
  return <CharactersList data={props.data} />;
}