// BaitulMamur-Backend/test/server.test.js
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server'); // Import the Express app instance
const expect = chai.expect;

console.log('Type of chaiHttp:', typeof chaiHttp); // Debugging line
chai.use(chaiHttp);

describe('Server Basic Test', () => {
  it('should return a welcome message on GET /', (done) => {
    chai.request(app) // Use 'app' here
      .get('/')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.text).to.include('BaitulMamur Backend is running!');
        done();
      });
  });
});
