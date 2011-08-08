
beforeEach(function() {
  this.addMatchers({
  	// toKernNTimes: function(n) {
  	// 	var regString = '/((<span)+(.)*(margin\-right:)+(.)*){'+n+'}/ig'
  	// 	return (this.actual.match(new RegExp(regString)));
  	// }
  });

  $('body').append('<div id="test" />');
});
