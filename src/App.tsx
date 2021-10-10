import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ListOcrInstances } from './pages';
import { QueryClient, QueryClientProvider } from 'react-query';
import { QueryParamProvider } from 'use-query-params';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from './services/graphql/ApoloClient';
function App() {
    const apolloClient = useApollo();
    return (
        <ApolloProvider client={apolloClient}>
            <BrowserRouter>
                <QueryParamProvider ReactRouterRoute={Route}>
                    <div>
                        <Switch>
                            <Route exact path="/" component={ListOcrInstances} />
                            <Route exact path="/listOCR" component={ListOcrInstances} />
                        </Switch>
                    </div>
                </QueryParamProvider>
            </BrowserRouter>
        </ApolloProvider>
    );
}

export default App;
