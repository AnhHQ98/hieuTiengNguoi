import { Link } from 'react-router-dom';

import config from '~/config';

function Phimmoi() {
    return (
        <ul>
            <li>
                <Link to={config.routes.modern}>Modern Times</Link>
            </li>
            <li>
                <Link to={config.routes.medievel}>Medievel Times</Link>
            </li>
            <li>
                <Link to={config.routes.ancient}>Ancient Times</Link>
            </li>
            <li>
                <Link to={config.routes.prehistoric}>Prehistoric Times</Link>
            </li>
        </ul>
    );
}

export default Phimmoi;
