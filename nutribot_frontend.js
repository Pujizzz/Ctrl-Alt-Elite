//---------------------------------------
// THEME BUTTONS
//---------------------------------------
document.getElementById("theme1").addEventListener("click", () => {
    document.body.className = "theme-green";
});
document.getElementById("theme2").addEventListener("click", () => {
    document.body.className = "theme-orange";
});
document.getElementById("theme3").addEventListener("click", () => {
    document.body.className = "theme-pink";
});
document.getElementById("theme4").addEventListener("click", () => {
    document.body.className = "theme-blue";
});
document.getElementById("theme5").addEventListener("click", () => {
    document.body.className = "theme-purple";
});

// Fruit spin
const fruit = document.getElementById("fruit2");
fruit.addEventListener("click", function () {
    fruit.classList.add("spin");
    fruit.addEventListener("animationend", () => {
        fruit.classList.remove("spin");
    }, { once: true });
});

//---------------------------------------
// INTRO TYPEWRITER
//---------------------------------------
const introBle = document.querySelector(".introbot");
const introText =
    "Hi there! I’m NutriCHAT, your personal nutrition assistant. Ask me any nutrition-related question in the box above, and I’ll guide you with helpful tips and advice. Choose a chat theme from below before we begin!";


let typeInterval = null;

function typewriter(text = introText) {
    clearInterval(typeInterval)
    introBle.innerHTML = ""; //To prevent two strings typing atop each other + reset text 

    let i = 0;
    typeInterval = setInterval(() => {
        if (i < text.length) {
            introBle.innerHTML += text.charAt(i);
            i++;
        } else {
            clearInterval(typeInterval);
        }
    }, 35);
}

window.addEventListener("DOMContentLoaded", () => typewriter());


//---------------------------------------
// CHAT VARIABLES
//---------------------------------------
const searchBar = document.getElementById("InsideBox");
const output = document.getElementById("output");  // <-- use ONE output div

let welc = false;
let waitingforOK = false;
let awaitingPersonal = false;
let collectingAns = false;

let userData = {
    age: "",
    height: "",
    weight: "",
    activity: "",
    medical: "",
    allergies: "",
    goal: ""
};

//---------------------------------------
// BOT REPLY FUNCTION
//---------------------------------------
function botReply(text) {
    const bot = document.createElement("div");
    bot.classList.add("botReply");
    bot.innerText = text;
    output.appendChild(bot);
    output.scrollTop = output.scrollHeight;
}

//---------------------------------------
// MAIN SEND BUTTON
//---------------------------------------
document.getElementById("button").addEventListener("click", async function () {
    const userText = searchBar.value.trim();
    if (!userText) return;

    // show user bubble
    const bubble = document.createElement("div");
    bubble.classList.add("userbubble");
    bubble.innerText = userText;
    output.appendChild(bubble);

    searchBar.value = "";

    //-----------------------------------
    // PERSONAL INFO FLOW
    //-----------------------------------
    if (waitingforOK && userText.toLowerCase() === "ok") {

        botReply(
            "Great! Let's get started.\n" +
            "1️⃣ What is your age?\n" +
            "2️⃣ What is your height and weight?\n" +
            "3️⃣ How active are you daily?\n" +
            "4️⃣ Do you have any medical conditions?\n" +
            "5️⃣ Any food allergies?\n" +
            "6️⃣ What is your main nutrition goal?\n"
        );

        waitingforOK = false;
        awaitingPersonal = false;
        collectingAns = true;
        return;
    }

    if (awaitingPersonal) {
        if (userText.toLowerCase() === "ok") {
            botReply(
            "Great! Let's get started.\n" +
            "1️⃣ What is your age?\n" +
            "2️⃣ What is your height and weight?\n" +
            "3️⃣ How active are you daily?\n" +
            "4️⃣ Do you have any medical conditions?\n" +
            "5️⃣ Any food allergies?\n" +
            "6️⃣ What is your main nutrition goal?\n"
        ) 
        }else {
            botReply("No worries, I'll give you general advice instead! Ask any me nutrition-related doubts you have :D");
            awaitingPersonal = false;
            return;
        };
    }

    //-----------------------------------
    // BUILD MESSAGE + CALL BACKEND
    //-----------------------------------
    const messageWithContext = `
User question: ${userText}
User info:
- Age: ${userData.age}
- Height: ${userData.height}
- Weight: ${userData.weight}
- Activity: ${userData.activity}
- Medical: ${userData.medical}
- Allergies: ${userData.allergies}
- Goal: ${userData.goal}
Please answer accordingly.
`;

    try {
        const response = await fetch("http://localhost:3000/ask", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: messageWithContext })
        });

        const data = await response.json();
        botReply(data.reply);

    } catch (err) {
        console.error(err);
        botReply("Error connecting to server.");
    }
});

//---------------------------------------
// WELCOME MESSAGE WHEN THEME IS PICKED
//---------------------------------------
const themebuttons = document.querySelectorAll(".theme button");

themebuttons.forEach(button => {
    button.addEventListener("click", () => {
        if (!welc) {
            introBle.innerHTML = "";
            typewriter(
                "To provide you with the most accurate guidance, type 'OK' to begin the quick personal form. If you prefer general advice, you can skip this."
            );
            welc = true;
            waitingforOK = true;
            awaitingPersonal = true;
        }
    });
});
