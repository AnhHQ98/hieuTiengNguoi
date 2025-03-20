import { Link } from 'react-router-dom';

import config from '~/config';

// import { FilmInfo } from '~/layouts';

import JurassicParkJson from './JurassicPark.json';
import part1Json from './part1/part1.json';

function JurassicPark() {
    return (
        // < FilmInfo filmJson = { JurassicParkJson } partJson = { part1Json } />
        <Link to={config.routes.jurassicPark}>
            ({part1Json.year}) {JurassicParkJson.englishName} {part1Json.part}
        </Link>
    );
}

export default JurassicPark;