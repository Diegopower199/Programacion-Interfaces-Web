import { ApolloClient, InMemoryCache, NormalizedCacheObject } from "@apollo/client";

let client: ApolloClient<NormalizedCacheObject> | undefined = undefined;

const CSRClient = new ApolloClient({
  uri: "http://localhost:7777/",
  cache: new InMemoryCache(),
});

const getClient = () => {
    if (typeof window === "undefined") {
        return new ApolloClient({
            uri: "http://back:7777/",
            cache: new InMemoryCache(),
        });
    }
    else {
        return CSRClient;
    }
}

export default getClient;