import { Link } from 'react-router-dom';

import config from '~/config';

function EnglishGrammar() {
    return (
        <ul>
            <li>
                <Link to={config.routes.englishTenses}>English Tense</Link>
            </li>
        </ul>
    );
}

export default EnglishGrammar;
