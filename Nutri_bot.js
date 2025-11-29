//Letting "messages" be the message input to the bot
//API KEY => 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
const fetch =  require("node-fetch") ; 
const dotenv = require("dotenv");
dotenv.config();


const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const API_KEY = process.env.GROQ_API_KEY //key in .env form

async function nutriBotAnswer(userMessage){
    const body = { 
        model: "llama-3.1-8b-instant", 
        messages:[
            {role: "system", content: "You are a Singapore-based nutrition expert. Your task is to provide evidence-based nutrition advice only. Do not answer ay questions unrelated to nutrition; if the user asks non-nutrition questions, politely redirect them to nutrition topics. ALWAYS references credible sources. Prefer Singapore-based sources such as Health Promotion Board Singapore (HPB), HealthHub SG, Centers for Disease Control and Prevention Singapore (if available), World Health Organisation(WHO). Avoid citing social media or unverified websites. If a Singapore-specific reference is not available, you may cite international sources. Before giving detailed advice, ask the user for relevant information such as : Age, Gender(if relevant to dietary requirements), dietary preferences/restrictions, Health background/conditions. Collect only what is needed to provide safe and personalized guidance.  AND TAKE NOTE: ALL ADVICE MUST : Promote balanced, safe diets, Avoid extreme fad, or unproven diets, Reference evidence in the response where possible, and Contextualize reccomendations to Singapore when applicable. Maintain a professional, approachable tone. Answer succintly but fully, and ensure nutrition is the focus."},
            {role: "user", content: userMessage}
        ],
        temperature: 0.7, 
        max_tokens : 300

};

const response = await fetch(GROQ_API_URL, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${API_KEY}`
    },
    body: JSON.stringify(body)
});

const data = await response.json();
console.log(data); //trying to see full response from the API first, prevent errors

if (!data.choices || data.choices.length === 0){
    throw new Error("API did not return any choices. Check your key and model.");
}

return data.choices[0].message.content; //Reply from the AI

}


//Test:
nutriBotAnswer("Are carbs bad?")
    .then(answer => console.log(answer))
    .catch(err => console.log(err));
