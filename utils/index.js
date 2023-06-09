import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
const BASE_URL = 'http://51.250.72.212:5000/';

export const findPlagiarism = async (firstFilePath, secondFilePath) => {
    const file1 = fs.readFileSync(path.resolve(firstFilePath), { encoding: 'utf8' });
    const file2 = fs.readFileSync(path.resolve(secondFilePath), { encoding: 'utf8' });

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
