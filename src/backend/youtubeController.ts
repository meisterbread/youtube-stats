import { Request,Response } from "express"
import { Root } from "./channelModel"
import dotenv from 'dotenv'

const url = 'https://www.googleapis.com/youtube/v3/channels'

dotenv.config();

const fetchChannel = async ( req: Request, res : Response) => {
    const handle = req.query.forHandle as string
    const part = req.query.part as string
    const key = process.env.VITE_API_KEY

    try{
        const response = await fetch(`${url}?key=${key}&part=${part}&forHandle=${handle}`)
        
        const data = (await response.json()) as Root

        res.json({
            name : data.items.find(snippet => snippet.snippet.title)?.snippet.title,
            icon : data.items.find(snippet => snippet.snippet.thumbnails.high)?.snippet.thumbnails.high.url,
            viewCount : data.items.find(snippet => snippet.statistics.viewCount)?.statistics.viewCount,
            subCount : data.items.find(snippet => snippet.statistics.subscriberCount)?.statistics.subscriberCount
        })

    }catch(error){
        console.log(error)
    }
}

export { fetchChannel }