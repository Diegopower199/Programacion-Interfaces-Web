import PersonajesPaginados from "@/components/PersonajesPaginados";





type HomeProps = {
  data: Array<{
    id: string;
  }>;
};

export default function Home(props: HomeProps) {
  return <PersonajesPaginados name={""} id={"1"} image={""}/>;
}
