# plagiarism-detector

Библиотека для проверки плагиата кода. Предоставляет ```CLI``` и набор функций.

## Установка:
```npm install plagiarism-detector```
Теперь вы можете импортировать в свой код функции:
```
findPlagiarism(firstFilePath, secondFilePath) - Возвращает объект 
{ state, data }. data содержит id задачи.
```
```
checkStatus(id) - возвращаеь статуса готовности задачи в виде объекта
{ state, data }. data содержит статус готовности: 
```success, failure or pending```
```
```
getResult(id) - возвращает результат работы алгоритма в виде 
объекта { state, data }. data - массив строк, подозреваемых на плагиат
```

```state``` в каждой функции содержит статус ответ от сервера. При успешном выполнении запроса возвращается ```ok```, в случае ошибки возвращается ```fail``` и массив ```errors```

Так же, можно добавить следующие строки в ```package.json```:
```
"scripts": {

	"plag": "plag-detector compare --firstFilePath PATH_TO_FILE --secondFilePath PATH_TO_FILE",

	"plag-folders": "plag-detector compare-folders --foldersPattern FOLDERS_PATTERN --fileName FILE_NAME"

}
```

И теперь вы можете запускать эти команды через консоль:
```npm run plag```, ```npm run plag-folders```

## Установка глобально:
```npm install plagiarism-detector -g```

Такой метод установки автоматически добавит библиотеку в ваш ```PATH```  и вы сможете пользовать ```CLI``` в любом месте вашей машины.
