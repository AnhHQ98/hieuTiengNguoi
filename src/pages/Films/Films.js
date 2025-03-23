import { Link } from "react-router-dom";

import config from "~/config";

import classNames from 'classnames/bind';
import styles from './Films.module.scss';
const cx = classNames.bind(styles);

function Films() {
    return (
        <ul>
            <li>
                <Link to={config.routes.phimmoi}>Films</Link>
            </li>
            <li>
                <Link to={config.routes.actors}>Actors</Link>
            </li>
        </ul>
    );
}

export default Films;