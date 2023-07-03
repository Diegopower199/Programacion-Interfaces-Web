import { ApolloClient, InMemoryCache, NormalizedCacheObject } from "@apollo/client";

let client: ApolloClient<NormalizedCacheObject> | undefined  = undefined;

const CSRClient = new ApolloClient({
    uri: "https://rickandmortyapi.com/graphql",
    cache: new InMemoryCache(),
})

const getClient = () => {
    if (typeof window === "undefined") {
        return new ApolloClient({
            uri: "https://rickandmortyapi.com/graphql",
            cache: new InMemoryCache(),
        })
    }
    else {
        return CSRClient;
    }
}

export default getClient;