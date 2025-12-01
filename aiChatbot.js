const summarizeBtn = document.getElementById("summarizeBtn");

summarizeBtn.addEventListener("click", async function() {

    const text = document.getElementById("notes").value;
    console.log(text); // check what text was captured

    if (!text) {
        alert("Please paste some text to summarize!");
        return;
    }

    const output = document.getElementById("output");
    output.innerText = "Summarizing... please wait...";

    let response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer YOUR_OPENAI_API_KEY" // replace with your OpenAI API key
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "You are a helpful assistant." },
                { role: "user", content: text }
            ]
        })
    });

    let data = await response.json();

    // The API returns an array of choices
    document.getElementById("output").innerText = data.choices[0].message.content;
});


