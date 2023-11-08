let isOver=false;
let message=document.querySelector('gameMessage'); //presents message if Finisher is clicked but can't be performed or if a player wins
let f1Stats=document.querySelector('fighter1Stats'); //displays fighter1 stats on screen
let f1Log=document.querySelector('fighter1Log'); //logs all moves made by fighter1
let f2Stats=document.querySelector('fighter2Stats'); //displays fighter2 stats on screen
let f2Log=document.querySelector('fighter2Log'); //logs all moves made by fighter2

//all functions need to be converted to arrow operators
class Fighter{ //creates a Fighter instance
    stats=(0,1,2,3); //0=Strength; 1=Cunning; 2=Speed; 3=Fatigue
    strOG=0; //original strength stat
    cunOG=0; //original cunning stat
    speOG=0; //original speed stat
    fatOG=0; //original fatigue stat
    attackVal=0; //stores attack value during a round
    defenseVal=0; //stores defense value during a round
    finVal=false; //flags attack as a finisher

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

        ogStats=(0,1,2,3);
        this.ogStats[0]=this.stats[0];
        this.ogStats[1]=this.stats[1];
        this.ogStats[2]=this.stats[2];
        this.ogStats[3]=this.stats[3];
    }

    updateStatDisplay(log){
        statNames=('Strength: ', 'Cunning: ', 'Speed: ', 'Fatigue: ');
        log.innerHTML='';
        int=0;
        while(int<4){
            log.innerHTML+=(statNames[int]+this.stats[int]+'\n');
            counter++;
        }
    }

    getStat(statNum){
        return this.stats[statNum];
    }
    setStat(statNum,val){
        this.stats[statNum]+=val;
        if(statNum===3 && (this.stats[statNum]+val>this.ogStats[statNum])){
            this.stats[statNum]=this.ogStats[statNum];
        }
    }

    getAttack(){
        return this.attackVal;
    }
    setAttack(isAttacking){
        if(isAttacking){
            if(this.getFinish()){
                this.attackVal=(this.getStat(0)+this.getStat(2))/Math.floor((Math.random()*3)+1);
            }
            else{this.attackVal=(this.getStat(0)+this.getStat(2)+this.getStat(1))/Math.floor((Math.random()*3)+1);}
        }
        else{this.attackVal=0;}
    }

    getDefend(){
        return this.defenseVal;
    }
    setDefend(isDefending){
        if(isDefending){this.defenseVal=(this.getStat(2)+this.getStat(1));}
        else{this.defenseVal=this.getStat(2)+Math.floor((Math.random()*6)+1);}
    }

    getFinish(){
        return this.finVal;
    }
    setFinish(newVal){
        this.finVal=newVal;
    }

    getOG(num){
        return this.ogStats[num];
    }
}

//allows both players to choose what action they want to take, then executes them after both players have chosen
function round(f1,f2){
    if(!((f1.getStat(3)>=(f2.getStat(3)*2)) && f2.getStat(3))<=0){
        if((Math.floor(Math.random()*2))=0){
            f2.setAttack(true); f2.setDefend(false); f2.setFinish(false);
        }
        else{f2.setAttack(false); f2.setDefend(true);}
    }
    else{f2.setAttack(true); f2.setDefend(false); f2.setFinish(true);}

    attack.addEventListener('click',f1.setAttack(true) && f1.setDefend(false) && f1.setFinish(true));
    defend.addEventListener('click',f1.setDefend(true) && f1.setAttack(false));
    finisher.addEventListener('click',()=>{
        if((f2.getStat(3)>=(f1.getStat(3)*2)) && f1.getStat(3)<=0){
            f1.setAttack(true);
            f1.setDefend(false);
            f1.setFinish(true);
        }
    });

    if(f1.getFinish() && f1.getAttack()> 1){
        message.innerHTML='You win.';
    }
    if(f2.getFinish() && f2.getAttack()> 1){
        message.innerHTML='You lose.';
    }
    if((f1.getAttack()===0)&&(f2.getAttack()===0)){
        f1.setStat(3, Math.floor((Math.random()*6)+1));
        f2.setStat(3, Math.floor((Math.random()*6)+1));
    }
    if(f1.getAttack()!==0 && f1.getAttack()>f2.getDefend()){
        f2.setStat(3,f1.getAttack()-f2.getDefend());
    }
    if(f2.getAttack()!==0 && f2.getAttack()>f1.getDefend()){
        f1.setStat(3,f2.getAttack()-f1.getDefend());
    }
}

function game(){
    let fighter1=new Fighter();
    fighter1.randomize();
    fighter1.updateStatDisplay(f1Stats);
    let fighter2=new Fighter();
    fighter2.randomize();
    fighter2.updateStatDisplay(f2Stats);

    while(!isOver){round(fighter1,fighter2);}
}