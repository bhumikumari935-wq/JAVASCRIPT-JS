let Boxes = document.querySelectorAll(".Box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn =document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true;//playerX, playerO
let count = 0; //To Track Draw

const winpatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
    ];

    const resetGame = () => {
        turnO = true;
        count = 0;
        enableBoxes();
        msgContainer.classList.add("hide");
    };

    Boxes.forEach((Box) => {
        Box.addEventListener("click", () => {
            if (turnO) {
                //playerO
                Box.innerText = "O";
                turnO = false;
            } else {
                //playerX
                Box.innerText = "X";
                turnO = true;
            }
            Box.disabled = true; 
            count++;    

            let isWinner = checkWinner();

            if (count === 9 && !isWinner) {
                gameDraw();
            }
        });
    });

    const gameDraw = () => {
        msg.innerText = `Game was a Draw.`;
        msgContainer.classList.remove("hide");
        disableBoxes();
    };

    const disableBoxes = () => {
        for(let Box of Boxes) {
            Box.disabled = true;
        }
    };

    const enableBoxes = () => {
         for(let Box of Boxes) {
            Box.disabled = false;
            Box.innerText = "";
         }
    };

    const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
    };
     
    const checkWinner = () => {
        for (let pattern of winpatterns) {
           let pos1val = Boxes[pattern[0]].innerText;
           let pos2val = Boxes[pattern[1]].innerText;
           let pos3val = Boxes[pattern[2]].innerText;

           if(pos1val != "" && pos2val != "" && pos3val != "") {
            if(pos1val === pos2val && pos2val === pos3val) {
                showWinner(pos1val);
                return true;
            }
           }
        }
    };

    newGameBtn.addEventListener("click", resetGame);
    resetBtn.addEventListener("click", resetGame);

    

    

    
