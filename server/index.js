require("dotenv").config();
const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
         apiKet:process.env.OPENAI_API_KEY,
});
app.post("/api/summary", async (req, res) => {
  try{
         const{notes}=req.body;
         const response = await openai.chat.completions.create({
                  model:"gpt-3.5-turbo",
                  messages:[
                           {
                                    role:"system",
                                    content:"Summarize the notes in short exam-friendly points.",

                           },
                           {
                                    role:"user",
                                    content:notes,
                           },
                  ],
                  max_tokens:150,
         });

  res.json({
    summary:response.choices[0].message.content,
  });
} catch(error){
    console.error(error);
    res.status(500).json({error:"AI summary failed"});     
}
});



app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
