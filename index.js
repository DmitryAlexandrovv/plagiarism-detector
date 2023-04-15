import fetch from 'node-fetch';
import fs from 'fs';

const BASE_URL = 'http://localhost:5000/';

export const findPlagiarism = async (firstFilePath, secondFilePath) => {
    const file1 = fs.readFileSync(firstFilePath, { encoding: 'utf8' });
    const file2 = fs.readFileSync(secondFilePath, { encoding: 'utf8' });

    return await fetch(`${BASE_URL}compare`, {
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
            'Content-type': 'application/json',
        }
    }).then((res) =>{
        return res.json(); 
    })
}

export const checkStatus = async (id) => {
    return await fetch(`${BASE_URL}task_status/${id}`)
        .then((res) => res.json())
}

export const getResult = async (id) => {
    return await fetch(`${BASE_URL}task_result/${id}`)
        .then((res) => res.json())
}
