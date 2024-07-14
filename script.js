const narrate = document.getElementById("narration");

const sequences = [
  { text: "Hello, traveler.", duration: 1000 },
  { text: "Welcome to the world of the unknown.", duration: 2000 },
  { text: "I am the narrator.", duration: 1000 },
];

async function addLetter() {
  for (let seq of sequences) {
    let cur = "";
    let fullString = seq.text;
    for (let i = 0; i < fullString.length; i++) {
      cur += fullString[i];
      narrate.setAttribute(
        "text",
        narrate.setAttribute("text", {
          ...narrate.getAttribute("text"),
          value: cur,
        })
      );
      //   console.log(JSON.stringify(narrate.getAttribute("text"), null, 2));
      await new Promise((resolve) => setTimeout(resolve, 50));
    }

    await new Promise((resolve) => setTimeout(resolve, seq.duration));
  }
}

// addLetter();
function startExperience() {
  document.getElementById("myButton").style.display = "none";
  addLetter();
}
