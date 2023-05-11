import Link from "next/link";
type ServerSideProps = {
  name: string, 
  id: string,

}   
 export async function getServerSideProps(){
    let planets : ServerSideProps[] = [];
    for(let i = 1; i <= 6 ; i++){
    const data = await fetch(`https://swapi.dev/api/planets/?page=${i}`);
    const json =  await data.json();
    json.results.forEach((planet:any) => {
    let idArr = planet.url.split("/");
    planets.push({name:planet.name, id:idArr[5]})
})
  }
  return {
      props: {planets},
  }
  
}
type PageProps = {
  planets: {name: string,
            id: string}[],
}

export default function Home(props: PageProps) {
  if(props.planets.length === 0){
    return(
      <>Loading Data</>
    )
  }else{
    return (
      <> 

          {props.planets.map( (planet) => {
            return (
              <div>
                <Link href={`/planets/id=${planet.id}`}>{planet.name}</Link>
                <br></br>
              </div>
            )
          })}
      </>
  
    )
  }

}