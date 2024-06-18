!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(require("@firebase/app-compat"),require("@firebase/app")):"function"==typeof define&&define.amd?define(["@firebase/app-compat","@firebase/app"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).firebase,e.firebase.INTERNAL.modularAPIs)}(this,(function(e,t){"use strict";try{(function(){var n,a,r,i=(r=e)&&"object"==typeof r&&"default"in r?r:{default:r};(ze=n=n||{})[ze.DEBUG=0]="DEBUG",ze[ze.VERBOSE=1]="VERBOSE",ze[ze.INFO=2]="INFO",ze[ze.WARN=3]="WARN",ze[ze.ERROR=4]="ERROR",ze[ze.SILENT=5]="SILENT";const o={debug:n.DEBUG,verbose:n.VERBOSE,info:n.INFO,warn:n.WARN,error:n.ERROR,silent:n.SILENT},s=n.INFO,c={[n.DEBUG]:"log",[n.VERBOSE]:"log",[n.INFO]:"info",[n.WARN]:"warn",[n.ERROR]:"error"},l=(e,t,...n)=>{if(!(t<e.logLevel)){var a=(new Date).toISOString(),r=c[t];if(!r)throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`);console[r](`[${a}]  ${e.name}:`,...n)}};function u(){var e="object"==typeof chrome?chrome.runtime:"object"==typeof browser?browser.runtime:void 0;return"object"==typeof e&&void 0!==e.id}function d(){try{return"object"==typeof indexedDB}catch(e){return}}function p(){return new Promise(((e,t)=>{try{let n=!0;const a="validate-browser-context-for-indexeddb-analytics-module",r=self.indexedDB.open(a);r.onsuccess=()=>{r.result.close(),n||self.indexedDB.deleteDatabase(a),e(!0)},r.onupgradeneeded=()=>{n=!1},r.onerror=()=>{var e;t((null===(e=r.error)||void 0===e?void 0:e.message)||"")}}catch(e){t(e)}}))}function f(){return!("undefined"==typeof navigator||!navigator.cookieEnabled)}class g extends Error{constructor(e,t,n){super(t),this.code=e,this.customData=n,this.name="FirebaseError",Object.setPrototypeOf(this,g.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,h.prototype.create)}}class h{constructor(e,t,n){this.service=e,this.serviceName=t,this.errors=n}create(e,...t){var n,a=t[0]||{},r=`${this.service}/${e}`,i=(i=this.errors[e])?(n=a,i.replace(m,((e,t)=>{var a=n[t];return null!=a?String(a):`<${t}?>`}))):"Error";return i=`${this.serviceName}: ${i} (${r}).`,new g(r,i,a)}}const m=/\{\$([^}]+)}/g,v=1e3,w=2,y=144e5,I=.5;function b(e,t=v,n=w){var a=t*Math.pow(n,e),r=Math.round(I*a*(Math.random()-.5)*2);return Math.min(y,a+r)}function E(e){return e&&e._delegate?e._delegate:e}class _{constructor(e,t,n){this.name=e,this.instanceFactory=t,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}const T=(e,t)=>t.some((t=>e instanceof t));let S,C;const D=new WeakMap,L=new WeakMap,O=new WeakMap,P=new WeakMap,N=new WeakMap;let A={get(e,t,n){if(e instanceof IDBTransaction){if("done"===t)return L.get(e);if("objectStoreNames"===t)return e.objectStoreNames||O.get(e);if("store"===t)return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return k(e[t])},set:(e,t,n)=>(e[t]=n,!0),has:(e,t)=>e instanceof IDBTransaction&&("done"===t||"store"===t)||t in e};function k(e){if(e instanceof IDBRequest)return function(e){const t=new Promise(((t,n)=>{const a=()=>{e.removeEventListener("success",r),e.removeEventListener("error",i)},r=()=>{t(k(e.result)),a()},i=()=>{n(e.error),a()};e.addEventListener("success",r),e.addEventListener("error",i)}));return t.then((t=>{t instanceof IDBCursor&&D.set(t,e)})).catch((()=>{})),N.set(t,e),t}(e);if(P.has(e))return P.get(e);var t=function(e){return"function"==typeof e?function(e){return e!==IDBDatabase.prototype.transaction||"objectStoreNames"in IDBTransaction.prototype?(C=C||[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey]).includes(e)?function(...t){return e.apply(R(this),t),k(D.get(this))}:function(...t){return k(e.apply(R(this),t))}:function(t,...n){var a=e.call(R(this),t,...n);return O.set(a,t.sort?t.sort():[t]),k(a)}}(e):(e instanceof IDBTransaction&&(t=e,L.has(t)||(n=new Promise(((e,n)=>{const a=()=>{t.removeEventListener("complete",r),t.removeEventListener("error",i),t.removeEventListener("abort",i)},r=()=>{e(),a()},i=()=>{n(t.error||new DOMException("AbortError","AbortError")),a()};t.addEventListener("complete",r),t.addEventListener("error",i),t.addEventListener("abort",i)})),L.set(t,n))),T(e,S=S||[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])?new Proxy(e,A):e);var t,n}(e);return t!==e&&(P.set(e,t),N.set(t,e)),t}const R=e=>N.get(e),j=["get","getKey","getAll","getAllKeys","count"],M=["put","add","delete","clear"],$=new Map;function B(e,t){if(e instanceof IDBDatabase&&!(t in e)&&"string"==typeof t){if($.get(t))return $.get(t);const e=t.replace(/FromIndex$/,""),a=t!==e,r=M.includes(e);if(e in(a?IDBIndex:IDBObjectStore).prototype&&(r||j.includes(e))){var n=async function(t,...n){var i=this.transaction(t,r?"readwrite":"readonly");let o=i.store;return a&&(o=o.index(n.shift())),(await Promise.all([o[e](...n),r&&i.done]))[0]};return $.set(t,n),n}}}A={...a=A,get:(e,t,n)=>B(e,t)||a.get(e,t,n),has:(e,t)=>!!B(e,t)||a.has(e,t)};var F="@firebase/installations",H="0.6.7";const x=1e4,V=`w:${H}`,q="FIS_v2",U="https://firebaseinstallations.googleapis.com/v1",W=new h("installations","Installations",{"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."});function G(e){return e instanceof g&&e.code.includes("request-failed")}function K({projectId:e}){return`${U}/projects/${e}/installations`}function z(e){return{token:e.token,requestStatus:2,expiresIn:(e=e.expiresIn,Number(e.replace("s","000"))),creationTime:Date.now()}}async function J(e,t){var n=(await t.json()).error;return W.create("request-failed",{requestName:e,serverCode:n.code,serverMessage:n.message,serverStatus:n.status})}function Y({apiKey:e}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":e})}async function X(e){var t=await e();return 500<=t.status&&t.status<600?e():t}function Z(e){return new Promise((t=>{setTimeout(t,e)}))}const Q=/^[cdef][\w-]{21}$/,ee="";function te(){try{const t=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(t),t[0]=112+t[0]%16;var e=function(e){const t=function(e){return btoa(String.fromCharCode(...e)).replace(/\+/g,"-").replace(/\//g,"_")}(e);return t.substr(0,22)}(t);return Q.test(e)?e:ee}catch(e){return ee}}function ne(e){return`${e.appName}!${e.appId}`}const ae=new Map;function re(e,t){var n=ne(e);ie(n,t),function(e,t){const n=(!oe&&"BroadcastChannel"in self&&(oe=new BroadcastChannel("[Firebase] FID Change"),oe.onmessage=e=>{ie(e.data.key,e.data.fid)}),oe);n&&n.postMessage({key:e,fid:t}),0===ae.size&&oe&&(oe.close(),oe=null)}(n,t)}function ie(e,t){var n=ae.get(e);if(n)for(const e of n)e(t)}let oe=null;const se="firebase-installations-store";let ce=null;function le(){return ce=ce||function(e,t,{blocked:n,upgrade:a,blocking:r,terminated:i}){const o=indexedDB.open(e,t),s=k(o);return a&&o.addEventListener("upgradeneeded",(e=>{a(k(o.result),e.oldVersion,e.newVersion,k(o.transaction),e)})),n&&o.addEventListener("blocked",(e=>n(e.oldVersion,e.newVersion,e))),s.then((e=>{i&&e.addEventListener("close",(()=>i())),r&&e.addEventListener("versionchange",(e=>r(e.oldVersion,e.newVersion,e)))})).catch((()=>{})),s}("firebase-installations-database",1,{upgrade:(e,t)=>{0===t&&e.createObjectStore(se)}}),ce}async function ue(e,t){var n=ne(e);const a=(await le()).transaction(se,"readwrite"),r=a.objectStore(se);var i=await r.get(n);return await r.put(t,n),await a.done,i&&i.fid===t.fid||re(e,t.fid),t}async function de(e){var t=ne(e);const n=(await le()).transaction(se,"readwrite");await n.objectStore(se).delete(t),await n.done}async function pe(e,t){var n=ne(e);const a=(await le()).transaction(se,"readwrite"),r=a.objectStore(se);var i=await r.get(n),o=t(i);return void 0===o?await r.delete(n):await r.put(o,n),await a.done,!o||i&&i.fid===o.fid||re(e,o.fid),o}async function fe(e){let t;var n=await pe(e.appConfig,(n=>{var a=he(n||{fid:te(),registrationStatus:0});return a=function(e,t){if(0!==t.registrationStatus)return 1===t.registrationStatus?{installationEntry:t,registrationPromise:async function(e){let t=await ge(e.appConfig);for(;1===t.registrationStatus;)await Z(100),t=await ge(e.appConfig);if(0!==t.registrationStatus)return t;var{installationEntry:n,registrationPromise:a}=await fe(e);return a||n}(e)}:{installationEntry:t};if(!navigator.onLine)return{installationEntry:t,registrationPromise:a=Promise.reject(W.create("app-offline"))};var n={fid:t.fid,registrationStatus:1,registrationTime:Date.now()},a=async function(e,t){try{var n=await async function({appConfig:e,heartbeatServiceProvider:t},{fid:n}){const a=K(e),r=Y(e),i=t.getImmediate({optional:!0});!i||(o=await i.getHeartbeatsHeader())&&r.append("x-firebase-client",o);var o={fid:n,authVersion:q,appId:e.appId,sdkVersion:V};const s={method:"POST",headers:r,body:JSON.stringify(o)},c=await X((()=>fetch(a,s)));if(c.ok)return{fid:(o=await c.json()).fid||n,registrationStatus:2,refreshToken:o.refreshToken,authToken:z(o.authToken)};throw await J("Create Installation",c)}(e,t);return ue(e.appConfig,n)}catch(n){throw G(n)&&409===n.customData.serverCode?await de(e.appConfig):await ue(e.appConfig,{fid:t.fid,registrationStatus:0}),n}}(e,n);return{installationEntry:n,registrationPromise:a}}(e,a),t=a.registrationPromise,a.installationEntry}));return n.fid===ee?{installationEntry:await t}:{installationEntry:n,registrationPromise:t}}function ge(e){return pe(e,(e=>{if(!e)throw W.create("installation-not-found");return he(e)}))}function he(e){return 1===(t=e).registrationStatus&&t.registrationTime+x<Date.now()?{fid:e.fid,registrationStatus:0}:e;var t}async function me(e,t=!1){let n;var a=await pe(e.appConfig,(a=>{if(!we(a))throw W.create("not-registered");var r,i=a.authToken;if(t||2!==(r=i).requestStatus||function(e){var t=Date.now();return t<e.creationTime||e.creationTime+e.expiresIn<t+36e5}(r)){if(1===i.requestStatus)return n=async function(e,t){let n=await ve(e.appConfig);for(;1===n.authToken.requestStatus;)await Z(100),n=await ve(e.appConfig);var a=n.authToken;return 0===a.requestStatus?me(e,t):a}(e,t),a;if(!navigator.onLine)throw W.create("app-offline");return r=a,i={requestStatus:1,requestTime:Date.now()},i=Object.assign(Object.assign({},r),{authToken:i}),n=async function(e,t){try{var n=await async function({appConfig:e,heartbeatServiceProvider:t},n){const a=([r,i]=[e,n.fid],`${K(r)}/${i}/authTokens:generate`);var r,i;const o=function(e,{refreshToken:t}){const n=Y(e);return n.append("Authorization",`${q} ${t}`),n}(e,n),s=t.getImmediate({optional:!0});!s||(c=await s.getHeartbeatsHeader())&&o.append("x-firebase-client",c);var c={installation:{sdkVersion:V,appId:e.appId}};const l={method:"POST",headers:o,body:JSON.stringify(c)},u=await X((()=>fetch(a,l)));if(u.ok)return z(await u.json());throw await J("Generate Auth Token",u)}(e,t),a=Object.assign(Object.assign({},t),{authToken:n});return await ue(e.appConfig,a),n}catch(a){throw!G(a)||401!==a.customData.serverCode&&404!==a.customData.serverCode?(n=Object.assign(Object.assign({},t),{authToken:{requestStatus:0}}),await ue(e.appConfig,n)):await de(e.appConfig),a}}(e,i),i}return a}));return n?await n:a.authToken}function ve(e){return pe(e,(e=>{if(!we(e))throw W.create("not-registered");var t;return 1===(t=e.authToken).requestStatus&&t.requestTime+x<Date.now()?Object.assign(Object.assign({},e),{authToken:{requestStatus:0}}):e}))}function we(e){return void 0!==e&&2===e.registrationStatus}function ye(e){return W.create("missing-app-config-values",{valueName:e})}const Ie="installations";t._registerComponent(new _(Ie,(e=>{var n=e.getProvider("app").getImmediate();return{app:n,appConfig:function(e){if(!e||!e.options)throw ye("App Configuration");if(!e.name)throw ye("App Name");for(const t of["projectId","apiKey","appId"])if(!e.options[t])throw ye(t);return{appName:e.name,projectId:e.options.projectId,apiKey:e.options.apiKey,appId:e.options.appId}}(n),heartbeatServiceProvider:t._getProvider(n,"heartbeat"),_delete:()=>Promise.resolve()}}),"PUBLIC")),t._registerComponent(new _("installations-internal",(e=>{var n=e.getProvider("app").getImmediate();const a=t._getProvider(n,Ie).getImmediate();return{getId:()=>async function(e){var t=e;const{installationEntry:n,registrationPromise:a}=await fe(t);return(a||me(t)).catch(console.error),n.fid}(a),getToken:e=>async function(e,t=!1){var n,a=e;return await((n=(await fe(a)).registrationPromise)&&await n),(await me(a,t)).token}(a,e)}}),"PRIVATE")),t.registerVersion(F,H),t.registerVersion(F,H,"esm2017");const be="analytics",Ee="firebase_id",_e="origin",Te="https://firebase.googleapis.com/v1alpha/projects/-/apps/{app-id}/webConfig",Se="https://www.googletagmanager.com/gtag/js",Ce=new class{constructor(e){this.name=e,this._logLevel=s,this._logHandler=l,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in n))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel="string"==typeof e?o[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if("function"!=typeof e)throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,n.DEBUG,...e),this._logHandler(this,n.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,n.VERBOSE,...e),this._logHandler(this,n.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,n.INFO,...e),this._logHandler(this,n.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,n.WARN,...e),this._logHandler(this,n.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,n.ERROR,...e),this._logHandler(this,n.ERROR,...e)}}("@firebase/analytics"),De=new h("analytics","Analytics",{"already-exists":"A Firebase Analytics instance with the appId {$id}  already exists. Only one Firebase Analytics instance can be created for each appId.","already-initialized":"initializeAnalytics() cannot be called again with different options than those it was initially called with. It can be called again with the same options to return the existing instance, or getAnalytics() can be used to get a reference to the already-intialized instance.","already-initialized-settings":"Firebase Analytics has already been initialized.settings() must be called before initializing any Analytics instanceor it will have no effect.","interop-component-reg-failed":"Firebase Analytics Interop Component failed to instantiate: {$reason}","invalid-analytics-context":"Firebase Analytics is not supported in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","indexeddb-unavailable":"IndexedDB unavailable or restricted in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","fetch-throttle":"The config fetch request timed out while in an exponential backoff state. Unix timestamp in milliseconds when fetch request throttling ends: {$throttleEndTimeMillis}.","config-fetch-failed":"Dynamic config fetch failed: [{$httpStatus}] {$responseMessage}","no-api-key":'The "apiKey" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid API key.',"no-app-id":'The "appId" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid app ID.',"no-client-id":'The "client_id" field is empty.',"invalid-gtag-resource":"Trusted Types detected an invalid gtag resource: {$gtagURL}."});function Le(e){if(e.startsWith(Se))return e;var t=De.create("invalid-gtag-resource",{gtagURL:e});return Ce.warn(t.message),""}function Oe(e){return Promise.all(e.map((e=>e.catch((e=>e)))))}const Pe=30,Ne=new class{constructor(e={},t=1e3){this.throttleMetadata=e,this.intervalMillis=t}getThrottleMetadata(e){return this.throttleMetadata[e]}setThrottleMetadata(e,t){this.throttleMetadata[e]=t}deleteThrottleMetadata(e){delete this.throttleMetadata[e]}};async function Ae(e,t=Ne,n){var{appId:a,apiKey:r,measurementId:i}=e.options;if(!a)throw De.create("no-app-id");if(!r){if(i)return{measurementId:i,appId:a};throw De.create("no-api-key")}var o=t.getThrottleMetadata(a)||{backoffCount:0,throttleEndTimeMillis:Date.now()};const s=new Re;return setTimeout((async()=>{s.abort()}),void 0!==n?n:6e4),async function e(t,{throttleEndTimeMillis:n,backoffCount:a},r,i=Ne){var o;const{appId:s,measurementId:c}=t;try{await function(e,t){return new Promise(((n,a)=>{var r=Math.max(t-Date.now(),0);const i=setTimeout(n,r);e.addEventListener((()=>{clearTimeout(i),a(De.create("fetch-throttle",{throttleEndTimeMillis:t}))}))}))}(r,n)}catch(n){if(c)return Ce.warn(`Timed out fetching this Firebase app's measurement ID from the server. Falling back to the measurement ID ${c} provided in the "measurementId" field in the local Firebase config. [${null==n?void 0:n.message}]`),{appId:s,measurementId:c};throw n}try{const e=await async function(e){var t,{appId:n,apiKey:a}=e,a={method:"GET",headers:new Headers({Accept:"application/json","x-goog-api-key":a})},n=Te.replace("{app-id}",n);const r=await fetch(n,a);if(200===r.status||304===r.status)return r.json();{let n="";try{var i=await r.json();null!==(t=i.error)&&void 0!==t&&t.message&&(n=i.error.message)}catch(e){}throw De.create("config-fetch-failed",{httpStatus:r.status,responseMessage:n})}}(t);return i.deleteThrottleMetadata(s),e}catch(n){const l=n;if(!ke(l)){if(i.deleteThrottleMetadata(s),c)return Ce.warn(`Failed to fetch this Firebase app's measurement ID from the server. Falling back to the measurement ID ${c} provided in the "measurementId" field in the local Firebase config. [${null==l?void 0:l.message}]`),{appId:s,measurementId:c};throw n}const u=503===Number(null===(o=null==l?void 0:l.customData)||void 0===o?void 0:o.httpStatus)?b(a,i.intervalMillis,Pe):b(a,i.intervalMillis),d={throttleEndTimeMillis:Date.now()+u,backoffCount:a+1};return i.setThrottleMetadata(s,d),Ce.debug(`Calling attemptFetch again in ${u} millis`),e(t,d,r,i)}}({appId:a,apiKey:r,measurementId:i},o,s,t)}function ke(e){if(!(e instanceof g&&e.customData))return!1;var t=Number(e.customData.httpStatus);return 429===t||500===t||503===t||504===t}class Re{constructor(){this.listeners=[]}addEventListener(e){this.listeners.push(e)}abort(){this.listeners.forEach((e=>e()))}}class je{constructor(e){this.app=e}_delete(){return delete Me[this.app.options.appId],Promise.resolve()}}let Me={},$e=[];const Be={};let Fe,He,xe="dataLayer",Ve="gtag",qe=!1;function Ue(e,t,n){!function(){const e=[];var t;u()&&e.push("This is a browser extension environment."),f()||e.push("Cookies are not available."),0<e.length&&(t=e.map(((e,t)=>`(${t+1}) ${e}`)).join(" "),t=De.create("invalid-analytics-context",{errorInfo:t}),Ce.warn(t.message))}();var a,r,i=e.options.appId;if(!i)throw De.create("no-app-id");if(!e.options.apiKey){if(!e.options.measurementId)throw De.create("no-api-key");Ce.warn(`The "apiKey" field is empty in the local Firebase config. This is needed to fetch the latest measurement ID for this Firebase app. Falling back to the measurement ID ${e.options.measurementId} provided in the "measurementId" field in the local Firebase config.`)}if(null!=Me[i])throw De.create("already-exists",{id:i});return qe||(function(e){let t=[];Array.isArray(window[e])?t=window[e]:window[e]=t}(xe),({wrappedGtag:a,gtagCore:r}=function(e,t,n,a,r){let i=function(){window[a].push(arguments)};return window[r]&&"function"==typeof window[r]&&(i=window[r]),window[r]=function(e,t,n,a){return async function(r,...i){try{var o,s,c,l,u,d,p,f,g,h;"event"===r?([o,s]=i,await async function(e,t,n,a,r){try{let s=[];if(r&&r.send_to){let e=r.send_to;Array.isArray(e)||(e=[e]);const a=await Oe(n);for(const n of e){var i=a.find((e=>e.measurementId===n)),o=i&&t[i.appId];if(!o){s=[];break}s.push(o)}}0===s.length&&(s=Object.values(t)),await Promise.all(s),e("event",a,r||{})}catch(e){Ce.error(e)}}(e,t,n,o,s)):"config"===r?([c,l]=i,await async function(e,t,n,a,r,i){var o=a[r];try{if(o)await t[o];else{var s=(await Oe(n)).find((e=>e.measurementId===r));s&&await t[s.appId]}}catch(e){Ce.error(e)}e("config",r,i)}(e,t,n,a,c,l)):"consent"===r?([u,d]=i,e("consent",u,d)):"get"===r?([p,f,g]=i,e("get",p,f,g)):"set"===r?([h]=i,e("set",h)):e(r,...i)}catch(r){Ce.error(r)}}}(i,e,t,n),{gtagCore:i,wrappedGtag:window[r]}}(Me,$e,Be,xe,Ve)),He=a,Fe=r,qe=!0),Me[i]=async function(e,t,n,a,r,i,o){const s=Ae(e);s.then((t=>{n[t.measurementId]=t.appId,e.options.measurementId&&t.measurementId!==e.options.measurementId&&Ce.warn(`The measurement ID in the local Firebase config (${e.options.measurementId}) does not match the measurement ID fetched from the server (${t.measurementId}). To ensure analytics events are always sent to the correct Analytics property, update the measurement ID field in the local config or remove it from the local config.`)})).catch((e=>Ce.error(e))),t.push(s);var c=async function(){if(!d())return Ce.warn(De.create("indexeddb-unavailable",{errorInfo:"IndexedDB is not available in this environment."}).message),!1;try{await p()}catch(e){return Ce.warn(De.create("indexeddb-unavailable",{errorInfo:null==e?void 0:e.toString()}).message),!1}return!0}().then((e=>{if(e)return a.getId()})),[l,u]=await Promise.all([s,c]);!function(e){var t=window.document.getElementsByTagName("script");for(const n of Object.values(t))if(n.src&&n.src.includes(Se)&&n.src.includes(e))return n}(i)&&function(e,t){const n=function(e,t){let n;return window.trustedTypes&&(n=window.trustedTypes.createPolicy("firebase-js-sdk-policy",t)),n}(0,{createScriptURL:Le}),a=document.createElement("script");var r=`${Se}?l=${e}&id=${t}`;a.src=n?null==n?void 0:n.createScriptURL(r):r,a.async=!0,document.head.appendChild(a)}(i,l.measurementId),r("js",new Date);const f=null!==(c=null==o?void 0:o.config)&&void 0!==c?c:{};return f[_e]="firebase",f.update=!0,null!=u&&(f[Ee]=u),r("config",l.measurementId,f),l.measurementId}(e,$e,Be,t,Fe,xe,n),new je(e)}function We(e,t,n,a){e=E(e),async function(e,t,n,a,r){var i;r&&r.global?e("event",n,a):(i=await t,e("event",n,Object.assign(Object.assign({},a),{send_to:i})))}(He,Me[e.app.options.appId],t,n,a).catch((e=>Ce.error(e)))}const Ge="@firebase/analytics";var Ke,ze,Je;t._registerComponent(new _(be,((e,{options:t})=>Ue(e.getProvider("app").getImmediate(),e.getProvider("installations-internal").getImmediate(),t)),"PUBLIC")),t._registerComponent(new _("analytics-internal",(function(e){try{const t=e.getProvider(be).getImmediate();return{logEvent:(e,n,a)=>We(t,e,n,a)}}catch(e){throw De.create("interop-component-reg-failed",{reason:e})}}),"PRIVATE")),t.registerVersion(Ge,"0.10.4"),t.registerVersion(Ge,"0.10.4","esm2017");class Ye{constructor(e,t){this.app=e,this._delegate=t}logEvent(e,t,n){We(this._delegate,e,t,n)}setCurrentScreen(e,t){!function(e,t,n){e=E(e),async function(e,t,n,a){if(a&&a.global)return e("set",{screen_name:n}),Promise.resolve();e("config",await t,{update:!0,screen_name:n})}(He,Me[e.app.options.appId],t,n).catch((e=>Ce.error(e)))}(this._delegate,e,t)}setUserId(e,t){!function(e,t,n){e=E(e),async function(e,t,n,a){if(a&&a.global)return e("set",{user_id:n}),Promise.resolve();e("config",await t,{update:!0,user_id:n})}(He,Me[e.app.options.appId],t,n).catch((e=>Ce.error(e)))}(this._delegate,e,t)}setUserProperties(e,t){!function(e,t,n){e=E(e),async function(e,t,n,a){if(a&&a.global){const t={};for(const e of Object.keys(n))t[`user_properties.${e}`]=n[e];return e("set",t),Promise.resolve()}e("config",await t,{update:!0,user_properties:n})}(He,Me[e.app.options.appId],t,n).catch((e=>Ce.error(e)))}(this._delegate,e,t)}setAnalyticsCollectionEnabled(e){!function(e,t){e=E(e),async function(e,t){var n=await e;window[`ga-disable-${n}`]=!t}(Me[e.app.options.appId],t).catch((e=>Ce.error(e)))}(this._delegate,e)}}(ze=Ke=Ke||{}).ADD_SHIPPING_INFO="add_shipping_info",ze.ADD_PAYMENT_INFO="add_payment_info",ze.ADD_TO_CART="add_to_cart",ze.ADD_TO_WISHLIST="add_to_wishlist",ze.BEGIN_CHECKOUT="begin_checkout",ze.CHECKOUT_PROGRESS="checkout_progress",ze.EXCEPTION="exception",ze.GENERATE_LEAD="generate_lead",ze.LOGIN="login",ze.PAGE_VIEW="page_view",ze.PURCHASE="purchase",ze.REFUND="refund",ze.REMOVE_FROM_CART="remove_from_cart",ze.SCREEN_VIEW="screen_view",ze.SEARCH="search",ze.SELECT_CONTENT="select_content",ze.SELECT_ITEM="select_item",ze.SELECT_PROMOTION="select_promotion",ze.SET_CHECKOUT_OPTION="set_checkout_option",ze.SHARE="share",ze.SIGN_UP="sign_up",ze.TIMING_COMPLETE="timing_complete",ze.VIEW_CART="view_cart",ze.VIEW_ITEM="view_item",ze.VIEW_ITEM_LIST="view_item_list",ze.VIEW_PROMOTION="view_promotion",ze.VIEW_SEARCH_RESULTS="view_search_results",Je={Analytics:Ye,settings:function(e){if(qe)throw De.create("already-initialized");e.dataLayerName&&(xe=e.dataLayerName),e.gtagName&&(Ve=e.gtagName)},isSupported:async function(){if(u())return!1;if(!f())return!1;if(!d())return!1;try{return await p()}catch(e){return!1}},EventName:Ke},i.default.INTERNAL.registerComponent(new _("analytics-compat",(e=>{var t=e.getProvider("app-compat").getImmediate(),n=e.getProvider("analytics").getImmediate();return new Ye(t,n)}),"PUBLIC").setServiceProps(Je).setMultipleInstances(!0)),i.default.registerVersion("@firebase/analytics-compat","0.2.10")}).apply(this,arguments)}catch(e){throw console.error(e),new Error("Cannot instantiate firebase-analytics-compat.js - be sure to load firebase-app.js first.")}}));