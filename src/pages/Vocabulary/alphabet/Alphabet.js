import { Link } from 'react-router-dom';

import config from '~/config';

function Alphabet() {
    return (
        <ul>
            <li>
                <Link to={config.routes.englishAlphabet}>English alphabet</Link>
            </li>
        </ul>
    );
}

export default Alphabet;
