function custom() {
    console = console || {};
    if (console.watch) {
        return;
    }
	//append console.watch!
    console.watch = function (obj, prop) {
		if(prop){
			return doWatch(obj,prop);
		}
		//else watch the whole object.
		if(isProcessed(obj)){
			return;
		}
		//recursively traverse the object
		for(var p in obj){
			if(!obj.hasOwnProperty(p)){
				return;
			}
			if(isObject(obj[p])){
				this.watch(obj[p]);
			}
			doWatch(obj,p);
		}
		//for marking if the object has been traversed
		markProcessed(obj);
    };
	
	var MARK_KEY="!@#$%^&*()MARK_KEY";
	function isProcessed(obj){
		return MARK_KEY in obj;
	}
	function markProcessed(obj){
		obj[MARK_KEY]=true;
	}
	function isObject(b){
		return typeof b === 'object' && isNaN(b.length);
	}
	function doWatch(obj,prop){
		//wish no conflict!
        var privateProp = encode(prop);
        obj[privateProp] = obj[prop];
        Object.defineProperty(obj, prop, {
            get: function () {
                return obj[privateProp];
            },
            set: function (value) {
                debugger
                obj[privateProp] = value;
            }
        });
	}
	function encode(prop){
		return "!@#" + prop + "!@#";
	}

}

/**
	inject my javascript into DOM
**/
function appendMyFunction(func) {
    var script = document.createElement("script");
    var code = document.createTextNode('(' + func + ')();');
    script.appendChild(code);
    (document.body || document.head || document.documentElement).appendChild(script);
}

appendMyFunction(custom);
