import { Link } from "react-router-dom";

import config from "~/config";

function PresentTense() {
    return (
        <ul>
            <li>
                <Link to={config.routes.presentSimple}>Present simple</Link>
            </li>
            <li>
                <Link to={config.routes.presentContinuous}>Present Continuous</Link>
            </li>
            <li>
                <Link to={config.routes.presentPerfect}>Present Perfect</Link>
            </li>
            <li>
                <Link to={config.routes.presentPerfectContinuous}>Present Perfect Continuous</Link>
            </li>
        </ul>
    );
}

export default PresentTense;