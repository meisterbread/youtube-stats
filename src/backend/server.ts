import express from 'express'
import cors from 'cors'
import youtubeRouter from './youtubeRoute'

const app = express()
const port = 3000

app.use(cors())

app.get('/', (req,res)=> {
    res.send("Youtube!")
})

app.use("/", youtubeRouter)

app.listen(port, () => {
    console.log(`App is listening to port ${port}`)
})