import { Link } from "react-router-dom";

import config from "~/config";

function Vocabulary() {
    return (
        <ul>
            <li>
                <Link to={config.routes.englishAlphabet}>English alphabet</Link>
            </li>
            <li>
                <Link to={config.routes.japaneseAlphabet}>Japanese alphabet</Link>
            </li>
            <li>
                <Link to={config.routes.chineseAlphabet}>Chinese alphabet</Link>
            </li>
            <li>
                <Link to={config.routes.koreanAlphabet}>Korean alphabet</Link>
            </li>
            <li>
                <Link to={config.routes.frenchAlphabet}>French alphabet</Link>
            </li>
        </ul>
    );
}

export default Vocabulary;