//Letting "messages" be the message input to the bot
//All imports, adjusted to Node v8.10.0 syntax because it's what I have + can't update 😭
const fetch =  require("node-fetch") ; 
const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

 
//Groq API info:
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const API_KEY = process.env.GROQ_API_KEY //key in .env form


if (!API_KEY) {
    console.error("ERROR: Missing GROQ_API_KEY in .env");
}
function nutriBotAnswer(userMessage){
    return new Promise (function(resolve, reject){
        const body = { 
        model: "llama-3.1-70b-versatile",  
        messages:[
            {role: "system", content: `
            You are a Singapore nutrition expert. Rules:
            - Answer ONLY nutrition questions.
            - Cite HPB, HealthHub, or WHO.
            - Respond in EXACTLY 6 bullet points
            - Each bullet must be no more than 2 sentences
            - Write **no more than 140 words**, and stop immediately once you reach the limit
            - Stay concise and evidence-based
        `},
            {role: "user", content: userMessage}
        ],
        temperature: 0.7, 
        max_tokens : 500

    };
    fetch(GROQ_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": "Bearer "  + API_KEY}, 
        body:JSON.stringify(body)
    })
    .then(res => res.json())
    .then(data => {
        if (!data.choices || data.choices.length === 0){
            return reject(new Error("API did not return any choices, Please check your key and model."));
        
        }
        resolve(data.choices[0].message.content);
    })
    .catch(err => reject(err));
   });
    
};

//Express endpoint for front end to call:
app.post("/ask", function(req, res){
    var userMessage = req.body.message;
    nutriBotAnswer(userMessage)
    .then(answer => res.json({reply:answer }) )
    .catch(err => {
        console.error(err)
        res.status(500).json({reply: "Error in talking to AI."});

    });
});

//start server
app.listen(3000, function(){
    console.log("NutriBot backend running on port 3000")
});

