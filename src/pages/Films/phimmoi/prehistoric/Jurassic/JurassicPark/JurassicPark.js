import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import config from '~/config';
import FilmCard from '~/layouts/components/FilmCard';

function JurassicPark() {
    const [filmJson, setFilmJson] = useState(null);
    const [part1Json, setPart1Json] = useState(null);
    const [part2Json, setPart2Json] = useState(null);
    const [part3Json, setPart3Json] = useState(null);

    useEffect(() => {
        fetch('/json/phimmoi/prehistoric/Jurassic/JurassicPark/JurassicPark.json')
            .then((res) => res.json())
            .then((data) => setFilmJson(data))
            .catch((err) => console.error('Error when loading film JSON:', err));
        fetch('/json/phimmoi/prehistoric/Jurassic/JurassicPark/part1/JurassicPark1.json')
            .then((res) => res.json())
            .then(setPart1Json)
            .catch((err) => console.error('Error loading part1:', err));
        fetch('/json/phimmoi/prehistoric/Jurassic/JurassicPark/part2/JurassicPark2.json')
            .then((res) => res.json())
            .then(setPart2Json)
            .catch((err) => console.error('Error loading part2:', err));
        fetch('/json/phimmoi/prehistoric/Jurassic/JurassicPark/part3/JurassicPark3.json')
            .then((res) => res.json())
            .then(setPart3Json)
            .catch((err) => console.error('Error loading part3:', err));
    }, []);

    if (!filmJson || !part1Json || !part2Json || !part3Json) return <div>Loading film info...</div>;

    return (
        <ul>
            <li>
                <Link to={config.routes.jurassicPark1}>
                    <FilmCard film_json={filmJson} part_json={part1Json} />
                </Link>
            </li>
            <li>
                <Link to={config.routes.jurassicPark2}>
                    <FilmCard film_json={filmJson} part_json={part2Json} />
                </Link>
            </li>
            <li>
                <Link to={config.routes.jurassicPark3}>
                    <FilmCard film_json={filmJson} part_json={part3Json} />
                </Link>
            </li>
        </ul>
    );
}

export default JurassicPark;
