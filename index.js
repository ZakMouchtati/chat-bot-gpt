import { ChatGPTAPIBrowser } from 'chatgpt'
import * as dotenv from 'dotenv'
dotenv.config()

import express from "express"

const app = express()

app.use(express.json())

const api = new ChatGPTAPIBrowser({
  email: process.env.OPENAI_EMAIL,
  password: process.env.OPENAI_PASSWORD,
  markdown: false
})
await api.initSession()

app.post('/ask',async (req,res) => {
    const { question } = req.body;
    let message = await api.sendMessage(question)
    res.send({answer : message.response})
    
    console.log(res.response)
})


app.listen(3000,()=>{console.log('App Started !! ')})