'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {
  
  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      //console.log(translator.getMultipleBritishOnly());
      if(req.body.text == '') {
        res.json({ error: 'No text to translate' });        

      } else if(!req.body.text || !req.body.locale) {
        res.json({ error: 'Required field(s) missing' });
        

      } else if(!(req.body.locale == 'american-to-british' || req.body.locale == 'british-to-american')) {
        res.json({ error: 'Invalid value for locale field' });

      } else {
        let reqTextArray = req.body.text.match(/\S+/g);

        let lastChar = reqTextArray[reqTextArray.length-1].slice(-1);
        if(lastChar.match(/[.\?!]/)) {
          reqTextArray[reqTextArray.length-1] = reqTextArray[reqTextArray.length-1].slice(0, reqTextArray[reqTextArray.length-1].length -1);
      }

        let multipleAmerican = translator.getMultipleAmericanOnly();
        let multipleBritish = translator.getMultipleBritishOnly();

        /*

        //console.log('initial', reqTextArray);

        if(req.bodylocale == 'american-to-british') {
          // 2 words American
          reqTextArray = reqTextArray.map((e, index) => {
          if(multipleAmerican.includes(reqTextArray[index]+' '+reqTextArray[index+1])) {
            e = reqTextArray[index]+' '+reqTextArray[index+1];
            reqTextArray[index+1] = null;
          }
          return e;
        }).filter(e => e!= null);

        //console.log('2wA', reqTextArray);

        // 3 words American
        reqTextArray = reqTextArray.map((e, index) => {
          if(multipleAmerican.includes(reqTextArray[index]+' '+reqTextArray[index+1]+' '+reqTextArray[index+2])) {
            e = reqTextArray[index]+' '+reqTextArray[index+1]+' '+reqTextArray[index+2];
            reqTextArray[index+1] = null;
            reqTextArray[index+2] = null;
          }
          return e;
        }).filter(e => e!= null);

        //console.log('3wA', reqTextArray);
        } else if(req.body.locale == 'british-to-american') {
          // 2 words British
        reqTextArray = reqTextArray.map((e, index) => {
          if(multipleBritish.includes(reqTextArray[index]+' '+reqTextArray[index+1])) {
            e = reqTextArray[index]+' '+reqTextArray[index+1];
            reqTextArray[index+1] = null;
          }
          return e;
        }).filter(e => e!= null);

        //console.log('2wB', reqTextArray);

        // 3 words British
        reqTextArray = reqTextArray.map((e, index) => {
          if(multipleBritish.includes(reqTextArray[index]+' '+reqTextArray[index+1]+' '+reqTextArray[index+2])) {
            e = reqTextArray[index]+' '+reqTextArray[index+1]+' '+reqTextArray[index+2];
            reqTextArray[index+1] = null;
            reqTextArray[index+2] = null;
          }
          return e;
        }).filter(e => e!= null);

        //console.log('3wB', reqTextArray);
        } 

      */

        if(req.body.locale == 'american-to-british') {

          // 3 words American
        reqTextArray = reqTextArray.map((e, index) => {
          //console.log('db3: ', (reqTextArray[index]+' '+reqTextArray[index+1]+' '+reqTextArray[index+2]).toLowerCase());
          if(multipleAmerican.includes((reqTextArray[index]+' '+reqTextArray[index+1]+' '+reqTextArray[index+2]).toLowerCase())) {
            e = reqTextArray[index]+' '+reqTextArray[index+1]+' '+reqTextArray[index+2];
            reqTextArray[index+1] = null;
            reqTextArray[index+2] = null;
            e = e.toLowerCase();
            //console.log(e);
          }
          return e;
        }).filter(e => e!= null);

        //console.log('3wA', reqTextArray);


          // 2 words American
      reqTextArray = reqTextArray.map((e, index) => {
          //console.log('db2: ', (reqTextArray[index]+' '+reqTextArray[index+1]).toLowerCase());
          if(multipleAmerican.includes((reqTextArray[index]+' '+reqTextArray[index+1]).toLowerCase())) {
            e = reqTextArray[index]+' '+reqTextArray[index+1];
            reqTextArray[index+1] = null;
            e = e.toLowerCase();
            //console.log(e);
          }
          return e;
        }).filter(e => e!= null);

        //console.log('2wA', reqTextArray);

        
      } else if(req.body.locale == 'british-to-american') {

          // 3 words British
        reqTextArray = reqTextArray.map((e, index) => {
          //console.log('db3: ', (reqTextArray[index]+' '+reqTextArray[index+1]+' '+reqTextArray[index+2]).toLowerCase());
          if(multipleBritish.includes((reqTextArray[index]+' '+reqTextArray[index+1]+' '+reqTextArray[index+2]).toLowerCase())) {
            e = reqTextArray[index]+' '+reqTextArray[index+1]+' '+reqTextArray[index+2];
            reqTextArray[index+1] = null;
            reqTextArray[index+2] = null;
            e = e.toLowerCase();
            //console.log(e);
          }
          return e;
        }).filter(e => e!= null);

        //console.log('3wB', reqTextArray);
          // 2 words British
      reqTextArray = reqTextArray.map((e, index) => {
          //console.log('db2: ', (reqTextArray[index]+' '+reqTextArray[index+1]).toLowerCase());
          if(multipleBritish.includes((reqTextArray[index]+' '+reqTextArray[index+1]).toLowerCase())) {
            e = reqTextArray[index]+' '+reqTextArray[index+1];
            reqTextArray[index+1] = null;
            e = e.toLowerCase();
            //console.log(e);
          }
          return e;
        }).filter(e => e!= null);

        //console.log('2wB', reqTextArray);

        
      } else {

      }  
        

        
        let wordsArray = reqTextArray.map( (e, index) => {
          /*let lastChar = '';
          if(index == reqTextArray.length -1) {
            lastChar = e[e.length - 1].match(/[.,!?;]/) || '';
          if(e[e.length - 1].match(/[.,!?;]/)) {
            e = e.slice(0,e.length - 1);
          }
          }*/
          
          if(translator.translationNeeded(e, req.body.locale)) {
            return e = translator.translate(e, req.body.locale) /*+ lastChar*/;
          }
          return e /*+ lastChar*/;
        });
        //console.log('1: ', reqTextArray,' 2: ', wordsArray);
        
        if(lastChar.match(/[.\?!]/)) {
          wordsArray[wordsArray.length -1] = wordsArray[wordsArray.length -1] + lastChar;
          reqTextArray[reqTextArray.length -1] = reqTextArray[reqTextArray.length -1] + lastChar;
      }
        
        //console.log('reqText: ', reqTextArray, 'w: ', wordsArray)

        if(JSON.stringify(reqTextArray) == JSON.stringify(wordsArray)) {
          res.json({text: req.body.text, translation: 'Everything looks good to me!'});
        } else {
          res.json({text: req.body.text, translation: wordsArray.join(' ')});
        }
        
      }
      
      
    });
};
