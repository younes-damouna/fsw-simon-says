// load sounds 
let blueSound = new Audio("./sounds/blue.mp3")
let greenSound = new Audio("./sounds/green.mp3")
let redSound = new Audio("./sounds/red.mp3")
let yellowSound = new Audio("./sounds/yellow.mp3")
let wrongSound = new Audio("./sounds/wrong.mp3")


// Defining Variables
let btns = document.getElementsByClassName('btn')
let container = document.getElementsByClassName("container")[0]
let sounds = [greenSound, redSound, yellowSound, blueSound]
let sequence = []
let frequencies = [0, 0, 0, 0]
let userSequence = []
let level = 0
let levelTitle = document.getElementById("level-title")
let gameOverBg = document.getElementsByTagName("body")[0]

const AudioContext = window.AudioContext || window.webkitAudioContext;
const audio = new AudioContext();


//  Adding click events to btns
for (let i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function () {
        // checking the color of the btn
        if (btns[i].getAttribute("id") == "blue") {
            // playing the required sound
            blueSound.play()
            // adding the animation
            btns[i].classList.add("pressed")
            // removing the animation after 1 second
            setTimeout(() => {
                btns[i].classList.remove("pressed")
            }, 500);
            insertStep(i)

        }
        else if (btns[i].getAttribute("id") == "green") {
            greenSound.play()
            btns[i].classList.add("pressed")
            setTimeout(() => {
                btns[i].classList.remove("pressed")
            }, 500);
            insertStep(i)
        }
        else if (btns[i].getAttribute("id") == "red") {
            redSound.play()
            btns[i].classList.add("pressed")
            setTimeout(() => {
                btns[i].classList.remove("pressed")
            }, 500);

            insertStep(i)
        }
        else if (btns[i].getAttribute("id") == "yellow") {
            yellowSound.play()
            btns[i].classList.add("pressed")
            setTimeout(() => {
                btns[i].classList.remove("pressed")
            }, 500);
            insertStep(i)

        }


    })
}






// this function will generate a number betwwen 0 and 4 and return the number
function generateStep() {
    let randomIndex = Math.floor(Math.random() * btns.length)
    return randomIndex
}

//  when a btn clicked this function will be invoked it take the number of the btn
function insertStep(step) {

    //returning the index of the step added
    const index = userSequence.push(step) - 1;

    //check if the added step is equal to the one in the sequence
    if (userSequence[index] !== sequence[index]) {
        endGame();
        wrongSound.play()
        return;
    }
    console.log("userseq", userSequence[index], "seq", sequence[index])
    console.log("userseq", userSequence, "seq", sequence)


    if (userSequence.length === sequence.length) {
        //if they are the same it will empty userSequence
        userSequence = [];
        setTimeout(() => {
            // increasing the level by 1
            level += 1;
            levelTitle.innerText = "Level " + level
            //spreading the sequence
            let nextSequence = [...sequence]
            // pushing a generated step
            nextSequence.push(generateStep())
            sequence = [...nextSequence];
            // adding animation effects
            addEffects(sequence)

        }, 1000);
        return;
    }

}

function addEffects(sequence) {
    for (let i = 0; i < sequence.length; i++) {
        setTimeout(() => {
            removeClickAnimation(btns[sequence[i]])
            autoClickBtn([sequence[i]])
        }, (i + 1) * 500);
        setTimeout(() => {
            removeClickAnimation(btns[sequence[i]])
        }, i * 1000)

    }
}


// when game ends
function resetVariables() {
    sequence = [];
    userSequence = [];
    level = 0;
    //adding the event listener

    document.addEventListener("keydown", startGame)
    levelTitle.textContent = 'Level hardness increased, Press any key to star';


}
function endGame() {
    //reset values
    resetVariables()
    levelTitle.textContent = 'Game Over, Press Any Key to Start';
    gameOverBg.classList.add("game-over")
}

//this will start the game
function startGame() {

    //removing the event listener
    document.removeEventListener("keydown", startGame)
    gameOverBg.classList.remove("game-over")

    level += 1;
    levelTitle.innerText = "Level " + level
    let nextSequence = [...sequence]
    nextSequence.push(generateStep())
    sequence = [...nextSequence];
    addEffects(sequence)
    setTimeout(() => {

    }, level * 500 + 1000);

}


function autoClickBtn(btnIndex) {
    // playing sound and adding animation
    setTimeout(() => (playBtnSound(btnIndex)), 0)
    setTimeout(() => addClickAnimation(btns[btnIndex]), 0)


}

//animation adding functio
function addClickAnimation(element) {
    element.classList.add("pressed")


}
//animation removing functio
function removeClickAnimation(element) {
    setTimeout(() => {
        element.classList.remove("pressed")
    }, 1000);

}
// play sound function
function playBtnSound(sound) {
    if (sound < 4) {
        sounds[sound].play()

    } else {
        sounds[sound].play(frequencies[sound], 0.8, "square").stop(0.5);

    }

}

//create a button that allow the user to increase dificulty by increasing the number of btns

function increaseDifficulty() {

    let container = document.getElementsByClassName("container")[0]
    let row = document.createElement("div")
    row.setAttribute("class", "row")

    // Create 2 btns
    for (let i = 0; i < 2; i++) {
        let btn = document.createElement("div")
        btn.setAttribute("type", "button")
        btn.setAttribute("class", "btn")
        // create a random rgb color
        let redColor = Math.floor(Math.random() * 255)
        let blueColor = Math.floor(Math.random() * 255)

        let greenColor = Math.floor(Math.random() * 255)


        let color = `rgb(${Math.abs(redColor)},${blueColor},${greenColor})`
        btn.style.backgroundColor = color
        row.appendChild(btn)
        // create a sound for each btn


        let randomFrequence = Math.floor(Math.random() * 1000)
        frequencies.push(randomFrequence)

        let note = (new SoundPlayer(audio))
        sounds.push(note)

    }

    container.append(row)
    for (let i = 0; i < btns.length; i++) {
        if (i > 3) {
            btns[i].addEventListener("click", function () {

                sounds[i].play(frequencies[i], 0.8, "square").stop(0.5);

                btns[i].classList.add("pressed")
                setTimeout(() => {
                    btns[i].classList.remove("pressed")
                }, 1000);
                insertStep(i)

            })
        }
    }






}




//create a button to increase hardness
let btnHard = document.createElement("button")
btnHard.innerText = "Make it hard"
btnHard.classList.add("btnHard")
document.body.append(btnHard)

// hard btn onclick
btnHard.addEventListener("click", function () {
    resetVariables()
    increaseDifficulty()

})

//make a button to reset hardness
let resetHardness = document.createElement("button")
resetHardness.innerText = "Reset Hardness"
resetHardness.classList.add("btnHard")
document.body.append(resetHardness)

// reset btn onclick
resetHardness.addEventListener("click", function () {
    window.location = "/"

})

document.addEventListener("keydown", startGame)


