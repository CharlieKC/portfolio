const request = require('supertest');
const app = require('../app.js');

describe('GET /', function() {
  it('Expect response: hello world', function(done){

    //navigate to root and check the response is 'Charliekc site'
    request(app).get('/').expect('hello world', done);
  });
});

describe('GET /pet-classifier', function(){
  it("Expect page title <h1> to be: 'Pet Classifier'", function(done){
    request(app).get('/pet-classifier')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(done)
  });

  // it("Expect page body to have an image upload button");
  // it("Expect page body to have 'classify' button");
  // it("Expect redirect to /pet-classifier/result");
  // it("Expect page to contain a dog breed or cat breed");
});
