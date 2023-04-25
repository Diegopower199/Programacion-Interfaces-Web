import PlanetsList from "@/components/PlanetsList";
import { PlanetsAPI } from "@/type";
import type { GetServerSideProps, GetServerSidePropsContext } from "next";


export const getServerSideProps: GetServerSideProps = async (context) => {
  const props: Array<{
    name: string;
    id: string;
    page: number,
  }> = [];
  try {
    // https://swapi.dev/api/planets
    const page = context.query.page;
    console.log(page)
    const res = await fetch(`https://swapi.dev/api/planets/?page=${context.query.page}`);
    const data: PlanetsAPI = await res.json();
    
    props.push(
      ...data.results.map((planet) => {
        const name = planet.name;
        // get id from url
        const id = planet.url.split("/").slice(-2)[0];
        //console.log(id);

        let page = 0;

        if ( (parseInt(planet.url.split("/").slice(-2)[0]) % 10) == 0) { // RESTO ES 0
          page = Math.trunc(parseInt(planet.url.split("/").slice(-2)[0]) / 10)
        }
        else {
          page = Math.trunc(parseInt(planet.url.split("/").slice(-2)[0]) / 10) + 1
        }

        
        console.log("ID: ", id)
        
        

        console.log("Pagina: ", page)

        
        return { name, id, page };
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
    page: number,
  }>;
};

export default function Page(props: HomeProps) {
  return <PlanetsList data={props.data} />;
}