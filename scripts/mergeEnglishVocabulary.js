const fs = require('fs');
const path = require('path');

const inputDir = path.join(__dirname, '../public/json/english/vocabulary/alphabet');
const outputFile = path.join(__dirname, '../public/json/english/vocabulary/englishVocabulary.json');

const finalVocabulary = {};
let totalWords = 0;
let totalFiles = 0;

fs.readdirSync(inputDir).forEach(file => {
    if (!file.endsWith('.json')) return;
    totalFiles++;

    const filePath = path.join(inputDir, file);
})
