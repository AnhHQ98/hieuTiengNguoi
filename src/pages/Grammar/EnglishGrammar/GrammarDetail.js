import { useParams } from "react-router-dom";

import EnglishGrammar from "./EnglishGrammar";

function GrammarDetail() {
    const { language } = useParams();

    return ( 
        <div>
            {language === 'english' && <EnglishGrammar/>}
        </div>
    );
}

export default GrammarDetail;