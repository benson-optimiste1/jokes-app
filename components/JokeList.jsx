import { useState, useEffect } from "react"
import { Text, Button } from "react-native"
import Joke from "./Joke"
import Punchline from "./Punchline"

export default function JokeList() {

    const [jokes, setJokes] = useState()
    const [currentJoke, setCurrentJoke] = useState(0)

    useEffect(() => {
        fetch('https://api.sampleapis.com/jokes/goodJokes')
            .then(res => res.json())
            .then(setJokes)
            .catch(alert)
            .finally(shuffleJokes)
    }, [])

    const shuffleJokes = () => {
        if(jokes){
        const j = Math.floor(Math.random() * jokes.length)
        setCurrentJoke(j)
        }
    }
    
    


    const nextJoke = () => {
        if (currentJoke < jokes.length - 1) {
            setCurrentJoke(currentJoke + 1)
        } else {
            setCurrentJoke(0) // loop back to first joke.
        }
    }

    return (
        <>
           <Joke
             joke={!jokes ? 'loading...' : jokes[currentJoke].setup} />
            <Punchline 
            punchline={jokes && jokes[currentJoke].punchline} />
            <Button onPress={nextJoke} title="Next Joke" />
        </>
    )
}

