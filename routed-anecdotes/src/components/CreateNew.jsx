import { useNavigate } from "react-router"
import { useField } from "../hooks"
import { useAnecdotes } from "../hooks/useAnecdotes"

const CreateNew = () => {
  const { addAnecdote } = useAnecdotes()

  const content = useField("text")
  const author = useField("text")
  const info = useField("text")

  const { reset: resetContent, ...contentField } = content
  const { reset: resetAuthor, ...authorField } = author
  const { reset: resetInfo, ...infoField } = info

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await addAnecdote({ 
      content: content.value, 
      author: author.value, 
      info: info.value, 
      votes: 0
    })

    navigate("/")
  }
  

  const handleReset = () => {
    resetContent()
    resetAuthor()
    resetInfo()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...contentField} />
        </div>
        <div>
          author
          <input {...authorField} />
        </div>
        <div>
          url for more info
          <input {...infoField} />
        </div>
        <button>create</button>
        <button type="button" onClick={handleReset}>reset</button>
      </form>
    </div>
  )
}

export default CreateNew
