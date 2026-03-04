const https = require('https');
const url = 'https://html.duckduckgo.com/html/?q=site:mayar.id+%22api%22+%22payment+link%22';
https.get(url, (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    const matches = data.match(/<a class="result__snippet[^>]*>(.*?)<\/a>/g);
    if (matches) {
       matches.forEach(m => console.log(m.replace(/(<([^>]+)>)/gi, "")));
    }
  });
});
