import{InMemoryCache, ApolloClient, NormalizedCacheObject} from "@apollo/client";

// const client = new ApolloClient({
//     uri: "https://loquesea.com/graphql",
//     cache: new InMemoryCache(),
// })

let client : ApolloClient<NormalizedCacheObject>|undefined = undefined;
const CSRClient = new ApolloClient({
    uri: "https://rickandmortyapi.com/graphql",
    cache: new InMemoryCache(), //Cache para que una vez se haya hecho la peticion al front o back si se vuelve a hacer la petición no tenga que volver a hacerlo
})

 const getClient = () => {
    if(typeof window === "undefined"){
        return new ApolloClient({
            uri: "https://rickandmortyapi.com/graphql",
            cache: new InMemoryCache(),
        })
    }else{
        return CSRClient;
    }
}

export default getClient;