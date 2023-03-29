import fetch from 'node-fetch';
import fs from 'fs';

export const findPlagiarism = async (firstFilePath, secondFilePath) => {
    const file1 = fs.readFileSync(firstFilePath, { encoding: 'utf8' });
    const file2 = fs.readFileSync(secondFilePath, { encoding: 'utf8' });

    return await fetch('http://127.0.0.1:5000/compare', {
        method: 'POST',
        body: JSON.stringify({
            files: [
                {
                    fileContent: file1,
                    fileType: 'cpp',
                },
                {
                    fileContent: file2,
                    fileType: 'cpp',
                }
            ]
        }),
        headers: {
            'Content-type': 'application/json'
        }
    }).then((res) => res.json())
}
