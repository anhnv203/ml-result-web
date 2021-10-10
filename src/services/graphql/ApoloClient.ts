import { useMemo } from 'react';
import { ApolloClient, ApolloLink, HttpLink, InMemoryCache, from, split, NormalizedCacheObject } from '@apollo/client';
import merge from 'deepmerge';
import isEqual from 'lodash/isEqual';
import cookie from 'js-cookie';

import { onError } from '@apollo/client/link/error';

// import Keys from 'constants/Keys';

export const APOLLO_STATE_PROP_NAME = '_APOLLO_STATE_';

let apolloClient: ApolloClient<NormalizedCacheObject>;

const authLink = new ApolloLink((operation, forward) => {
    const hasuraToken = cookie.get(`TOKEN`);
    operation.setContext(({ headers }: any) => {
        return {
            headers: {
                // ...(hasuraToken ? { Authorization: `Bearer ${hasuraToken}` } : {}),
                'x-hasura-admin-secret': '1',
                ...(headers || {}),
            },
        };
    });
    return forward(operation);
});

const consoleLink = new ApolloLink((operation, forward) => {
    console.log('starting request for ${operation.operationName}');
    return forward(operation).map((data) => {
        console.log('ending request for ${operation.operationName}');
        return data;
    });
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
        graphQLErrors.forEach(({ message, locations, path }) => {
            console.log('[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}');
        });
    }
    if (networkError) console.log(`[Network error]: ${networkError}`);
});

const httpLink = new HttpLink({
    uri: 'http://ocr-demo-1.barebone.papaya.services:81/v1/graphql',
});

const link = httpLink;

function createApolloClient() {
    return new ApolloClient({
        ssrMode: typeof window === 'undefined',
        link: from([authLink, consoleLink, errorLink, link]),
        cache: new InMemoryCache(),
    });
}

export function initializeApollo(initialState = null) {
    const _apolloClient = apolloClient ?? createApolloClient();
    const tokenData = cookie.get(`Keys.TOKEN`);
    const anonymous = !tokenData || tokenData === process.env.ANONYMOUS_TOKEN;
    if (initialState) {
        const existingCache = _apolloClient.extract();

        const data = merge(initialState, existingCache, {
            arrayMerge: (destinationArray, sourceArray) => [
                ...sourceArray,
                ...destinationArray.filter((d) => sourceArray.every((s) => !isEqual(d, s))),
            ],
        });

        _apolloClient.cache.restore(data);
    }

    if (typeof window === 'undefined') return _apolloClient;

    // if (!apolloClient) apolloClient = _apolloClient;
    // _apolloClient.token = tokenData;
    // _apolloClient.anonymous = anonymous;

    return _apolloClient;
}

export function addApolloState(client: any, pageProps: any) {
    if (pageProps?.props) {
        pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
    }

    return pageProps;
}

export function useApollo() {
    const store = useMemo(() => initializeApollo(), []);
    return store;
}
