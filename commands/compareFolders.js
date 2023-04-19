import { findPlagiarism, checkStatus, getResult } from "../utils/index.js";
import compare from './compare.js';


function compareFolders (folders, fileName) {
    const arrayOfFolders = folders.split(';');

    arrayOfFolders.forEach((firstFolderPath) => {
        arrayOfFolders.forEach((secondFolderPath) => {
            if (firstFolderPath !== secondFolderPath) {
                compare(`${firstFolderPath}/${fileName}`, `${secondFolderPath}/${fileName}`);
            }
        })
    });
}

export default compareFolders;