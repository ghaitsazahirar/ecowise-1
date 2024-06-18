!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(require("@firebase/app-compat"),require("@firebase/app")):"function"==typeof define&&define.amd?define(["@firebase/app-compat","@firebase/app"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).firebase,e.firebase.INTERNAL.modularAPIs)}(this,(function(e,t){"use strict";try{(function(){var n,r,i=(r=e)&&"object"==typeof r&&"default"in r?r:{default:r};class s extends Error{constructor(e,t,n){super(t),this.code=e,this.customData=n,this.name="FirebaseError",Object.setPrototypeOf(this,s.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,a.prototype.create)}}class a{constructor(e,t,n){this.service=e,this.serviceName=t,this.errors=n}create(e,...t){var n,r=t[0]||{},i=`${this.service}/${e}`,a=(a=this.errors[e])?(n=r,a.replace(o,((e,t)=>{var r=n[t];return null!=r?String(r):`<${t}?>`}))):"Error";return a=`${this.serviceName}: ${a} (${i}).`,new s(i,a,r)}}const o=/\{\$([^}]+)}/g;function c(e){return e&&e._delegate?e._delegate:e}class u{constructor(e,t,n){this.name=e,this.instanceFactory=t,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}const l="type.googleapis.com/google.protobuf.Int64Value",h="type.googleapis.com/google.protobuf.UInt64Value";function p(e,t){const n={};for(const r in e)e.hasOwnProperty(r)&&(n[r]=t(e[r]));return n}function d(e){if(null==e)return e;if(e["@type"])switch(e["@type"]){case l:case h:var t=Number(e.value);if(isNaN(t))throw new Error("Data cannot be decoded from JSON: "+e);return t;default:throw new Error("Data cannot be decoded from JSON: "+e)}return Array.isArray(e)?e.map((e=>d(e))):"function"==typeof e||"object"==typeof e?p(e,(e=>d(e))):e}const f="functions",g={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class m extends s{constructor(e,t,n){super(`${f}/${e}`,t||""),this.details=n}}class v{constructor(e,t,n){this.auth=null,this.messaging=null,this.appCheck=null,this.auth=e.getImmediate({optional:!0}),this.messaging=t.getImmediate({optional:!0}),this.auth||e.get().then((e=>this.auth=e),(()=>{})),this.messaging||t.get().then((e=>this.messaging=e),(()=>{})),this.appCheck||n.get().then((e=>this.appCheck=e),(()=>{}))}async getAuthToken(){if(this.auth)try{var e=await this.auth.getToken();return null==e?void 0:e.accessToken}catch(e){return}}async getMessagingToken(){if(this.messaging&&"Notification"in self&&"granted"===Notification.permission)try{return this.messaging.getToken()}catch(e){return}}async getAppCheckToken(e){if(this.appCheck){var t=e?await this.appCheck.getLimitedUseToken():await this.appCheck.getToken();return t.error?null:t.token}return null}async getContext(e){return{authToken:await this.getAuthToken(),messagingToken:await this.getMessagingToken(),appCheckToken:await this.getAppCheckToken(e)}}}const w="us-central1";class k{constructor(e,t,n,r,i=w,s){this.app=e,this.fetchImpl=s,this.emulatorOrigin=null,this.contextProvider=new v(t,n,r),this.cancelAllRequests=new Promise((e=>{this.deleteService=()=>Promise.resolve(e())}));try{var a=new URL(i);this.customDomain=a.origin,this.region=w}catch(e){this.customDomain=null,this.region=i}}_delete(){return this.deleteService()}_url(e){var t=this.app.options.projectId;return null===this.emulatorOrigin?null!==this.customDomain?`${this.customDomain}/${e}`:`https://${this.region}-${t}.cloudfunctions.net/${e}`:`${this.emulatorOrigin}/${t}/${this.region}/${e}`}}async function y(e,t,n,r){var i={data:n=function e(t){if(null==t)return null;if("number"==typeof(t=t instanceof Number?t.valueOf():t)&&isFinite(t))return t;if(!0===t||!1===t)return t;if("[object String]"===Object.prototype.toString.call(t))return t;if(t instanceof Date)return t.toISOString();if(Array.isArray(t))return t.map((t=>e(t)));if("function"==typeof t||"object"==typeof t)return p(t,(t=>e(t)));throw new Error("Data cannot be encoded in JSON: "+t)}(n)};const s={};var a=await e.contextProvider.getContext(r.limitedUseAppCheckTokens);a.authToken&&(s.Authorization="Bearer "+a.authToken),a.messagingToken&&(s["Firebase-Instance-ID-Token"]=a.messagingToken),null!==a.appCheckToken&&(s["X-Firebase-AppCheck"]=a.appCheckToken);const o=function(e){let t=null;return{promise:new Promise(((n,r)=>{t=setTimeout((()=>{r(new m("deadline-exceeded","deadline-exceeded"))}),e)})),cancel:()=>{t&&clearTimeout(t)}}}(r.timeout||7e4);if(a=await Promise.race([async function(e,t,n,r){let i;n["Content-Type"]="application/json";try{i=await r(e,{method:"POST",body:JSON.stringify(t),headers:n})}catch(e){return{status:0,json:null}}let s=null;try{s=await i.json()}catch(e){}return{status:i.status,json:s}}(t,i,s,e.fetchImpl),o.promise,e.cancelAllRequests]),o.cancel(),!a)throw new m("cancelled","Firebase Functions instance was deleted.");if(i=function(e,t){let n,r=function(e){if(200<=e&&e<300)return"ok";switch(e){case 0:case 500:return"internal";case 400:return"invalid-argument";case 401:return"unauthenticated";case 403:return"permission-denied";case 404:return"not-found";case 409:return"aborted";case 429:return"resource-exhausted";case 499:return"cancelled";case 501:return"unimplemented";case 503:return"unavailable";case 504:return"deadline-exceeded"}return"unknown"}(e),i=r;try{var s=t&&t.error;if(s){const e=s.status;if("string"==typeof e){if(!g[e])return new m("internal","internal");r=g[e],i=e}var a=s.message;"string"==typeof a&&(i=a),n=s.details,void 0!==n&&(n=d(n))}}catch(e){}return"ok"===r?null:new m(r,i,n)}(a.status,a.json),i)throw i;if(!a.json)throw new m("internal","Response is not valid JSON object.");let c=a.json.data;if(void 0===c&&(c=a.json.result),void 0===c)throw new m("internal","Response is missing data field.");return{data:d(c)}}const T="@firebase/functions",E="0.11.5";function b(e,t,n){c(e).emulatorOrigin=`http://${t}:${n}`}var I;n=fetch.bind(self),t._registerComponent(new u(f,((e,{instanceIdentifier:t})=>{var r=e.getProvider("app").getImmediate(),i=e.getProvider("auth-internal"),s=e.getProvider("messaging-internal"),a=e.getProvider("app-check-internal");return new k(r,i,s,a,t,n)}),"PUBLIC").setMultipleInstances(!0)),t.registerVersion(T,E,void 0),t.registerVersion(T,E,"esm2017");class N{constructor(e,t){this.app=e,this._delegate=t,this._region=this._delegate.region,this._customDomain=this._delegate.customDomain}httpsCallable(e,t){return function(e,t,n){return r=>{return i=r,s=n||{},a=(r=e)._url(t),y(r,a,i,s);var i,s,a}}(c(this._delegate),e,t)}httpsCallableFromURL(e,t){return function(e,t,n){return r=c(e),i=t,s=n,e=>y(r,i,e,s||{});var r,i,s}(this._delegate,e,t)}useFunctionsEmulator(e){var t=e.match("[a-zA-Z]+://([a-zA-Z0-9.-]+)(?::([0-9]+))?");if(null==t)throw new s("functions","No origin provided to useFunctionsEmulator()");if(null==t[2])throw new s("functions","Port missing in origin provided to useFunctionsEmulator()");return b(this._delegate,t[1],Number(t[2]))}useEmulator(e,t){return b(this._delegate,e,t)}}I={Functions:N},i.default.INTERNAL.registerComponent(new u("functions-compat",((e,{instanceIdentifier:t})=>{var n=e.getProvider("app-compat").getImmediate(),r=e.getProvider("functions").getImmediate({identifier:null!=t?t:"us-central1"});return new N(n,r)}),"PUBLIC").setServiceProps(I).setMultipleInstances(!0)),i.default.registerVersion("@firebase/functions-compat","0.3.11")}).apply(this,arguments)}catch(e){throw console.error(e),new Error("Cannot instantiate firebase-functions-compat.js - be sure to load firebase-app.js first.")}}));