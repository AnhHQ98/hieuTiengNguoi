function EnglishAlphabet() {
    const letters = [
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
        'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
    ]
    
    return (
        <div>
            <h3>English alphabet:</h3>
            {letters.map((letter) => (
                <span key={letter}>{letter} </span>
            ))}
        </div>
    );
}

export default EnglishAlphabet;