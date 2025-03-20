import { Link } from "react-router-dom";

import config from "~/config";

function Films() {
    return (
        <ul>
            <li>
                <Link to={config.routes.actors}>Actors</Link>
            </li>
            <li>
                <Link to={config.routes.phimmoi}>Films</Link>
            </li>
        </ul>
    );
}

export default Films;