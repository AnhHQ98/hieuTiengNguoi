import { useState, useEffect } from "react";

function EnglishVocabulary() {
    const [selectedEnglishLetter, setselectedEnglishLetter] = useState();
    const [wordClass, setWordClass] = useState();
    const englishAlphabet = Array.from({ length: 26 }, (_, i) => String.fromCharCode(97 + i));
    useEffect(() => {
            fetch('http://localhost:1025/wordclass')
                .then((res) => res.json())
                .then((data) => setWordClass(data))
                .catch((err) => console.error('❌ Lỗi fetch wordClass từ backend:', err));
        }, []);
    const handleEnglishLetterClick = (englishLetter) => {
        setselectedEnglishLetter(englishLetter);
        if (wordClass) {
            Object.keys(wordClass).filter((word) => word.startsWith(englishLetter));
            console.log(`📢 Từ bắt đầu bằng '${englishLetter}':`, Object.keys(wordClass).filter((word) => word.startsWith(englishLetter)));
        }
    };
    const handleBackClick = () => {
        setselectedEnglishLetter(null);
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
                        {Object.keys(wordClass)
                            .filter((word) => word.startsWith(selectedEnglishLetter))
                            .map((word) => (
                                <li key={word}>{word}</li>
                            ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default EnglishVocabulary;