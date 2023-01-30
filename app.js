import venom from 'venom-bot';
import { ChatGPTAPIBrowser } from 'chatgpt'
import * as dotenv from 'dotenv'
dotenv.config()



const api = new ChatGPTAPIBrowser({
    email: process.env.OPENAI_EMAIL,
    password: process.env.OPENAI_PASSWORD,
    markdown: false
  })

await api.initSession()

venom
  .create({
    session: 'session-name', //name of session
    multidevice: true // for version not multidevice use false.(default: true)
  })
  .then((client) => start(client))
  .catch((erro) => {
    console.log(erro);
  });

const start = async (client) => {
    client.onMessage(async (message) => {
        let res = await api.sendMessage(message.body)
        client.sendText(message.from, res.response)
    });
}