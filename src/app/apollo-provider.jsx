"use client";

import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import { setContext } from "@apollo/client/link/context";
import { useMemo } from "react";

export default function ApolloClientProvider({ children }) {
  const client = useMemo(() => {
    const uri =
      process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT ?? "http://localhost:4000/";

    const httpLink = new HttpLink({ uri });

    const authLink = setContext((_, { headers }) => {
      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("authToken")
          : null;

      return {
        headers: {
          ...headers,
          authorization: token ? `${token}` : "",
        },
      };
    });

    return new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache(),
    });
  }, []);

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

// "use client";

// import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
// import { ApolloProvider } from "@apollo/client/react";
// import { useMemo } from "react";

// export default function ApolloClientProvider({ children }) {
//   const client = useMemo(() => {
//     const uri =
//       process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT ?? "http://localhost:4000/";

//     return new ApolloClient({
//       link: new HttpLink({ uri }),
//       cache: new InMemoryCache(),
//     });
//   }, []);

//   return <ApolloProvider client={client}>{children}</ApolloProvider>;
// }
