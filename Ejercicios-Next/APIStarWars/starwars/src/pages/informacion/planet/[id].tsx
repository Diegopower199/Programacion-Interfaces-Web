import PlanetComponent from "@/components/Planet";
import { Planet } from "@/type";
import type { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      id: context.query.id,
    },
  };
};

export default function PlanetPage (props: {id: string})  {
    

    return (
      <>
        <PlanetComponent id={props.id}/>
      </>
    )
};
