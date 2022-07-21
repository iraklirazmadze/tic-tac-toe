
let winnerPlayerClassName = 0;
let xWins=0;
let oWins=0;
let ties=0;
let fullButtons=0;
const winningArrays= [["box1","box2","box3"],["box4","box5","box6"],["box7","box8","box9"],["box1","box4","box7"],["box2","box5","box8"],["box3","box6","box9"],["box1","box5","box9"],["box3","box5","box7"]]

function addButtons(){
    for(let i=1; i<10; i++){
     let button =document.createElement("button");
       document.querySelector(".playground").appendChild(button);
     button.setAttribute("id","box"+i);
     button.classList.add("boxes")
     let img=document.createElement("img");
     button.appendChild(img);
     img.setAttribute("class","N"+i);
     let hoverimg = document.createElement("img");
     button.appendChild(hoverimg);
     hoverimg.setAttribute("class","himg");
    }
}
    addButtons();

function deleteButtons(){
    for(let button of Array.from(document.querySelectorAll(".boxes"))){
        button.remove();
        
    }
}


function choosePlayer(){
    document.querySelector(".x").addEventListener("click", (event) => {
    document.querySelector(".x").style.background = "#A8BFC9";
    document.getElementById("pick-silver-x").style.display= "none";
    document.getElementById("pick-black-x").style.display= "inline";
    document.querySelector(".o").style.background = "none";
    document.getElementById("pick-silver-o").style.display= "inline";
    document.getElementById("pick-black-o").style.display= "none";
    })
    document.querySelector(".o").addEventListener("click", (event) => {
    document.querySelector(".o").style.background = "#A8BFC9";
    document.getElementById("pick-silver-o").style.display= "none";
    document.getElementById("pick-black-o").style.display= "inline";
    document.querySelector(".x").style.background = "none";
    document.getElementById("pick-silver-x").style.display= "inline";
    document.getElementById("pick-black-x").style.display= "none";
    })
}
choosePlayer();

function startPvsP(){
document.querySelector(".vs-player").addEventListener("click",()=>{
    if(document.getElementById("pick-black-o").style.display == "none" && document.getElementById("pick-black-x").style.display == "none"){
        return;
    }
    document.querySelector(".new-game-menu").style.display = "none";
    document.querySelector(".gameplay").style.display = "flex";
    if(document.getElementById("pick-silver-o").style.display == "none"){
        document.getElementById("player-with-x").innerHTML = "(P2)"
        document.getElementById("player-with-o").innerHTML = "(P1)"
        }else{
            document.getElementById("player-with-x").innerHTML = "(P1)"
            document.getElementById("player-with-o").innerHTML = "(P2)"

        }
        playVsPlayer();
        nextRoundVsPlayer();
    })
}
startPvsP();


   
function winner(){
    for(let arr of winningArrays){
        let someoneWins = document.getElementById(arr[0]).childNodes[0].className === document.getElementById(arr[1]).childNodes[0].className  && document.getElementById(arr[1]).childNodes[0].className=== document.getElementById(arr[2]).childNodes[0].className;
        if(someoneWins){
            winnerPlayerClassName = document.getElementById(arr[0]).childNodes[0].className;
            whichPlayerWin();
            return true;
        }
    }
}

function whichPlayerWin(){
    document.querySelector(".wins-section").style.display = "flex";
    document.querySelector(".background-black").style.display = "flex";
    if(winnerPlayerClassName === "x-img"){
        xIsWinner();
    }else if(winnerPlayerClassName === "o-img"){
        oIsWinner();
    }
}
function xIsWinner(){
    document.querySelector(".o-logo").style.display ="none";
    document.querySelector(".x-logo").style.display ="inline";
    document.querySelector(".takes-round").style.color ="#31C3BD";
    document.querySelector(".who-win").style.display = "flex";
    document.querySelector(".takes-round").style.display = "flex";
    document.querySelector(".tie").style.display = "none";

    xWins += 1;
    
    if(document.getElementById("pick-silver-o").style.display == "none"){
        document.querySelector(".player1").style.display = "none";
        document.querySelector(".player2").style.display = "inline";
    }else{
        document.querySelector(".player1").style.display = "inline";
        document.querySelector(".player2").style.display = "none";
    }   

}

function oIsWinner() {
    document.querySelector(".x-logo").style.display ="none";
    document.querySelector(".o-logo").style.display ="inline"; 
    document.querySelector(".takes-round").style.color ="#F2B137";
    document.querySelector(".who-win").style.display = "flex";
    document.querySelector(".takes-round").style.display = "flex"
    document.querySelector(".tie").style.display = "none";
    oWins += 1;
    if (document.getElementById("pick-silver-x").style.display == "none"){
        document.querySelector(".player1").style.display = "none";
        document.querySelector(".player2").style.display = "inline";
    } else {
        document.querySelector(".player1").style.display = "inline";
        document.querySelector(".player2").style.display = "none";
    }   
}

function tie(){
    if(fullButtons == 9 && winnerPlayerClassName == 0){
        ties+=1;
        document.querySelector(".wins-section").style.display = "flex";
        document.querySelector(".background-black").style.display = "flex";
        document.querySelector(".who-win").style.display = "none";
        document.querySelector(".takes-round").style.display = "none";
        document.querySelector(".tie").style.display = "inline";
    }
}

let x=0;

function playVsPlayer(){
    for(let button of Array.from(document.querySelectorAll(".boxes"))){
        button.style.height = document.body.clientWidth*0.256+"px";
        button.style.cursor = "pointer";
        button.addEventListener("mouseover",()=>{
            for(let hov of Array.from(document.querySelectorAll(".himg"))){
                hov.style.display = "none";

            }
            if(button.childNodes[0].className == "x-img" || button.childNodes[0].className == "o-img"){
                return;
            }else if(x==0){
                button.childNodes[1].setAttribute("src", "./assets/icon-x-outline.svg");
                button.childNodes[1].style.display = "inline";
            }else{
                button.childNodes[1].setAttribute("src", "./assets/icon-o-outline.svg");
                button.childNodes[1].style.display = "inline";
            }
        })
        button.addEventListener("click", (event) =>{
        if(button.childNodes[0].className == "x-img" || button.childNodes[0].className == "o-img"){
            return;
        }else{
         
            
            if(x == 0){
                document.getElementById("x-turn").style.display = "none";
                document.getElementById("o-turn").style.display = "inline";
                button.childNodes[1].style.display = "none";
                button.childNodes[0].setAttribute("src", "./assets/icon-x.svg");
                button.childNodes[0].setAttribute("class","x-img");
                winner();
                fullButtons+=1;
                x=1;
                
            }else{
                document.getElementById("x-turn").style.display = "inline";
                document.getElementById("o-turn").style.display = "none";
                button.childNodes[1].style.display = "none";
                button.childNodes[0].setAttribute("src", "./assets/icon-o.svg")
                button.childNodes[0].setAttribute("class","o-img");
                winner();
                fullButtons+=1;
                x=0;
                }
            }
            tie();
        })
    }
}


//quit game
document.querySelector('.quit').addEventListener("click",()=>{
window.location.reload();
})

function nextRoundVsPlayer(){
    document.querySelector(".next-round").addEventListener("click", ()=>{
    document.getElementById("x-score").innerHTML = xWins;
    document.getElementById("o-score").innerHTML = oWins;
    document.getElementById("ties").innerHTML = ties;
    document.getElementById("wins-section").style.display = "none";
    document.getElementById("background-black").style.display = "none";
    winnerPlayerClassName = 0;
    x=0;
    fullButtons = 0;
    deleteButtons();
    addButtons();
    playVsPlayer();
    })
}


//restart menu
document.querySelector(".restart-icon").addEventListener("click", ()=>{
    document.getElementById("wins-section").style.display = "flex";
    document.getElementById("background-black").style.display = "flex";  
    document.querySelector(".who-win").style.display = "none";
    document.querySelector(".takes-round").style.display = "none";
    document.querySelector(".tie").style.display = "none";
    document.querySelector(".restart").style.display = "inline";
    document.querySelector(".quit").style.display ="none";
    document.querySelector(".next-round").style.display ="none";
    document.querySelector(".cancel").style.display ="inline";
    document.querySelector(".yes-restart").style.display ="inline";
})

document.querySelector(".yes-restart").addEventListener("click", ()=>{
    window.location.reload();
})

document.querySelector(".cancel").addEventListener("click", ()=>{
    document.getElementById("wins-section").style.display = "none";
    document.getElementById("background-black").style.display = "none";  
    document.querySelector(".who-win").style.display = "inline";
    document.querySelector(".takes-round").style.display = "inline";
    document.querySelector(".tie").style.display = "inline";
    document.querySelector(".restart").style.display = "none";
    document.querySelector(".quit").style.display ="inline";
    document.querySelector(".next-round").style.display ="inline";
    document.querySelector(".cancel").style.display ="none";
    document.querySelector(".yes-restart").style.display ="none";
})






////////////////////////////////////////////////////////////////////////////////////////////

function startPvsCpu(){
    document.querySelector(".vs-cpu").addEventListener("click",()=>{
        if(document.getElementById("pick-black-o").style.display == "none" && document.getElementById("pick-black-x").style.display == "none"){
            return;
        }
        document.querySelector(".new-game-menu").style.display = "none";
        document.querySelector(".gameplay").style.display = "flex";
    if(document.getElementById("pick-silver-o").style.display == "none"){
        document.getElementById("player-with-x").innerHTML = "(CPU)"
        document.getElementById("player-with-o").innerHTML = "(YOU)"
        cpuMark="x";
        z=1;
        }else{
            document.getElementById("player-with-x").innerHTML = "(YOU)"
            document.getElementById("player-with-o").innerHTML = "(CPU)"
            cpuMark = "o";
            z=0;
        }
        playVsCpu();
        nextRoundVsCpu();
    })
}
startPvsCpu();
let cpuMark;
function makeMove(buttonId){
    let aimButton = document.getElementById(buttonId);
    if(cpuMark == "x"){
        document.getElementById("x-turn").style.display = "none";
    document.getElementById("o-turn").style.display = "inline";
        aimButton.childNodes[0].setAttribute("src", "./assets/icon-x.svg")
        aimButton.childNodes[0].setAttribute("class","x-img");
    }else{
        document.getElementById("x-turn").style.display = "inline";
    document.getElementById("o-turn").style.display = "none";
        aimButton.childNodes[0].setAttribute("src", "./assets/icon-o.svg")
        aimButton.childNodes[0].setAttribute("class","o-img");
    }
}

let eachArrayIndex;
function canWin(){
    for(let arr of winningArrays){
        const element1 = document.getElementById(arr[0]).childNodes[0].className;
        const element2 = document.getElementById(arr[1]).childNodes[0].className;
        const element3 = document.getElementById(arr[2]).childNodes[0].className;
        eachArrayIndex = 0;
    if(cpuMark == "x" && element1 !== "o-img" && element2 !== "o-img" && element3 !== "o-img"){
        if(element1 == "x-img"){
            eachArrayIndex +=2;
        }
        if(element2 == "x-img"){
            eachArrayIndex += 3
        }
        if(element3 == "x-img"){
            eachArrayIndex += 4;
        }
        if(eachArrayIndex == 5){
            buttonId =  document.getElementById(arr[2]).id;
        }else if(eachArrayIndex == 6){
            buttonId = document.getElementById(arr[1]).id;
        }else if(eachArrayIndex == 7){
            buttonId =  document.getElementById(arr[0]).id;
        }
        
    }else if(cpuMark == "o" && element1 !== "x-img" && element2 !== "x-img" && element3 !== "x-img"){
        if(element1 == "o-img"){
            eachArrayIndex +=2;
        }
        if(element2 == "o-img"){
            eachArrayIndex += 3
        }
        if(element3 == "o-img"){
            eachArrayIndex += 4;
        }
        if(eachArrayIndex == 5){
            buttonId =  document.getElementById(arr[2]).id;
        }else if(eachArrayIndex == 6){
            buttonId = document.getElementById(arr[1]).id;
        }else if(eachArrayIndex == 7){
            buttonId =  document.getElementById(arr[0]).id;
        }
    }
}
}

function canLose(){
    for(let arr of winningArrays){
        const element1 = document.getElementById(arr[0]).childNodes[0].className;
        const element2 = document.getElementById(arr[1]).childNodes[0].className;
        const element3 = document.getElementById(arr[2]).childNodes[0].className;
        eachArrayIndex = 0;
    if( cpuMark == "x" && element1 !== "x-img" && element2 !== "x-img" && element3 !== "x-img"){
        if(element1 == "o-img"){
            eachArrayIndex +=2;
        }
        if(element2 == "o-img"){
            eachArrayIndex += 3
        }
        if(element3 == "o-img"){
            eachArrayIndex += 4;
        }
        if(eachArrayIndex == 5){
            buttonId =  document.getElementById(arr[2]).id;
        }else if(eachArrayIndex == 6){
            buttonId = document.getElementById(arr[1]).id;
        }else if(eachArrayIndex == 7){
            buttonId =  document.getElementById(arr[0]).id;
        }
        
    }else if(cpuMark == "o" && element1 !== "o-img" && element2 !== "o-img" && element3 !== "o-img"){
        if(element1 == "x-img"){
            eachArrayIndex +=2;
        }
        if(element2 == "x-img"){
            eachArrayIndex += 3
        }
        if(element3 == "x-img"){
            eachArrayIndex += 4;
        }
        if(eachArrayIndex == 5){
            buttonId =  document.getElementById(arr[2]).id;
        }else if(eachArrayIndex == 6){
            buttonId = document.getElementById(arr[1]).id;
        }else if(eachArrayIndex == 7){
            buttonId =  document.getElementById(arr[0]).id;
        }
    }
}
}

function random(){
    const random = Math.floor(Math.random() * emptyButtons.length);
    randomId = emptyButtons[random];
    buttonId =randomId;
}

let randomId;
let emptyButtons;
let sum;
let buttonId;
function cpuMove(){
    sum =0;
    emptyButtons=[];
    for(let btn of Array.from(document.querySelectorAll(".boxes"))){

        if(btn.childNodes[0].className == "x-img" ||  btn.childNodes[0].className == "o-img"){
            sum += Number(btn.id[3]);
        }else{
            emptyButtons.push(btn.id);
        }
    }
  
    if(fullButtons == 0){
        buttonId = "box5";
    }else if(fullButtons == 1){
        if(sum !== 5 ){
            buttonId = "box5"
        }else{
            buttonId = "box1"
        }
    }else if(fullButtons == 2){
        if( sum == 6 || sum == 14){
            buttonId = "box3";
        }else{
            buttonId = "box1";
        }
    }else if(fullButtons == 3){
        if(sum == 15 || sum ==13){
            buttonId = "box3";
        }else if(sum == 11){
            buttonId = "box1";
        }else if(sum == 17){
            buttonId = "box7";
        }else if(sum == 19){
            buttonId = "box9";
        }
        canLose();
    }else if(fullButtons == 4){
        if(sum == 17){
            buttonId = "box7";
        }else{
            buttonId = "box3";
        }
        canLose();
        canWin();
    }else if(fullButtons == 5){
        random();
        canLose();
        canWin();
    }else if(fullButtons == 6){
        random();
        canLose();
        canWin();
    }else if(fullButtons == 7){
        random();
        canLose();
        canWin();
    }else if(fullButtons == 8){
        random();
    }

    makeMove(buttonId);
    fullButtons +=1;
    winnerVsCpu();
    z=0;
    tieVsCpu();
}

let z;

function playVsCpu(){
    for(let button of Array.from(document.querySelectorAll(".boxes"))){
        button.style.height = document.body.clientWidth*0.256+"px";
        button.style.cursor = "pointer";
        button.addEventListener("mouseover",()=>{
            for(let hov of Array.from(document.querySelectorAll(".himg"))){
                hov.style.display = "none";

            }
            if(button.childNodes[0].className == "x-img" || button.childNodes[0].className == "o-img"){
                return;
            }else{
                if(cpuMark == "o"){
                button.childNodes[1].setAttribute("src", "./assets/icon-x-outline.svg");
                button.childNodes[1].style.display = "inline";
                }else{
                    button.childNodes[1].setAttribute("src", "./assets/icon-o-outline.svg");
                    button.childNodes[1].style.display = "inline";
                }
            }
        })
        
        button.addEventListener("click", (event) =>{
        if(button.childNodes[0].className == "x-img" || button.childNodes[0].className == "o-img"){
            return;
        }else{
         
            
            if(z == 0){
                button.childNodes[1].style.display = "none";
                if(cpuMark == "o"){
                button.childNodes[0].setAttribute("src", "./assets/icon-x.svg");
                button.childNodes[0].setAttribute("class","x-img");
            }else{
                button.childNodes[0].setAttribute("src", "./assets/icon-o.svg");
                button.childNodes[0].setAttribute("class","o-img");
            }
                if(fullButtons == 8){
                    winnerVsCpu();
                }
                fullButtons+=1;
                tieVsCpu();
                z=1;
                return cpuMove();
            }
            }
        })
    }
    if(z==1){
    cpuMove();
    }
}

function nextRoundVsCpu(){
    document.querySelector(".next-round").addEventListener("click", ()=>{
    document.getElementById("x-score").innerHTML = xWins;
    document.getElementById("o-score").innerHTML = oWins;
    document.getElementById("ties").innerHTML = ties;
    document.getElementById("wins-section").style.display = "none";
    document.getElementById("background-black").style.display = "none";
    fullButtons = 0;
    if(document.getElementById("pick-silver-o").style.display == "none"){
        z=1;
    }else{
        z=0;
    }
    sum = 0;
    winnerPlayerClassName = 0;
    deleteButtons();
    addButtons();
    playVsCpu();
    })
}


function tieVsCpu(){
    if(fullButtons == 9 && winnerPlayerClassName == 0){
        ties+=1;
        document.querySelector(".wins-section").style.display = "flex";
        document.querySelector(".background-black").style.display = "flex";
        document.querySelector(".who-win").style.display = "none";
        document.querySelector(".takes-round").style.display = "none";
        document.querySelector(".tie").style.display = "inline";
    }
}
function winnerVsCpu(){
    for(let arr of winningArrays){
        let someoneWins = document.getElementById(arr[0]).childNodes[0].className === document.getElementById(arr[1]).childNodes[0].className  && document.getElementById(arr[1]).childNodes[0].className=== document.getElementById(arr[2]).childNodes[0].className;
        if(someoneWins){
            winnerPlayerClassName = document.getElementById(arr[0]).childNodes[0].className;
            whoWin();
            return true;
        }
    }
}

function whoWin(){
    document.querySelector(".wins-section").style.display = "flex";
    document.querySelector(".background-black").style.display = "flex";
    if(winnerPlayerClassName === "x-img"){
        xMarkWin();
    }else if(winnerPlayerClassName === "o-img"){
        oMarkWin();
    }
}
function xMarkWin(){
    document.querySelector(".o-logo").style.display ="none";
    document.querySelector(".x-logo").style.display ="inline";
    document.querySelector(".takes-round").style.color ="#31C3BD";
    if(cpuMark == "x"){
    document.querySelector(".who-win").innerHTML = "OH NO, YOU LOST..."
    }else{
        document.querySelector(".who-win").innerHTML = "YOU WON!"
    }
    document.querySelector(".takes-round").style.display = "flex";
    document.querySelector(".tie").style.display = "none";
    xWins += 1;

}

function oMarkWin() {
    document.querySelector(".x-logo").style.display ="none";
    document.querySelector(".o-logo").style.display ="inline"; 
    document.querySelector(".takes-round").style.color ="#F2B137";
    if(cpuMark == "o"){
        document.querySelector(".who-win").innerHTML = "OH NO, YOU LOST..."
        }else{
            document.querySelector(".who-win").innerHTML = "YOU WON!"
        }
    document.querySelector(".takes-round").style.display = "flex"
    document.querySelector(".tie").style.display = "none";
        oWins += 1;
}

