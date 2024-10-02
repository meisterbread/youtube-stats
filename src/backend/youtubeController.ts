import { Request,Response } from "express"
import { Root } from "./channelModel"
import dotenv from 'dotenv'

const url = 'https://www.googleapis.com/youtube/v3/channels'

dotenv.config();

//search channel -> get channel id from snippet -> get other data (thumbnail, statistics) using Channels api

const fetchChannel = async ( req: Request, res : Response) => {
    const handle = req.query.forHandle as string
    const part = req.query.part as string
    const key = process.env.VITE_API_KEY

    try{
        const response = await fetch(`${url}?key=${key}&part=${part}&forHandle=${handle}`)
        
        const data = (await response.json()) as Root

        res.json(data)

    }catch(error){
        console.log(error)
    }
}

export { fetchChannel }