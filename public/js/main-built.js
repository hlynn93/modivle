/**
 * @license RequireJS text 1.0.2 Copyright (c) 2010-2011, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/requirejs for details
 */
((function(){function A(a,b,c){if(a===b)return a!==0||1/a==1/b;if(a==null||b==null)return a===b;a._chain&&(a=a._wrapped),b._chain&&(b=b._wrapped);if(a.isEqual&&w.isFunction(a.isEqual))return a.isEqual(b);if(b.isEqual&&w.isFunction(b.isEqual))return b.isEqual(a);var d=i.call(a);if(d!=i.call(b))return!1;switch(d){case"[object String]":return a==String(b);case"[object Number]":return a!=+a?b!=+b:a==0?1/a==1/b:a==+b;case"[object Date]":case"[object Boolean]":return+a==+b;case"[object RegExp]":return a.source==b.source&&a.global==b.global&&a.multiline==b.multiline&&a.ignoreCase==b.ignoreCase}if(typeof a!="object"||typeof b!="object")return!1;var e=c.length;while(e--)if(c[e]==a)return!0;c.push(a);var f=0,g=!0;if(d=="[object Array]"){f=a.length,g=f==b.length;if(g)while(f--)if(!(g=f in a==f in b&&A(a[f],b[f],c)))break}else{if("constructor"in a!="constructor"in b||a.constructor!=b.constructor)return!1;for(var h in a)if(w.has(a,h)){f++;if(!(g=w.has(b,h)&&A(a[h],b[h],c)))break}if(g){for(h in b)if(w.has(b,h)&&!(f--))break;g=!f}}return c.pop(),g}var a=this,b=a._,c={},d=Array.prototype,e=Object.prototype,f=Function.prototype,g=d.slice,h=d.unshift,i=e.toString,j=e.hasOwnProperty,k=d.forEach,l=d.map,m=d.reduce,n=d.reduceRight,o=d.filter,p=d.every,q=d.some,r=d.indexOf,s=d.lastIndexOf,t=Array.isArray,u=Object.keys,v=f.bind,w=function(a){return new E(a)};typeof exports!="undefined"?(typeof module!="undefined"&&module.exports&&(exports=module.exports=w),exports._=w):a._=w,w.VERSION="1.3.1";var x=w.each=w.forEach=function(a,b,d){if(a==null)return;if(k&&a.forEach===k)a.forEach(b,d);else if(a.length===+a.length){for(var e=0,f=a.length;e<f;e++)if(e in a&&b.call(d,a[e],e,a)===c)return}else for(var g in a)if(w.has(a,g)&&b.call(d,a[g],g,a)===c)return};w.map=w.collect=function(a,b,c){var d=[];return a==null?d:l&&a.map===l?a.map(b,c):(x(a,function(a,e,f){d[d.length]=b.call(c,a,e,f)}),a.length===+a.length&&(d.length=a.length),d)},w.reduce=w.foldl=w.inject=function(a,b,c,d){var e=arguments.length>2;a==null&&(a=[]);if(m&&a.reduce===m)return d&&(b=w.bind(b,d)),e?a.reduce(b,c):a.reduce(b);x(a,function(a,f,g){e?c=b.call(d,c,a,f,g):(c=a,e=!0)});if(!e)throw new TypeError("Reduce of empty array with no initial value");return c},w.reduceRight=w.foldr=function(a,b,c,d){var e=arguments.length>2;a==null&&(a=[]);if(n&&a.reduceRight===n)return d&&(b=w.bind(b,d)),e?a.reduceRight(b,c):a.reduceRight(b);var f=w.toArray(a).reverse();return d&&!e&&(b=w.bind(b,d)),e?w.reduce(f,b,c,d):w.reduce(f,b)},w.find=w.detect=function(a,b,c){var d;return y(a,function(a,e,f){if(b.call(c,a,e,f))return d=a,!0}),d},w.filter=w.select=function(a,b,c){var d=[];return a==null?d:o&&a.filter===o?a.filter(b,c):(x(a,function(a,e,f){b.call(c,a,e,f)&&(d[d.length]=a)}),d)},w.reject=function(a,b,c){var d=[];return a==null?d:(x(a,function(a,e,f){b.call(c,a,e,f)||(d[d.length]=a)}),d)},w.every=w.all=function(a,b,d){var e=!0;return a==null?e:p&&a.every===p?a.every(b,d):(x(a,function(a,f,g){if(!(e=e&&b.call(d,a,f,g)))return c}),e)};var y=w.some=w.any=function(a,b,d){b||(b=w.identity);var e=!1;return a==null?e:q&&a.some===q?a.some(b,d):(x(a,function(a,f,g){if(e||(e=b.call(d,a,f,g)))return c}),!!e)};w.include=w.contains=function(a,b){var c=!1;return a==null?c:r&&a.indexOf===r?a.indexOf(b)!=-1:(c=y(a,function(a){return a===b}),c)},w.invoke=function(a,b){var c=g.call(arguments,2);return w.map(a,function(a){return(w.isFunction(b)?b||a:a[b]).apply(a,c)})},w.pluck=function(a,b){return w.map(a,function(a){return a[b]})},w.max=function(a,b,c){if(!b&&w.isArray(a))return Math.max.apply(Math,a);if(!b&&w.isEmpty(a))return-Infinity;var d={computed:-Infinity};return x(a,function(a,e,f){var g=b?b.call(c,a,e,f):a;g>=d.computed&&(d={value:a,computed:g})}),d.value},w.min=function(a,b,c){if(!b&&w.isArray(a))return Math.min.apply(Math,a);if(!b&&w.isEmpty(a))return Infinity;var d={computed:Infinity};return x(a,function(a,e,f){var g=b?b.call(c,a,e,f):a;g<d.computed&&(d={value:a,computed:g})}),d.value},w.shuffle=function(a){var b=[],c;return x(a,function(a,d,e){d==0?b[0]=a:(c=Math.floor(Math.random()*(d+1)),b[d]=b[c],b[c]=a)}),b},w.sortBy=function(a,b,c){return w.pluck(w.map(a,function(a,d,e){return{value:a,criteria:b.call(c,a,d,e)}}).sort(function(a,b){var c=a.criteria,d=b.criteria;return c<d?-1:c>d?1:0}),"value")},w.groupBy=function(a,b){var c={},d=w.isFunction(b)?b:function(a){return a[b]};return x(a,function(a,b){var e=d(a,b);(c[e]||(c[e]=[])).push(a)}),c},w.sortedIndex=function(a,b,c){c||(c=w.identity);var d=0,e=a.length;while(d<e){var f=d+e>>1;c(a[f])<c(b)?d=f+1:e=f}return d},w.toArray=function(a){return a?a.toArray?a.toArray():w.isArray(a)?g.call(a):w.isArguments(a)?g.call(a):w.values(a):[]},w.size=function(a){return w.toArray(a).length},w.first=w.head=function(a,b,c){return b!=null&&!c?g.call(a,0,b):a[0]},w.initial=function(a,b,c){return g.call(a,0,a.length-(b==null||c?1:b))},w.last=function(a,b,c){return b!=null&&!c?g.call(a,Math.max(a.length-b,0)):a[a.length-1]},w.rest=w.tail=function(a,b,c){return g.call(a,b==null||c?1:b)},w.compact=function(a){return w.filter(a,function(a){return!!a})},w.flatten=function(a,b){return w.reduce(a,function(a,c){return w.isArray(c)?a.concat(b?c:w.flatten(c)):(a[a.length]=c,a)},[])},w.without=function(a){return w.difference(a,g.call(arguments,1))},w.uniq=w.unique=function(a,b,c){var d=c?w.map(a,c):a,e=[];return w.reduce(d,function(c,d,f){if(0==f||(b===!0?w.last(c)!=d:!w.include(c,d)))c[c.length]=d,e[e.length]=a[f];return c},[]),e},w.union=function(){return w.uniq(w.flatten(arguments,!0))},w.intersection=w.intersect=function(a){var b=g.call(arguments,1);return w.filter(w.uniq(a),function(a){return w.every(b,function(b){return w.indexOf(b,a)>=0})})},w.difference=function(a){var b=w.flatten(g.call(arguments,1));return w.filter(a,function(a){return!w.include(b,a)})},w.zip=function(){var a=g.call(arguments),b=w.max(w.pluck(a,"length")),c=new Array(b);for(var d=0;d<b;d++)c[d]=w.pluck(a,""+d);return c},w.indexOf=function(a,b,c){if(a==null)return-1;var d,e;if(c)return d=w.sortedIndex(a,b),a[d]===b?d:-1;if(r&&a.indexOf===r)return a.indexOf(b);for(d=0,e=a.length;d<e;d++)if(d in a&&a[d]===b)return d;return-1},w.lastIndexOf=function(a,b){if(a==null)return-1;if(s&&a.lastIndexOf===s)return a.lastIndexOf(b);var c=a.length;while(c--)if(c in a&&a[c]===b)return c;return-1},w.range=function(a,b,c){arguments.length<=1&&(b=a||0,a=0),c=arguments[2]||1;var d=Math.max(Math.ceil((b-a)/c),0),e=0,f=new Array(d);while(e<d)f[e++]=a,a+=c;return f};var z=function(){};w.bind=function(b,c){var d,e;if(b.bind===v&&v)return v.apply(b,g.call(arguments,1));if(!w.isFunction(b))throw new TypeError;return e=g.call(arguments,2),d=function(){if(this instanceof d){z.prototype=b.prototype;var a=new z,f=b.apply(a,e.concat(g.call(arguments)));return Object(f)===f?f:a}return b.apply(c,e.concat(g.call(arguments)))}},w.bindAll=function(a){var b=g.call(arguments,1);return b.length==0&&(b=w.functions(a)),x(b,function(b){a[b]=w.bind(a[b],a)}),a},w.memoize=function(a,b){var c={};return b||(b=w.identity),function(){var d=b.apply(this,arguments);return w.has(c,d)?c[d]:c[d]=a.apply(this,arguments)}},w.delay=function(a,b){var c=g.call(arguments,2);return setTimeout(function(){return a.apply(a,c)},b)},w.defer=function(a){return w.delay.apply(w,[a,1].concat(g.call(arguments,1)))},w.throttle=function(a,b){var c,d,e,f,g,h=w.debounce(function(){g=f=!1},b);return function(){c=this,d=arguments;var i=function(){e=null,g&&a.apply(c,d),h()};e||(e=setTimeout(i,b)),f?g=!0:a.apply(c,d),h(),f=!0}},w.debounce=function(a,b){var c;return function(){var d=this,e=arguments,f=function(){c=null,a.apply(d,e)};clearTimeout(c),c=setTimeout(f,b)}},w.once=function(a){var b=!1,c;return function(){return b?c:(b=!0,c=a.apply(this,arguments))}},w.wrap=function(a,b){return function(){var c=[a].concat(g.call(arguments,0));return b.apply(this,c)}},w.compose=function(){var a=arguments;return function(){var b=arguments;for(var c=a.length-1;c>=0;c--)b=[a[c].apply(this,b)];return b[0]}},w.after=function(a,b){return a<=0?b():function(){if(--a<1)return b.apply(this,arguments)}},w.keys=u||function(a){if(a!==Object(a))throw new TypeError("Invalid object");var b=[];for(var c in a)w.has(a,c)&&(b[b.length]=c);return b},w.values=function(a){return w.map(a,w.identity)},w.functions=w.methods=function(a){var b=[];for(var c in a)w.isFunction(a[c])&&b.push(c);return b.sort()},w.extend=function(a){return x(g.call(arguments,1),function(b){for(var c in b)a[c]=b[c]}),a},w.defaults=function(a){return x(g.call(arguments,1),function(b){for(var c in b)a[c]==null&&(a[c]=b[c])}),a},w.clone=function(a){return w.isObject(a)?w.isArray(a)?a.slice():w.extend({},a):a},w.tap=function(a,b){return b(a),a},w.isEqual=function(a,b){return A(a,b,[])},w.isEmpty=function(a){if(w.isArray(a)||w.isString(a))return a.length===0;for(var b in a)if(w.has(a,b))return!1;return!0},w.isElement=function(a){return!!a&&a.nodeType==1},w.isArray=t||function(a){return i.call(a)=="[object Array]"},w.isObject=function(a){return a===Object(a)},w.isArguments=function(a){return i.call(a)=="[object Arguments]"},w.isArguments(arguments)||(w.isArguments=function(a){return!!a&&!!w.has(a,"callee")}),w.isFunction=function(a){return i.call(a)=="[object Function]"},w.isString=function(a){return i.call(a)=="[object String]"},w.isNumber=function(a){return i.call(a)=="[object Number]"},w.isNaN=function(a){return a!==a},w.isBoolean=function(a){return a===!0||a===!1||i.call(a)=="[object Boolean]"},w.isDate=function(a){return i.call(a)=="[object Date]"},w.isRegExp=function(a){return i.call(a)=="[object RegExp]"},w.isNull=function(a){return a===null},w.isUndefined=function(a){return a===void 0},w.has=function(a,b){return j.call(a,b)},w.noConflict=function(){return a._=b,this},w.identity=function(a){return a},w.times=function(a,b,c){for(var d=0;d<a;d++)b.call(c,d)},w.escape=function(a){return(""+a).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;").replace(/\//g,"&#x2F;")},w.mixin=function(a){x(w.functions(a),function(b){G(b,w[b]=a[b])})};var B=0;w.uniqueId=function(a){var b=B++;return a?a+b:b},w.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var C=/.^/,D=function(a){return a.replace(/\\\\/g,"\\").replace(/\\'/g,"'")};w.template=function(a,b){var c=w.templateSettings,d="var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('"+a.replace(/\\/g,"\\\\").replace(/'/g,"\\'").replace(c.escape||C,function(a,b){return"',_.escape("+D(b)+"),'"}).replace(c.interpolate||C,function(a,b){return"',"+D(b)+",'"}).replace(c.evaluate||C,function(a,b){return"');"+D(b).replace(/[\r\n\t]/g," ")+";__p.push('"}).replace(/\r/g,"\\r").replace(/\n/g,"\\n").replace(/\t/g,"\\t")+"');}return __p.join('');",e=new Function("obj","_",d);return b?e(b,w):function(a){return e.call(this,a,w)}},w.chain=function(a){return w(a).chain()};var E=function(a){this._wrapped=a};w.prototype=E.prototype;var F=function(a,b){return b?w(a).chain():a},G=function(a,b){E.prototype[a]=function(){var a=g.call(arguments);return h.call(a,this._wrapped),F(b.apply(w,a),this._chain)}};w.mixin(w),x(["pop","push","reverse","shift","sort","splice","unshift"],function(a){var b=d[a];E.prototype[a]=function(){var c=this._wrapped;b.apply(c,arguments);var d=c.length;return(a=="shift"||a=="splice")&&d===0&&delete c[0],F(c,this._chain)}}),x(["concat","join","slice"],function(a){var b=d[a];E.prototype[a]=function(){return F(b.apply(this._wrapped,arguments),this._chain)}}),E.prototype.chain=function(){return this._chain=!0,this},E.prototype.value=function(){return this._wrapped},typeof define=="function"&&define.amd&&define("underscore",[],function(){return w})})).call(this),function(a,b){typeof exports!="undefined"?b(a,exports,require("underscore")):typeof define=="function"&&define.amd?define("backbone",["underscore","jquery","exports"],function(c,d,e){a.Backbone=b(a,e,c,d)}):a.Backbone=b(a,{},a._,a.jQuery||a.Zepto||a.ender)}(this,function(a,b,c,d){var e=a.Backbone,f=Array.prototype.slice,g=Array.prototype.splice;b.VERSION="0.9.0",b.noConflict=function(){return a.Backbone=e,b},b.emulateHTTP=!1,b.emulateJSON=!1,b.Events={on:function(a,b,c){var d;a=a.split(/\s+/);var e=this._callbacks||(this._callbacks={});while(d=a.shift()){var f=e[d]||(e[d]={}),g=f.tail||(f.tail=f.next={});g.callback=b,g.context=c,f.tail=g.next={}}return this},off:function(a,b,c){var d,e,f;if(!a)delete this._callbacks;else if(e=this._callbacks){a=a.split(/\s+/);while(d=a.shift()){f=e[d],delete e[d];if(!b||!f)continue;while((f=f.next)&&f.next)if(f.callback!==b||!!c&&f.context!==c)this.on(d,f.callback,f.context);else continue}}return this},trigger:function(a){var b,c,d,e,g,h,i;if(!(d=this._callbacks))return this;h=d.all,(a=a.split(/\s+/)).push(null);while(b=a.shift()){h&&a.push({next:h.next,tail:h.tail,event:b});if(!(c=d[b]))continue;a.push({next:c.next,tail:c.tail})}i=f.call(arguments,1);while(c=a.pop()){e=c.tail,g=c.event?[c.event].concat(i):i;while((c=c.next)!==e)c.callback.apply(c.context||this,g)}return this}},b.Events.bind=b.Events.on,b.Events.unbind=b.Events.off,b.Model=function(a,b){var d;a||(a={}),b&&b.parse&&(a=this.parse(a));if(d=u(this,"defaults"))a=c.extend({},d,a);b&&b.collection&&(this.collection=b.collection),this.attributes={},this._escapedAttributes={},this.cid=c.uniqueId("c"),this._changed={};if(!this.set(a,{silent:!0}))throw new Error("Can't create an invalid model");this._changed={},this._previousAttributes=c.clone(this.attributes),this.initialize.apply(this,arguments)},c.extend(b.Model.prototype,b.Events,{idAttribute:"id",initialize:function(){},toJSON:function(){return c.clone(this.attributes)},get:function(a){return this.attributes[a]},escape:function(a){var b;if(b=this._escapedAttributes[a])return b;var d=this.attributes[a];return this._escapedAttributes[a]=c.escape(d==null?"":""+d)},has:function(a){return this.attributes[a]!=null},set:function(a,d,e){var f,g,h;c.isObject(a)||a==null?(f=a,e=d):(f={},f[a]=d),e||(e={});if(!f)return this;f instanceof b.Model&&(f=f.attributes);if(e.unset)for(g in f)f[g]=void 0;if(this.validate&&!this._performValidation(f,e))return!1;this.idAttribute in f&&(this.id=f[this.idAttribute]);var i=this.attributes,j=this._escapedAttributes,k=this._previousAttributes||{},l=this._changing;this._changing=!0;for(g in f){h=f[g],c.isEqual(i[g],h)||delete j[g],e.unset?delete i[g]:i[g]=h,delete this._changed[g];if(!c.isEqual(k[g],h)||c.has(i,g)!=c.has(k,g))this._changed[g]=h}return l||(!e.silent&&this.hasChanged()&&this.change(e),this._changing=!1),this},unset:function(a,b){return(b||(b={})).unset=!0,this.set(a,null,b)},clear:function(a){return(a||(a={})).unset=!0,this.set(c.clone(this.attributes),a)},fetch:function(a){a=a?c.clone(a):{};var d=this,e=a.success;return a.success=function(b,c,f){if(!d.set(d.parse(b,f),a))return!1;e&&e(d,b)},a.error=b.wrapError(a.error,d,a),(this.sync||b.sync).call(this,"read",this,a)},save:function(a,d,e){var f;c.isObject(a)||a==null?(f=a,e=d):(f={},f[a]=d),e=e?c.clone(e):{};if(f&&!this[e.wait?"_performValidation":"set"](f,e))return!1;var g=this,h=e.success;e.success=function(a,b,d){var i=g.parse(a,d);e.wait&&(i=c.extend(f||{},i));if(!g.set(i,e))return!1;h?h(g,a):g.trigger("sync",g,a,e)},e.error=b.wrapError(e.error,g,e);var i=this.isNew()?"create":"update";return(this.sync||b.sync).call(this,i,this,e)},destroy:function(a){a=a?c.clone(a):{};var d=this,e=a.success,f=function(){d.trigger("destroy",d,d.collection,a)};if(this.isNew())return f();a.success=function(b){a.wait&&f(),e?e(d,b):d.trigger("sync",d,b,a)},a.error=b.wrapError(a.error,d,a);var g=(this.sync||b.sync).call(this,"delete",this,a);return a.wait||f(),g},url:function(){var a=u(this.collection,"url")||u(this,"urlRoot")||v();return this.isNew()?a:a+(a.charAt(a.length-1)=="/"?"":"/")+encodeURIComponent(this.id)},parse:function(a,b){return a},clone:function(){return new this.constructor(this.attributes)},isNew:function(){return this.id==null},change:function(a){for(var b in this._changed)this.trigger("change:"+b,this,this._changed[b],a);this.trigger("change",this,a),this._previousAttributes=c.clone(this.attributes),this._changed={}},hasChanged:function(a){return a?c.has(this._changed,a):!c.isEmpty(this._changed)},changedAttributes:function(a){if(!a)return this.hasChanged()?c.clone(this._changed):!1;var b,d=!1,e=this._previousAttributes;for(var f in a){if(c.isEqual(e[f],b=a[f]))continue;(d||(d={}))[f]=b}return d},previous:function(a){return!a||!this._previousAttributes?null:this._previousAttributes[a]},previousAttributes:function(){return c.clone(this._previousAttributes)},_performValidation:function(a,b){var d=c.extend({},this.attributes,a),e=this.validate(d,b);return e?(b.error?b.error(this,e,b):this.trigger("error",this,e,b),!1):!0}}),b.Collection=function(a,b){b||(b={}),b.comparator&&(this.comparator=b.comparator),this._reset(),this.initialize.apply(this,arguments),a&&this.reset(a,{silent:!0,parse:b.parse})},c.extend(b.Collection.prototype,b.Events,{model:b.Model,initialize:function(){},toJSON:function(){return this.map(function(a){return a.toJSON()})},add:function(a,b){var d,e,f,h,i,j,k={},l={};b||(b={}),a=c.isArray(a)?a.slice():[a];for(d=0,f=a.length;d<f;d++){if(!(h=a[d]=this._prepareModel(a[d],b)))throw new Error("Can't add an invalid model to a collection");if(k[i=h.cid]||this._byCid[i]||(j=h.id)!=null&&(l[j]||this._byId[j]))throw new Error("Can't add the same model to a collection twice");k[i]=l[j]=h}for(d=0;d<f;d++)(h=a[d]).on("all",this._onModelEvent,this),this._byCid[h.cid]=h,h.id!=null&&(this._byId[h.id]=h);this.length+=f,e=b.at!=null?b.at:this.models.length,g.apply(this.models,[e,0].concat(a)),this.comparator&&this.sort({silent:!0});if(b.silent)return this;for(d=0,f=this.models.length;d<f;d++){if(!k[(h=this.models[d]).cid])continue;b.index=d,h.trigger("add",h,this,b)}return this},remove:function(a,b){var d,e,f,g;b||(b={}),a=c.isArray(a)?a.slice():[a];for(d=0,e=a.length;d<e;d++){g=this.getByCid(a[d])||this.get(a[d]);if(!g)continue;delete this._byId[g.id],delete this._byCid[g.cid],f=this.indexOf(g),this.models.splice(f,1),this.length--,b.silent||(b.index=f,g.trigger("remove",g,this,b)),this._removeReference(g)}return this},get:function(a){return a==null?null:this._byId[a.id!=null?a.id:a]},getByCid:function(a){return a&&this._byCid[a.cid||a]},at:function(a){return this.models[a]},sort:function(a){a||(a={});if(!this.comparator)throw new Error("Cannot sort a set without a comparator");var b=c.bind(this.comparator,this);return this.comparator.length==1?this.models=this.sortBy(b):this.models.sort(b),a.silent||this.trigger("reset",this,a),this},pluck:function(a){return c.map(this.models,function(b){return b.get(a)})},reset:function(a,b){a||(a=[]),b||(b={});for(var c=0,d=this.models.length;c<d;c++)this._removeReference(this.models[c]);return this._reset(),this.add(a,{silent:!0,parse:b.parse}),b.silent||this.trigger("reset",this,b),this},fetch:function(a){a=a?c.clone(a):{},a.parse===undefined&&(a.parse=!0);var d=this,e=a.success;return a.success=function(b,c,f){d[a.add?"add":"reset"](d.parse(b,f),a),e&&e(d,b)},a.error=b.wrapError(a.error,d,a),(this.sync||b.sync).call(this,"read",this,a)},create:function(a,b){var d=this;b=b?c.clone(b):{},a=this._prepareModel(a,b);if(!a)return!1;b.wait||d.add(a,b);var e=b.success;return b.success=function(c,f,g){b.wait&&d.add(c,b),e?e(c,f):c.trigger("sync",a,f,b)},a.save(null,b),a},parse:function(a,b){return a},chain:function(){return c(this.models).chain()},_reset:function(a){this.length=0,this.models=[],this._byId={},this._byCid={}},_prepareModel:function(a,c){if(a instanceof b.Model)a.collection||(a.collection=this);else{var d=a;c.collection=this,a=new this.model(d,c),a.validate&&!a._performValidation(a.attributes,c)&&(a=!1)}return a},_removeReference:function(a){this==a.collection&&delete a.collection,a.off("all",this._onModelEvent,this)},_onModelEvent:function(a,b,c,d){if(a!="add"&&a!="remove"||c==this)a=="destroy"&&this.remove(b,d),b&&a==="change:"+b.idAttribute&&(delete this._byId[b.previous(b.idAttribute)],this._byId[b.id]=b),this.trigger.apply(this,arguments);else return}});var h=["forEach","each","map","reduce","reduceRight","find","detect","filter","select","reject","every","all","some","any","include","contains","invoke","max","min","sortBy","sortedIndex","toArray","size","first","initial","rest","last","without","indexOf","shuffle","lastIndexOf","isEmpty","groupBy"];c.each(h,function(a){b.Collection.prototype[a]=function(){return c[a].apply(c,[this.models].concat(c.toArray(arguments)))}}),b.Router=function(a){a||(a={}),a.routes&&(this.routes=a.routes),this._bindRoutes(),this.initialize.apply(this,arguments)};var i=/:\w+/g,j=/\*\w+/g,k=/[-[\]{}()+?.,\\^$|#\s]/g;c.extend(b.Router.prototype,b.Events,{initialize:function(){},route:function(a,d,e){return b.history||(b.history=new b.History),c.isRegExp(a)||(a=this._routeToRegExp(a)),e||(e=this[d]),b.history.route(a,c.bind(function(c){var f=this._extractParameters(a,c);e&&e.apply(this,f),this.trigger.apply(this,["route:"+d].concat(f)),b.history.trigger("route",this,d,f)},this)),this},navigate:function(a,c){b.history.navigate(a,c)},_bindRoutes:function(){if(!this.routes)return;var a=[];for(var b in this.routes)a.unshift([b,this.routes[b]]);for(var c=0,d=a.length;c<d;c++)this.route(a[c][0],a[c][1],this[a[c][1]])},_routeToRegExp:function(a){return a=a.replace(k,"\\$&").replace(i,"([^/]+)").replace(j,"(.*?)"),new RegExp("^"+a+"$")},_extractParameters:function(a,b){return a.exec(b).slice(1)}}),b.History=function(){this.handlers=[],c.bindAll(this,"checkUrl")};var l=/^[#\/]/,m=/msie [\w.]+/,n=!1;c.extend(b.History.prototype,b.Events,{interval:50,getFragment:function(a,b){if(a==null)if(this._hasPushState||b){a=window.location.pathname;var c=window.location.search;c&&(a+=c)}else a=window.location.hash;return a=decodeURIComponent(a.replace(l,"")),a.indexOf(this.options.root)||(a=a.substr(this.options.root.length)),a},start:function(a){if(n)throw new Error("Backbone.history has already been started");this.options=c.extend({},{root:"/"},this.options,a),this._wantsHashChange=this.options.hashChange!==!1,this._wantsPushState=!!this.options.pushState,this._hasPushState=!!(this.options.pushState&&window.history&&window.history.pushState);var b=this.getFragment(),e=document.documentMode,f=m.exec(navigator.userAgent.toLowerCase())&&(!e||e<=7);f&&(this.iframe=d('<iframe src="javascript:0" tabindex="-1" />').hide().appendTo("body")[0].contentWindow,this.navigate(b)),this._hasPushState?d(window).bind("popstate",this.checkUrl):this._wantsHashChange&&"onhashchange"in window&&!f?d(window).bind("hashchange",this.checkUrl):this._wantsHashChange&&(this._checkUrlInterval=setInterval(this.checkUrl,this.interval)),this.fragment=b,n=!0;var g=window.location,h=g.pathname==this.options.root;if(this._wantsHashChange&&this._wantsPushState&&!this._hasPushState&&!h)return this.fragment=this.getFragment(null,!0),window.location.replace(this.options.root+"#"+this.fragment),!0;this._wantsPushState&&this._hasPushState&&h&&g.hash&&(this.fragment=g.hash.replace(l,""),window.history.replaceState({},document.title,g.protocol+"//"+g.host+this.options.root+this.fragment));if(!this.options.silent)return this.loadUrl()},stop:function(){d(window).unbind("popstate",this.checkUrl).unbind("hashchange",this.checkUrl),clearInterval(this._checkUrlInterval),n=!1},route:function(a,b){this.handlers.unshift({route:a,callback:b})},checkUrl:function(a){var b=this.getFragment();b==this.fragment&&this.iframe&&(b=this.getFragment(this.iframe.location.hash));if(b==this.fragment||b==decodeURIComponent(this.fragment))return!1;this.iframe&&this.navigate(b),this.loadUrl()||this.loadUrl(window.location.hash)},loadUrl:function(a){var b=this.fragment=this.getFragment(a),d=c.any(this.handlers,function(a){if(a.route.test(b))return a.callback(b),!0});return d},navigate:function(a,b){if(!n)return!1;if(!b||b===!0)b={trigger:b};var c=(a||"").replace(l,"");if(this.fragment==c||this.fragment==decodeURIComponent(c))return;this._hasPushState?(c.indexOf(this.options.root)!=0&&(c=this.options.root+c),this.fragment=c,window.history[b.replace?"replaceState":"pushState"]({},document.title,c)):this._wantsHashChange?(this.fragment=c,this._updateHash(window.location,c,b.replace),this.iframe&&c!=this.getFragment(this.iframe.location.hash)&&(b.replace||this.iframe.document.open().close(),this._updateHash(this.iframe.location,c,b.replace))):window.location.assign(this.options.root+a),b.trigger&&this.loadUrl(a)},_updateHash:function(a,b,c){c?a.replace(a.toString().replace(/(javascript:|#).*$/,"")+"#"+b):a.hash=b}}),b.View=function(a){this.cid=c.uniqueId("view"),this._configure(a||{}),this._ensureElement(),this.initialize.apply(this,arguments),this.delegateEvents()};var o=/^(\S+)\s*(.*)$/,p=["model","collection","el","id","attributes","className","tagName"];c.extend(b.View.prototype,b.Events,{tagName:"div",$:function(a){return this.$el.find(a)},initialize:function(){},render:function(){return this},remove:function(){return this.$el.remove(),this},make:function(a,b,c){var e=document.createElement(a);return b&&d(e).attr(b),c&&d(e).html(c),e},setElement:function(a,b){this.$el=d(a),this.el=this.$el[0],b!==!1&&this.delegateEvents()},delegateEvents:function(a){if(!a&&!(a=u(this,"events")))return;this.undelegateEvents();for(var b in a){var d=a[b];c.isFunction(d)||(d=this[a[b]]);if(!d)throw new Error('Event "'+a[b]+'" does not exist');var e=b.match(o),f=e[1],g=e[2];d=c.bind(d,this),f+=".delegateEvents"+this.cid,g===""?this.$el.bind(f,d):this.$el.delegate(g,f,d)}},undelegateEvents:function(){this.$el.unbind(".delegateEvents"+this.cid)},_configure:function(a){this.options&&(a=c.extend({},this.options,a));for(var b=0,d=p.length;b<d;b++){var e=p[b];a[e]&&(this[e]=a[e])}this.options=a},_ensureElement:function(){if(!this.el){var a=u(this,"attributes")||{};this.id&&(a.id=this.id),this.className&&(a["class"]=this.className),this.setElement(this.make(this.tagName,a),!1)}else this.setElement(this.el,!1)}});var q=function(a,b){var c=t(this,a,b);return c.extend=this.extend,c};b.Model.extend=b.Collection.extend=b.Router.extend=b.View.extend=q;var r={create:"POST",update:"PUT","delete":"DELETE",read:"GET"};b.sync=function(a,e,f){var g=r[a],h={type:g,dataType:"json"};return f.url||(h.url=u(e,"url")||v()),!f.data&&e&&(a=="create"||a=="update")&&(h.contentType="application/json",h.data=JSON.stringify(e.toJSON())),b.emulateJSON&&(h.contentType="application/x-www-form-urlencoded",h.data=h.data?{model:h.data}:{}),b.emulateHTTP&&(g==="PUT"||g==="DELETE")&&(b.emulateJSON&&(h.data._method=g),h.type="POST",h.beforeSend=function(a){a.setRequestHeader("X-HTTP-Method-Override",g)}),h.type!=="GET"&&!b.emulateJSON&&(h.processData=!1),d.ajax(c.extend(h,f))},b.wrapError=function(a,b,c){return function(d,e){e=d===b?e:d,a?a(d,e,c):b.trigger("error",d,e,c)}};var s=function(){},t=function(a,b,d){var e;return b&&b.hasOwnProperty("constructor")?e=b.constructor:e=function(){a.apply(this,arguments)},c.extend(e,a),s.prototype=a.prototype,e.prototype=new s,b&&c.extend(e.prototype,b),d&&c.extend(e,d),e.prototype.constructor=e,e.__super__=a.prototype,e},u=function(a,b){return!a||!a[b]?null:c.isFunction(a[b])?a[b]():a[b]},v=function(){throw new Error('A "url" property or function must be specified')};return b}),define("ich",["jquery"],function(a){function c(){var c=this;c.VERSION="0.9",c.templates={},c.partials={},c.addTemplate=function(d,e){c.templates[d]=e,c[d]=function(e,f){e=e||{};var g=b.to_html(c.templates[d],e,c.partials);return f?g:a(g)}},c.addPartial=function(a,b){c.partials[a]=b},c.grabTemplates=function(){a('script[type="text/html"]').each(function(b,d){var e=a(typeof b=="number"?d:b),f="".trim?e.html().trim():a.trim(e.html());c[e.hasClass("partial")?"addPartial":"addTemplate"](e.attr("id"),f),e.remove()})},c.clearAll=function(){for(var a in c.templates)delete c[a];c.templates={},c.partials={}},c.refresh=function(){c.clearAll(),c.grabTemplates()}}var b=function(){var a=function(){};return a.prototype={otag:"{{",ctag:"}}",pragmas:{},buffer:[],pragmas_implemented:{"IMPLICIT-ITERATOR":!0},context:{},render:function(a,b,c,d){d||(this.context=b,this.buffer=[]);if(!this.includes("",a)){if(d)return a;this.send(a);return}a=this.render_pragmas(a);var e=this.render_section(a,b,c);if(d)return this.render_tags(e,b,c,d);this.render_tags(e,b,c,d)},send:function(a){a!=""&&this.buffer.push(a)},render_pragmas:function(a){if(!this.includes("%",a))return a;var b=this,c=new RegExp(this.otag+"%([\\w-]+) ?([\\w]+=[\\w]+)?"+this.ctag);return a.replace(c,function(a,c,d){if(!b.pragmas_implemented[c])throw{message:"This implementation of mustache doesn't understand the '"+c+"' pragma"};b.pragmas[c]={};if(d){var e=d.split("=");b.pragmas[c][e[0]]=e[1]}return""})},render_partial:function(a,b,c){a=this.trim(a);if(!c||c[a]===undefined)throw{message:"unknown_partial '"+a+"'"};return typeof b[a]!="object"?this.render(c[a],b,c,!0):this.render(c[a],b[a],c,!0)},render_section:function(a,b,c){if(!this.includes("#",a)&&!this.includes("^",a))return a;var d=this,e=new RegExp(this.otag+"(\\^|\\#)\\s*(.+)\\s*"+this.ctag+"\n*([\\s\\S]+?)"+this.otag+"\\/\\s*\\2\\s*"+this.ctag+"\\s*","mg");return a.replace(e,function(a,e,f,g){var h=d.find(f,b);if(e=="^")return!h||d.is_array(h)&&h.length===0?d.render(g,b,c,!0):"";if(e=="#")return d.is_array(h)?d.map(h,function(a){return d.render(g,d.create_context(a),c,!0)}).join(""):d.is_object(h)?d.render(g,d.create_context(h),c,!0):typeof h=="function"?h.call(b,g,function(a){return d.render(a,b,c,!0)}):h?d.render(g,b,c,!0):""})},render_tags:function(a,b,c,d){var e=this,f=function(){return new RegExp(e.otag+"(=|!|>|\\{|%)?([^\\/#\\^]+?)\\1?"+e.ctag+"+","g")},g=f(),h=function(a,d,h){switch(d){case"!":return"";case"=":return e.set_delimiters(h),g=f(),"";case">":return e.render_partial(h,b,c);case"{":return e.find(h,b);default:return e.escape(e.find(h,b))}},i=a.split("\n");for(var j=0;j<i.length;j++)i[j]=i[j].replace(g,h,this),d||this.send(i[j]);if(d)return i.join("\n")},set_delimiters:function(a){var b=a.split(" ");this.otag=this.escape_regex(b[0]),this.ctag=this.escape_regex(b[1])},escape_regex:function(a){if(!arguments.callee.sRE){var b=["/",".","*","+","?","|","(",")","[","]","{","}","\\"];arguments.callee.sRE=new RegExp("(\\"+b.join("|\\")+")","g")}return a.replace(arguments.callee.sRE,"\\$1")},find:function(a,b){function c(a){return a===!1||a===0||a}a=this.trim(a);var d;return c(b[a])?d=b[a]:c(this.context[a])&&(d=this.context[a]),typeof d=="function"?d.apply(b):d!==undefined?d:""},includes:function(a,b){return b.indexOf(this.otag+a)!=-1},escape:function(a){return a=String(a===null?"":a),a.replace(/&(?!\w+;)|["<>\\]/g,function(a){switch(a){case"&":return"&amp;";case"\\":return"\\\\";case'"':return'"';case"<":return"&lt;";case">":return"&gt;";default:return a}})},create_context:function(a){if(this.is_object(a))return a;var b=".";this.pragmas["IMPLICIT-ITERATOR"]&&(b=this.pragmas["IMPLICIT-ITERATOR"].iterator);var c={};return c[b]=a,c},is_object:function(a){return a&&typeof a=="object"},is_array:function(a){return Object.prototype.toString.call(a)==="[object Array]"},trim:function(a){return a.replace(/^\s*|\s*$/g,"")},map:function(a,b){if(typeof a.map=="function")return a.map(b);var c=[],d=a.length;for(var e=0;e<d;e++)c.push(b(a[e]));return c}},{name:"mustache.js",version:"0.3.0",to_html:function(b,c,d,e){var f=new a;e&&(f.send=e),f.render(b,c,d);if(!e)return f.buffer.join("\n")}}}();return new c}),define("ivle",["jquery","underscore"],function(a,b){var c=function(a){var b="https://ivle.nus.edu.sg/api/Lapi.svc/",c=function(b,c,d,e){a.ajax({type:"GET",dataType:"jsonp",data:c,url:b,success:d,error:e})},d=function(a){var a=a;this.auth=function(b,c){b.click(function(){var b="https://ivle.nus.edu.sg/api/login/?apikey="+a+"&url="+encodeURIComponent(c);window.location.href=b})},this.user=function(d){this.authtoken=d,this.validate=function(d,e){var f="Validate",g={APIKey:a,Token:this.authtoken,output:"json"},h=b+f;c(h,g,d,e)},this.modules=function(d,e){var f="Modules",g={APIKey:a,AuthToken:this.authtoken,Duration:0,IncludeAllInfo:!0,output:"json"},h=b+f;c(h,g,d,e)},this.workbin=function(d,e,f){var g="Workbins",h={APIKey:a,AuthToken:this.authtoken,CourseId:d,Duration:0,TitleOnly:!1,output:"json"},i=b+g;c(i,h,e,f)},this.file=function(b){var c="https://ivle.nus.edu.sg/api/downloadfile.ashx?APIKey="+a+"&AuthToken="+this.authtoken+"&ID="+b+"&target=workbin";window.location.href=c}}};return d}(a);return c}),function(){var a=["Msxml2.XMLHTTP","Microsoft.XMLHTTP","Msxml2.XMLHTTP.4.0"],b=/^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,c=/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im,d=typeof location!="undefined"&&location.href,e=d&&location.protocol&&location.protocol.replace(/\:/,""),f=d&&location.hostname,g=d&&(location.port||undefined),h=[];define("text",[],function(){var i,j,k;return typeof window!="undefined"&&window.navigator&&window.document?j=function(a,b){var c=i.createXhr();c.open("GET",a,!0),c.onreadystatechange=function(a){c.readyState===4&&b(c.responseText)},c.send(null)}:typeof process!="undefined"&&process.versions&&!!process.versions.node?(k=require.nodeRequire("fs"),j=function(a,b){b(k.readFileSync(a,"utf8"))}):typeof Packages!="undefined"&&(j=function(a,b){var c="utf-8",d=new java.io.File(a),e=java.lang.System.getProperty("line.separator"),f=new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(d),c)),g,h,i="";try{g=new java.lang.StringBuffer,h=f.readLine(),h&&h.length()&&h.charAt(0)===65279&&(h=h.substring(1)),g.append(h);while((h=f.readLine())!==null)g.append(e),g.append(h);i=String(g.toString())}finally{f.close()}b(i)}),i={version:"1.0.2",strip:function(a){if(a){a=a.replace(b,"");var d=a.match(c);d&&(a=d[1])}else a="";return a},jsEscape:function(a){return a.replace(/(['\\])/g,"\\$1").replace(/[\f]/g,"\\f").replace(/[\b]/g,"\\b").replace(/[\n]/g,"\\n").replace(/[\t]/g,"\\t").replace(/[\r]/g,"\\r")},createXhr:function(){var b,c,d;if(typeof XMLHttpRequest!="undefined")return new XMLHttpRequest;for(c=0;c<3;c++){d=a[c];try{b=new ActiveXObject(d)}catch(e){}if(b){a=[d];break}}if(!b)throw new Error("createXhr(): XMLHttpRequest not available");return b},get:j,parseName:function(a){var b=!1,c=a.indexOf("."),d=a.substring(0,c),e=a.substring(c+1,a.length);return c=e.indexOf("!"),c!==-1&&(b=e.substring(c+1,e.length),b=b==="strip",e=e.substring(0,c)),{moduleName:d,ext:e,strip:b}},xdRegExp:/^((\w+)\:)?\/\/([^\/\\]+)/,useXhr:function(a,b,c,d){var e=i.xdRegExp.exec(a),f,g,h;return e?(f=e[2],g=e[3],g=g.split(":"),h=g[1],g=g[0],(!f||f===b)&&(!g||g===c)&&(!h&&!g||h===d)):!0},finishLoad:function(a,b,c,d,e){c=b?i.strip(c):c,e.isBuild&&(h[a]=c),d(c)},load:function(a,b,c,h){if(h.isBuild&&!h.inlineText){c();return}var j=i.parseName(a),k=j.moduleName+"."+j.ext,l=b.toUrl(k),m=h&&h.text&&h.text.useXhr||i.useXhr;!d||m(l,e,f,g)?i.get(l,function(b){i.finishLoad(a,j.strip,b,c,h)}):b([k],function(a){i.finishLoad(j.moduleName+"."+j.ext,j.strip,a,c,h)})},write:function(a,b,c,d){if(b in h){var e=i.jsEscape(h[b]);c.asModule(a+"!"+b,"define(function () { return '"+e+"';});\n")}},writeFile:function(a,b,c,d,e){var f=i.parseName(b),g=f.moduleName+"."+f.ext,h=c.toUrl(f.moduleName+"."+f.ext)+".js";i.load(g,c,function(b){var c=function(a){return d(h,a)};c.asModule=function(a,b){return d.asModule(a,h,b)},i.write(a,g,c,e)},e)}},i})}(),define("text!templates/template.html",[],function(){return"<script id='login' type='text/html'>\n\t<div id='loginwrapper'>\n\t\t<a id=\"login\">login to ivle</a>\n\t</div>\n</script>\n<script id='mainview' type='text/html'>\n\t<div id='leftbar'>\n\n\t</div>\n\t<div id='contentcontainer'>\n\n\t</div>\n</script>\n<script id='moduleview' type='text/html'>\n\t<span class='modulename'> {{name}} </span>\n\t<span class='modulecode'> {{code}} </span>\n\t<div class='moduleicons'></div>\n</script>\n<script id='moduleicon' type='text/html'>\n\t<div class='moduleicon {{type}}' title=\"{{type}}\"></div>\n</script>"}),define("mainapp",["jquery","underscore","backbone","ich","ivle","text!templates/template.html"],function(a,b,c,d,e,f){a("body").append(f),d.grabTemplates();var g=c.View.extend({el:"#container",initialize:function(){var a="ba1ge5NQ9cl76KQNI1Suc";this.ivle=new e(a)},init:function(){this.bootstrap=bootstrap,this.bootstrap.token?(this.usertoken=this.bootstrap.token,this.user=new this.ivle.user(this.usertoken),this.modules=new j.Modules([],{user:this.user}),this.modules.fetch(),this.mainview=new h({user:this.user,modules:this.modules}),this.$("#main_container").html(this.mainview.render().el)):this.renderlogin()},renderlogin:function(){var a=window.location.origin+"/ivle/auth";this.$("#main_container").html(d.login()),this.ivle.auth(this.$("#login"),a)}}),h=c.View.extend({id:"mainview",initialize:function(c){b.bindAll(this,"render"),this.user=c.user,this.modules=c.modules,this.modules.on("reset",this.fixheight,this);var d=function(){var b=a(window).height()-50,c=b<a("#leftbar").children().length*120?a("#leftbar").children().length*170:b;a("#leftbar").height(c),a("#contentcontainer").height(c).width(a(window).width()-305)},e=b.debounce(d,300);a(window).resize(e)},render:function(){return this.$el.html(d.mainview()),this.$("#leftbar").height(a(window).height()-50),this.$("#contentcontainer").height(a(window).height()-50).width(a(window).width()-305),this.leftbar=new i.ModulesView({collection:this.modules,el:this.$("#leftbar")}),this},fixheight:function(){a(window).resize()},events:{}}),i={};i.ModulesView=c.View.extend({initialize:function(){this.collection.on("reset",this.render,this),this.$el.addClass("loading")},render:function(){var a=document.createDocumentFragment();return b.each(this.collection.models,function(b){var c=new i.ModuleView({model:b});a.appendChild(c.render().el)},this),this.$el.html(a),this.$el.removeClass("loading"),this}}),i.ModuleView=c.View.extend({className:"moduleview",initialize:function(){},render:function(){return this.$el.html(d.moduleview(this.model.simpleinfo)),this.model.simpleinfo.workbin&&this.$(".moduleicons").append(d.moduleicon({type:"workbin"})),this.model.simpleinfo.gradebook&&this.$(".moduleicons").append(d.moduleicon({type:"gradebook"})),this.model.simpleinfo.webcast&&this.$(".moduleicons").append(d.moduleicon({type:"webcast"})),this}});var j={};return j.Module=c.Model.extend({initialize:function(){var a={};a.code=this.get("CourseCode"),a.name=this.get("CourseName"),a.semester=this.get("CourseSemester"),a.year=this.get("CourseAcadYear"),a.workbin=this.get("Workbins"),a.gradebook=this.get("Gradebooks"),a.webcast=this.get("Webcasts"),a.forum=this.get("Forums"),this.simpleinfo=a}}),j.Modules=c.Collection.extend({initialize:function(a,c){this.user=c.user,b.bindAll(this,"fetch")},model:j.Module,fetch:function(){var a=this;this.user.modules(function(b){a.reset(b.Results)})}}),g}),require.config({paths:{jquery:"http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min",underscore:"libs/underscore",backbone:"libs/backbone",ich:"libs/icanhazamd",ivle:"libs/ivle",mainapp:"scripts/app"}}),require(["mainapp"],function(a){var b=new a;b.init()}),define("main",function(){})