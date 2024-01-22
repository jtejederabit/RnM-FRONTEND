import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import RoutesProvider from "./utils/router/routes";
import Layout from "./components/common/Layout";

const App: React.FC = () => {
    return (
        <Router>
            <Layout>
                <RoutesProvider />
            </Layout>
        </Router>
    );
}

export default App;