import { Link } from "react-router-dom";

import config from "~/config";

function PastTense() {
    return (
        <ul>
            <li>
                <Link to={config.routes.pastSimple}>Past Simple</Link>
            </li>
            <li>
                <Link to={config.routes.pastContinuous}>Past Continuous</Link>
            </li>
            <li>
                <Link to={config.routes.pastPerfect}>Past Perfect</Link>
            </li>
            <li>
                <Link to={config.routes.pastPerfectContinuous}>Past Perfect Continuous</Link>
            </li>
        </ul>
    );
}

export default PastTense;
