import { useEffect, useState } from "react"
import anecdoteService from "../services/anecdotes"

export const useAnecdotes = () => {

    const [anecdotes, setAnecdotes] = useState([])

    useEffect(() => {
        anecdoteService
            .getAll()
            .then(anecdotes => {
                setAnecdotes(anecdotes)
            })
    }, [])

    const addAnecdote = async (object) => {
        const newAnecdote = await anecdoteService.createNew(object)
        setAnecdotes(anecdotes.concat(newAnecdote))
    }

    const deleteAnecdote = async (id) => {
        await anecdoteService.remove(id)
        setAnecdotes(anecdotes.filter(a => a.id !== id))
    }

    return {
        anecdotes,
        addAnecdote,
        deleteAnecdote
    }
}