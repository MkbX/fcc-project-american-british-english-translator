const { findConfigUpwards } = require('@babel/core/lib/config/files/index.js');
const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');
let translator = new Translator();

function unitTranslation(str, locale) {

    let reqTextArray = str.match(/\S+/g);
    //console.log('req1: ', reqTextArray);
    let lastChar = reqTextArray[reqTextArray.length-1].slice(-1);
    //console.log('lastChar: ', lastChar);
    //console.log('req2: ', reqTextArray);
    if(lastChar.match(/[.\?!]/)) {
        reqTextArray[reqTextArray.length-1] = reqTextArray[reqTextArray.length-1].slice(0, reqTextArray[reqTextArray.length-1].length -1);
    }
    //console.log('req3: ', reqTextArray);
        let multipleAmerican = translator.getMultipleAmericanOnly();
        let multipleBritish = translator.getMultipleBritishOnly();

        //console.log('initial', reqTextArray);
        if(locale == 'american-to-british') {

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
  
          
        } else if(locale == 'british-to-american') {

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
          
          if(translator.translationNeeded(e, locale)) {
            return e = translator.translate(e, locale) /*+ lastChar*/;
          }
          return e /*+ lastChar*/;
        });

        wordsArray[wordsArray.length -1] = wordsArray[wordsArray.length -1] + lastChar;
        
        if(JSON.stringify(reqTextArray) == JSON.stringify(wordsArray)) {
          return ({text: str, translation: 'Everything looks good to me!'});
        } else {
          return ({text: str, translation: wordsArray.join(' ')});
        }
}

suite('Unit Tests', () => {

    test('Translate Mangoes are my favorite fruit. to British English', function() {
        assert.equal(unitTranslation('Mangoes are my favorite fruit.','american-to-british').translation,'Mangoes are my <span class="highlight">favourite</span> fruit.');
    });
    test('Translate I ate yogurt for breakfast. to British English', function() {
        assert.equal(unitTranslation('I ate yogurt for breakfast.','american-to-british').translation,'I ate <span class="highlight">yoghurt</span> for breakfast.');
    });
    test("Translate We had a party at my friend's condo. to British English", function() {
        assert.equal(unitTranslation("We had a party at my friend's condo.",'american-to-british').translation,'We had a party at my friend\'s <span class="highlight">flat</span>.');
    });
    test('Translate Can you toss this in the trashcan for me? to British English', function() {
        assert.equal(unitTranslation('Can you toss this in the trashcan for me?','american-to-british').translation,'Can you toss this in the <span class="highlight">bin</span> for me?');
    });
    test('Translate The parking lot was full. to British English', function() {
        assert.equal(unitTranslation('The parking lot was full.','american-to-british').translation,'The <span class="highlight">car park</span> was full.');
    });
    test('Translate Like a high tech Rube Goldberg machine. to British English', function() {
        assert.equal(unitTranslation('Like a high tech Rube Goldberg machine.','american-to-british').translation,'Like a high tech <span class="highlight">Heath Robinson device</span>.');
    });
    test('Translate To play hooky means to skip class or work. to British English', function() {
        assert.equal(unitTranslation('To play hooky means to skip class or work.','american-to-british').translation,'To <span class="highlight">bunk off</span> means to skip class or work.');
    });
    test('Translate No Mr. Bond, I expect you to die. to British English', function() {
        assert.equal(unitTranslation('No Mr. Bond, I expect you to die.','american-to-british').translation,'No <span class="highlight">Mr</span> Bond, I expect you to die.');
    });
    test('Translate Dr. Grosh will see you now. to British English', function() {
        assert.equal(unitTranslation('Dr. Grosh will see you now.','american-to-british').translation,'<span class="highlight">Dr</span> Grosh will see you now.');
    });
    test('Translate Lunch is at 12:15 today. to British English', function() {
        assert.equal(unitTranslation('Lunch is at 12:15 today.','american-to-british').translation,'Lunch is at <span class="highlight">12.15</span> today.');
    });
    test('Translate We watched the footie match for a while. to American English', function() {
        assert.equal(unitTranslation('We watched the footie match for a while.','british-to-american').translation,'We watched the <span class="highlight">soccer</span> match for a while.');
    });
    test('Translate Paracetamol takes up to an hour to work. to American English', function() {
        assert.equal(unitTranslation('Paracetamol takes up to an hour to work.','british-to-american').translation,'<span class="highlight">Tylenol</span> takes up to an hour to work.');
    });
    test('Translate First, caramelise the onions. to American English', function() {
        assert.equal(unitTranslation('First, caramelise the onions.','british-to-american').translation,'First, <span class="highlight">caramelize</span> the onions.');
    });
    test('Translate I spent the bank holiday at the funfair. to American English', function() {
        assert.equal(unitTranslation('I spent the bank holiday at the funfair.','british-to-american').translation,'I spent the <span class="highlight">public holiday</span> at the <span class="highlight">carnival</span>.');
    });
    test('Translate I had a bicky then went to the chippy. to American English', function() {
        assert.equal(unitTranslation('I had a bicky then went to the chippy.','british-to-american').translation,'I had a <span class="highlight">cookie</span> then went to the <span class="highlight">fish-and-chip shop</span>.');
    });
    test("Translate I've just got bits and bobs in my bum bag. to American English", function() {
        assert.equal(unitTranslation('I\'ve just got bits and bobs in my bum bag.','british-to-american').translation, 'I\'ve just got <span class="highlight">odds and ends</span> in my <span class="highlight">fanny pack</span>.');
    });
    test('Translate The car boot sale at Boxted Airfield was called off. to American English', function() {
        assert.equal(unitTranslation('The car boot sale at Boxted Airfield was called off.','british-to-american').translation,'The <span class="highlight">swap meet</span> at Boxted Airfield was called off.');
    });
    test('Translate Have you met Mrs Kalyani? to American English', function() {
        assert.equal(unitTranslation('Have you met Mrs Kalyani?','british-to-american').translation,'Have you met <span class="highlight">Mrs.</span> Kalyani?');
    });
    test("Translate Prof Joyner of King's College, London. to American English", function() {
        assert.equal(unitTranslation('Prof Joyner of King\'s College, London.','british-to-american').translation,'<span class="highlight">Prof.</span> Joyner of King\'s College, London.');
    });
    test('Translate Tea time is usually around 4 or 4.30. to American English', function() {
        assert.equal(unitTranslation('Tea time is usually around 4 or 4.30.','british-to-american').translation,'Tea time is usually around 4 or <span class="highlight">4:30</span>.');
    });
    test('Highlight translation in Mangoes are my favorite fruit.', function() {
        assert.equal(unitTranslation('Mangoes are my favorite fruit.','american-to-british').translation.slice(15),'<span class="highlight">favourite</span> fruit.');
    });
    test('Highlight translation in I ate yogurt for breakfast.', function() {
        assert.equal(unitTranslation('I ate yogurt for breakfast.','american-to-british').translation.slice(6),'<span class="highlight">yoghurt</span> for breakfast.');
    });
    test('Highlight translation in We watched the footie match for a while.', function() {
        assert.equal(unitTranslation('We watched the footie match for a while.','british-to-american').translation.slice(15),'<span class="highlight">soccer</span> match for a while.');
    });
    test('Highlight translation in Paracetamol takes up to an hour to work.', function() {
        assert.equal(unitTranslation('Paracetamol takes up to an hour to work.','british-to-american').translation.slice(0,38),'<span class="highlight">Tylenol</span>');
    });

});
