// Initialinzing GSAP
const tl = new TimelineMax();
// For mobile Version
const mobile = document.querySelector(".mobile");
const bubbleBtn = document.querySelector(".btn-bubble");
const slideBtn = document.querySelector(".btn-slide");
const ballBtn = document.querySelector(".btn-ball");
const fireballBtn = document.querySelector(".btn-fireball");
const ghostBtn = document.querySelector(".btn-ghost");
// Audio Files
const fireballAudio = new Audio("./assets/music/fireball.mp3");
const ballAudio = new Audio("./assets/music/ball.mp3");
const ghostAudio = new Audio("./assets/music/ghost.mp3");
const slideAudio = new Audio("./assets/music/slide.mp3");
const bubbleAudio = new Audio("./assets/music/bubble.mp3");
// Make Sure Next Animation after first one in finished
let isPrevAnimComplete = true;
//* Animations
// Fireball
const fireball = () => {
  isPrevAnimComplete = false;
  const tl = new TimelineMax();
  tl.set("#fireball", {
    x: 600,
    opacity: 1,
    y: -510,
  });
  tl.to("#fireball", 0.7, {
    x: window.innerWidth > window.innerHeight ? "-100vw" : "-100vh",
    y: window.innerWidth > window.innerHeight ? "100vw" : "100vh",
    opacity: 0,
    onComplete: () => {
      isPrevAnimComplete = true;
    },
  });

  return tl;
};
// Ghost
const ghost = () => {
  isPrevAnimComplete = false;
  const tl = new TimelineMax();
  tl.set("#ghost", {
    opacity: 1,
    x: Math.floor(Math.random() * (window.innerWidth - 400)) + 100,
    y: Math.floor(Math.random() * (window.innerHeight - 300)) + 100,
  });
  tl.to("#ghost", 0.3, {
    scale: 1.5,
    repeat: 3,
    yoyo: true,
    transformOrigin: "center",
  });
  tl.to("#ghost", 0.2, {
    opacity: 0,
    onComplete: () => {
      isPrevAnimComplete = true;
    },
  });
  return tl;
};
// Slide
const slide = () => {
  isPrevAnimComplete = false;
  tl.set(".slide", {
    x: "-100vw",
    opacity: 1,
  });
  tl.to(".slide", 0.25, {
    x: 0,
  });
  tl.to(".slide", 0.25, {
    x: "100vw",
    onComplete: () => {
      isPrevAnimComplete = true;
    },
  });
};
// Tennis Ball
const tennisBall = () => {
  isPrevAnimComplete = false;
  const tl = new TimelineMax();
  tl.set("#ball", {
    opacity: 1,
    x: Math.floor(Math.random() * (window.innerWidth - 300)) + 100,
  });
  tl.add("ball");
  tl.from("#ball", 0.3, {
    y: -700,
    ease: Elastic.easeOut,
  });
  tl.to("#ball", 0.2, {
    opacity: 0,
    onComplete: () => {
      isPrevAnimComplete = true;
    },
  });
  return tl;
};
// Buuble
const bubble = () => {
  isPrevAnimComplete = false;
  const tl = new TimelineMax();
  tl.set(".bubble", {
    opacity: 1,
    scale: 20,
  });
  tl.to(".bubble", 0.3, {
    scale: 0,
    onComplete: () => {
      isPrevAnimComplete = true;
    },
  });
  return tl;
};
// Key Press Event Listener
window.addEventListener("keypress", ({ key }) => {
  document.querySelector("p").style.opacity = 0;
  if (isPrevAnimComplete) {
    if (key === "a") {
      fireballAudio.play();
      fireball();
    }
    if (key === "s") {
      ghostAudio.play();
      ghost();
    }
    if (key === "d") {
      slideAudio.play();
      slide();
    }
    if (key === "f") {
      tennisBall();
      ballAudio.play();
    }
    if (key === "g") {
      bubble();
      bubbleAudio.play();
    }
  }
});
/**
 * For Mobile
 */
// Checking If this is open i mobile
var parser = new UAParser();
const os = parser.getResult().os.name.toLowerCase();
if (!(os === "android" || os === "ios")) {
  mobile.style.display = "none";
}
//  Event Listener Function
const eventlisten = (btn, audio, anim) => {
  btn.addEventListener("touchstart", () => {
    document.querySelector("p").style.opacity = 0;
    audio.play();
    anim();
  });
};
// Runing Event Listner Function For Each Animation
eventlisten(bubbleBtn, bubbleAudio, bubble);
eventlisten(slideBtn, slideAudio, slide);
eventlisten(fireballBtn, fireballAudio, fireball);
eventlisten(ghostBtn, ghostAudio, ghost);
eventlisten(ballBtn, ballAudio, tennisBall);
