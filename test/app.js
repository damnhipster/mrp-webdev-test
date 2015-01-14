require('./testHelper')
var Browser = require("zombie");
var expect = require("chai").expect;

// Gave up with tests, couldn't be asked to figure out zombie's/browser's wait function...

describe('Shop', function() {

  before(function(done) {
    browser = new Browser({ site: 'http://localhost:9536' });
    var listLoaded = function(window) {
      window.document.querySelector('ul');
    };
    browser.visit('/')
      .then(function() {
        browser.wait(listLoaded, done);
      });
  });

  it("should load the page", function() {
    expect(browser.success).to.equal(true);
    expect(browser.text('h1')).to.include('Mr. Porters\' Shop');
  });

  it("should display the product name", function() {
    expect(browser.text('li')).to.include('Roadmaster Waxed-Cotton Jacket');
  });

});
