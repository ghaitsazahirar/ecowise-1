!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(require("@firebase/app-compat"),require("@firebase/app")):"function"==typeof define&&define.amd?define(["@firebase/app-compat","@firebase/app"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).firebase,e.firebase.INTERNAL.modularAPIs)}(this,(function(e,t){"use strict";try{(function(){var r,n,o,a=(o=e)&&"object"==typeof o&&"default"in o?o:{default:o};const i={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:"function"==typeof atob,encodeByteArray(e,t){if(!Array.isArray(e))throw Error("encodeByteArray takes an array as a parameter");this.init_();var r=t?this.byteToCharMapWebSafe_:this.byteToCharMap_;const n=[];for(let t=0;t<e.length;t+=3){var o=e[t],a=t+1<e.length,i=a?e[t+1]:0,s=t+2<e.length,c=s?e[t+2]:0;let h=(15&i)<<2|c>>6,l=63&c;s||(l=64,a||(h=64)),n.push(r[o>>2],r[(3&o)<<4|i>>4],r[h],r[l])}return n.join("")},encodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(e):this.encodeByteArray(function(e){const t=[];let r=0;for(let n=0;n<e.length;n++){let o=e.charCodeAt(n);o<128?t[r++]=o:(o<2048?t[r++]=o>>6|192:(55296==(64512&o)&&n+1<e.length&&56320==(64512&e.charCodeAt(n+1))?(o=65536+((1023&o)<<10)+(1023&e.charCodeAt(++n)),t[r++]=o>>18|240,t[r++]=o>>12&63|128):t[r++]=o>>12|224,t[r++]=o>>6&63|128),t[r++]=63&o|128)}return t}(e),t)},decodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(e):function(e){const t=[];let r=0,n=0;for(;r<e.length;){var o,a,i=e[r++];i<128?t[n++]=String.fromCharCode(i):191<i&&i<224?(o=e[r++],t[n++]=String.fromCharCode((31&i)<<6|63&o)):239<i&&i<365?(a=((7&i)<<18|(63&e[r++])<<12|(63&e[r++])<<6|63&e[r++])-65536,t[n++]=String.fromCharCode(55296+(a>>10)),t[n++]=String.fromCharCode(56320+(1023&a))):(o=e[r++],a=e[r++],t[n++]=String.fromCharCode((15&i)<<12|(63&o)<<6|63&a))}return t.join("")}(this.decodeStringToByteArray(e,t))},decodeStringToByteArray(e,t){this.init_();var r=t?this.charToByteMapWebSafe_:this.charToByteMap_;const n=[];for(let t=0;t<e.length;){var o=r[e.charAt(t++)],a=t<e.length?r[e.charAt(t)]:0;++t;var i=t<e.length?r[e.charAt(t)]:64;++t;var c=t<e.length?r[e.charAt(t)]:64;if(++t,null==o||null==a||null==i||null==c)throw new s;n.push(o<<2|a>>4),64!==i&&(n.push(a<<4&240|i>>2),64!==c&&n.push(i<<6&192|c))}return n},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let e=0;e<this.ENCODED_VALS.length;e++)this.byteToCharMap_[e]=this.ENCODED_VALS.charAt(e),this.charToByteMap_[this.byteToCharMap_[e]]=e,this.byteToCharMapWebSafe_[e]=this.ENCODED_VALS_WEBSAFE.charAt(e),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[e]]=e,e>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(e)]=e,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(e)]=e)}}};class s extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const c=function(e){try{return i.decodeString(e,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};class h{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),"function"==typeof e&&(this.promise.catch((()=>{})),1===e.length?e(t):e(t,r))}}}function l(){try{return"object"==typeof indexedDB}catch(e){return}}class p extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name="FirebaseError",Object.setPrototypeOf(this,p.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,u.prototype.create)}}class u{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){var r,n=t[0]||{},o=`${this.service}/${e}`,a=(a=this.errors[e])?(r=n,a.replace(d,((e,t)=>{var n=r[t];return null!=n?String(n):`<${t}?>`}))):"Error";return a=`${this.serviceName}: ${a} (${o}).`,new p(o,a,n)}}const d=/\{\$([^}]+)}/g;function g(e){return JSON.parse(e)}class f{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}(n=r=r||{})[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT";const v={debug:r.DEBUG,verbose:r.VERBOSE,info:r.INFO,warn:r.WARN,error:r.ERROR,silent:r.SILENT},E=r.INFO,_={[r.DEBUG]:"log",[r.VERBOSE]:"log",[r.INFO]:"info",[r.WARN]:"warn",[r.ERROR]:"error"},w=(e,t,...r)=>{if(!(t<e.logLevel)){var n=(new Date).toISOString(),o=_[t];if(!o)throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`);console[o](`[${n}]  ${e.name}:`,...r)}},m=new Map,k={activated:!1,tokenObservers:[]},b={initialized:!1,enabled:!1};function y(e){return m.get(e)||Object.assign({},k)}const A="https://content-firebaseappcheck.googleapis.com/v1",T="exchangeDebugToken",C={OFFSET_DURATION:3e5,RETRIAL_MIN_WAIT:3e4,RETRIAL_MAX_WAIT:96e4};class S{constructor(e,t,r,n,o){if(this.operation=e,this.retryPolicy=t,this.getWaitDuration=r,this.lowerBound=n,this.upperBound=o,this.pending=null,o<(this.nextErrorWaitInterval=n))throw new Error("Proactive refresh lower bound greater than upper bound!")}start(){this.nextErrorWaitInterval=this.lowerBound,this.process(!0).catch((()=>{}))}stop(){this.pending&&(this.pending.reject("cancelled"),this.pending=null)}isRunning(){return!!this.pending}async process(e){this.stop();try{this.pending=new h,this.pending.promise.catch((e=>{})),t=this.getNextRun(e),await new Promise((e=>{setTimeout(e,t)})),this.pending.resolve(),await this.pending.promise,this.pending=new h,this.pending.promise.catch((e=>{})),await this.operation(),this.pending.resolve(),await this.pending.promise,this.process(!0).catch((()=>{}))}catch(e){this.retryPolicy(e)?this.process(!1).catch((()=>{})):this.stop()}var t}getNextRun(e){if(e)return this.nextErrorWaitInterval=this.lowerBound,this.getWaitDuration();var t=this.nextErrorWaitInterval;return this.nextErrorWaitInterval*=2,this.nextErrorWaitInterval>this.upperBound&&(this.nextErrorWaitInterval=this.upperBound),t}}const R=new u("appCheck","AppCheck",{"already-initialized":"You have already called initializeAppCheck() for FirebaseApp {$appName} with different options. To avoid this error, call initializeAppCheck() with the same options as when it was originally called. This will return the already initialized instance.","use-before-activation":"App Check is being used before initializeAppCheck() is called for FirebaseApp {$appName}. Call initializeAppCheck() before instantiating other Firebase services.","fetch-network-error":"Fetch failed to connect to a network. Check Internet connection. Original error: {$originalErrorMessage}.","fetch-parse-error":"Fetch client could not parse response. Original error: {$originalErrorMessage}.","fetch-status-error":"Fetch server returned an HTTP error status. HTTP status: {$httpStatus}.","storage-open":"Error thrown when opening storage. Original error: {$originalErrorMessage}.","storage-get":"Error thrown when reading from storage. Original error: {$originalErrorMessage}.","storage-set":"Error thrown when writing to storage. Original error: {$originalErrorMessage}.","recaptcha-error":"ReCAPTCHA error.",throttled:"Requests throttled due to {$httpStatus} error. Attempts allowed again after {$time}"});function P(e=!1){var t;return e?null===(t=self.grecaptcha)||void 0===t?void 0:t.enterprise:self.grecaptcha}function I(e){if(!y(e).activated)throw R.create("use-before-activation",{appName:e.name})}function D(e){var t=Math.round(e/1e3),r=Math.floor(t/86400),n=Math.floor((t-3600*r*24)/3600),o=Math.floor((t-3600*r*24-3600*n)/60);t=t-3600*r*24-3600*n-60*o;let a="";return r&&(a+=O(r)+"d:"),n&&(a+=O(n)+"h:"),a+=O(o)+"m:"+O(t)+"s",a}function O(e){return 0===e?"00":10<=e?e.toString():"0"+e}async function x({url:e,body:t},r){const n={"Content-Type":"application/json"},o=r.getImmediate({optional:!0});!o||(c=await o.getHeartbeatsHeader())&&(n["X-Firebase-Client"]=c);var a={method:"POST",body:JSON.stringify(t),headers:n};let i,s;try{i=await fetch(e,a)}catch(e){throw R.create("fetch-network-error",{originalErrorMessage:null==e?void 0:e.message})}if(200!==i.status)throw R.create("fetch-status-error",{httpStatus:i.status});try{s=await i.json()}catch(e){throw R.create("fetch-parse-error",{originalErrorMessage:null==e?void 0:e.message})}var c=s.ttl.match(/^([\d.]+)(s)$/);if(!c||!c[2]||isNaN(Number(c[1])))throw R.create("fetch-parse-error",{originalErrorMessage:`ttl field (timeToLive) is not in standard Protobuf Duration format: ${s.ttl}`});return a=1e3*Number(c[1]),c=Date.now(),{token:s.token,expireTimeMillis:c+a,issuedAtTimeMillis:c}}function N(e,t){var{projectId:r,appId:n,apiKey:o}=e.options;return{url:`${A}/projects/${r}/apps/${n}:${T}?key=${o}`,body:{debug_token:t}}}const M="firebase-app-check-database",L=1,B="firebase-app-check-store",H="debug-token";let $=null;function j(){return $||($=new Promise(((e,t)=>{try{const r=indexedDB.open(M,L);r.onsuccess=t=>{e(t.target.result)},r.onerror=e=>{var r;t(R.create("storage-open",{originalErrorMessage:null===(r=e.target.error)||void 0===r?void 0:r.message}))},r.onupgradeneeded=e=>{const t=e.target.result;0===e.oldVersion&&t.createObjectStore(B,{keyPath:"compositeKey"})}}catch(e){t(R.create("storage-open",{originalErrorMessage:null==e?void 0:e.message}))}})),$)}async function W(e,t){const r=(await j()).transaction(B,"readwrite"),n=r.objectStore(B).put({compositeKey:e,value:t});return new Promise(((e,t)=>{n.onsuccess=t=>{e()},r.onerror=e=>{var r;t(R.create("storage-set",{originalErrorMessage:null===(r=e.target.error)||void 0===r?void 0:r.message}))}}))}async function F(e){const t=(await j()).transaction(B,"readonly"),r=t.objectStore(B).get(e);return new Promise(((e,n)=>{r.onsuccess=t=>{var r=t.target.result;e(r?r.value:void 0)},t.onerror=e=>{var t;n(R.create("storage-get",{originalErrorMessage:null===(t=e.target.error)||void 0===t?void 0:t.message}))}}))}function V(e){return`${e.options.appId}-${e.name}`}const K=new class{constructor(e){this.name=e,this._logLevel=E,this._logHandler=w,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in r))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel="string"==typeof e?v[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if("function"!=typeof e)throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,r.DEBUG,...e),this._logHandler(this,r.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,r.VERBOSE,...e),this._logHandler(this,r.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,r.INFO,...e),this._logHandler(this,r.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,r.WARN,...e),this._logHandler(this,r.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,r.ERROR,...e),this._logHandler(this,r.ERROR,...e)}}("@firebase/app-check");function z(e,t){return l()?W(V(e),t).catch((e=>{K.warn(`Failed to write token to IndexedDB. Error: ${e}`)})):Promise.resolve()}function U(){return b.enabled}async function q(){var e=b;if(e.enabled&&e.token)return e.token.promise;throw Error("\n            Can't get debug token in production mode.\n        ")}const G={error:"UNKNOWN_ERROR"};async function X(e,t=!1){var r=e.app;I(r);const n=y(r);let o,a=n.token;if(a&&!ee(a)&&(n.token=void 0,a=void 0),a||(c=await n.cachedTokenPromise)&&(ee(c)?a=c:await z(r,void 0)),!t&&a&&ee(a))return{token:a.token};let i,s=!1;if(U()){n.exchangeTokenPromise||(n.exchangeTokenPromise=x(N(r,await q()),e.heartbeatServiceProvider).finally((()=>{n.exchangeTokenPromise=void 0})),s=!0);var c=await n.exchangeTokenPromise;return await z(r,c),{token:(n.token=c).token}}try{n.exchangeTokenPromise||(n.exchangeTokenPromise=n.provider.getToken().finally((()=>{n.exchangeTokenPromise=void 0})),s=!0),a=await y(r).exchangeTokenPromise}catch(e){"appCheck/throttled"===e.code?K.warn(e.message):K.error(e),o=e}return a?o?i=ee(a)?{token:a.token,internalError:o}:te(o):(i={token:a.token},n.token=a,await z(r,a)):i=te(o),s&&Q(r,i),i}function J(e,t,r,n){var o=e.app;const a=y(o);if(o={next:r,error:n,type:t},a.tokenObservers=[...a.tokenObservers,o],a.token&&ee(a.token)){const t=a.token;Promise.resolve().then((()=>{r({token:t.token}),Z(e)})).catch((()=>{}))}a.cachedTokenPromise.then((()=>Z(e)))}function Y(e,t){const r=y(e);var n=r.tokenObservers.filter((e=>e.next!==t));0===n.length&&r.tokenRefresher&&r.tokenRefresher.isRunning()&&r.tokenRefresher.stop(),r.tokenObservers=n}function Z(e){const t=y(e.app);let r=t.tokenRefresher;r||(r=function(e){const t=e.app;return new S((async()=>{let r;if(r=y(t).token?await X(e,!0):await X(e),r.error)throw r.error;if(r.internalError)throw r.internalError}),(()=>!0),(()=>{if((r=y(t)).token){var e=r.token.issuedAtTimeMillis+.5*(r.token.expireTimeMillis-r.token.issuedAtTimeMillis)+3e5,r=r.token.expireTimeMillis-3e5;return e=Math.min(e,r),Math.max(0,e-Date.now())}return 0}),C.RETRIAL_MIN_WAIT,C.RETRIAL_MAX_WAIT)}(e),t.tokenRefresher=r),!r.isRunning()&&t.isTokenAutoRefreshEnabled&&r.start()}function Q(e,t){for(const r of y(e).tokenObservers)try{"EXTERNAL"===r.type&&null!=t.error?r.error(t.error):r.next(t)}catch(e){}}function ee(e){return 0<e.expireTimeMillis-Date.now()}function te(e){return{token:(t=G,i.encodeString(JSON.stringify(t),!1)),error:e};var t}class re{constructor(e,t){this.app=e,this.heartbeatServiceProvider=t}_delete(){var e=y(this.app).tokenObservers;for(const t of e)Y(this.app,t.next);return Promise.resolve()}}function ne(e,t,r,n,o){r.ready((()=>{!function(e,t,r,n){const o=r.render(n,{sitekey:t,size:"invisible",callback:()=>{y(e).reCAPTCHAState.succeeded=!0},"error-callback":()=>{y(e).reCAPTCHAState.succeeded=!1}}),a=y(e);a.reCAPTCHAState=Object.assign(Object.assign({},a.reCAPTCHAState),{widgetId:o})}(e,t,r,n),o.resolve(r)}))}function oe(e){var t=`fire_app_check_${e.name}`;const r=document.createElement("div");return r.id=t,r.style.display="none",document.body.appendChild(r),t}async function ae(e){I(e);const t=await y(e).reCAPTCHAState.initialized.promise;return new Promise(((r,n)=>{const o=y(e).reCAPTCHAState;t.ready((()=>{r(t.execute(o.widgetId,{action:"fire_app_check"}))}))}))}class ie{constructor(e){this._siteKey=e,this._throttleData=null}async getToken(){var e;le(this._throttleData);var t=await ae(this._app).catch((e=>{throw R.create("recaptcha-error")}));if(null===(e=y(this._app).reCAPTCHAState)||void 0===e||!e.succeeded)throw R.create("recaptcha-error");let r;try{r=await x(function(e,t){var{projectId:r,appId:n,apiKey:o}=e.options;return{url:`${A}/projects/${r}/apps/${n}:exchangeRecaptchaV3Token?key=${o}`,body:{recaptcha_v3_token:t}}}(this._app,t),this._heartbeatServiceProvider)}catch(e){throw null!==(t=e.code)&&void 0!==t&&t.includes("fetch-status-error")?(this._throttleData=he(Number(null===(t=e.customData)||void 0===t?void 0:t.httpStatus),this._throttleData),R.create("throttled",{time:D(this._throttleData.allowRequestsAfter-Date.now()),httpStatus:this._throttleData.httpStatus})):e}return this._throttleData=null,r}initialize(e){this._app=e,this._heartbeatServiceProvider=t._getProvider(e,"heartbeat"),function(e,t){const r=new h;y(e).reCAPTCHAState={initialized:r};const n=oe(e);var o=P(!1);return o?ne(e,t,o,n,r):function(e){const t=document.createElement("script");t.src="https://www.google.com/recaptcha/api.js",t.onload=e,document.head.appendChild(t)}((()=>{var o=P(!1);if(!o)throw new Error("no recaptcha");ne(e,t,o,n,r)})),r.promise}(e,this._siteKey).catch((()=>{}))}isEqual(e){return e instanceof ie&&this._siteKey===e._siteKey}}class se{constructor(e){this._siteKey=e,this._throttleData=null}async getToken(){var e;le(this._throttleData);var t=await ae(this._app).catch((e=>{throw R.create("recaptcha-error")}));if(null===(e=y(this._app).reCAPTCHAState)||void 0===e||!e.succeeded)throw R.create("recaptcha-error");let r;try{r=await x(function(e,t){var{projectId:r,appId:n,apiKey:o}=e.options;return{url:`${A}/projects/${r}/apps/${n}:exchangeRecaptchaEnterpriseToken?key=${o}`,body:{recaptcha_enterprise_token:t}}}(this._app,t),this._heartbeatServiceProvider)}catch(e){throw null!==(t=e.code)&&void 0!==t&&t.includes("fetch-status-error")?(this._throttleData=he(Number(null===(t=e.customData)||void 0===t?void 0:t.httpStatus),this._throttleData),R.create("throttled",{time:D(this._throttleData.allowRequestsAfter-Date.now()),httpStatus:this._throttleData.httpStatus})):e}return this._throttleData=null,r}initialize(e){this._app=e,this._heartbeatServiceProvider=t._getProvider(e,"heartbeat"),function(e,t){const r=new h;y(e).reCAPTCHAState={initialized:r};const n=oe(e);var o=P(!0);return o?ne(e,t,o,n,r):function(e){const t=document.createElement("script");t.src="https://www.google.com/recaptcha/enterprise.js",t.onload=e,document.head.appendChild(t)}((()=>{var o=P(!0);if(!o)throw new Error("no recaptcha");ne(e,t,o,n,r)})),r.promise}(e,this._siteKey).catch((()=>{}))}isEqual(e){return e instanceof se&&this._siteKey===e._siteKey}}class ce{constructor(e){this._customProviderOptions=e}async getToken(){var e=await this._customProviderOptions.getToken(),t=function(e){const t=function(e){let t={},r={},n={},o="";try{var a=e.split(".");t=g(c(a[0])||""),r=g(c(a[1])||""),o=a[2],n=r.d||{},delete r.d}catch(e){}return{header:t,claims:r,data:n,signature:o}}(e).claims;return"object"==typeof t&&t.hasOwnProperty("iat")?t.iat:null}(e.token);return t=null!==t&&t<Date.now()&&0<t?1e3*t:Date.now(),Object.assign(Object.assign({},e),{issuedAtTimeMillis:t})}initialize(e){this._app=e}isEqual(e){return e instanceof ce&&this._customProviderOptions.getToken.toString()===e._customProviderOptions.getToken.toString()}}function he(e,t){if(404===e||403===e)return{backoffCount:1,allowRequestsAfter:Date.now()+864e5,httpStatus:e};var r,n=t?t.backoffCount:0,o=(t=2,r=1e3*Math.pow(t,n),o=Math.round(.5*r*(Math.random()-.5)*2),Math.min(144e5,r+o));return{backoffCount:n+1,allowRequestsAfter:Date.now()+o,httpStatus:e}}function le(e){if(e&&Date.now()-e.allowRequestsAfter<=0)throw R.create("throttled",{time:D(e.allowRequestsAfter-Date.now()),httpStatus:e.httpStatus})}function pe(e=t.getApp(),r){var n;e=(n=e)&&n._delegate?n._delegate:n;const o=t._getProvider(e,"app-check");if(b.initialized||function(){var e=function(){if("undefined"!=typeof self)return self;if("undefined"!=typeof window)return window;if("undefined"!=typeof global)return global;throw new Error("Unable to locate global object.")}();const t=b;if(t.initialized=!0,"string"==typeof e.FIREBASE_APPCHECK_DEBUG_TOKEN||!0===e.FIREBASE_APPCHECK_DEBUG_TOKEN){t.enabled=!0;const r=new h;t.token=r,"string"==typeof e.FIREBASE_APPCHECK_DEBUG_TOKEN?r.resolve(e.FIREBASE_APPCHECK_DEBUG_TOKEN):r.resolve(async function(){let e;try{e=await F(H)}catch(e){}if(e)return e;var t="xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,(e=>{const t=16*Math.random()|0;return("x"===e?t:3&t|8).toString(16)}));return W(H,t).catch((e=>K.warn(`Failed to persist debug token to IndexedDB. Error: ${e}`))),t}())}}(),U()&&q().then((e=>console.log(`App Check debug token: ${e}. You will need to add it to your app's App Check settings in the Firebase console for it to work.`))),o.isInitialized()){var a=o.getImmediate();const t=o.getOptions();if(t.isTokenAutoRefreshEnabled===r.isTokenAutoRefreshEnabled&&t.provider.isEqual(r.provider))return a;throw R.create("already-initialized",{appName:e.name})}return a=o.initialize({options:r}),function(e,t,r){const n=function(e,t){return m.set(e,t),m.get(e)}(e,Object.assign({},k));n.activated=!0,n.provider=t,n.cachedTokenPromise=async function(e){if(l()){let t;try{t=await F(V(e))}catch(e){K.warn(`Failed to read token from IndexedDB. Error: ${e}`)}return t}}(e).then((t=>(t&&ee(t)&&(n.token=t,Q(e,{token:t.token})),t))),n.isTokenAutoRefreshEnabled=void 0===r?e.automaticDataCollectionEnabled:r,n.provider.initialize(e)}(e,r.provider,r.isTokenAutoRefreshEnabled),y(e).isTokenAutoRefreshEnabled&&J(a,"INTERNAL",(()=>{})),a}const ue="app-check-internal";t._registerComponent(new f("app-check",(e=>{var t=e.getProvider("app").getImmediate(),r=e.getProvider("heartbeat");return new re(t,e=r)}),"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback(((e,t,r)=>{e.getProvider(ue).initialize()}))),t._registerComponent(new f(ue,(e=>function(e){return{getToken:t=>X(e,t),getLimitedUseToken:()=>async function(e){var t=e.app;I(t);const r=y(t).provider;if(U()){var n=(await x(N(t,await q()),e.heartbeatServiceProvider)).token;return{token:n}}return{token:n=(await r.getToken()).token}}(e),addTokenListener:t=>J(e,"INTERNAL",t),removeTokenListener:t=>Y(e.app,t)}}(e.getProvider("app-check").getImmediate())),"PUBLIC").setInstantiationMode("EXPLICIT")),t.registerVersion("@firebase/app-check","0.8.4");const de=new u("appCheck","AppCheck",{"use-before-activation":"App Check is being used before activate() is called for FirebaseApp {$appName}. Call activate() before instantiating other Firebase services."});class ge{constructor(e){this.app=e}activate(e,t){let r;r="string"==typeof e?new ie(e):e instanceof se||e instanceof ie||e instanceof ce?e:new ce({getToken:e.getToken}),this._delegate=pe(this.app,{provider:r,isTokenAutoRefreshEnabled:t})}setTokenAutoRefreshEnabled(e){if(!this._delegate)throw de.create("use-before-activation",{appName:this.app.name});!function(e,t){const r=y(e.app);r.tokenRefresher&&(!0===t?r.tokenRefresher.start():r.tokenRefresher.stop()),r.isTokenAutoRefreshEnabled=t}(this._delegate,e)}getToken(e){if(!this._delegate)throw de.create("use-before-activation",{appName:this.app.name});return async function(e,t){var r=await X(e,t);if(r.error)throw r.error;return{token:r.token}}(this._delegate,e)}onTokenChanged(e,t,r){if(!this._delegate)throw de.create("use-before-activation",{appName:this.app.name});return function(e,t,r){let n=()=>{},o=()=>{};return n=null!=t.next?t.next.bind(t):t,null!=t.error?o=t.error.bind(t):r&&(o=r),J(e,"EXTERNAL",n,o),()=>Y(e.app,n)}(this._delegate,e,t)}}a.default.INTERNAL.registerComponent(new f("appCheck-compat",(e=>{var t=e.getProvider("app-compat").getImmediate();return new ge(t)}),"PUBLIC").setServiceProps({ReCaptchaEnterpriseProvider:se,ReCaptchaV3Provider:ie,CustomProvider:ce})),a.default.registerVersion("@firebase/app-check-compat","0.3.11")}).apply(this,arguments)}catch(e){throw console.error(e),new Error("Cannot instantiate firebase-app-check-compat.js - be sure to load firebase-app.js first.")}}));