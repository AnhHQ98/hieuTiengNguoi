import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import config from '~/config';
import FilmCard from '~/layouts/components/FilmCard';

function JurassicPark() {
    const [filmJson, setFilmJson] = useState(null);

    useEffect(() => {
        fetch('/json/phimmoi/prehistoric/Jurassic/JurassicPark/JurassicPark.json')
            .then((res) => res.json())
            .then((data) => {
                console.log('Dữ liệu filmJson:', data);
                setFilmJson(data);
            })
            .catch((err) => console.error('Lỗi khi fetch JSON:', err));
    }, []);

    if (!filmJson) return <div>Loading film json...</div>;

    return (
        <ul>
            {filmJson.parts.map((part, index) => (
                <li key={index}>
                    <Link to={config.routes[`jurassicPark${part.part}`]}>
                        <FilmCard film_json={{
                            englishName: filmJson.englishName, year: part.year, part: part.part
                        }}/>
                    </Link>
                </li>
            ))}
        </ul>
    );
}

export default JurassicPark;
