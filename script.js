// =======================================
// DISCOVER THE PICTURE
// =======================================


// =======================================
// ΣΤΟΙΧΕΙΑ HTML
// =======================================

const menuScreen = document.getElementById("menuScreen");
const gameScreen = document.getElementById("gameScreen");

const categorySelect = document.getElementById("categorySelect");
const startButton = document.getElementById("startButton");

const picture = document.getElementById("picture");
const grid = document.getElementById("grid");

const nextButton = document.getElementById("nextButton");


// =======================================
// ΜΕΤΑΒΛΗΤΕΣ ΠΑΙΧΝΙΔΙΟΥ
// =======================================

let currentCategory = "animals";
let currentGridSize = 5;

let remainingTiles = 0;

// Εικόνες που έχουν ήδη εμφανιστεί
let usedImages = [];


// =======================================
// ΕΝΑΡΞΗ ΠΑΙΧΝΙΔΙΟΥ
// =======================================

startButton.addEventListener("click", startGame);


function startGame() {

    // Παίρνουμε την επιλεγμένη κατηγορία
    currentCategory = categorySelect.value;
	usedImages = [];


    // Παίρνουμε το επιλεγμένο πλέγμα
    const selectedGrid = document.querySelector(
        'input[name="gridSize"]:checked'
    );

    currentGridSize = Number(selectedGrid.value);


    // Κρύβουμε το μενού
    menuScreen.classList.add("hidden");


    // Εμφανίζουμε το παιχνίδι
    gameScreen.classList.remove("hidden");


    // Φορτώνουμε εικόνα
    loadRandomImage();

}


// =======================================
// ΦΟΡΤΩΣΗ ΤΥΧΑΙΑΣ ΕΙΚΟΝΑΣ
// =======================================

function loadRandomImage() {

    const images = imageLists[currentCategory];


    // Αν έχουν εμφανιστεί όλες οι εικόνες,
    // ξεκινάμε καινούριο κύκλο
    if (usedImages.length === images.length) {
        usedImages = [];
    }


    // Βρίσκουμε ποιες εικόνες δεν έχουν εμφανιστεί ακόμα
    const availableImages = images.filter(
        image => !usedImages.includes(image)
    );


    // Επιλέγουμε τυχαία μία από αυτές
    const randomIndex = Math.floor(
        Math.random() * availableImages.length
    );


    const selectedImage = availableImages[randomIndex];


    // Καταγράφουμε ότι αυτή η εικόνα εμφανίστηκε
    usedImages.push(selectedImage);


    // Δημιουργούμε το path της εικόνας
    picture.src =
        "images/" +
        currentCategory +
        "/" +
        selectedImage;


    // Κρύβουμε το κουμπί "Επόμενη εικόνα"
    nextButton.classList.add("hidden");


    // Δημιουργούμε το πλέγμα
    createGrid();

}


// =======================================
// ΔΗΜΙΟΥΡΓΙΑ ΠΛΕΓΜΑΤΟΣ
// =======================================

function createGrid() {

    // Καθαρίζουμε το προηγούμενο πλέγμα
    grid.innerHTML = "";


    const totalTiles =
        currentGridSize * currentGridSize;


    remainingTiles = totalTiles;


    // Δημιουργούμε τα πλακάκια
    for (let row = 0; row < currentGridSize; row++) {

        for (let column = 0; column < currentGridSize; column++) {

            const tile = document.createElement("div");


            tile.classList.add("tile");


            // Υπολογίζουμε θέση και μέγεθος
            const size =
                100 / currentGridSize;

            const top =
                row * size;

            const left =
                column * size;


            tile.style.width = `${size}%`;
            tile.style.height = `${size}%`;

            tile.style.top = `${top}%`;
            tile.style.left = `${left}%`;


            // Κλικ στο πλακάκι
            tile.addEventListener(
                "click",
                removeTile
            );


            // Προσθέτουμε το πλακάκι στο πλέγμα
            grid.appendChild(tile);

        }

    }

}


// =======================================
// ΑΦΑΙΡΕΣΗ ΠΛΑΚΙΔΙΟΥ
// =======================================

function removeTile(event) {

    const tile = event.currentTarget;


    // Αν έχει ήδη αφαιρεθεί, δεν κάνουμε τίποτα
    if (tile.classList.contains("removed")) {
        return;
    }


    // Αφαιρούμε το πλακάκι
    tile.classList.add("removed");


    // Μειώνουμε τον αριθμό των πλακιδίων
    remainingTiles--;


    // Αν δεν υπάρχουν άλλα πλακάκια
    if (remainingTiles === 0) {

        showNextButton();

    }

}


// =======================================
// ΕΜΦΑΝΙΣΗ ΚΟΥΜΠΙΟΥ "ΕΠΟΜΕΝΗ ΕΙΚΟΝΑ"
// =======================================

function showNextButton() {

    nextButton.classList.remove("hidden");

}


// =======================================
// ΕΠΟΜΕΝΗ ΕΙΚΟΝΑ
// =======================================

nextButton.addEventListener(
    "click",
    nextImage
);


function nextImage() {

    loadRandomImage();

}