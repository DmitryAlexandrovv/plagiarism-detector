import chalk from "chalk";
import { findPlagiarism, checkStatus, getResult } from "../utils/index.js";

function compare (firstFilePath, secondFilePath, firstRelativePath, secondRelativePath) {
    const startTime = new Date().getTime();
    return findPlagiarism(firstFilePath, secondFilePath)
        .then(async ({ state, data }) => {
            const id = data;

            if (state === 'ok') {
                const result = await new Promise((resolve) => {
                    const intervalId = setInterval(async () => {
                        const statusResult = await checkStatus(id);

                        console.log(
                            chalk.green.bold(statusResult.data)
                        );
        
                        if (statusResult.state === 'ok' && statusResult.data === 'SUCCESS') {
                            clearInterval(intervalId);
        
                            resolve();
                        }
                    }, 4000)
                })
                    .then(() => getResult(id))
                    .then((res) => {
                        const endTime = new Date().getTime();

                        console.log(
                            chalk.blue.bold(`Plagiarism for files ${firstRelativePath ? firstRelativePath : firstFilePath} and ${secondRelativePath ? secondRelativePath : secondFilePath} finded in lines:`)
                        );
                        console.log(
                            chalk.blue.bold(`Time to work ${(endTime - startTime) / 1000}`)
                        );
                        console.log(
                            `plagged lines ${chalk.blue.bold(res.data)}`
                        );

                        return {
                            firstRelativePath,
                            secondRelativePath,
                            result: res.data,
                        };
                    });
                return result;
            }
        })
        .catch((e) => {
            console.log(e);
        })
}

export default compare;