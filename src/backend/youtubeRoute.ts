import express from 'express'
import { fetchChannel } from './youtubeController.ts'

const youtubeRouter = express.Router()

youtubeRouter.get("/channel", fetchChannel)

export default youtubeRouter
