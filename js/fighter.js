class Fighter{
    stats=(1,2,3,4);
    counter=0;

    func(){
        while (counter < 2){
            let int=this.stats[Math.floor(Math.random(4))];
            if (Number.isInteger(int))
            {
                stats[int]=stats[int].toString();
                counter++;
            }
        }
    }
}