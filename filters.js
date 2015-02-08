/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2014-12-20 11:48:37
 * @version $Id$
 */

var filters = {
	grayscale : function(src){
		return src.map( function(data, idx) {
            var lev  = Math.round(data[idx] * 0.299 + data[idx+1] * 0.587 + data[idx+2] * 0.114);
            data[idx] = data[idx+1] = data[idx+2] = lev;
		});
	}
};