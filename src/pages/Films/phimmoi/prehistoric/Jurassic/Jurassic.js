import { Link } from "react-router-dom";

import config from "~/config";

function Jurassic() {
    return (
        <ul>
            <li>
                <Link to={config.routes.jurassicWorld}>Jurassic World</Link>
            </li>
            <li>
                <Link to={config.routes.jurassicPark}>Jurassic Park</Link>
            </li>
        </ul>
    );
}

export default Jurassic;