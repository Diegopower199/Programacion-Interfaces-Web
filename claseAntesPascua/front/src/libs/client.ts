import {ApolloClient, InMemoryCache, NormalizedCacheObject} from "@apollo/client";

// const client = new ApolloClient({
//     uri: "https://loquesea.com/graphql",
//     cache: new InMemoryCache(),
// })

let client: ApolloClient<NormalizedCacheObject> | undefined = undefined;

const getSSRCLient = () => { // LADO DEL SERVIDOR
    return new ApolloClient({
            uri: API_SSR,
            cache: new InMemoryCache(),
    });

}

export const CSRClient = new ApolloClient ({
    uri: API_CSR,
    cache: new InMemoryCache()
});

export default getCLient;
