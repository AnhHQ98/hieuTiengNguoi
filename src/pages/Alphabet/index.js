import { Link } from "react-router-dom";
import config from "~/config";

function Alphabet() {
    return (
        <ul>
            <li>
                <Link to={`${config.routes.alphabet}/english`}>English alphabet</Link>
            </li>
            <li>
                <Link to={`${config.routes.alphabet}/japanese`}>Japanese alphabaet</Link>
            </li>
            <li>
                <Link to={`${config.routes.alphabet}/chinese`}>Chinese alphabaet</Link>
            </li>
            <li>
                <Link to={`${config.routes.alphabet}/korean`}>Korean alphabet</Link>
            </li>
            <li>
                <Link to={`${config.routes.alphabet}/french`}>French alphabet</Link>
            </li>
        </ul>
    );
}

export default Alphabet;