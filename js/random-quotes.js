const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const changeQuote = document.querySelector('.change-quote');

changeQuote.addEventListener('click', getQuotes);

async function getQuotes() {  
    const quotes = 'data.json';
    const res = await fetch(quotes);
    const data = await res.json();
    let randomIndex = Math.floor(Math.random() * (8 - 0 + 1)) + 0
    quote.textContent = data[randomIndex].text;
    author.textContent = data[randomIndex].author;

};
getQuotes();
