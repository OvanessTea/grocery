import chai from 'chai';
import { healthCheckSync, healthCheckAsync }  from '../controllers/healthController';
const expect = chai.expect;

describe('Test /health', () => {
    /**
     * Uncomment below to see hooks in action
     */
    // before('before', () => {
    //   console.log('Ran before all the test suites');
    // });
  
    // after('after', () => {
    //   console.log('Ran after all the test suites');
    // });
  
    // beforeEach('beforeEach', () => {
    //   console.log('Ran before EACH test suite');
    // });
  
    // afterEach('afterEach', () => {
    //   console.log('Ran after EACH test suite');
    // });
  
    describe('Health check on /sync', () => {
      it('health should be okay', () => {
        const actualResult = healthCheckSync();
        expect(actualResult).to.equal('OK');
      });
    });
  
    describe('Health check on /async', () => {
      it('health should be okay', async () => {
        const actualResult = await healthCheckAsync();
        expect(actualResult).to.equal('OK');
      });
    });
  });