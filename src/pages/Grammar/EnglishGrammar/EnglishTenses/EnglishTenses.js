import { Link } from 'react-router-dom';

import config from '~/config';

function EnglishTenses() {
    return (
        <ul>
            <li>
                <Link to={config.routes.presentTense}>Present Tense</Link>
            </li>
            <li>
                <Link to={config.routes.pastTense}>Past Tense</Link>
            </li>
            <li>
                <Link to={config.routes.futureTense}>Future Tense</Link>
            </li>
        </ul>
    );
}

export default EnglishTenses;
