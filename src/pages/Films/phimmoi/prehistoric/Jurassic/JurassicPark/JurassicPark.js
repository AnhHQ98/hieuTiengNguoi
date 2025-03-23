import { Link } from 'react-router-dom';

import config from '~/config';

import FilmCard from '~/layouts/components/FilmCard';

import {
    JurassicPark_json,
    JurassicPark1_json,
    JurassicPark2_json,
    JurassicPark3_json,
} from '~/data/json/phimmoi';


function JurassicPark() {
    return (
        <ul>
            <li>
                <Link to={config.routes.jurassicPark1}>
                    <FilmCard film_json={JurassicPark_json} part_json={JurassicPark1_json} />
                </Link>
            </li>
            <li>
                <Link to={config.routes.jurassicPark2}>
                    <FilmCard film_json={JurassicPark_json} part_json={JurassicPark2_json} />
                </Link>
            </li>
            <li>
                <Link to={config.routes.jurassicPark3}>
                    <FilmCard film_json={JurassicPark_json} part_json={JurassicPark3_json} />
                </Link>
            </li>
        </ul>
    );
}

export default JurassicPark;
