const narrate = document.getElementById("narration");

const sequences = [
  { text: "Hello, traveler.", duration: 1000 },
  { text: "Welcome to the world of the unknown.", duration: 2000 },
  { text: "I am the narrator.", duration: 1000 },
  { text: "I will guide you through this journey.", duration: 2000 },
  { text: "Are you ready?", duration: 1000 },
  { text: "It started long ago...", duration: 2000, fadeOut: true },
  {
    text: "In a world of chaos and darkness...",
    duration: 2000,
    closure: () => switchScene("egypt"),
  },
  { text: "The land of the pharaohs.", duration: 2000 },
  {
    text: "The land of the pyramids.",
    duration: 2000,
  },
  {
    text: "The land of the unknown.",
    duration: 2000,
  },
  {
    text: "Ancient Egypt was a place of mystery and wonder.",
    duration: 2000,
  },
  {
    text: "It was a place of magic and power.",
    duration: 1500,
  },
  {
    text: "The pharaohs ruled with an iron fist.",
    duration: 1500,
  },
  {
    text: "Their power was absolute.",
    duration: 500,
  },
  {
    text: "Their power was thought to be eternal.",
    duration: 1500,
  },
  {
    text: "But it was not to be.",
    duration: 500,
  },
  {
    text: "The pharaohs were buried in their tombs.",
    duration: 1500,
  },
  {
    text: "That is the pyramids.",
    duration: 3000,
  },
  {
    text: "Now, for another ancient land...",
    duration: 2000,
    fadeOut: true,
  },
  {
    text: "The land of the rising sun.",
    duration: 2000,
    closure: () => switchScene("japan"),
  },
  {
    text: "Welcome to the land of the samurai.",
    duration: 2000,
  },
  {
    text: "The land of the cherry blossoms.",
    duration: 2000,
  },
  {
    text: "Japan was a place of beauty and grace.",
    duration: 2000,
  },
  {
    text: "It was a place of tradition and honor.",
    duration: 1500,
  },
  {
    text: "The samurai were the warriors of Japan.",
    duration: 1500,
  },
  {
    text: "They were the protectors of the land.",
    duration: 1500,
  },
  {
    text: "But, not everything is meant to last.",
    duration: 1500,
  },
  {
    text: "The land of Japan would face the invocation of the west.",
    duration: 2000,
    fadeOut: true,
  },
];

let sceneToMusic = {
  japan: "myAudio2",
  egypt: "myAudio3",
};
let curAudio = "";

const DEBUG = true;

var timer;
function aud_fade(audioID) {
  var myAudio = document.getElementById(audioID);
  if (myAudio.volume > 0) {
    myAudio.volume -= Math.min(myAudio.volume, 0.05);
    timer = setTimeout(aud_fade, 200 / (DEBUG ? 10 : 1));
  }
}

function switchScene(newPreset) {
  if (sceneToMusic[newPreset]) {
    const audio = document.getElementById(sceneToMusic[newPreset]);
    audio.volume = 0.4;
    audio.play();
    document.getElementById(curAudio).pause();
    curAudio = sceneToMusic[newPreset];
  }
  const environment = document.getElementById("environment");
  environment.setAttribute("environment", `preset: ${newPreset}`);
}

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
      await new Promise((resolve) => setTimeout(resolve, 5));
    }
    if (seq.fadeOut) {
      aud_fade(curAudio);
    }

    await new Promise((resolve) =>
      setTimeout(resolve, seq.duration / (DEBUG ? 100 : 1))
    );
    if (seq.closure) {
      seq.closure();
    }
  }
}

// addLetter();
function startExperience() {
  //   document.getElementById("goBackHome").style.display = "inline";
  document.getElementById("myButton").style.display = "none";
  const audio = document.getElementById("myAudio");
  curAudio = "myAudio";
  audio.volume = 0.4;
  audio.play();
  addLetter();
}
