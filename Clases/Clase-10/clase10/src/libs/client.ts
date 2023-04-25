import {ApolloClient, InMemoryCache, NormalizedCacheObject} from "@apollo/client";

// const client = new ApolloClient({
//     uri: "https://loquesea.com/graphql",
//     cache: new InMemoryCache(),
// })

let client: ApolloClient<NormalizedCacheObject> | undefined = undefined;

const CSRClient = new ApolloClient ({
    uri: "https://rickandmortyapi.com/graphql",
    cache: new InMemoryCache()
});

const getClient = () => { // LADO DEL SERVIDOR
    if (typeof window === undefined){
        return new ApolloClient({
            uri: "https://rickandmortyapi.com/graphql",
            cache: new InMemoryCache(),
        });
    }
    else {
        return CSRClient;
    }
    
}
export default getClient;

