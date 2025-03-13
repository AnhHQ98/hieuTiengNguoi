import { useParams } from 'react-router-dom';

import EnglishAlphabet from './EnglishAlphabet';

function AlphabetDetail() {
    const { language } = useParams();

    return (
        <div>
            {language === 'english' && <EnglishAlphabet/>}
        </div>
    );
}

export default AlphabetDetail;
