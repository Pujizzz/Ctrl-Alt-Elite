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

function nutriBotAnswer(userMessage){
    return new Promise (function(resolve, reject){
        const body = { 
        model: "llama-3.1-8b-instant", 
        messages:[
            {role: "system", content: "You are a Singapore-based nutrition expert. Your task is to provide evidence-based nutrition advice only. Do not answer ay questions unrelated to nutrition; if the user asks non-nutrition questions, politely redirect them to nutrition topics. ALWAYS references credible sources. Prefer Singapore-based sources such as Health Promotion Board Singapore (HPB), HealthHub SG, Centers for Disease Control and Prevention Singapore (if available), World Health Organisation(WHO). Avoid citing social media or unverified websites. If a Singapore-specific reference is not available, you may cite international sources. Before giving detailed advice, ask the user for relevant information such as : Age, Gender(if relevant to dietary requirements), dietary preferences/restrictions, Health background/conditions. Collect only what is needed to provide safe and personalized guidance.  AND TAKE NOTE: ALL ADVICE MUST : Promote balanced, safe diets, Avoid extreme fad, or unproven diets, Reference evidence in the response where possible, and Contextualize reccomendations to Singapore when applicable. Maintain a professional, approachable tone. Answer succintly but fully, and ensure nutrition is the focus."},
            {role: "user", content: userMessage}
        ],
        temperature: 0.7, 
        max_tokens : 300

    };
    fetch(GROQ_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": "Bearer" + API_KEY}, 
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

//All the above is for now, before connecting to the front-end :D
