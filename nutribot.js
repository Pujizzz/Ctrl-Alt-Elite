
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
const introText = "Hi there! I’m NutriCHAT, your personal nutrition assistant. Ask me any nutrition-related question in the box above, and I’ll guide you with helpful tips and advice. Choose a chat theme from the above before we begin!";
 
let index = 0;

function typewritter(text = introText) {
    let i = 0;
    const interval = setInterval(() => {
        if (i < text.length) {
            introBle.innerHTML += text.charAt(i);
            i++;
        } else {
            clearInterval(interval);
        }

    }, 35);
    
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

    if(waitingforOK && userText.toLowerCase() === "ok") {
        botReply(
            "Great! Let's get started.\n" +
            "1️⃣ What is your age?\n" +
            "2️⃣ What is your height and weight?\n" +
            "3️⃣ How active are you daily?\n" +
            "4️⃣ Do you have any medical conditions?\n" +
            "5️⃣ Any food allergies or intolerances?\n" +
            "6️⃣ What is your main nutrition goal?\n"
        );

        waitingforOK = false;
        return;
    }
    if(awaitingPersonal) {
        if(userText === "ok") {
            awaitingPersonal = false;
            collectingAns = true;

            botReply(        
             "Great! Let's get started.\n" +
            "1️⃣ What is your age?\n" +
            "2️⃣ What is your height and weight?\n" +
            "3️⃣ How active are you daily?\n" +
            "4️⃣ Do you have any medical conditions?\n" +
            "5️⃣ Any food allergies or intolerances?\n" +
            "6️⃣ What is your main nutrition goal?\n"
        ); return;
      } else {
        botReply("No worries, I'll give you general advice instead!");
        awaitingPersonal = false;
        return;
      }
    }

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

//welcome message 
const themebuttons = document.querySelectorAll(".theme button")
let welc = false;
let waitingforOK = false;
let awaitingPersonal = false;
let collectingAns = false;
let userData = {
    age:"",
    height:"",
    weight:"",
    activity:"",
    medical:"",
    allergies:"",
    goal:""
};

themebuttons.forEach(button => {
    button.addEventListener("click", () => {
         if(!welc) {
        introBle.innerHTML = ""; //clear introtext    
        typewritter("Dear friend, to provide you with the most accurate and personalised guidance, its recommended to fill out a short form about yourself. If you're ready, please type 'OK' to proceed. Once confirmed, I'll ask a few questions about your age, height, weight, activity level, dietary restrictions, medical conditions, and your main nutrition goal. If you prefer, you can skip this, and I'll provide general advice instead.");
        welc = true;
        waitingforOK = true;
        awaitingPersonal = true;
    }
  });
});



