import type { Cell } from "../cell";
import { stop, sleep, getPath, getSpeed } from "../index";

type Nullable<T> = T | null;


export async function randomNext(grid: Cell[][], startCell : Nullable<Cell>, endCell : Nullable<Cell>) {
    if (startCell == null || endCell == null) return null;
    
    let openList : Cell[] = [];
    let explored : Cell[] = [];

    openList.unshift(startCell!);
    explored.push(startCell!);

    let finalCell : Nullable<Cell> = null;
    

    while(finalCell == undefined) {
        if(stop) return getPath(null);
        
        let speed = getSpeed();
        if (speed > 0) await sleep(speed);

        
        let rdm = Math.floor(Math.random() * openList.length);

        let currentCell = openList[rdm];
        openList.splice(rdm, 1);
        
        if (currentCell == null) return null;
        if (currentCell.x == endCell.x && currentCell.y == endCell.y)
            finalCell = currentCell;
        


        currentCell?.expand(grid).forEach(element => {
            let cellAlreadyExplored = false;
            for (let i = 0; i < explored.length; i++)
                if (explored[i].x == element.x && explored[i].y == element.y)
                    cellAlreadyExplored = true;
                
    
    
    
            if (!cellAlreadyExplored) {
                openList.push(element);
                explored.push(element);
            } 
            
        });
    }
    

    console.log("STACK SIZE: " + openList.length);
    console.log("CLOSEDLIST SIZE: " + explored.length);
        


    console.log("Lösung gefunden");
    console.log(finalCell);

    getPath(finalCell);
}
