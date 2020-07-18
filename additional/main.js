const API_KEY = `trnsl.1.1.20190225T091515Z.06bde7bd52a8c1a7.0749f827a8a0474bf52a18b3b47f827f339c781a`;
let inputText;
const data = () => fetch(`https://translate.yandex.net/api/v1.5/tr.json/translate
&key=${API_KEY}
&text=${inputText}
&lang='ru-en'`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  }
});