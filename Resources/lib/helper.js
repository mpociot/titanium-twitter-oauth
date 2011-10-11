/**
 * All needed helper functions
 * These functions where taken from phpjs.org
 * 
 */
function Helper(){
	
	this.timestamp	= function(){
	    return Math.floor(+new Date()/1000);
	};
	
	this.combine		= function(/*Object*/ target, /*Object*/ source){
		var name, s, i;
		for(name in source){
			s = source[name];
			if(!(name in target) || (target[name] !== s && (!(name in empty) || empty[name] !== s))){
				target[name] = s;
			}
		}
		return target; // Object
	};
	
	/**
	 * sort object
	 */
	this.sortObject	= function(o){
	    var sorted = {},
	    key, a = [];
	
	    for (key in o) {
	        if (o.hasOwnProperty(key)) {
	                a.push(key);
	        }
	    }
	
	    a.sort();
	
	    for (key = 0; key < a.length; key++) {
	        sorted[a[key]] = o[a[key]];
	    }
	    return sorted;
	};
	/**
	 * PHPs parse_str function
	 */
	this.parse_str = function(str, array) {
	    var glue1 = '=',
	        glue2 = '&',
	        array2 = String(str).replace(/^&?([\s\S]*?)&?$/, '$1').split(glue2),
	        i, j, chr, tmp, key, value, bracket, keys, evalStr, that = this,
	        fixStr = function (str) {
	            return that.urldecode(str).replace(/([\\"'])/g, '\\$1').replace(/\n/g, '\\n').replace(/\r/g, '\\r');
	        };
	
	    if (!array) {
	        array = this.window;
	    }
	
	    for (i = 0; i < array2.length; i++) {
	        tmp = array2[i].split(glue1);
	        if (tmp.length < 2) {
	            tmp = [tmp, ''];
	        }
	        key = fixStr(tmp[0]);
	        value = fixStr(tmp[1]);
	        while (key.charAt(0) === ' ') {
	            key = key.substr(1);
	        }
	        if (key.indexOf('\0') !== -1) {
	            key = key.substr(0, key.indexOf('\0'));
	        }
	        if (key && key.charAt(0) !== '[') {
	            keys = [];
	            bracket = 0;
	            for (j = 0; j < key.length; j++) {
	                if (key.charAt(j) === '[' && !bracket) {
	                    bracket = j + 1;
	                } else if (key.charAt(j) === ']') {
	                    if (bracket) {
	                        if (!keys.length) {
	                            keys.push(key.substr(0, bracket - 1));
	                        }
	                        keys.push(key.substr(bracket, j - bracket));
	                        bracket = 0;
	                        if (key.charAt(j + 1) !== '[') {
	                            break;
	                        }
	                    }
	                }
	            }
	            if (!keys.length) {
	                keys = [key];
	            }
	            for (j = 0; j < keys[0].length; j++) {
	                chr = keys[0].charAt(j);
	                if (chr === ' ' || chr === '.' || chr === '[') {
	                    keys[0] = keys[0].substr(0, j) + '_' + keys[0].substr(j + 1);
	                }
	                if (chr === '[') {
	                    break;
	                }
	            }
	            evalStr = 'array';
	            for (j = 0; j < keys.length; j++) {
	                key = keys[j];
	                if ((key !== '' && key !== ' ') || j === 0) {
	                    key = "'" + key + "'";
	                } else {
	                    key = eval(evalStr + '.push([]);') - 1;
	                }
	                evalStr += '[' + key + ']';
	                if (j !== keys.length - 1 && eval('typeof ' + evalStr) === 'undefined') {
	                    eval(evalStr + ' = [];');
	                }
	            }
	            evalStr += " = '" + value + "';\n";
	            eval(evalStr);
	        }
	    }
	};
	this.urldecode =function(str) {
	    return decodeURIComponent((str + '').replace(/\+/g, '%20'));
	};
	this.urlencode = function(str) {
	    str = (str + '').toString();
	
	    // Tilde should be allowed unescaped in future versions of PHP (as reflected below), but if you want to reflect current
	    // PHP behavior, you would need to add ".replace(/~/g, '%7E');" to the following.
	    return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').
	    replace(/\)/g, '%29').replace(/\*/g, '%2A').replace(/%20/g, '+');
	};
	
};

exports.helper	= Helper;