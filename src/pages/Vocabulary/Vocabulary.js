import { Link } from "react-router-dom";

import config from "~/config";

function Vocabulary() {
    return (
        <ul>
            <li>
                <Link to={config.routes.englishAlphabet}>English alphabet</Link>
            </li>
        </ul>
    );
}

export default Vocabulary;