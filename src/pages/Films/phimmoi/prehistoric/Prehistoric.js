import { Link } from 'react-router-dom';

import config from '~/config';

function Prehistoric() {
    return (
        <ul>
            <li>
                <Link to={config.routes.iceAge}>Ice Age</Link>
            </li>
            <li>
                <Link to={config.routes.jurassic}>Jurassic</Link>
            </li>
        </ul>
    );
}

export default Prehistoric;
