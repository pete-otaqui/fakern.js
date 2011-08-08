/*
 *   The Fakern plugin will apply kerning values on specific letter combinations.
 *   The values for the pairs were taken from a sample list from the adobe site
 *   http://partners.adobe.com/public/developer/opentype/index_kerning1.html
 *   The plugin will respect the element's font size regardless of its unit. Hence the kerning itself is unitless.
 *   The project is sponsored by Mangahigh.com
 *   
 *   @example
 *   $('body').fakern({ 
 *       include : { 
 *           '@' : [ ['a',-10], ['b',-20] ],
 *           '$' : [ ['a',-10], ['b',-20] ] 
 *       },
 *       
 *       exclude : {
 *           a : true,
 *           B : ['a','b','C'] 
 *       }
 *   });
 *  
 *   @author <a href="http://lcampanis.com" target="_blank">Lorenzo Campanis</a>
 *   @author <a href="http://otaqui.com" target="_blank">Pete Otaqui</a>, 
 */
(function($) {
    
    /*
     *  @param {Object} [opts] Additional options
     *  @param {Object} [opts.include] A list of multidimentional arrays with additional letter combinations. 
     *  @param {Object} [opts.exclude] A list of multidimentional arrays with letter combinations to be excluded or set some letters to true to exclude all letter combinations
     */
    $.fn.fakern = function(opts) {
        var pairs = {
            A : [['y', -92],
                 ['w', -92],
                 ['v', -74],
                 ['’', -111],
                 ['Y', -105],
                 ['W', -90],
                 ['V', -135],
                 ['U', -55],
                 ['T', -111],
                 ['Q', -55],
                 ['O', -55],
                 ['G', -40],
                 ['C', -40]],

            B : [['U', -10],
                 ['A', -35]],

            D : [['Y', -55],
                 ['W', -30],
                 ['V', -40],
                 ['A', -40]],

            F : [['.', -80],
                 ['o', -15],
                 [',', -80],
                 ['a', -15],
                 ['A', -74]],

            J : [['A', -60]],

            K : [['y', -25],
                 ['u', -15],
                 ['o', -35],
                 ['e', -25],
                 ['O', -30]],

            L : [['y', -55],
                 ['’', -92],
                 ['Y', -100],
                 ['W', -74],
                 ['V', -100],
                 ['T', -92]],

            N : [['A', -35]],

            O : [['Y', -50],
                 ['X', -40],
                 ['W', -35],
                 ['V', -50],
                 ['T', -40],
                 ['A', -35]],

            P : [['.', -111],
                 [',', -111],
                 ['a', -15],
                 ['A', -92]],

            Q : [['U', -10]],

            R : [['Y', -65],
                 ['W', -55],
                 ['V', -80],
                 ['U', -40],
                 ['T', -60],
                 ['O', -40]],

            T : [['y', -80],
                 ['w', -80],
                 ['u', -45],
                 [';', -55],
                 ['r', -35],
                 ['.', -74],
                 ['o', -80],
                 ['i', -35],
                 ['‐', -92],
                 ['e', -70],
                 [',', -74],
                 [':', -50],
                 ['a', -80],
                 ['O', -18],
                 ['A', -93]],

            U : [['A', -40]],

            V : [['u', -75],
                 [';', -74],
                 ['.', -129],
                 ['o', -129],
                 ['i', -60],
                 ['‐', -100],
                 ['e', -111],
                 [',', -129],
                 [':', -74],
                 ['a', -111],
                 ['O', -40],
                 ['G', -15],
                 ['A', -135]],

            W : [['y', -73],
                 ['u', -50],
                 [';', -37],
                 ['.', -92],
                 ['o', -80],
                 ['i', -40],
                 ['‐', -65],
                 ['e', -80],
                 [',', -92],
                 [':', -37],
                 ['a', -80],
                 ['O', -10],
                 ['A', -120]],

            Y : [['u', -111],
                 [';', -92],
                 ['.', -129],
                 ['o', -110],
                 ['i', -55],
                 ['‐', -111],
                 ['e', -100],
                 [',', -129],
                 [':', -92],
                 ['a', -100],
                 ['O', -30],
                 ['A', -120]],

            a : [['w', -15],
                 ['v', -20]],

            b : [['v', -15],
                 ['u', -20],
                 ['.', -40]],

            c : [['y', -15]],

            ',': [['’', -70]
                  ['”', -70]],

            e : [['y', -15],
                 ['x', -15],
                 ['w', -25],
                 ['v', -25],
                 ['g', -15]],

            f : [['’', 55],
                 ['i', -20],
                 ['f', -25],
                 ['ı', -50],
                 ['a', -10]],

            g : [['a', -5]],

            h : [['y', -5]],

            i : [['v', -25]],

            k : [['y', -15],
                 ['o', -10],
                 ['e', -10]],

            l : [['w', -10]],

            n : [['y', -15],
                 ['v', -40]],

            o : [['y', -10],
                 ['w', -25],
                 ['v', -15]],

            p : [['y', -10]],

            '.':[['’', -70],
                 ['”', -70]],

            '“':[['A', -80]],


            '‘':[['‘', -74],
                 ['A', -80]],

            '’':[['v', -50],
                 ['t', -18],
                 [' ', -74],
                 ['s', -55],
                 ['r', -50],
                 ['’', -74],
                 ['l', -10],
                 ['d', -50]],

            r : [['.', -55],
                 ['‐', -20],
                 ['g', -18],
                 [',', -40]],


            ' ':[['Y', -90],
                 ['W', -30],
                 ['V', -50],
                 ['T', -18],
                 ['A', -55]],

            v : [['.', -65],
                 ['o', -20],
                 ['e', -15],
                 [',', -65],
                 ['a', -25]],

            w : [['.', -65],
                 ['o', -10],
                 [',', -65],
                 ['a', -10]],

            x : [['e', -15]],

            y : [['.', -65],
                 [',', -65]]
        },

        /*
         *   Searches for a value inside a multiple array
         *   @function 
         *   @private
         *   @param {number|string} val The needle
         *   @param {array} ar The haystack
         *   @param {boolean} [strict=false] Strict type comparison
         *   @returns {boolean|array} Boolean if value is not present | The last array in the hierarchy that the value was present in
         */
        _inMultiArray = function(val, ar, strict) {
            if(!ar) {
                return false;
            }

            var ret = [];
            strict = strict || false;
            
            for(var i=0; i<ar.length; ++i) {                
                if( (strict && ar[i] === val) ||
                    (!strict && ar[i] == val)) {
                    return ar;
                }
                else {
                    if($.isArray( ar[i] )) {
                        if(ret = _inMultiArray(val, ar[i], strict)) {
                            return ret;
                        }
                    }
                    else {
                        return false;               
                    }
                }
            }            
        },

        /*
         *   Checks if a letter should be excluded. If next isn't available, then all letter combinations for that letter will be excluded
         *   @function
         *   @private
         *   @param {char} letter The letter to check for exclusion
         *   @param {char} [next=-1] The next letter to kern with
         *   @returns {boolean} True is the letter is to be excluded
         */
        _isExcluded = function(letter, next) {
            var obj = opts.exclude,
                next = next || -1;

            if(obj.hasOwnProperty(letter)) {
                if(obj[letter] === true || $.inArray(next, obj[letter]) !== -1) {
                    return true;
                }
            }

            return false;
        },
               
        /*
         *   Checks if two letters should be kerned
         *   @function 
         *   @private
         *   @param {string} l The letter on the left, which should be kerned
         *   @param {string} r The letter on the right. If present, the letter on the left will be kerned
         *   @returns {boolean|array} Boolean if the letter should not be kerned | The array with the letter/value combination
         */
        _shouldKern = function(l, r) {
            var ret = _inMultiArray(r, pairs[l]);

            if ( !pairs[l] || _isExcluded(l, r) || ret === false )  {
                return false;
            }

            return ret;
        };

        opts = $.extend({
            exclude : {},
            include : {}
        }, opts);        

        pairs = $.extend(pairs, opts.include);

        return this.each(function() {
            var $ele = $(this),
                text = $ele.text(),
                ltrs = text.split(''),
                strn = '',
                len = ltrs.length,
                fontSize = parseInt($ele.css('fontSize'), 10);
            
            $(ltrs).each(function(idx, ltr) {
                var cur = ltr,
                    nxt = ltrs[idx+1],
                    kern;

                if ( idx < len-1) {                    
                    if (kern = _shouldKern(ltr, nxt)) {
                        cur = '<span class="fakern" style="margin-right:'+((kern[1])/1000*fontSize)+'">'+cur+'</span>';
                    }
                }

                strn += cur;
            });
            $ele.html(strn);
        });
    };  
    
})(jQuery);
