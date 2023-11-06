class Fighter{
    stats=(1,2,3,4);
    counter=0;

    func(){
        while(counter<2){
            let int=this.stats[Math.floor(Math.random()*4)];
            if(Number.isInteger(int))
            {
                stats[int]=stats[int].toString();
                counter++;
            }
        }
        counter=0;
        while(counter<4){
            if(stats[counter].isInteger){
                if(counter===3){
                    stats[counter]=30+Math.floor(Math.random()*7);
                }
                else{stats[counter]=6+Math.floor(Math.random()*2);}
            }
            else{
                if(counter===3){
                    stats[counter]=30-Math.floor(Math.random()*7);
                }
                else{stats[counter]=6-Math.floor(Math.random()*2);}
            }
        }
    }
}