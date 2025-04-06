import { useEffect, useState } from 'react';
import FilmInfo from '~/layouts/components/FilmInfo';

function JurassicPark2() {
    const [filmJson, setFilmJson] = useState(null);
    const [partJson, setPartJson] = useState(null);
    const [scenesJson, setScenesJson] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('/json/phimmoi/prehistoric/Jurassic/JurassicPark/JurassicPark.json')
            .then((res) => res.json())
            .then(setFilmJson)
            .catch((err) => {
                console.error('Lỗi khi load filmJson:', err);
                setError('Không thể load thông tin phim.');
            });

        fetch('/json/phimmoi/prehistoric/Jurassic/JurassicPark/part2/JurassicPark2.json')
            .then((res) => res.json())
            .then(setPartJson)
            .catch((err) => {
                console.error('Lỗi khi load partJson:', err);
                setError('Không thể load thông tin phần 2.');
            });
        
        Promise.all([
            fetch('/json/phimmoi/prehistoric/Jurassic/JurassicPark/part2/scene1_JurassicPark2.json').then((res) => res.json()),
            fetch('/json/phimmoi/prehistoric/Jurassic/JurassicPark/part2/scene2_JurassicPark2.json').then((res) => res.json()),
            fetch('/json/phimmoi/prehistoric/Jurassic/JurassicPark/part2/scene3_JurassicPark2.json').then((res) => res.json()),
            fetch('/json/phimmoi/prehistoric/Jurassic/JurassicPark/part2/scene4_JurassicPark2.json').then((res) => res.json()),
            fetch('/json/phimmoi/prehistoric/Jurassic/JurassicPark/part2/scene5_JurassicPark2.json').then((res) => res.json()),
            fetch('/json/phimmoi/prehistoric/Jurassic/JurassicPark/part2/scene6_JurassicPark2.json').then((res) => res.json()),
            fetch('/json/phimmoi/prehistoric/Jurassic/JurassicPark/part2/scene7_JurassicPark2.json').then((res) => res.json()),
            fetch('/json/phimmoi/prehistoric/Jurassic/JurassicPark/part2/scene8_JurassicPark2.json').then((res) => res.json()),
            fetch('/json/phimmoi/prehistoric/Jurassic/JurassicPark/part2/scene9_JurassicPark2.json').then((res) => res.json()),
            fetch('/json/phimmoi/prehistoric/Jurassic/JurassicPark/part2/scene10_JurassicPark2.json').then((res) => res.json()),
            fetch('/json/phimmoi/prehistoric/Jurassic/JurassicPark/part2/scene11_JurassicPark2.json').then((res) => res.json()),
            fetch('/json/phimmoi/prehistoric/Jurassic/JurassicPark/part2/scene12_JurassicPark2.json').then((res) => res.json()),
            fetch('/json/phimmoi/prehistoric/Jurassic/JurassicPark/part2/scene13_JurassicPark2.json').then((res) => res.json())
        ]).then(setScenesJson).catch((err) => {
            console.error('Lỗi khi load danh sách cảnh:', err);
            setError('Không thể load danh sách cảnh.');
        });
    }, []);


    const frames = scenesJson?.map((scene, sceneIndex) =>
        scene.map((_, frameIndex) =>
            `/images/phimmoi/prehistoric/Jurassic/JurassicPark/part2/scene${sceneIndex + 1}/frame${
                frameIndex + 1
            }_scene${sceneIndex + 1}_JurassicPark2.jpg`,
        ),
    ) || [];

    if (error) return <div style={{ color: 'red' }}>{error}</div>;
    if (!filmJson || !partJson || !scenesJson) return <div>Đang tải Jurassic Park 2...</div>;

    return (
        <FilmInfo
            film_json={filmJson}
            part_json={partJson}
            scenes_json={scenesJson}
            frames={frames}
        />
    ) 
}

export default JurassicPark2;
