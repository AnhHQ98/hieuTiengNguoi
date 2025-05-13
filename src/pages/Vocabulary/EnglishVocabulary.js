import { useState, useEffect } from "react";

function EnglishVocabulary() {
    const [selectedEnglishLetter, setSelectedEnglishLetter] = useState(null);
    const [wordClass, setWordClass] = useState({});
    const [englishWordAppearance, setEnglishWordAppearance] = useState({});
    const [englishWordToFilmMap, setEnglishWordToFilmMap] = useState([]);
    const englishAlphabet = Array.from({ length: 26 }, (_, i) => String.fromCharCode(97 + i));
    useEffect(() => {
        fetch('http://localhost:1025/wordclass')
            .then((res) => res.json())
            .then((data) => setWordClass(data))
            .catch((err) => console.error('❌ Lỗi fetch wordClass từ backend:', err));
        fetch('http://localhost:1025/englishWordAppearance')
            .then((res) => res.json())
            .then((data) => setEnglishWordAppearance(data))
            .catch((err) => console.error('❌ Lỗi fetch englishWordAppearance:', err));
    }, []);
    const handleEnglishLetterClick = (englishLetter) => {
        setSelectedEnglishLetter(englishLetter);
        const englishWordToFilmList = Object.keys(wordClass)
            .filter((englishWord) => englishWord.startsWith(englishLetter))
            .map((englishWord) => ({
                englishWord,
                films: Object.entries(englishWordAppearance[englishWord] || {}).map(([filmName, filmData]) => ({
                    filmName,
                    part: filmData.part,
                    scenes: Object.entries(filmData.scenes).flatMap(([scene, shots]) =>
                        shots.map((shot) => ({
                            scene,
                            shot: shot.shot,
                            character: shot.character,
                            dialogue: shot.dialogue,
                        })),
                    ),
                })),
            }));
        console.log('Kết quả:', englishWordToFilmList);
        setEnglishWordToFilmMap(englishWordToFilmList);
    };       
    const handleBackClick = () => {
        setSelectedEnglishLetter(null);
        setEnglishWordToFilmMap([]);
    };
    return (
        <div>
            {!selectedEnglishLetter && (
                <ul>
                    {englishAlphabet.map((englishLetter) => (
                        <li key={englishLetter} onClick={() => handleEnglishLetterClick(englishLetter)}>
                            {englishLetter}
                        </li>
                    ))}
                </ul>
            )}
            {selectedEnglishLetter && (
                <div>
                    <button onClick={handleBackClick}>←</button>
                    <ul>
                        {englishWordToFilmMap.map(({ englishWord, films }) => (
                            <li key={englishWord}>
                                <strong>{englishWord}</strong>
                                <ul>
                                    {films.length === 0 ? (
                                        <li>
                                            <em>Không xuất hiện trong phim nào</em>
                                        </li>
                                    ) : (
                                        films.map(({ filmName, part, scenes }) => (
                                            <li key={filmName}>
                                                {filmName} (Part {part})
                                                <ul>
                                                    {scenes.map((scene, i) => (
                                                        <li key={i}>
                                                            Scene {scene.scene}, shot {scene.shot} {' '}
                                                            {scene.character || ''}: {scene.dialogue}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </li>
                                        ))
                                    )}
                                </ul>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default EnglishVocabulary;