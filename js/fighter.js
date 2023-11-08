let message=document.querySelector('gameMessage'); //presents message if Finisher is clicked but can't be performed or if a player wins
let f1Log=document.querySelector('fighter1Log'); //logs all moves made by fighter1
let f2Log=document.querySelector('fighter2Log'); //logs all moves made by fighter2

//all functions need to be converted to arrow operators
class Fighter{ //creates a Fighter instance
    stats=(0,1,2,3); //0=Strength; 1=Cunning; 2=Speed; 3=Fatigue
    defending=false; //determines if Fighter is defending
    turn=false; //determines if Fighter has selected a move to execute

    //randomizes baseline stats for Fighter
    func(){
        counter=0; //counter to establish end behavior for the loop
        while(counter<2){ //loop chooses two random elements in stats[] and converts to string
            let int=this.stats[Math.floor(Math.random()*4)];
            if(Number.isInteger(int))
            {
                stats[int]=stats[int].toString();
                counter++;
            }
        }
        counter=0; //reset counter
        while(counter<3){ //loops through first three stats, increases if stat is an integer, decreases if not
            if(Number.isInteger(stats[counter])){
                stats[counter]=6+Math.floor(Math.random()*2);
            }
            else{stats[counter]=6-Math.floor(Math.random()*2);}
        }
        if(Number.isInteger(stats[3])){ //same as above but for only fourth stat since it has different baseline than other stats
            stats[3]=30+Math.floor(Math.random()*7);
        }
        else{stats[3]=30-Math.floor(Math.random()*7);}
    }

    get strength(){
        return this.stats[0];
    }
    set strength(nStr){
        this.stats[0]+=nStr;
    }

    get cunning(){
        return this.stats[1];
    }
    set cunning(nCun){
        this.stats[1]+=nCun;
    }

    get speed(){
        return this.stats[2];
    }
    set speed(nSpe){
        this.stats[2]+=nSpe;
    }

    get fatigue(){
        return this.stats[3];
    }
    set fatigue(nFat){
        this.stats[3]+=nFat;
    }

    get defend(){
        return this.defending;
    }
    set defend(nDef){
        this.defending=nDef;
    }

    get tookTurn(){
        return this.turn;
    }
    set tookTurn(nTurn){
        this.turn=nTurn;
    }
}

//allows both players to choose what action they want to take, then executes them after both players have chosen
function turn(f1,f2){
    while(f1.tookTurn!==f2.tookTurn){
        document.addEventListener('click',()=>{});
    }
}

let fighter1=new Fighter();
let fighter2=new Fighter();