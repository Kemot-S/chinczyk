
// //import
// import getNum from "../modules/getNum.js"
// import getPos from "../modules/getPos.js"
// import Gracz from "./modules/gracz.js"
//stałe
const PORT = 3000;
const http = require('http');
const fs = require('fs');
const qs = require('querystring');


//zmienne
var board = []
var colors = [
    'red',
    'green',
    'blue',
    'yellow'
]
var boards = 1
//klasa
class Gracz {
  constructor(color, num, board, pos1, pos2, pos3, pos4, state = -1) {
    this.color = color;
    this.num = num;
    this.board = board;
    this.pos1 = pos1;
    this.pos2 = pos2;
    this.pos3 = pos3;
    this.pos4 = pos4;
    this.state = state
  }
}


//baza danych
var Datastore = require('nedb');
const { count } = require('console');
const { type } = require('os');

var db = new Datastore({
    filename: 'gry.db',
    autoload: true
});

// db.count({}, function (err, count) {
//   // count equals to 4
//   console.log(count)
// });

var doc = { plansza: 1,
            playing: 'none',
            // gracz1: new Gracz('red',1,1,0,0,0,0),
          };

db.insert(doc, function (err, newDoc) {
  console.log(newDoc)
});

// db.update({ plansza: 1 }, { gracz2: new Gracz('red',1,1,0,0,0,0)}, {}, function (err, numReplaced) {

// });


//edit nieistniejącego pola czyli dodanie pola
// db.update({ plansza: 1 }, { $set: { gracz2: new Gracz('green',1,1,0,0,0,0)} }, {}, function () {})

//edit istniejącego pola
// db.update({ plansza: 1 }, { $set: { gracz2: new Gracz('blue',1,1,0,0,0,0) } }, {}, function () {});

// wyciągnięcie danych o konkretnym graczu
// db.find({ plansza: 1 }, function (err, docs) {
//   console.log(docs[0].gracz1)
// });

// db.count({}, function (err, count) {
//   // count equals to 4
//   console.log(count)
// });

// obsługa POST
const servResponse = (req, res) => {
  console.log(req.method + req.url)


  var allData = "";

req.on("data", function (data) {
    console.log("data: " + data)
    allData += data;
})

// function interwal(){
//   let i = 1
//   console.log('intintini')
//   setInterval(function(){i += 0.001},500)
// }

// dodanie graczy do planszy

    if(req.url == "/getNum"){

        req.on("end", function getNum () {

          let len = board.length;
          console.log('len: ',len)
          // console.log(db.count({}, function (err, count) {return count}))//var boardCount = db.count({}, function (err, count) {return count});
          // console.log('boardCount:',boardCount)
          // var boardCount = 0

          if(len == 0){
            db.update({ plansza: boards }, { $set: { gracz1: new Gracz(colors[len],len+1,boards,'r1','r2','r3','r4')} }, {}, function (err, numReplaced) {});
            db.update({ plansza: boards }, { $set: { players:1} }, {}, function (err, numReplaced) {});
          }
          else if(len == 1){
            db.update({ plansza: boards }, { $set: { gracz2: new Gracz(colors[len],len+1,boards,'g1','g2','g3','g4')} }, {}, function (err, numReplaced) {});
            db.update({ plansza: boards }, { $set: { players:2} }, {}, function (err, numReplaced) {});
          }
          else if(len == 2){
            db.update({ plansza: boards }, { $set: { gracz3: new Gracz(colors[len],len+1,boards,'b1','b2','b3','b4')} }, {}, function (err, numReplaced) {});
            db.update({ plansza: boards }, { $set: { players:3} }, {}, function (err, numReplaced) {});
          }
          else if(len == 3){
            db.update({ plansza: boards }, { $set: { gracz4: new Gracz(colors[len],len+1,boards,'y1','y2','y3','y4')} }, {}, function (err, numReplaced) {});
            db.update({ plansza: boards }, { $set: { players:4} }, {}, function (err, numReplaced) {});
            db.update({ plansza: boards }, { $set: { playing: 'block'} }, {}, function (err, numReplaced) {});
          }
      
          else if(len == 4){
            len = 0;
            board = [];
            boards += 1;

            var doc = { plansza: boards,
              playing: 'none',
              gracz1: new Gracz('red',1,boards,0,0,0,0),
            };
      
            db.insert(doc, function (err, newDoc) {   // Callback is optional
              // newDoc is the newly inserted document, including its _id
              // newDoc has no key called notToBeSaved since its value was undefined
              console.log(newDoc)
            });


          }
      
      
          board.push({color: colors[len],num: (len+1), board: boards})
          console.log(board[len])
      
              
          res.writeHead(200, { 'content-type': 'application/json;charset=utf-8' }); // nagłówek
            
          res.end(JSON.stringify(board[len])); // odsyłamy dane do klienta w postaci stringa
      }
    )
    }
    if(req.url == "/getPos"){
        req.on("end", function getPos () {
              var jsonObj = JSON.parse(allData); // parsowanie odebranych danych na json-a
          
              console.log(jsonObj);
              console.log(jsonObj['color'],jsonObj['num'],jsonObj['board']);
          
      
          db.find({ plansza: parseInt(jsonObj['board']) }, function (err, docs) {            
            if(docs[0]['active']==null){
              // console.log('nivyctcihg8')
              if(jsonObj['num'] == 2){

                if(docs[0]['gracz1']['state'] == 1 && docs[0]['gracz2']['state'] == 1){
                  db.update({ plansza: parseInt(jsonObj['board']) }, { $set: { playing: 'block'} }, {}, function () {});
                  db.update({ plansza: parseInt(jsonObj['board']) }, { $set: { active: 'red'} }, {}, function () {});

                  let a = 1
                  setInterval(function(){
                      if(a==1){
                        db.update({ plansza: parseInt(jsonObj['board']) }, { $set: { active: 'green' }}, {}, function () {});
                        a=0
                      }
                      else{
                        db.update({ plansza: parseInt(jsonObj['board']) }, { $set: { active: 'red'} }, {}, function () {});
                        a=1
                      }

                  },10000)
                  board = [];
                  boards += 1;
      
                  var doc = { plansza: boards, playing: 'none'};
            
                  db.insert(doc, function (err, newDoc) {   // Callback is optional
                    // newDoc is the newly inserted document, including its _id
                    // newDoc has no key called notToBeSaved since its value was undefined
                    console.log(newDoc)
                  });
                };
              }
              else if(jsonObj['num'] == 3){

                if(docs[0]['gracz1']['state'] == 1 && docs[0]['gracz2']['state'] == 1 && docs[0]['gracz3']['state'] == 1){
                  
                  db.update({ plansza: parseInt(jsonObj['board']) }, { $set: { playing: 'block'} }, {}, function () {});
                  db.update({ plansza: parseInt(jsonObj['board']) }, { $set: { active: 'red'} }, {}, function () {});

                  let a = 1
                  setInterval(function(){
                      if(a==1){
                        db.update({ plansza: parseInt(jsonObj['board']) }, { $set: { active: 'green'} }, {}, function () {});
                        a=2
                      }
                      else if(a==2){
                        db.update({ plansza: parseInt(jsonObj['board']) }, { $set: { active: 'blue'} }, {}, function () {});
                        a=0
                      }
                      else{
                        db.update({ plansza: parseInt(jsonObj['board']) }, { $set: { active: 'red'} }, {}, function () {});
                        a=1
                      }
                  },6000)
                  
                  board = [];
                  boards += 1;
      
                  var doc = { plansza: boards, playing: 'none'};
            
                  db.insert(doc, function (err, newDoc) {
                    console.log(newDoc)
                  });
                };
              }
              else if(jsonObj['num'] == 4){
                db.update({ plansza: parseInt(jsonObj['board']) }, { $set: { active: 'red'} }, {}, function () {});

                let a = 1
                setInterval(function(){
                    if(a==1){
                      db.update({ plansza: parseInt(jsonObj['board']) }, { $set: { active: 'green'} }, {}, function () {});
                      a=2
                    }
                    else if(a==2){
                      db.update({ plansza: parseInt(jsonObj['board']) }, { $set: { active: 'blue'} }, {}, function () {});
                      a=3
                    }
                    else if(a==3){
                      db.update({ plansza: parseInt(jsonObj['board']) }, { $set: { active: 'yellow'} }, {}, function () {});
                      a=0
                    }
                    else{
                      db.update({ plansza: parseInt(jsonObj['board']) }, { $set: { active: 'red'} }, {}, function () {});
                      a=1
                    }
                },6000)
              }}
            })



              db.find({ plansza: parseInt(jsonObj['board']) }, function (err, docs) {
                    res.writeHead(200, { 'content-type': 'application/json;charset=utf-8' }); // nagłówek
                res.end(JSON.stringify(docs)); // odsyłamy dane do klienta w postaci stringa
              })


          //     res.writeHead(200, { 'content-type': 'application/json;charset=utf-8' }); // nagłówek

          //     res.end(JSON.stringify(jsonObj)); // odsyłamy dane do klienta w postaci stringa
      })
    }
    if(req.url == "/getReady"){
      req.on("end", function getReady () {
            var jsonObj = JSON.parse(allData); // parsowanie odebranych danych na json-a
        
            console.log(jsonObj);
            console.log(jsonObj['color'],jsonObj['num'],jsonObj['board']);
          
            // db.update({ plansza: parseInt(jsonObj['board']) }, { $set: { gracz1: new Gracz('green',1,1,0,0,0,0)} }, {}, function () {})

            db.find({ plansza: parseInt(jsonObj['board']) }, function (err, docs) {
              let graczEdit = new Gracz(docs[0]['gracz'+jsonObj['num']]['color'],
                                        docs[0]['gracz'+jsonObj['num']]['num'],
                                        docs[0]['gracz'+jsonObj['num']]['board'],
                                        docs[0]['gracz'+jsonObj['num']]['pos1'],
                                        docs[0]['gracz'+jsonObj['num']]['pos2'],
                                        docs[0]['gracz'+jsonObj['num']]['pos3'],
                                        docs[0]['gracz'+jsonObj['num']]['pos4'],
                                        -docs[0]['gracz'+jsonObj['num']]['state']);
              // console.log(graczEdit)
              if(jsonObj['num'] == 1){
                db.update({ plansza: parseInt(jsonObj['board']) }, { $set: { gracz1: graczEdit} }, {}, function () {});
              }
              else if(jsonObj['num'] == 2){
                db.update({ plansza: parseInt(jsonObj['board']) }, { $set: { gracz2: graczEdit} }, {}, function () {});

              }
              else if(jsonObj['num'] == 3){
                db.update({ plansza: parseInt(jsonObj['board']) }, { $set: { gracz3: graczEdit} }, {}, function () {});

              }
              else if(jsonObj['num'] == 4){
                db.update({ plansza: parseInt(jsonObj['board']) }, { $set: { gracz4: graczEdit} }, {}, function () {});
              }

                  res.writeHead(200, { 'content-type': 'application/json;charset=utf-8' }); // nagłówek
              res.end(JSON.stringify(graczEdit.state)); // odsyłamy dane do klienta w postaci stringa
            })
        })
      }
      if(req.url == "/ruch"){
        let dice = Math.floor(Math.random() * 6) + 1; 
        res.writeHead(200, { 'content-type': 'application/json;charset=utf-8' }); // nagłówek
        res.end(JSON.stringify(dice));
      }
    if(req.url == "/changePos"){

      req.on("end", function ruch () {

            var jsonObj = JSON.parse(allData); // parsowanie odebranych danych na json-a
        
            console.log(jsonObj);
            console.log(jsonObj['color'],jsonObj['num'],jsonObj['board'],jsonObj['pos'],jsonObj['dice']);
          
            // db.update({ plansza: parseInt(jsonObj['board']) }, { $set: { gracz1: new Gracz('green',1,1,0,0,0,0)} }, {}, function () {})
          
            db.find({ plansza: parseInt(jsonObj['board']) }, function (err, docs) {
              let graczEdit = new Gracz(docs[0]['gracz'+jsonObj['num']]['color'],
                                        docs[0]['gracz'+jsonObj['num']]['num'],
                                        docs[0]['gracz'+jsonObj['num']]['board'],
                                        docs[0]['gracz'+jsonObj['num']]['pos1'],
                                        docs[0]['gracz'+jsonObj['num']]['pos2'],
                                        docs[0]['gracz'+jsonObj['num']]['pos3'],
                                        docs[0]['gracz'+jsonObj['num']]['pos4'],
                                        docs[0]['gracz'+jsonObj['num']]['state']);

              graczEdit['pos'+jsonObj['pos']]+= jsonObj['dice']

            if(jsonObj['color']==docs[0]['active']){

              // console.log(graczEdit)
              if(jsonObj['num'] == 1){
                  if(docs[0]['gracz'+jsonObj['num']]['pos'+jsonObj['pos']] == 'r'+jsonObj['pos'] && (jsonObj['dice']==1 || jsonObj['dice']==6)){
                    graczEdit['pos'+jsonObj['pos']] = 1
                  }
                  else if(docs[0]['gracz'+jsonObj['num']]['pos'+jsonObj['pos']] == 'r'+jsonObj['pos'] && (jsonObj['dice']!=1 && jsonObj['dice']!=6)){
                    graczEdit['pos'+jsonObj['pos']] = docs[0]['gracz'+jsonObj['num']]['pos'+jsonObj['pos']]
                  }
                  else if(docs[0]['gracz'+jsonObj['num']]['pos'+jsonObj['pos']]+jsonObj['dice']==41){
                    graczEdit['pos'+jsonObj['pos']] = 'redbase'
                  }
                  else if(docs[0]['gracz'+jsonObj['num']]['pos'+jsonObj['pos']]+jsonObj['dice']>41){
                    graczEdit['pos'+jsonObj['pos']] = docs[0]['gracz'+jsonObj['num']]['pos'+jsonObj['pos']]
                  }
                
                db.update({ plansza: parseInt(jsonObj['board']) }, { $set: { gracz1: graczEdit} }, {}, function () {});
              }
              else if(jsonObj['num'] == 2){

                  if(docs[0]['gracz'+jsonObj['num']]['pos'+jsonObj['pos']] == 'g'+jsonObj['pos'] && (jsonObj['dice']==1 || jsonObj['dice']==6)){
                    graczEdit['pos'+jsonObj['pos']] = 11
                  }
                  else if(docs[0]['gracz'+jsonObj['num']]['pos'+jsonObj['pos']] == 'g'+jsonObj['pos'] && (jsonObj['dice']!=1 && jsonObj['dice']!=6)){
                    graczEdit['pos'+jsonObj['pos']] = docs[0]['gracz'+jsonObj['num']]['pos'+jsonObj['pos']]
                  }
                  else if(graczEdit['pos'+jsonObj['pos']]>40){
                    graczEdit['pos'+jsonObj['pos']] -= 40
                  }
                  else if(docs[0]['gracz'+jsonObj['num']]['pos'+jsonObj['pos']]+jsonObj['dice']==11){
                    graczEdit['pos'+jsonObj['pos']] = 'greenbase'
                  }
                  else if(((docs[0]['gracz'+jsonObj['num']]['pos'+jsonObj['pos']]>5)&&(docs[0]['gracz'+jsonObj['num']]['pos'+jsonObj['pos']]<11))&&(docs[0]['gracz'+jsonObj['num']]['pos'+jsonObj['pos']]+jsonObj['dice'])>11){
                    graczEdit['pos'+jsonObj['pos']] = docs[0]['gracz'+jsonObj['num']]['pos'+jsonObj['pos']]
                  }

                db.update({ plansza: parseInt(jsonObj['board']) }, { $set: { gracz2: graczEdit} }, {}, function () {});
              }
              else if(jsonObj['num'] == 3){

                  if(docs[0]['gracz'+jsonObj['num']]['pos'+jsonObj['pos']] == 'b'+jsonObj['pos'] && (jsonObj['dice']==1 || jsonObj['dice']==6)){
                    graczEdit['pos'+jsonObj['pos']] = 21
                  }
                  else if(docs[0]['gracz'+jsonObj['num']]['pos'+jsonObj['pos']] == 'b'+jsonObj['pos'] && (jsonObj['dice']!=1 && jsonObj['dice']!=6)){
                    graczEdit['pos'+jsonObj['pos']] = docs[0]['gracz'+jsonObj['num']]['pos'+jsonObj['pos']]
                  }
                  else if(graczEdit['pos'+jsonObj['pos']]>40){
                    graczEdit['pos'+jsonObj['pos']] -= 40
                  }
                  else if(docs[0]['gracz'+jsonObj['num']]['pos'+jsonObj['pos']]+jsonObj['dice']==21){
                    graczEdit['pos'+jsonObj['pos']] = 'bluebase'
                  }
                  else if(((docs[0]['gracz'+jsonObj['num']]['pos'+jsonObj['pos']]>15)&&(docs[0]['gracz'+jsonObj['num']]['pos'+jsonObj['pos']]<21))&&(docs[0]['gracz'+jsonObj['num']]['pos'+jsonObj['pos']]+jsonObj['dice'])>21){
                    graczEdit['pos'+jsonObj['pos']] = docs[0]['gracz'+jsonObj['num']]['pos'+jsonObj['pos']]
                  }

                db.update({ plansza: parseInt(jsonObj['board']) }, { $set: { gracz3: graczEdit} }, {}, function () {});
              }
              else if(jsonObj['num'] == 4){

                  if(docs[0]['gracz'+jsonObj['num']]['pos'+jsonObj['pos']] == 'y'+jsonObj['pos'] && (jsonObj['dice']==1 || jsonObj['dice']==6)){
                    graczEdit['pos'+jsonObj['pos']] = 31
                  }
                  else if(docs[0]['gracz'+jsonObj['num']]['pos'+jsonObj['pos']] == 'y'+jsonObj['pos'] && (jsonObj['dice']!=1 && jsonObj['dice']!=6)){
                    graczEdit['pos'+jsonObj['pos']] = docs[0]['gracz'+jsonObj['num']]['pos'+jsonObj['pos']]
                  }
                  else if(graczEdit['pos'+jsonObj['pos']]>40){
                    graczEdit['pos'+jsonObj['pos']] -= 40
                  }
                  else if(docs[0]['gracz'+jsonObj['num']]['pos'+jsonObj['pos']]+jsonObj['dice']==31){
                    graczEdit['pos'+jsonObj['pos']] = 'greenbase'
                  }
                  else if(((docs[0]['gracz'+jsonObj['num']]['pos'+jsonObj['pos']]>25)&&(docs[0]['gracz'+jsonObj['num']]['pos'+jsonObj['pos']]<31))&&(docs[0]['gracz'+jsonObj['num']]['pos'+jsonObj['pos']]+jsonObj['dice'])>31){
                    graczEdit['pos'+jsonObj['pos']] = docs[0]['gracz'+jsonObj['num']]['pos'+jsonObj['pos']]
                  }

                db.update({ plansza: parseInt(jsonObj['board']) }, { $set: { gracz4: graczEdit} }, {}, function () {});
              }
            }
                  res.writeHead(200, { 'content-type': 'application/json;charset=utf-8' }); // nagłówek
              res.end(JSON.stringify(graczEdit)); // odsyłamy dane do klienta w postaci stringa
            })
        })
    }
    if(req.url == "/Wygrana"){
      req.on("end", function wygrana () {
            var jsonObj = JSON.parse(allData); // parsowanie odebranych danych na json-a
        
            console.log(jsonObj);
          db.remove({ plansza: jsonObj['board'] }, {}, function (err, numRemoved) {});
          
          res.writeHead(200, { 'content-type': 'application/json;charset=utf-8' }); // nagłówek
          res.end(JSON.stringify(jsonObj['color']+'win')); // odsyłamy dane do klienta w postaci stringa
      })

    }

  

}
 

const server = http.createServer((req, res) => {

  switch (req.method) {
    case 'GET':
    // URI decode %20 -> spacja
      const request = decodeURI(req.url);

      // rozszerzenie pliku zawsze będzie ostatnim elementem nazwy po kropce
      const extention = request.split('.').pop();
      
      switch (extention) {
        case '/':
          fs.readFile('static/index.html', (error, data) => {
            if (error) return;
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data);
            res.end();
          });
          break;
      
        case 'css':
          fs.readFile('static' + request, (error, data) => {
            if (error) return;
            res.writeHead(200, { 'Content-Type': 'text/css' });
            res.write(data);
            res.end();
          });
          break;
          case 'js':
            fs.readFile('static' + request, (error, data) => {
              if (error) return;
              res.writeHead(200, { 'Content-Type': 'application/javascript' });
              res.write(data);
              res.end();
            });
            break;
            
      }


      break;

    case 'POST':
      console.log("URL: ", req.url)
      servResponse(req, res);

      break;
  }
});

server.listen(PORT, () => {
  console.log('serwer startuje na porcie ' + PORT);
});
