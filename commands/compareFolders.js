import { findPlagiarism, checkStatus, getResult } from "../utils/index.js";
import compare from './compare.js';


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

    console.log(Promise.all(promises));

    // fs.writeFile(process.cwd() + '/plag.json', '123', () => {
    //     console.log(
    //         chalk.blue.bold('Completed')
    //     );
    // })
}

export default compareFolders;