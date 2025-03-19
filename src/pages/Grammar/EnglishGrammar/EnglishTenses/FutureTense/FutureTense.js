import { Link } from "react-router-dom";

import config from "~/config";

function FutureTense() {
    return (
        <ul>
            <li>
                <Link to={config.routes.futureSimple}>Future Simple</Link>
            </li>
            <li>
                <Link to={config.routes.futureContinuous}>Future Continuous</Link>
            </li>
            <li>
                <Link to={config.routes.futurePerfect}>Future Perfect</Link>
            </li>
            <li>
                <Link to={config.routes.futurePerfectContinuous}>Future Perfect Continuous</Link>
            </li>
        </ul>
    );
}

export default FutureTense;