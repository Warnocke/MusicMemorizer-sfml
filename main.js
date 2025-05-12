const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Load images
const fretboard = new Image();
fretboard.src = "Elements/fretboard.png";

const dot = new Image();
dot.src = "Elements/Dot.png";

let score = 0;
let totalNotes = 78;
const stringRoots = ["E", "B", "G", "D", "A", "E"];
const notes = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"];
let currentNote = ""; 
currentNote = notes[7];
// Example dot position (you'll randomize this later)
let dotPos = {
  x: 5+57.3*0,
  y: 33+28.5*0
};


function setRandomDot() {
    const fret = Math.floor(Math.random() * 13);
    const string = Math.floor(Math.random() * 6);
  
    dotPos.x = fret * 57.3+5;
    dotPos.y = string * 28.5 + 33;
  
    currentNote = getNoteAt(string, fret);
  }
function getNoteAt(stringIndex, fret) {
    const rootNote = stringRoots[stringIndex];
    const rootIndex = notes.indexOf(rootNote);
    const noteIndex = (rootIndex + fret) % 12;
    return notes[noteIndex];
}
document.querySelectorAll("#note-buttons button").forEach(button => {
  button.addEventListener("click", () => {
    if (button.textContent === currentNote) {
      score++;
      setRandomDot(); // Move dot only if correct
    } else {
      // Optional: visual feedback for wrong answer
      console.log("Incorrect!");
    }
  });
});

// Game loop
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(fretboard, 0,20);
  ctx.drawImage(dot, dotPos.x, dotPos.y);

  ctx.fillStyle = "black";
  ctx.font = "18px Arial";
  ctx.fillText(`${score}/${totalNotes}`, 10, 20);

  requestAnimationFrame(draw);
}

// Start when images are loaded
let imagesLoaded = 0;
function tryStartGame() {
  imagesLoaded++;
  if (imagesLoaded === 2) {
    draw();
  }
}

fretboard.onload = tryStartGame;
dot.onload = tryStartGame;