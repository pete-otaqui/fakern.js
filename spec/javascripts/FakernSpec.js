
describe("Fakern", function() {

  beforeEach(function() {
      
  });
  
  it("should kern AVTaT", function() {
      var test,
          html = '<span class="fakern" style="margin-right:-6.48">A</span>V<span class="fakern" style="margin-right:-3.84">T</span>aT';
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

  it("should kern italic", function() {
      var $ele = $('<p style="font-style:italic;">one, two</p>').appendTo('body');
      $ele.fakern();
      expect($ele.html()).toEqual('one, t<span class="fakern" style="margin-right:-0.48">w</span>o');
  });

});