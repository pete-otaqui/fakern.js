
describe("Fakern", function() {

  beforeEach(function() {
      
  });
  
  it("should kern AVTaT", function() {
      var test,
          html = '<span class="fakern">A</span>V<span class="fakern">T</span><span class="fakern">a</span>T';
      $('<p class="UNFAKED">AVTaT</p>').appendTo('body');
      test = $('<p class="FAKED">AVTaT</p>').appendTo('body').fakern();
      expect(test.html()).toEqual(html);
      
  });
  
  it("should kern everything", function() {
      var all = 'avTAWghpq',
          str = '',
          arr = all.split('');
      $(arr).each(function(idx1, ltr1) {
          $(arr).each(function(idx2, ltr2) {
              if ( idx1 === idx2 ) return;
              str += ltr1+ltr2 + ', ';
          });
      });
      $('<p class="FAKED">'+str+'</p>').appendTo('body').fakern();
      $('<p class="UNFAKED">'+str+'</p>').appendTo('body');
  });

});