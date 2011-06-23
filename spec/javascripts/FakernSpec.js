
describe("Fakern", function() {

  beforeEach(function() {
      
  });
  
  it("should kern VA", function() {
      var test = $('<p class="fakern">VA</p>').appendTo('body');
      Fakern.kern(test[0]);
  })

});