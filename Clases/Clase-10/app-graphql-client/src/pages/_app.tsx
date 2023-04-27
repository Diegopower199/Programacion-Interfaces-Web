import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ApolloProvider } from "@apollo/client";
import getClient from "@/libs/client";

export default function App({ Component, pageProps }: AppProps) {
  const client = getClient();
  return(
    // @ts-ignore
   <ApolloProvider client = {client}>
    <Component {...pageProps} />
  </ApolloProvider>)
}
