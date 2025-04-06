import { Link } from 'react-router-dom';

import config from '~/config';

function Grammar() {
    return (
        <ul>
            <li>
                <Link to={config.routes.englishGrammar}>English grammar</Link>
            </li>
        </ul>
    );
}

export default Grammar;
