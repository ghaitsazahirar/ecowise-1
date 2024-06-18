!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(require("@firebase/app-compat"),require("@firebase/app")):"function"==typeof define&&define.amd?define(["@firebase/app-compat","@firebase/app"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).firebase,e.firebase.INTERNAL.modularAPIs)}(this,(function(e,t){"use strict";try{(function(){var r,n,a,i=(a=e)&&"object"==typeof a&&"default"in a?a:{default:a};class o extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name="FirebaseError",Object.setPrototypeOf(this,o.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,s.prototype.create)}}class s{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){var r,n=t[0]||{},a=`${this.service}/${e}`,i=(i=this.errors[e])?(r=n,i.replace(c,((e,t)=>{var n=r[t];return null!=n?String(n):`<${t}?>`}))):"Error";return i=`${this.serviceName}: ${i} (${a}).`,new o(a,i,n)}}const c=/\{\$([^}]+)}/g;class l{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}(ve=r=r||{})[ve.DEBUG=0]="DEBUG",ve[ve.VERBOSE=1]="VERBOSE",ve[ve.INFO=2]="INFO",ve[ve.WARN=3]="WARN",ve[ve.ERROR=4]="ERROR",ve[ve.SILENT=5]="SILENT";const u={debug:r.DEBUG,verbose:r.VERBOSE,info:r.INFO,warn:r.WARN,error:r.ERROR,silent:r.SILENT},d=r.INFO,p={[r.DEBUG]:"log",[r.VERBOSE]:"log",[r.INFO]:"info",[r.WARN]:"warn",[r.ERROR]:"error"},f=(e,t,...r)=>{if(!(t<e.logLevel)){var n=(new Date).toISOString(),a=p[t];if(!a)throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`);console[a](`[${n}]  ${e.name}:`,...r)}},g=(e,t)=>t.some((t=>e instanceof t));let h,m;const v=new WeakMap,b=new WeakMap,w=new WeakMap,_=new WeakMap,y=new WeakMap;let E={get(e,t,r){if(e instanceof IDBTransaction){if("done"===t)return b.get(e);if("objectStoreNames"===t)return e.objectStoreNames||w.get(e);if("store"===t)return r.objectStoreNames[1]?void 0:r.objectStore(r.objectStoreNames[0])}return I(e[t])},set:(e,t,r)=>(e[t]=r,!0),has:(e,t)=>e instanceof IDBTransaction&&("done"===t||"store"===t)||t in e};function I(e){if(e instanceof IDBRequest)return function(e){const t=new Promise(((t,r)=>{const n=()=>{e.removeEventListener("success",a),e.removeEventListener("error",i)},a=()=>{t(I(e.result)),n()},i=()=>{r(e.error),n()};e.addEventListener("success",a),e.addEventListener("error",i)}));return t.then((t=>{t instanceof IDBCursor&&v.set(t,e)})).catch((()=>{})),y.set(t,e),t}(e);if(_.has(e))return _.get(e);var t=function(e){return"function"==typeof e?function(e){return e!==IDBDatabase.prototype.transaction||"objectStoreNames"in IDBTransaction.prototype?(m=m||[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey]).includes(e)?function(...t){return e.apply(T(this),t),I(v.get(this))}:function(...t){return I(e.apply(T(this),t))}:function(t,...r){var n=e.call(T(this),t,...r);return w.set(n,t.sort?t.sort():[t]),I(n)}}(e):(e instanceof IDBTransaction&&(t=e,b.has(t)||(r=new Promise(((e,r)=>{const n=()=>{t.removeEventListener("complete",a),t.removeEventListener("error",i),t.removeEventListener("abort",i)},a=()=>{e(),n()},i=()=>{r(t.error||new DOMException("AbortError","AbortError")),n()};t.addEventListener("complete",a),t.addEventListener("error",i),t.addEventListener("abort",i)})),b.set(t,r))),g(e,h=h||[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])?new Proxy(e,E):e);var t,r}(e);return t!==e&&(_.set(e,t),y.set(t,e)),t}const T=e=>y.get(e),S=["get","getKey","getAll","getAllKeys","count"],k=["put","add","delete","clear"],N=new Map;function C(e,t){if(e instanceof IDBDatabase&&!(t in e)&&"string"==typeof t){if(N.get(t))return N.get(t);const e=t.replace(/FromIndex$/,""),n=t!==e,a=k.includes(e);if(e in(n?IDBIndex:IDBObjectStore).prototype&&(a||S.includes(e))){var r=async function(t,...r){var i=this.transaction(t,a?"readwrite":"readonly");let o=i.store;return n&&(o=o.index(r.shift())),(await Promise.all([o[e](...r),a&&i.done]))[0]};return N.set(t,r),r}}}E={...n=E,get:(e,t,r)=>C(e,t)||n.get(e,t,r),has:(e,t)=>!!C(e,t)||n.has(e,t)};var R="@firebase/installations";const A=1e4,O="w:"+(we="0.6.7"),M="FIS_v2",P="https://firebaseinstallations.googleapis.com/v1",L=new s("installations","Installations",{"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."});function D(e){return e instanceof o&&e.code.includes("request-failed")}function B({projectId:e}){return`${P}/projects/${e}/installations`}function j(e){return{token:e.token,requestStatus:2,expiresIn:(e=e.expiresIn,Number(e.replace("s","000"))),creationTime:Date.now()}}async function $(e,t){var r=(await t.json()).error;return L.create("request-failed",{requestName:e,serverCode:r.code,serverMessage:r.message,serverStatus:r.status})}function U({apiKey:e}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":e})}async function F(e){var t=await e();return 500<=t.status&&t.status<600?e():t}function q(e){return new Promise((t=>{setTimeout(t,e)}))}const H=/^[cdef][\w-]{21}$/,V="";function x(){try{const t=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(t),t[0]=112+t[0]%16;var e=function(e){const t=function(e){return btoa(String.fromCharCode(...e)).replace(/\+/g,"-").replace(/\//g,"_")}(e);return t.substr(0,22)}(t);return H.test(e)?e:V}catch(e){return V}}function W(e){return`${e.appName}!${e.appId}`}const K=new Map;function z(e,t){var r=W(e);G(r,t),function(e,t){const r=(!J&&"BroadcastChannel"in self&&(J=new BroadcastChannel("[Firebase] FID Change"),J.onmessage=e=>{G(e.data.key,e.data.fid)}),J);r&&r.postMessage({key:e,fid:t}),0===K.size&&J&&(J.close(),J=null)}(r,t)}function G(e,t){var r=K.get(e);if(r)for(const e of r)e(t)}let J=null;const Y="firebase-installations-store";let Z=null;function Q(){return Z=Z||function(e,t,{blocked:r,upgrade:n,blocking:a,terminated:i}){const o=indexedDB.open(e,t),s=I(o);return n&&o.addEventListener("upgradeneeded",(e=>{n(I(o.result),e.oldVersion,e.newVersion,I(o.transaction),e)})),r&&o.addEventListener("blocked",(e=>r(e.oldVersion,e.newVersion,e))),s.then((e=>{i&&e.addEventListener("close",(()=>i())),a&&e.addEventListener("versionchange",(e=>a(e.oldVersion,e.newVersion,e)))})).catch((()=>{})),s}("firebase-installations-database",1,{upgrade:(e,t)=>{0===t&&e.createObjectStore(Y)}}),Z}async function X(e,t){var r=W(e);const n=(await Q()).transaction(Y,"readwrite"),a=n.objectStore(Y);var i=await a.get(r);return await a.put(t,r),await n.done,i&&i.fid===t.fid||z(e,t.fid),t}async function ee(e){var t=W(e);const r=(await Q()).transaction(Y,"readwrite");await r.objectStore(Y).delete(t),await r.done}async function te(e,t){var r=W(e);const n=(await Q()).transaction(Y,"readwrite"),a=n.objectStore(Y);var i=await a.get(r),o=t(i);return void 0===o?await a.delete(r):await a.put(o,r),await n.done,!o||i&&i.fid===o.fid||z(e,o.fid),o}async function re(e){let t;var r=await te(e.appConfig,(r=>{var n=ae(r||{fid:x(),registrationStatus:0});return n=function(e,t){if(0!==t.registrationStatus)return 1===t.registrationStatus?{installationEntry:t,registrationPromise:async function(e){let t=await ne(e.appConfig);for(;1===t.registrationStatus;)await q(100),t=await ne(e.appConfig);if(0!==t.registrationStatus)return t;var{installationEntry:r,registrationPromise:n}=await re(e);return n||r}(e)}:{installationEntry:t};if(!navigator.onLine)return{installationEntry:t,registrationPromise:n=Promise.reject(L.create("app-offline"))};var r={fid:t.fid,registrationStatus:1,registrationTime:Date.now()},n=async function(e,t){try{var r=await async function({appConfig:e,heartbeatServiceProvider:t},{fid:r}){const n=B(e),a=U(e),i=t.getImmediate({optional:!0});!i||(o=await i.getHeartbeatsHeader())&&a.append("x-firebase-client",o);var o={fid:r,authVersion:M,appId:e.appId,sdkVersion:O};const s={method:"POST",headers:a,body:JSON.stringify(o)},c=await F((()=>fetch(n,s)));if(c.ok)return{fid:(o=await c.json()).fid||r,registrationStatus:2,refreshToken:o.refreshToken,authToken:j(o.authToken)};throw await $("Create Installation",c)}(e,t);return X(e.appConfig,r)}catch(r){throw D(r)&&409===r.customData.serverCode?await ee(e.appConfig):await X(e.appConfig,{fid:t.fid,registrationStatus:0}),r}}(e,r);return{installationEntry:r,registrationPromise:n}}(e,n),t=n.registrationPromise,n.installationEntry}));return r.fid===V?{installationEntry:await t}:{installationEntry:r,registrationPromise:t}}function ne(e){return te(e,(e=>{if(!e)throw L.create("installation-not-found");return ae(e)}))}function ae(e){return 1===(t=e).registrationStatus&&t.registrationTime+A<Date.now()?{fid:e.fid,registrationStatus:0}:e;var t}async function ie(e,t=!1){let r;var n=await te(e.appConfig,(n=>{if(!se(n))throw L.create("not-registered");var a,i=n.authToken;if(t||2!==(a=i).requestStatus||function(e){var t=Date.now();return t<e.creationTime||e.creationTime+e.expiresIn<t+36e5}(a)){if(1===i.requestStatus)return r=async function(e,t){let r=await oe(e.appConfig);for(;1===r.authToken.requestStatus;)await q(100),r=await oe(e.appConfig);var n=r.authToken;return 0===n.requestStatus?ie(e,t):n}(e,t),n;if(!navigator.onLine)throw L.create("app-offline");return a=n,i={requestStatus:1,requestTime:Date.now()},i=Object.assign(Object.assign({},a),{authToken:i}),r=async function(e,t){try{var r=await async function({appConfig:e,heartbeatServiceProvider:t},r){const n=([a,i]=[e,r.fid],`${B(a)}/${i}/authTokens:generate`);var a,i;const o=function(e,{refreshToken:t}){const r=U(e);return r.append("Authorization",`${M} ${t}`),r}(e,r),s=t.getImmediate({optional:!0});!s||(c=await s.getHeartbeatsHeader())&&o.append("x-firebase-client",c);var c={installation:{sdkVersion:O,appId:e.appId}};const l={method:"POST",headers:o,body:JSON.stringify(c)},u=await F((()=>fetch(n,l)));if(u.ok)return j(await u.json());throw await $("Generate Auth Token",u)}(e,t),n=Object.assign(Object.assign({},t),{authToken:r});return await X(e.appConfig,n),r}catch(n){throw!D(n)||401!==n.customData.serverCode&&404!==n.customData.serverCode?(r=Object.assign(Object.assign({},t),{authToken:{requestStatus:0}}),await X(e.appConfig,r)):await ee(e.appConfig),n}}(e,i),i}return n}));return r?await r:n.authToken}function oe(e){return te(e,(e=>{if(!se(e))throw L.create("not-registered");var t;return 1===(t=e.authToken).requestStatus&&t.requestTime+A<Date.now()?Object.assign(Object.assign({},e),{authToken:{requestStatus:0}}):e}))}function se(e){return void 0!==e&&2===e.registrationStatus}function ce(e){return L.create("missing-app-config-values",{valueName:e})}const le="installations";t._registerComponent(new l(le,(e=>{var r=e.getProvider("app").getImmediate();return{app:r,appConfig:function(e){if(!e||!e.options)throw ce("App Configuration");if(!e.name)throw ce("App Name");for(const t of["projectId","apiKey","appId"])if(!e.options[t])throw ce(t);return{appName:e.name,projectId:e.options.projectId,apiKey:e.options.apiKey,appId:e.options.appId}}(r),heartbeatServiceProvider:t._getProvider(r,"heartbeat"),_delete:()=>Promise.resolve()}}),"PUBLIC")),t._registerComponent(new l("installations-internal",(e=>{var r=e.getProvider("app").getImmediate();const n=t._getProvider(r,le).getImmediate();return{getId:()=>async function(e){var t=e;const{installationEntry:r,registrationPromise:n}=await re(t);return(n||ie(t)).catch(console.error),r.fid}(n),getToken:e=>async function(e,t=!1){var r,n=e;return await((r=(await re(n)).registrationPromise)&&await r),(await ie(n,t)).token}(n,e)}}),"PRIVATE")),t.registerVersion(R,we),t.registerVersion(R,we,"esm2017");const ue="@firebase/performance",de="0.6.7",pe=de,fe="FB-PERF-TRACE-MEASURE",ge="@firebase/performance/config",he="@firebase/performance/configexpire";var me,ve,be,we;const _e=new s("performance",we="Performance",{"trace started":"Trace {$traceName} was started before.","trace stopped":"Trace {$traceName} is not running.","nonpositive trace startTime":"Trace {$traceName} startTime should be positive.","nonpositive trace duration":"Trace {$traceName} duration should be positive.","no window":"Window is not available.","no app id":"App id is not available.","no project id":"Project id is not available.","no api key":"Api key is not available.","invalid cc log":"Attempted to queue invalid cc event","FB not default":"Performance can only start when Firebase app instance is the default one.","RC response not ok":"RC response is not ok","invalid attribute name":"Attribute name {$attributeName} is invalid.","invalid attribute value":"Attribute value {$attributeValue} is invalid.","invalid custom metric name":"Custom metric name {$customMetricName} is invalid","invalid String merger input":"Input for String merger is invalid, contact support team to resolve.","already initialized":"initializePerformance() has already been called with different options. To avoid this error, call initializePerformance() with the same options as when it was originally called, or call getPerformance() to return the already initialized instance."}),ye=new class{constructor(e){this.name=e,this._logLevel=d,this._logHandler=f,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in r))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel="string"==typeof e?u[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if("function"!=typeof e)throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,r.DEBUG,...e),this._logHandler(this,r.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,r.VERBOSE,...e),this._logHandler(this,r.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,r.INFO,...e),this._logHandler(this,r.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,r.WARN,...e),this._logHandler(this,r.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,r.ERROR,...e),this._logHandler(this,r.ERROR,...e)}}(we);let Ee,Ie,Te,Se;ye.logLevel=r.INFO;class ke{constructor(e){if(!(this.window=e))throw _e.create("no window");this.performance=e.performance,this.PerformanceObserver=e.PerformanceObserver,this.windowLocation=e.location,this.navigator=e.navigator,this.document=e.document,this.navigator&&this.navigator.cookieEnabled&&(this.localStorage=e.localStorage),e.perfMetrics&&e.perfMetrics.onFirstInputDelay&&(this.onFirstInputDelay=e.perfMetrics.onFirstInputDelay)}getUrl(){return this.windowLocation.href.split("?")[0]}mark(e){this.performance&&this.performance.mark&&this.performance.mark(e)}measure(e,t,r){this.performance&&this.performance.measure&&this.performance.measure(e,t,r)}getEntriesByType(e){return this.performance&&this.performance.getEntriesByType?this.performance.getEntriesByType(e):[]}getEntriesByName(e){return this.performance&&this.performance.getEntriesByName?this.performance.getEntriesByName(e):[]}getTimeOrigin(){return this.performance&&(this.performance.timeOrigin||this.performance.timing.navigationStart)}requiredApisAvailable(){return fetch&&Promise&&"undefined"!=typeof navigator&&navigator.cookieEnabled?!!function(){try{return"object"==typeof indexedDB}catch(e){return}}()||(ye.info("IndexedDB is not supported by current browser"),!1):(ye.info("Firebase Performance cannot start if browser does not support fetch and Promise or cookie is disabled."),!1)}setupObserver(e,t){if(this.PerformanceObserver){const r=new this.PerformanceObserver((e=>{for(const r of e.getEntries())t(r)}));r.observe({entryTypes:[e]})}}static getInstance(){return void 0===Ee&&(Ee=new ke(Ie)),Ee}}function Ne(e,t){var r=e.length-t.length;if(r<0||1<r)throw _e.create("invalid String merger input");const n=[];for(let r=0;r<e.length;r++)n.push(e.charAt(r)),t.length>r&&n.push(t.charAt(r));return n.join("")}class Ce{constructor(){this.instrumentationEnabled=!0,this.dataCollectionEnabled=!0,this.loggingEnabled=!1,this.tracesSamplingRate=1,this.networkRequestsSamplingRate=1,this.logEndPointUrl="https://firebaselogging.googleapis.com/v0cc/log?format=json_proto",this.flTransportEndpointUrl=Ne("hts/frbslgigp.ogepscmv/ieo/eaylg","tp:/ieaeogn-agolai.o/1frlglgc/o"),this.transportKey=Ne("AzSC8r6ReiGqFMyfvgow","Iayx0u-XT3vksVM-pIV"),this.logSource=462,this.logTraceAfterSampling=!1,this.logNetworkAfterSampling=!1,this.configTimeToLive=12}getFlTransportFullUrl(){return this.flTransportEndpointUrl.concat("?key=",this.transportKey)}static getInstance(){return void 0===Se&&(Se=new Ce),Se}}(ve=me=me||{})[ve.UNKNOWN=0]="UNKNOWN",ve[ve.VISIBLE=1]="VISIBLE",ve[ve.HIDDEN=2]="HIDDEN";const Re=["firebase_","google_","ga_"],Ae=new RegExp("^[a-zA-Z]\\w*$");function Oe(){switch(ke.getInstance().document.visibilityState){case"visible":return me.VISIBLE;case"hidden":return me.HIDDEN;default:return me.UNKNOWN}}function Me(e){var t=null===(t=e.options)||void 0===t?void 0:t.appId;if(!t)throw _e.create("no app id");return t}const Pe="0.0.1",Le={loggingEnabled:!0},De="FIREBASE_INSTALLATIONS_AUTH",Be="Could not fetch config, will use default configs";function je(e){if(!e)return e;const t=Ce.getInstance();var r=e.entries||{};return void 0!==r.fpr_enabled?t.loggingEnabled="true"===String(r.fpr_enabled):t.loggingEnabled=Le.loggingEnabled,r.fpr_log_source?t.logSource=Number(r.fpr_log_source):Le.logSource&&(t.logSource=Le.logSource),r.fpr_log_endpoint_url?t.logEndPointUrl=r.fpr_log_endpoint_url:Le.logEndPointUrl&&(t.logEndPointUrl=Le.logEndPointUrl),r.fpr_log_transport_key?t.transportKey=r.fpr_log_transport_key:Le.transportKey&&(t.transportKey=Le.transportKey),void 0!==r.fpr_vc_network_request_sampling_rate?t.networkRequestsSamplingRate=Number(r.fpr_vc_network_request_sampling_rate):void 0!==Le.networkRequestsSamplingRate&&(t.networkRequestsSamplingRate=Le.networkRequestsSamplingRate),void 0!==r.fpr_vc_trace_sampling_rate?t.tracesSamplingRate=Number(r.fpr_vc_trace_sampling_rate):void 0!==Le.tracesSamplingRate&&(t.tracesSamplingRate=Le.tracesSamplingRate),t.logTraceAfterSampling=$e(t.tracesSamplingRate),t.logNetworkAfterSampling=$e(t.networkRequestsSamplingRate),e}function $e(e){return Math.random()<=e}let Ue,Fe=1;function qe(e){var t;return Fe=2,Ue=Ue||(t=e,function(){const e=ke.getInstance().document;return new Promise((t=>{if(e&&"complete"!==e.readyState){const r=()=>{"complete"===e.readyState&&(e.removeEventListener("readystatechange",r),t())};e.addEventListener("readystatechange",r)}else t()}))}().then((()=>function(e){const t=e.getId();return t.then((e=>{Te=e})),t}(t.installations))).then((e=>function(e,t){var r,n,a=function(){const e=ke.getInstance().localStorage;if(e){var t=e.getItem(he);if(t&&function(e){return Number(e)>Date.now()}(t)&&(t=e.getItem(ge)))try{return JSON.parse(t)}catch(e){return}}}();return a?(je(a),Promise.resolve()):(n=t,function(e){const t=e.getToken();return t.then((e=>{})),t}((r=e).installations).then((e=>{var t=function(e){var t=null===(t=e.options)||void 0===t?void 0:t.projectId;if(!t)throw _e.create("no project id");return t}(r.app),a=function(e){var t=null===(t=e.options)||void 0===t?void 0:t.apiKey;if(!t)throw _e.create("no api key");return t}(r.app);return a=new Request(`https://firebaseremoteconfig.googleapis.com/v1/projects/${t}/namespaces/fireperf:fetch?key=${a}`,{method:"POST",headers:{Authorization:`${De} ${e}`},body:JSON.stringify({app_instance_id:n,app_instance_id_token:e,app_id:Me(r.app),app_version:pe,sdk_version:Pe})}),fetch(a).then((e=>{if(e.ok)return e.json();throw _e.create("RC response not ok")}))})).catch((()=>{ye.info(Be)})).then(je).then((e=>function(e){const t=ke.getInstance().localStorage;e&&t&&(t.setItem(ge,JSON.stringify(e)),t.setItem(he,String(Date.now()+60*Ce.getInstance().configTimeToLive*60*1e3)))}(e)),(()=>{})))}(t,e))).then((()=>He()),(()=>He()))),Ue}function He(){Fe=3}const Ve=1e4;let xe,We=3,Ke=[],ze=!1;function Ge(e){setTimeout((()=>{if(0!==We)return Ke.length?void function(){const e=Ke.splice(0,1e3),t=e.map((e=>({source_extension_json_proto3:e.message,event_time_ms:String(e.eventTime)})));(function(e,t){return function(e){var t=Ce.getInstance().getFlTransportFullUrl();return fetch(t,{method:"POST",body:JSON.stringify(e)})}(e).then((e=>(e.ok||ye.info("Call to Firebase backend failed."),e.json()))).then((e=>{var r=Number(e.nextRequestWaitMillis);let n=Ve;isNaN(r)||(n=Math.max(r,n)),r=e.logResponseDetails,Array.isArray(r)&&0<r.length&&"RETRY_REQUEST_LATER"===r[0].responseAction&&(Ke=[...t,...Ke],ye.info("Retry transport request later.")),We=3,Ge(n)}))})({request_time_ms:String(Date.now()),client_info:{client_type:1,js_client_info:{}},log_source:Ce.getInstance().logSource,log_event:t},e).catch((()=>{Ke=[...e,...Ke],We--,ye.info(`Tries left: ${We}.`),Ge(Ve)}))}():Ge(Ve)}),e)}function Je(e,t){xe=xe||function(e){return(...t)=>{!function(e){if(!e.eventTime||!e.message)throw _e.create("invalid cc log");Ke=[...Ke,e]}({message:e(...t),eventTime:Date.now()})}}(Qe),xe(e,t)}function Ye(e){var t=Ce.getInstance();!t.instrumentationEnabled&&e.isAuto||(t.dataCollectionEnabled||e.isAuto)&&ke.getInstance().requiredApisAvailable()&&(e.isAuto&&Oe()!==me.VISIBLE||(3===Fe?Ze(e):qe(e.performanceController).then((()=>Ze(e)),(()=>Ze(e)))))}function Ze(e){var t;!Te||(t=Ce.getInstance()).loggingEnabled&&t.logTraceAfterSampling&&setTimeout((()=>Je(e,1)),0)}function Qe(e,t){return 0===t?(r={url:e.url,http_method:e.httpMethod||0,http_response_code:200,response_payload_bytes:e.responsePayloadBytes,client_start_time_us:e.startTimeUs,time_to_response_initiated_us:e.timeToResponseInitiatedUs,time_to_response_completed_us:e.timeToResponseCompletedUs},r={application_info:Xe(e.performanceController.app),network_request_metric:r},JSON.stringify(r)):function(e){const t={name:e.name,is_auto:e.isAuto,client_start_time_us:e.startTimeUs,duration_us:e.durationUs};0!==Object.keys(e.counters).length&&(t.counters=e.counters);var r=e.getAttributes();return 0!==Object.keys(r).length&&(t.custom_attributes=r),r={application_info:Xe(e.performanceController.app),trace_metric:t},JSON.stringify(r)}(e);var r}function Xe(e){return{google_app_id:Me(e),app_instance_id:Te,web_app_info:{sdk_version:pe,page_url:ke.getInstance().getUrl(),service_worker_status:null!=(t=ke.getInstance().navigator)&&t.serviceWorker?t.serviceWorker.controller?2:3:1,visibility_state:Oe(),effective_connection_type:function(){var e=ke.getInstance().navigator.connection;switch(e&&e.effectiveType){case"slow-2g":return 1;case"2g":return 2;case"3g":return 3;case"4g":return 4;default:return 0}}()},application_process_state:0};var t}const et=["_fp","_fcp","_fid"];class tt{constructor(e,t,r=!1,n){this.performanceController=e,this.name=t,this.isAuto=r,this.state=1,this.customAttributes={},this.counters={},this.api=ke.getInstance(),this.randomId=Math.floor(1e6*Math.random()),this.isAuto||(this.traceStartMark=`FB-PERF-TRACE-START-${this.randomId}-${this.name}`,this.traceStopMark=`FB-PERF-TRACE-STOP-${this.randomId}-${this.name}`,this.traceMeasure=n||`${fe}-${this.randomId}-${this.name}`,n&&this.calculateTraceMetrics())}start(){if(1!==this.state)throw _e.create("trace started",{traceName:this.name});this.api.mark(this.traceStartMark),this.state=2}stop(){if(2!==this.state)throw _e.create("trace stopped",{traceName:this.name});this.state=3,this.api.mark(this.traceStopMark),this.api.measure(this.traceMeasure,this.traceStartMark,this.traceStopMark),this.calculateTraceMetrics(),Ye(this)}record(e,t,r){if(e<=0)throw _e.create("nonpositive trace startTime",{traceName:this.name});if(t<=0)throw _e.create("nonpositive trace duration",{traceName:this.name});if(this.durationUs=Math.floor(1e3*t),this.startTimeUs=Math.floor(1e3*e),r&&r.attributes&&(this.customAttributes=Object.assign({},r.attributes)),r&&r.metrics)for(const e of Object.keys(r.metrics))isNaN(Number(r.metrics[e]))||(this.counters[e]=Math.floor(Number(r.metrics[e])));Ye(this)}incrementMetric(e,t=1){void 0===this.counters[e]?this.putMetric(e,t):this.putMetric(e,this.counters[e]+t)}putMetric(e,t){if(n=e,a=this.name,0===n.length||100<n.length||!(a&&a.startsWith("_wt_")&&-1<et.indexOf(n))&&n.startsWith("_"))throw _e.create("invalid custom metric name",{customMetricName:e});var r,n,a;this.counters[e]=(t=null!=t?t:0,(r=Math.floor(t))<t&&ye.info(`Metric value should be an Integer, setting the value as : ${r}.`),r)}getMetric(e){return this.counters[e]||0}putAttribute(e,t){var r,n,a=!(0===(r=e).length||40<r.length||Re.some((e=>r.startsWith(e)))||!r.match(Ae)),i=0!==(n=t).length&&n.length<=100;if(a&&i)this.customAttributes[e]=t;else{if(!a)throw _e.create("invalid attribute name",{attributeName:e});if(!i)throw _e.create("invalid attribute value",{attributeValue:t})}}getAttribute(e){return this.customAttributes[e]}removeAttribute(e){void 0!==this.customAttributes[e]&&delete this.customAttributes[e]}getAttributes(){return Object.assign({},this.customAttributes)}setStartTime(e){this.startTimeUs=e}setDuration(e){this.durationUs=e}calculateTraceMetrics(){var e;(e=(e=this.api.getEntriesByName(this.traceMeasure))&&e[0])&&(this.durationUs=Math.floor(1e3*e.duration),this.startTimeUs=Math.floor(1e3*(e.startTime+this.api.getTimeOrigin())))}static createOobTrace(e,t,r,n){var a=ke.getInstance().getUrl();if(a){const i=new tt(e,"_wt_"+a,!0);a=Math.floor(1e3*ke.getInstance().getTimeOrigin()),i.setStartTime(a),t&&t[0]&&(i.setDuration(Math.floor(1e3*t[0].duration)),i.putMetric("domInteractive",Math.floor(1e3*t[0].domInteractive)),i.putMetric("domContentLoadedEventEnd",Math.floor(1e3*t[0].domContentLoadedEventEnd)),i.putMetric("loadEventEnd",Math.floor(1e3*t[0].loadEventEnd))),r&&((a=r.find((e=>"first-paint"===e.name)))&&a.startTime&&i.putMetric("_fp",Math.floor(1e3*a.startTime)),(a=r.find((e=>"first-contentful-paint"===e.name)))&&a.startTime&&i.putMetric("_fcp",Math.floor(1e3*a.startTime)),n&&i.putMetric("_fid",Math.floor(1e3*n))),Ye(i)}}static createUserTimingTrace(e,t){Ye(new tt(e,t,!1,t))}}function rt(e,t){const r=t;var n,a,i;r&&void 0!==r.responseStart&&(i=ke.getInstance().getTimeOrigin(),n=Math.floor(1e3*(r.startTime+i)),a=r.responseStart?Math.floor(1e3*(r.responseStart-r.startTime)):void 0,i=Math.floor(1e3*(r.responseEnd-r.startTime)),function(e){const t=Ce.getInstance();var r,n,a;t.instrumentationEnabled&&(r=e.url,n=t.logEndPointUrl.split("?")[0],a=t.flTransportEndpointUrl.split("?")[0],r!==n&&r!==a&&t.loggingEnabled&&t.logNetworkAfterSampling&&setTimeout((()=>Je(e,0)),0))}({performanceController:e,url:r.name&&r.name.split("?")[0],responsePayloadBytes:r.transferSize,startTimeUs:n,timeToResponseInitiatedUs:a,timeToResponseCompletedUs:i}))}function nt(e){Te&&(setTimeout((()=>function(e){const t=ke.getInstance(),r=t.getEntriesByType("navigation"),n=t.getEntriesByType("paint");if(t.onFirstInputDelay){let a=setTimeout((()=>{tt.createOobTrace(e,r,n),a=void 0}),5e3);t.onFirstInputDelay((t=>{a&&(clearTimeout(a),tt.createOobTrace(e,r,n,t))}))}else tt.createOobTrace(e,r,n)}(e)),0),setTimeout((()=>function(e){const t=ke.getInstance(),r=t.getEntriesByType("resource");for(const t of r)rt(e,t);t.setupObserver("resource",(t=>rt(e,t)))}(e)),0),setTimeout((()=>function(e){const t=ke.getInstance(),r=t.getEntriesByType("measure");for(const t of r)at(e,t);t.setupObserver("measure",(t=>at(e,t)))}(e)),0))}function at(e,t){const r=t.name;r.substring(0,fe.length)!==fe&&tt.createUserTimingTrace(e,r)}class it{constructor(e,t){this.app=e,this.installations=t,this.initialized=!1}_init(e){this.initialized||(void 0!==(null==e?void 0:e.dataCollectionEnabled)&&(this.dataCollectionEnabled=e.dataCollectionEnabled),void 0!==(null==e?void 0:e.instrumentationEnabled)&&(this.instrumentationEnabled=e.instrumentationEnabled),ke.getInstance().requiredApisAvailable()?new Promise(((e,t)=>{try{let r=!0;const n="validate-browser-context-for-indexeddb-analytics-module",a=self.indexedDB.open(n);a.onsuccess=()=>{a.result.close(),r||self.indexedDB.deleteDatabase(n),e(!0)},a.onupgradeneeded=()=>{r=!1},a.onerror=()=>{var e;t((null===(e=a.error)||void 0===e?void 0:e.message)||"")}}catch(e){t(e)}})).then((e=>{e&&(ze||(Ge(5500),ze=!0),qe(this).then((()=>nt(this)),(()=>nt(this))),this.initialized=!0)})).catch((e=>{ye.info(`Environment doesn't support IndexedDB: ${e}`)})):ye.info('Firebase Performance cannot start if the browser does not support "Fetch" and "Promise", or cookies are disabled.'))}set instrumentationEnabled(e){Ce.getInstance().instrumentationEnabled=e}get instrumentationEnabled(){return Ce.getInstance().instrumentationEnabled}set dataCollectionEnabled(e){Ce.getInstance().dataCollectionEnabled=e}get dataCollectionEnabled(){return Ce.getInstance().dataCollectionEnabled}}t._registerComponent(new l("performance",((e,{options:t})=>{var r=e.getProvider("app").getImmediate(),n=e.getProvider("installations-internal").getImmediate();if("[DEFAULT]"!==r.name)throw _e.create("FB not default");if("undefined"==typeof window)throw _e.create("no window");e=window,Ie=e;const a=new it(r,n);return a._init(t),a}),"PUBLIC")),t.registerVersion(ue,de),t.registerVersion(ue,de,"esm2017");class ot{constructor(e,t){this.app=e,this._delegate=t}get instrumentationEnabled(){return this._delegate.instrumentationEnabled}set instrumentationEnabled(e){this._delegate.instrumentationEnabled=e}get dataCollectionEnabled(){return this._delegate.dataCollectionEnabled}set dataCollectionEnabled(e){this._delegate.dataCollectionEnabled=e}trace(e){return r=e,t=(e=t=this._delegate)&&e._delegate?e._delegate:e,new tt(t,r);var t,r}}(be=i.default).INTERNAL.registerComponent(new l("performance-compat",(function(e){var t=e.getProvider("app-compat").getImmediate(),r=e.getProvider("performance").getImmediate();return new ot(t,r)}),"PUBLIC")),be.registerVersion("@firebase/performance-compat","0.2.7")}).apply(this,arguments)}catch(e){throw console.error(e),new Error("Cannot instantiate firebase-performance-compat.js - be sure to load firebase-app.js first.")}}));