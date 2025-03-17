import { Link } from 'react-router-dom';

import config from '~/config';

function Grammar() {
    return (
        <ul>
            <li>
                <Link to={config.routes.englishGrammar}>English grammar</Link>
            </li>
            <li>
                <Link to={config.routes.japaneseGrammar}>Japanese grammar</Link>
            </li>
            <li>
                <Link to={config.routes.chineseGrammar}>Chinese grammar</Link>
            </li>
            <li>
                <Link to={config.routes.koreanGrammar}>Korean grammar</Link>
            </li>
            <li>
                <Link to={config.routes.frenchGrammar}>French grammar</Link>
            </li>
        </ul>
    );
}

export default Grammar;
