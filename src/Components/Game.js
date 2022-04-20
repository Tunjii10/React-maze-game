import React, { useState, useEffect } from "react";

const Game = () => {
    const [gameArray, setGameArray] = useState(null)
    const create_game_array = (width, height) => {
        let arr =  Array(height).fill(0).map(() => Array(width).fill(0))
        let mid = [Math.floor(arr.length/2), Math.floor(arr[0].length/2)]
        arr[mid[0]][mid[1]] = 1 
        let occupiedSpots = 0;
        while(occupiedSpots < (width > height ? height : width)){
            let x = Math.floor(Math.random()*width)
            let y = Math.floor(Math.random()*height)
            if(arr[y][x] == 0){
                arr[y][x] = 2;
                occupiedSpots++;
            }
        }
        setGameArray(arr)
    }

    useEffect(() => {
        const width = prompt("what is the board width")
        const height = prompt("what is the board height")
        create_game_array(+width, +height)
    },[])
    console.log(gameArray)
    
    return (
        gameArray && 
        <div>
            <table className="game_table">
                <tbody>
                    {
                        gameArray.map((x,y) => (
                            <tr key = {y+"row"}>
                                {x.map((a,b) => (
                                    <td key={y+b+"col"}>
                                        {a}
                                    </td>
                                ))}
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <p>hello</p>
        </div>
    )
}


export default Game