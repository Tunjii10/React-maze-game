import React, { useState, useEffect, useRef } from "react";
import sprite from "../images/mushroom.png"
import mario from "../images/SeekPng.com_video-game-character-png_942386.png"

const Game = () => {
    const [gameArray, setGameArray] = useState(null)
    const gameArrayRef = useRef(null)
    const mario_position = useRef(null)
    const move_count = useRef(0)
    const sprites_remaining = useRef(0) 

    const create_game_array = (width, height) => {
        let arr =  Array(height).fill(0).map(() => Array(width).fill(0))
        let mid = [Math.floor(arr.length/2), Math.floor(arr[0].length/2)]
        mario_position.current = [...mid, width, height]
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
        sprites_remaining.current = occupiedSpots
        gameArrayRef.current = arr
        setGameArray(arr)
    }

    const displayCharacter = (x) => {
        if (x == 2) {
            return (
                <div className="sprite">
                    <img  src={sprite}/>
                </div>
                )
        } else if ( x == 1) {
            return (
                <div className="mario">
                    <img  src={mario}/>
                </div>
            )
        } else {
            return (
                <div></div>
            )
        }
    }
    const endGame = () => {
        if (sprites_remaining.current === 0){
            alert("Game Won")
            window.location.reload(false);
        }
        if (move_count.current === 65){
            alert("Game Over : Total moves to save princess: 64")
            window.location.reload(false);
        }
       
    }

    const handleKeyPress = (e) => {
        let gameArray_copy = gameArrayRef.current
        let [check_height, check_width, max_width, max_height] = mario_position.current
        if (e.keyCode === 38){
           // key press up 
           if (check_height-1 >= 0){
                if (gameArray_copy[check_height-1][check_width] == 2){
                    sprites_remaining.current -= 1
                }
                gameArray_copy[check_height][check_width] = 0
                gameArray_copy[check_height-1][check_width] = 1
                mario_position.current = [check_height-1, check_width, max_width, max_height]
                gameArrayRef.current = gameArray_copy
                move_count.current += 1
                setGameArray([...gameArray_copy])
            }
        }
        if (e.keyCode === 40){
            // key press down 
            if (check_height+1 < max_height){
                if (gameArray_copy[check_height+1][check_width] == 2){
                    sprites_remaining.current -= 1
                }
                gameArray_copy[check_height][check_width] = 0
                gameArray_copy[check_height+1][check_width] = 1
                mario_position.current = [check_height+1, check_width, max_width, max_height]
                gameArrayRef.current = gameArray_copy
                move_count.current += 1
                setGameArray([...gameArray_copy])
               }
        }
        if (e.keyCode === 37){
            // key press left 
            if (check_width-1 >= 0){
                if (gameArray_copy[check_height][check_width-1] == 2){
                    sprites_remaining.current -= 1
                }
                gameArray_copy[check_height][check_width] = 0
                gameArray_copy[check_height][check_width-1] = 1
                mario_position.current = [check_height, check_width-1, max_width, max_height]
                gameArrayRef.current = gameArray_copy
                move_count.current += 1
                setGameArray([...gameArray_copy])
               }
        }
        if (e.keyCode === 39){
            // key press right 
            if (check_width+1 < max_width){
                if (gameArray_copy[check_height][check_width+1] == 2){
                    sprites_remaining.current -= 1
                }
                gameArray_copy[check_height][check_width] = 0
                gameArray_copy[check_height][check_width+1] = 1
                mario_position.current = [check_height, check_width+1, max_width, max_height]
                gameArrayRef.current = gameArray_copy
                move_count.current += 1
                setGameArray([...gameArray_copy])
               }
        }
    }

    useEffect(() => {
        const width = prompt("Please enter board width")
        const height = prompt("Please enter board height")
        create_game_array(+width, +height)
    },[])
    
    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress)
        return () => {
            window.removeEventListener('keydown', handleKeyPress)
        }
    }, [])
    
    return (
        gameArray && 
        <div>
            <table className="game_table">
                <tbody>
                    {
                        gameArray.map((x,y) => (
                            <tr key = {y+"row"} >
                                {x.map((a,b) => (
                                    <td key={y+b+"col"} id="row">
                                        {displayCharacter(a)}
                                    </td>
                                ))}
                            </tr>
                        ))
                    }
                </tbody>
                {endGame()}
            </table>
        </div>
    )
}


export default Game