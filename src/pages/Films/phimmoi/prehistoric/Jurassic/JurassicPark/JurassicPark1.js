import { useState, useEffect } from 'react';
import FilmInfo1 from '~/layouts/components/FilmInfo/FilmInfo1';

function JurassicPark1() {
    const [filmJson, setFilmJson] = useState(null);
    useEffect(() => {
        fetch('/json/phimmoi/prehistoric/Jurassic/JurassicPark/JurassicPark1.json')
            .then((res) => res.json())
            .then((data) => setFilmJson(data))
            .catch((err) => console.error('Lỗi khi fetch JSON JurassicPark1: ', err))
    }, []);
    if (!filmJson) return <div>Loading filmJson...</div>;
    
    return <FilmInfo1 film_json={filmJson} />;
}

export default JurassicPark1;
