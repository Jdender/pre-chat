import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import VueApollo from 'vue-apollo';

const HTTP_URL = 'http://localhost:8080';
const WS_URL = 'ws://localhost:808';

// Good ol' error handler
const errorLink = onError(({ graphQLErrors, networkError }) => {

    if (graphQLErrors) graphQLErrors.map(({ message, locations, path }) =>
        console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
        ),
    );

    if (networkError) console.log(`[Network error]: ${networkError}`);
});

// Everything else
const httpLink = new HttpLink({
    uri: HTTP_URL,
});

// Subscriptions
const wsLink = new WebSocketLink({
    uri: WS_URL,
    options: {
        reconnect: true,
    },
});

// Split based on operation type
const splitLink = split(
    ({ query }) => {
      const { kind, operation } = getMainDefinition(query);
      return kind === 'OperationDefinition' && operation === 'subscription';
    },
    wsLink,
    httpLink,
);

// Pipe everything together
const link = ApolloLink.from([
    errorLink,
    splitLink,
]);

const client = new ApolloClient({
    link,
    cache: new InMemoryCache()
});

export const apolloProvider = new VueApollo({
    defaultClient: client,
});
