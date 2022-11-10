const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

let Translator = require('../components/translator.js');

suite('Functional Tests', () => {

    test('Translation with text and locale fields: POST request to /api/translate', function(done) {
        chai.request(server).post('/api/translate')
        .send({text:'Play soccer.', locale:'american-to-british'})
        .end(function(err, res) {
            assert.equal(res.body.translation, 'Play <span class="highlight">football</span>.');
            done();
        });
    });

    test('Translation with text and invalid locale field: POST request to /api/translate', function(done) {
        chai.request(server).post('/api/translate')
        .send({text: 'test', locale: 'invalid'})
        .end(function(err, res) {
            assert.equal(res.body.error, 'Invalid value for locale field');
            done();
        });
    });

    test('Translation with missing text field: POST request to /api/translate', function(done) {
        chai.request(server).post('/api/translate')
        .send({locale: 'american-to-british'})
        .end(function(err, res) {
            assert.equal(res.body.error, 'Required field(s) missing');
            done();
        });
    });

    test('Translation with missing locale field: POST request to /api/translate', function(done) {
        chai.request(server).post('/api/translate')
        .send({text: 'test'})
        .end(function(err, res) {
            assert.equal(res.body.error, 'Required field(s) missing');
            done();
        });
    });

    test('Translation with empty text: POST request to /api/translate', function(done) {
        chai.request(server).post('/api/translate')
        .send({text: '', locale: 'british-to-american'})
        .end(function(err, res) {            
            assert.equal(res.body.error, 'No text to translate');
            done();
        });
    });

    test('Translation with text that needs no translation: POST request to /api/translate', function(done) {
        chai.request(server).post('/api/translate')
        .send({text:'Play soccer.', locale:'british-to-american'})
        .end(function(err, res) {
            assert.equal(res.body.translation, 'Everything looks good to me!');
            done();
        });
    });

});
