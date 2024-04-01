require('dotenv').config();
const serverless = require('serverless-http');
const connectToDtabase = require("./db");
const Audios = require('./models/Audio');
const express = require('express');
const cors = require('cors');
const port = process.env.PORT;

connectToDtabase();
const app = express();

// middle-Ware
app.use(express.json());
app.use(cors());


app.post('/.netlify/functions/server/api/upload-audio', async(req, res)=>{
const {audioUrl , public_id, fileName} = req.body;
await Audios.create({ public_id , audioUrl, fileName});
      res.status(200).json({ success: true });
});

app.get('/.netlify/functions/server/api/get-all-audios', async(req, res)=>{
const allAudios = await Audios.find();
res.status(200).json(allAudios);
});



//POST - for info-weather
app.post('/.netlify/functions/server/api/add-user', async(req, res) => {
    const { username, email, city } = req.body;
    const user = new Users({
        username: username,
        email: email,
        city: city
      })
    await user.save();
    res.json({success:true});
  });
  
  app.get('/.netlify/functions/server/api/get-users', async(req, res) => {
    const users = await Users.find();
    res.json({success:true, users:users});
  });
  
  app.put('/.netlify/functions/server/api/update-active', async(req, res) => {
    const email = req.body.email;
    const isChecked = req.body.isChecked;
    await Users.updateOne({ email: email }, { $set: { active: isChecked } });
    res.status(200).json();
  });



// Connect to the server
app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});

module.exports.handler = serverless(app);