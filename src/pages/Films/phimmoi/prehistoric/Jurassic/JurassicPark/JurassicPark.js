import { Link } from 'react-router-dom';

import config from '~/config';

import FilmCard from '~/layouts/components/FilmCard';

import JurassicParkJson from './JurassicPark.json';
import part1Json from './p1/JurassicPark1.json';
import part2Json from './p2/JurassicPark2.json';
import part3Json from './p3/JurassicPark3.json';

function JurassicPark() {
    return (
        <div>
            <ul>
                <li>
                    <Link to={config.routes.jurassicPark1}>
                        <FilmCard filmJson={JurassicParkJson} partJson={part1Json} />
                    </Link>
                </li>
                <li>
                    <Link to={config.routes.jurassicPark2}>
                        <FilmCard filmJson={JurassicParkJson} partJson={part2Json} />
                    </Link>
                </li>
                <li>
                    <Link to={config.routes.jurassicPark3}>
                        <FilmCard filmJson={JurassicParkJson} partJson={part3Json} />
                    </Link>
                </li>
            </ul>
        </div>
    );
}

export default JurassicPark;
