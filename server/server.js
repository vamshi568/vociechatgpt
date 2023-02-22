import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import { Configuration,OpenAIApi } from 'openai'

dotenv.config();
const configuration=new Configuration({
    apiKey: process.env.OPENAI_API_KEY,

})

const openai=new OpenAIApi(configuration);

const app=express()
app.use(cors())
app.use(express.json())

app.get('/',async(req,res)=>{
    res.status(200).send({
        message:'Hello '
    })
})

app.post('/',async(req,res)=>{
    try {
        const promt=req.body.promt
        if (promt!==''){
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `${promt}`,
            temperature: 0,
            max_tokens: 100,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0,
          });
          res.status(200).send({bot:response.data.choices[0].text})
    }
else{res.send('I could not able to uderstand you...')}
} catch (error) {
        console.log(error)
        res.send('I could not able to uderstand you...')
    }
})

app.listen(3300,()=> console.log('its running..'))