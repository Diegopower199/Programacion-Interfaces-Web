import PlanetComponent from "@/components/Planet";
import { Planet, PlanetAPI } from "@/type";
import type { GetServerSideProps, GetServerSidePropsContext } from "next";



export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  console.log("ID", id)
  const res = await fetch(`https://swapi.dev/api/planets/${id}`);
  const dataAPI: PlanetAPI = await res.json();
  const data: Planet = {
    ...dataAPI,
    residents: await Promise.all(
      dataAPI.residents.map(async (r: string) => {
        const data = await fetch(r);
        return await data.json();
      })
    ),
    films: await Promise.all(
      dataAPI.films.map(async (f: string) => {
        const data = await fetch(f);
        return await data.json();
      })
    ),
  };

  return {
    props: {
      data,
    },
  };
};

const PlanetPage = ({ data }: { data: Planet }) => {
  return <PlanetComponent data={data} />;
};

export default PlanetPage;