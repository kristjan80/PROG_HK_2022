/*
    Const object that holds values for different players that can be used to fill the array when players click on tictactoe boxes
    No Enum :((.
*/
const PlayerValues = {
    PlayerNone: 0,
    PlayerOne: 1,
    PlayerTwo: -1
};


const PlayerOneImage = "assets/Green_X.jpg";
const PlayerTwoImage = "assets/Red_X.png";

const MainMenu = ".js-main-menu";
const GameRoom = ".game-room";
const FieldSelector = ".js-field";

const WinMenuSelector = ".js-win-message";


/**
 * Main class for ingame logic. Initializes field and controls for win conditions
 * @private
 * @param {Object} #GameManagerInstance Holds the references to the Game Manager object.
 * @param {Array}  #GameFieldArray      Array that holds the status of the gamefield
 * @param {int}    #currentPlayer       Describes the current active player
 * 
 * @function checkClickedBox  
 */
class TicTacToe {
    #GameManagerInstance = null;
    #GameFieldArray = null;

    #currentPlayer = null;

    constructor(instance) {
        this.#GameManagerInstance = instance;

        // Initialize the array and get the gamefields
        this.#GameFieldArray = new Array([0,0,0],[0,0,0],[0,0,0]);
        this.documentFields = document.querySelectorAll(FieldSelector);

        // First player is PlayerOne Whose value comes from predefined Object. Currently not that useful but is meant for when AI is implemented
        this.currentPlayer = PlayerValues["PlayerOne"];

        // Add eventlisteners to all gamefields
        this.documentFields.forEach(element => {
            element.addEventListener("click", e => this.checkClickedBox(e));
        });
    }


    // Eventlisteners that is applied to fields. Everytime that a gamefield is clicked, add a symbol based on the current player
    checkClickedBox(e) {
        if(e.target.innerHTML == "" && e.target.nodeName != "IMG") {
            
            const image = document.createElement("img");

            this.currentPlayer == PlayerValues["PlayerOne"] ? image.setAttribute("src",PlayerOneImage) : image.setAttribute("src",PlayerTwoImage);
            const aVal = e.target.getAttribute("value").split(",");

            this.#GameFieldArray[aVal[0]][aVal[1]] = this.currentPlayer;

            e.target.appendChild(image);

        }
        else {
            console.log("Occupied spot");
        }

        // After move is made, check if any rows, columns or diagonals have the same player values
        this.checkForWin();

    }

    checkForWin() {
        let hasWon = false;

        // Check rows
        for (let i = 0; i < 3; i++) {
            if(this.#GameFieldArray[i][0]  == this.currentPlayer && 
                this.#GameFieldArray[i][1] == this.currentPlayer && 
                this.#GameFieldArray[i][2] == this.currentPlayer) {

                hasWon = true;
            }
            i++;
        }

        // Check columns
        for (let i = 0; i < 3; i++) {
            if(this.#GameFieldArray[0][i]  == this.currentPlayer && 
                this.#GameFieldArray[1][i] == this.currentPlayer && 
                this.#GameFieldArray[2][i] == this.currentPlayer) {

                hasWon = true;
            }
            i++;
        }

        // Check primary diagonal
        if(this.#GameFieldArray[0][0]  == this.currentPlayer && 
            this.#GameFieldArray[1][1] == this.currentPlayer && 
            this.#GameFieldArray[2][2] == this.currentPlayer) {

            hasWon = true;
        }

        // Check secondary diagonal
        if(this.#GameFieldArray[0][2]  == this.currentPlayer && 
            this.#GameFieldArray[1][1] == this.currentPlayer && 
            this.#GameFieldArray[2][0] == this.currentPlayer) {

            hasWon = true;
        }
        
        // Check if game has ended
        if (hasWon == false) {
            // Change player. Turn negative to positive or positive to negative
            this.currentPlayer = -this.currentPlayer;
            
        }
        else {
            // Display win message and destroy the game object
            console.log(this.#GameManagerInstance);
            this.#GameManagerInstance.displayWinScreen(this.currentPlayer);
        }
        
    }

}

class GameManager {
    
    #GameInstance = null;

    #TwoPlayerButton = null;
    #ClearGameButton = null;

    #GameRoomElement = null;
    #MainMenuElement = null;

    

    constructor () {
        this.setupControlButtons();
        this.setupMainElements();
    }

    setupControlButtons() {
        this.#TwoPlayerButton = document.querySelector(".js-2p").addEventListener("click",e => this.start2PGame(e));
        this.#ClearGameButton = document.querySelector(".js-clear").addEventListener("click",e => this.clearGameField(e));
    
    }
    
    setupMainElements() {
        this.#GameRoomElement =  document.querySelector(".game-room");
        this.#MainMenuElement =  document.querySelector(".js-main-menu");
    }

    start2PGame(e) {
        this.hideMainMenu();
        this.GameInstance = new TicTacToe(this);

    }

    hideMainMenu() {
        this.#MainMenuElement.setAttribute("hidden",true);
        this.#GameRoomElement.removeAttribute("hidden");

    }

    displayMainMenu() {
        this.#GameRoomElement.addAttribute("visible");
        this.#MainMenuElement.setAttribute("visible",true);
        
    }

    displayWinScreen(playerID) {
        let winMenu = document.querySelector(WinMenuSelector);
        winMenu.removeAttribute("hidden");
        winMenu.innerHTML = "Player " + playerID + " Wins!";
        
        // Destroy game logic instance and set the reference to null
        Destroy(this.#GameInstance);
        this.#GameInstance = null;
   
    }

    clearGameField(e) {
        // Clear the content of fields. Removes the images added
        gameFields = document.querySelectorAll(FieldSelector);
        gameFields.forEach(e => {
            e.innerHTML = "";
        });

        // Hide the win menu
        let winMenu = document.querySelector(WinMenuSelector);
        winMenu.addAttribute("hidden");

        // And hide the game. Then display the main menu
        displayMainMenu();

    }

}

Game = new GameManager();