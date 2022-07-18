
let winnerPlayerClassName;
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
     button.setAttribute("class","boxes");
     let img=document.createElement("img");
     button.appendChild(img);
     img.setAttribute("class","N"+i);
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
    })
}
startPvsP();


   
function winner(){
    for(let arr of winningArrays){
        let someoneWins = document.getElementById(arr[0]).childNodes[0].className === document.getElementById(arr[1]).childNodes[0].className  && document.getElementById(arr[1]).childNodes[0].className=== document.getElementById(arr[2]).childNodes[0].className;
        if(someoneWins){
            winnerPlayerClassName = document.getElementById(arr[0]).childNodes[0].className;
            whichPlayerWin();
            }
    }
    return;
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
    if(fullButtons == 9){
        ties+=1;
        document.querySelector(".wins-section").style.display = "flex";
        document.querySelector(".background-black").style.display = "flex";
        document.querySelector(".who-win").style.display = "none";
        document.querySelector(".takes-round").style.display = "none";
        document.querySelector(".tie").style.display = "inline";
    }
}

let x=0;

function play(){
    for(let button of Array.from(document.querySelectorAll(".boxes"))){
        button.style.height = document.body.clientWidth*0.256+"px";
        button.addEventListener("click", (event) =>{
        if(button.childNodes[0].className == "x-img" || button.childNodes[0].className == "o-img"){
            return;
        }else{
         
            
            if(x == 0){
                document.getElementById("x-turn").style.display = "none";
                document.getElementById("o-turn").style.display = "inline";
                button.childNodes[0].setAttribute("src", "./assets/icon-x.svg");
                button.childNodes[0].setAttribute("class","x-img");
                winner();
                fullButtons+=1;
                x=1;
            }else{
                document.getElementById("x-turn").style.display = "inline";
                document.getElementById("o-turn").style.display = "none";
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
play();
//quit game
document.querySelector('.quit').addEventListener("click",()=>{
    window.location.reload();
})


document.querySelector(".next-round").addEventListener("click", ()=>{
    document.getElementById("x-score").innerHTML = xWins;
    document.getElementById("o-score").innerHTML = oWins;
    document.getElementById("ties").innerHTML = ties;
    document.getElementById("wins-section").style.display = "none";
    document.getElementById("background-black").style.display = "none";
    x=0;
    fullButtons = 0;
    deleteButtons();
    addButtons();
    play();
})


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