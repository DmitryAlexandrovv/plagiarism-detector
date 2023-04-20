import chalk from "chalk";
import fs from "fs";
import { findPlagiarism, checkStatus, getResult } from "../utils/index.js";


function compare (firstFilePath, secondFilePath) {
    findPlagiarism(firstFilePath, secondFilePath)
    .then(({ state, data }) => {
        const id = data;

        if (state === 'ok') {
            new Promise((resolve) => {
                const intervalId = setInterval(async () => {
                    const statusResult = await checkStatus(id);
    
                    if (statusResult.state === 'ok' && statusResult.data === 'SUCCESS') {
                        clearInterval(intervalId);
    
                        resolve();
                    }
                }, 4000)
            })
                .then(() => getResult(id))
                .then((res) => {
                    console.log(
                        chalk.blue.bold('Plagiarism finded in lines:')
                    );
                    console.log(
                        chalk.blue.bold(res.data)
                    );
                    fs.writeFile('../../../test.txt', '123', () => {
                        console.log(
                            chalk.blue.bold('file saved')
                        );
                    });
                })
        }
    })
    .catch((e) => {
        console.log(e);
    })
}

export default compare;