import { findPlagiarism, checkStatus, getResult } from "../utils/index.js";
import compare from './compare.js';
import fs from "fs";


function compareFolders (folders, fileName) {
    const arrayOfFolders = folders.split(';');
    const promises = [];

    arrayOfFolders.forEach((firstFolderPath) => {
        arrayOfFolders.forEach((secondFolderPath) => {
            if (firstFolderPath !== secondFolderPath) {
                const task = compare(`${firstFolderPath}/${fileName}`, `${secondFolderPath}/${fileName}`);
                promises.push(task);
            }
        })
    });

    Promise.all(promises).then((data) => {
        fs.writeFile(process.cwd() + '/plag.json', data, () => {
            console.log(
                chalk.blue.bold('Completed')
            );
        })
    });
}

export default compareFolders;