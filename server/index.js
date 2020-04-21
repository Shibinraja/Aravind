const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

const {
  urlModel
} = require('./models/usermodel')

mongoose.connect("mongodb+srv://aravind:9994320498@cluster0-3msaz.azure.mongodb.net/test?retryWrites=true&w=majority");

const app = express();
const baseurl = "www.arshort.com";

app.use(cors());
app.use(express.static(path.join(__dirname, '../dist' , 'urlshortner')));

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
  extended: true
}));




// get all data
app.get('/display', (req, res) => {
  urlModel.find((err, result) => {
    if (err) throw err;
    res.send({
      result
    });
  })
})

//store data to db
app.post('/create', (req, res) => {
  const urlShort = new urlModel({
    longUrl: req.body.userUrl,
    shortUrl: baseurl+'/'+generateUrl(),
    
  })
  urlShort.save((err, data) => {
    if (err) throw err;
    console.log(`${data}is there`);
    res.json({
      data
    })
  });
});

//redirect to longurl
app.get('/redirect/:url', (req, res) => {
  urlModel.findOne({
    shortUrl: req.params.url
  }, (err, data) => {
    if (err) throw err;
    console.log("redirectdataaa",
      data);
    urlModel.findByIdAndUpdate({
      _id: data.id
    }, {
      $inc: {
        count: 1
      }
    }, (err, updatedData) => {
      if (err) throw err;
      res.send({
        data
      });
    })

  })

})

app.get('/:url', function (req, res) {
  urlModel.findOne({
    shortUrl: req.params.url
  }, (err, data) => {
    if (err) throw err;
    urlModel.findByIdAndUpdate({
      _id: data.id
    }, {
      $inc: {
        count: 1
      }
    }, (err, updatedData) => {
      if (err) throw err;
      res.redirect(data.longUrl);
    })

  })
})

//remove url
app.get('/delete/:id', (req, res) => {
  urlModel.findByIdAndDelete({
    _id: req.params.id
  }, (err, deleteData) => {
    if (err) throw err
    console.log(deleteData);
    res.json({
      deleteData
    });
  })
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist' , 'urlshortner', 'index.html'))
});
//server
app.listen(process.env.PORT || 3000, () => {
  console.log(`node server is running in port ${PORT}`)
});

//generate short url
function generateUrl() {
  var rndResult = "";
  var characters = "ABCDEFGHIJKLMNOPQURSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (i = 0; i < 5; i++) {
    rndResult += characters.charAt(
      Math.floor(Math.random() * charactersLength)
    )
  }
  return rndResult;
}
