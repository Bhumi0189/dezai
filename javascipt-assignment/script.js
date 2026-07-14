const button = document.getElementById("btn");
const quote = document.getElementById("quote");
const author = document.getElementById("author");

async function getQuote() {
    try {
        quote.textContent = "Loading...";
        author.textContent = "";

        const response = await fetch("https://dummyjson.com/quotes/random");

        if (!response.ok) {
            throw new Error("Failed to fetch quote");
        }

        const data = await response.json();

        quote.textContent = `"${data.quote}"`;
        author.textContent = `— ${data.author}`;

    } catch (error) {
        quote.textContent = "Error fetching quote.";
        author.textContent = "";
        console.error(error);
    }
}

button.addEventListener("click", getQuote);