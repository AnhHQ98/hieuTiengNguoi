// nativeLanguage, intermediateLanguage , learningLanguage
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { privateRoutes } from "~/routes";

import { DefaultLayout } from "~/components/Layout";

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    {privateRoutes.map((route, index) => {
                        const RouteLayout = route.layout || DefaultLayout;
                        const RouteComponent = route.component;

                        return (
                            <Route key={index} path={route.path}
                                element={
                                    <RouteLayout>
                                        <RouteComponent />
                                    </RouteLayout>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
