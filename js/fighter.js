let message=document.querySelector('gameMessage'); //presents message if Finisher is clicked but can't be performed or if a player wins
let f1Stats=document.querySelector('fighter1Stats'); //displays fighter1 stats on screen
let f1Log=document.querySelector('fighter1Log'); //logs all moves made by fighter1
let f2Stats=document.querySelector('fighter2Stats'); //displays fighter2 stats on screen
let f2Log=document.querySelector('fighter2Log'); //logs all moves made by fighter2

//all functions need to be converted to arrow operators
class Fighter{ //creates a Fighter instance
    stats=(0,1,2,3); //0=Strength; 1=Cunning; 2=Speed; 3=Fatigue
    attackVal=0; //stores attack value during a round
    defenseVal=0; //stores defense value during a round

    //randomizes baseline stats for Fighter
    randomize(){
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
                counter++;
            }
            else{stats[counter]=6-Math.floor(Math.random()*2);counter++;}
        }
        if(Number.isInteger(stats[3])){ //same as above but for only fourth stat since it has different baseline than other stats
            stats[3]=30+Math.floor(Math.random()*7);
        }
        else{stats[3]=30-Math.floor(Math.random()*7);}
    }

    updateStatDisplay(log){
        log.innerHTML='';
        int=0;
        while(int<4){
            log.innerHTML+=this.stats[int]+'\n';
            counter++;
        }
    }

    getStat(statNum){
        return this.stats[statNum];
    }
    setStat(statNum,val){
        this.stats[statNum]+=val;
    }

    setAttack(){
        this.attackVal=(this.getStat(0)+this.getStat(2)+this.getStat(1))/Math.floor((Math.random()*3)+1);
        this.setDefend(false);
    }

    setDefend(isDefending){
        if(isDefending){
            this.defenseVal=(this.getStat(2)+this.getStat(1));
        }
        else{this.defenseVal=this.getStat(2)+Math.floor((Math.random()*6)+1);}
    }
}

//allows both players to choose what action they want to take, then executes them after both players have chosen
function round(f1,f2){
    attack.addEventListener('click',f1.setAttack());
    defend.addEventListener('click',f1.setDefend(true));
    finisher.addEventListener('click',()=>{});
}

let fighter1=new Fighter();
fighter1.randomize();
let fighter2=new Fighter();
fighter2.randomize();