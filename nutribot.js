
//themes
document.getElementById("theme1").addEventListener("click", function() {
    document.body.className= "theme-green";
});
document.getElementById("theme2").addEventListener("click", function() {
    document.body.className="theme-orange"
});
document.getElementById("theme3").addEventListener("click", function() {
    document.body.className= "theme-pink";
});
document.getElementById("theme4").addEventListener("click", function() {
    document.body.className="theme-blue"
});
document.getElementById("theme5").addEventListener("click", function(){
    document.body.className="theme-purple"
});
const fruit = document.getElementById("fruit2");

fruit.addEventListener("click", function() {
    fruit.classList.add("spin");

    fruit.addEventListener("animationend", function() {
        fruit.classList.remove("spin");
    }, { once: true });
});

//intro bubble
const introBle = document.querySelector(".introbot");
const introText = "Hi there! I’m NutriCHAT, your personal nutrition assistant. Ask me any nutrition-related question in the box above, and I’ll guide you with helpful tips and advice.";
 
let index = 0;

function typewritter() {
    if(index<introText.length) {
        introBle.innerHTML += introText.charAt(index);
        index++;
        setTimeout(typewritter, 50);
    }
}

//run typewriter after page loads
window.addEventListener("DOMContentLoaded", () => {typewritter()});

//userbubble
const searchBar = document.getElementById("InsideBox");
const output = document.getElementById("chat-output");

document.getElementById("button").addEventListener("click", function() {
    const userText = searchBar.value.trim();
    if (!userText) return;

    const bubble = document.createElement("div");
    bubble.classList.add("userbubble");
    bubble.innerText = userText;

    output.appendChild(bubble);
    searchBar.value = "";

    botReply("Good question, blah blah");
    output.scrollTop = output.scrollHeight;
});
//bot reply
function botReply(text) {
    const bot = document.createElement("div");
    bot.classList.add("botReply");
    bot.innerText = text;
    output.appendChild(bot);
}



