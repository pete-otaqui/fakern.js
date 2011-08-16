
describe("Fakern", function() {
    var pairs = {
        'A': [['b', -10]],
        ',': [['W', -60], ['F',-100]]
      },

      opts = {
        pairs: pairs
      };
  

  beforeEach(function() {
     $('#test').html('');
      this.addMatchers({
        toKernNTimes: function(n) {
         var regString = '(<span+(.)*margin\\-right:+(.)*){'+n+'}',
             regex = new RegExp(regString, 'ig'),
             matches = this.actual.match(regex);

         return matches;
        }
      });
  });
  
  it("Should use default kerning pairs", function() {
    // no opts - use defaults!
    $('#test').html('AV').fakern(); 
    expect( $('#test').html() ).toContain('margin-right: -1.62');

    $('#test').html('wo').fakern(); 
    expect( $('#test').html() ).toContain('margin-right: -0.1');

    $('#test').html('rg').fakern(); 
    expect( $('#test').html() ).toContain('margin-right: -0.216');

    $('#test').html(' A').fakern(); 
    expect( $('#test').html() ).toContain('margin-right: -0.66');
  });

  it("Should overide kerning pairs", function() {
    // no opts - use defaults!
    $('#test').html('Ab').fakern(opts); 
    expect( $('#test').html() ).toContain('span');

    $('#test').html(',F').fakern(opts); 
    expect( $('#test').html() ).toContain('margin-right: -1.2');

    $('#test').html(',W').fakern(opts); 
    expect( $('#test').html() ).toContain('margin-right: -0.72');

    $('#test').html('AV').fakern(opts); 
    expect( $('#test').html() ).toEqual('AV');
  });

  it("Should kern letters", function() {
    // we expect 5 kerned spans with 5 margin-right values
    $('#test').html('AV Argav').fakern(); 
    expect( $('#test').html() ).toKernNTimes(5);
  });

  it("Should kern punctuation", function() {
    $('#test').html('“A’F.').fakern(); 
    expect( $('#test').html() ).toKernNTimes(3);
  });

  it("Should be able to add characters to include", function() {
    var include = {
      '@' : [ ['V',-30], ['W',-25] ],
      '£' : [ ['O',-30] ]
    },
    opts = {
      include : include
    };

    $('#test').html('@V@W£O').fakern(opts);
    
    expect( $('#test').html() ).toKernNTimes(3);

  });

  it("Should be able to exclude whole character sets", function() {
    var exclude = {
      A : true,
      V : true
    },
    opts = {
      exclude : exclude
    };

    $('#test').html('AVVuVA’').fakern(opts);

    expect( $('#test').html() ).toNotContain('span'); 
  });

  it("Should be able to exclude individual character pairs", function() {
    var exclude = {
      A : [ ['y','v','w'] ],
      V : [ ['A'] ]
    },
    opts = {
      exclude : exclude
    };

    // should only kern the A with the ’ apostrophe
    $('#test').html('A’AyAvAwVA').fakern(opts);

    var reg = new RegExp(/((<span)+(.)*(margin\-right:)+(.)*(>A<\/span>)){1}/ig);

    expect( $('#test').html() ).toMatch(reg); 
  });

  it("Should kern regardless of the font size or unit", function() {
    // different font-sizes to test
    var fontSizes = ['10px', '25px', '62.5%', '500%', '1200%'];

    for(var i=0; i<fontSizes.length; ++i) {
      var div = $('#test').append('<div style="font-size:'+ fontSizes[ i ] +'">AVVA</div>');

      $('#test div:last').html('A’AyAvAwVAV<span>V</span>V').fakern();
      
      var html = $('#test div:last').html();
      
	  expect( $('#test').html() ).toKernNTimes(5);
    }    

  });

  it("Should preserve events after kerning", function() {
      window.TESTVALUE = false;
      $('#test').html('<span id="clicker" onclick="window.TESTVALUE=true">V</span>A').fakern();
      $('#clicker').trigger('click');
      expect(window.TESTVALUE).toBeTruthy();
  });

  it("Should kern elements with inline display only, with a multiple line structure, while supporting existing HTML tags", function() {
  	var htmlString = '<span class="1">A</span>V<span class="1-2">AV</span><div id="one">A<span class="2">V</span><div>A<p class="inline">V</p><span id="two"><span>A</span></span></div></div><div class="inline">V</div><div class="inline">A</div></div>',
	
    html = $('#test').html(htmlString).fakern();

  	expect( $('#test').html() ).toKernNTimes(7);
  });
    
    

});


