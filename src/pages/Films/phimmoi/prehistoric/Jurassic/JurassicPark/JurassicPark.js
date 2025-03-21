import { Link } from 'react-router-dom';

import config from '~/config';

import FilmCard from '~/layouts/components/FilmCard';

import JurassicParkJson from './JurassicPark.json';
import part1Json from './part1/part1.json';
import part2Json from './part2/part2.json';
import part3Json from './part3/part3.json';

function JurassicPark() {
    return (
        <div>
            <ul>
                <li>
                    <Link to={config.routes.jurassicPark_part1}>
                        <FilmCard filmJson={JurassicParkJson} partJson={part1Json} />
                    </Link>
                </li>
                <li>
                    <Link to={config.routes.jurassicPark_part2}>
                        <FilmCard filmJson={JurassicParkJson} partJson={part2Json} />
                    </Link>
                </li>
                <li>
                    <Link to={config.routes.jurassicPark_part3}>
                        <FilmCard filmJson={JurassicParkJson} partJson={part3Json} />
                    </Link>
                </li>
            </ul>
        </div>
    );
}

export default JurassicPark;
