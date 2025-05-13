import { useState, useEffect } from 'react';
import FilmInfo from '~/layouts/components/FilmInfo';

function JurassicPark1() {
    const [filmJson, setFilmJson] = useState(null);
    const [selectedScene, setSelectedScene] = useState(null);
    const [sceneContent, setSceneContent] = useState(null);
    useEffect(() => {
        fetch('http://localhost:1025/phimmoi/prehistoric/Jurassic/JurassicPark/part1/JurassicPark1')
            .then((res) => {
                if (!res.ok) throw new Error('Lỗi response từ server');
                return res.json();
            })
            .then((data) => setFilmJson(data))
            .catch((err) => console.error('Lỗi khi fetch JSON JurassicPark1: ', err));
    }, []);
    const handleSceneClick = (sceneNumber) => {
        const sceneFileName = `scene${sceneNumber}_JurassicPark1`;
        fetch(`http://localhost:1025/phimmoi/prehistoric/Jurassic/JurassicPark/part1/${sceneFileName}`)
            .then(res => res.json())
            .then(data => setSceneContent(data))
            .catch(err => console.error(`Lỗi load scene ${sceneNumber}:`, err));
    }
    if (!filmJson) return <div>Loading filmJson...</div>;
    
    return (
        <FilmInfo
            film_json={filmJson}
            sceneContent={sceneContent}
            selectedScene={selectedScene}
            onSceneClick={handleSceneClick}
        />
    );   
}

export default JurassicPark1;