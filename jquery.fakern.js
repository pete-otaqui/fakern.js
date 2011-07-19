


(function($) {
    var fonts = {
        // [ [TopLeft, Left, BottomLeft] , [TopRight, Right, BottomRight] ] 
        arial: {
            'a': ['T', 'V', 'W', 'Y'],
            'b': ['T', 'V', 'W', 'Y'],
            'c': ['T', 'V', 'W', 'Y'],
            'd': ['T', 'V', 'W', 'Y'],
            'e': ['T', 'V', 'W', 'Y'],
            'f': ['T', 'V', 'W', 'Y'],
            'g': ['T', 'V', 'W', 'Y'],
            'h': ['T', 'V', 'W', 'Y'],
            'i': ['T', 'V', 'W', 'Y'],
            'j': ['T', 'V', 'W', 'Y'],
            'k': ['T', 'V', 'W', 'Y'],
            'l': ['T', 'V', 'W', 'Y'],
            'm': ['T', 'V', 'W', 'Y'],
            'n': ['T', 'V', 'W', 'Y'],
            'o': ['T', 'V', 'W', 'Y'],
            'p': ['T', 'V', 'W', 'Y'],
            'q': ['T', 'V', 'W', 'Y'],
            'r': ['T', 'V', 'W', 'Y'],
            's': ['T', 'V', 'W', 'Y'],
            't': ['T', 'V', 'W', 'Y'],
            'u': ['T', 'V', 'W', 'Y'],
            'v': ['A', 'T'],
            'w': ['A', 'T'],
            'x': ['T', 'V', 'W', 'Y'],
            'y': ['T', 'V', 'W', 'Y'],
            'z': ['T', 'V', 'W', 'Y'],
            'A': ['T', 'V', 'W', 'Y', 'v'],
            'T': ['a', 'b', 'c', 'd', 'e', 'g', 'm', 'n', 'o', 'p', 'q', 'r', 's', 'u', 'v', 'w', 'x', 'y', 'z', 'A'],
            'V': ['a', 'b', 'c', 'd', 'e', 'g', 'm', 'n', 'o', 'p', 'q', 'r', 's', 'u', 'v', 'w', 'x', 'y', 'z', 'A'],
            'W': ['a', 'b', 'c', 'd', 'e', 'g', 'm', 'n', 'o', 'p', 'q', 'r', 's', 'u', 'x', 'y', 'z', 'A'],
            'Y': ['a', 'b', 'c', 'd', 'e', 'g', 'm', 'n', 'o', 'p', 'q', 'r', 's', 'u', 'v', 'w', 'x', 'y', 'z', 'A']
        }
    };
    
    
    
    $.fn.fakern = function(opts) {
        var font,
            shouldKern = function(l, r) {
                if ( !font[l] ) return false;
                if ( font[l].indexOf(r) === -1 ) return false;
                return true;
            };
        opts = $.extend({}, {font:'arial'}, opts);
        font = fonts[opts.font];
        return this.each(function() {
            var $ele = $(this),
                text = $ele.text(),
                ltrs = text.split(''),
                strn = '',
                len = ltrs.length;
                $(ltrs).each(function(idx, ltr) {
                    var cur = ltr,
                        nxt = ltrs[idx+1],
                        krnLeft, krnRight, cTop, cMid, cBot;
                    console.group(ltr+', '+nxt);
                    if ( idx < len-1 ) {
                        if ( shouldKern(ltr, nxt) ) {
                            cur = '<span class="fakern">'+cur+'</span>';
                        }
                    }
                    console.groupEnd(ltr+', '+nxt);
                    strn += cur;
                });
                $ele.html(strn);
        });
    };  
    
})(jQuery);
