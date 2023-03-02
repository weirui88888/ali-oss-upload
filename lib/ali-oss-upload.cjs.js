"use strict";var t=require("ali-oss");
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */function e(t,e,n,o){return new(n||(n=Promise))((function(s,i){function r(t){try{a(o.next(t))}catch(t){i(t)}}function c(t){try{a(o.throw(t))}catch(t){i(t)}}function a(t){var e;t.done?s(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(r,c)}a((o=o.apply(t,e||[])).next())}))}module.exports=class{constructor(n){this.upload=n=>e(this,void 0,void 0,(function*(){const{directory:e,stsToken:o,file:s,extraUploadOptions:i,randomName:r=!1}=n;if(!o&&!this.asyncGetStsToken)throw new Error("relevant authentication information is required before uploading，You should actively pass in the ststoken object, or provide an asynchronous method to get the ststoken object");const{name:c}=s;try{let n;if(o&&(n=this.getOssConfig(o)),this.asyncGetStsToken){const t=yield this.asyncGetStsToken();n=this.getOssConfig(t)}const a=new t(n),u=null!=i?i:this.defaultUploadOption,d=this.getConstructOssKey({name:c,directory:e,randomName:r}),h=yield a.multipartUpload(d,s,u);return this.domain?Object.assign({ossSrc:`${this.domain}${h.name}`},h):h}catch(t){console.error("there are some problems uploading, please make sure the relevant settings are correct")}}));const{bucket:o,domain:s,region:i,directory:r="",extraUploadOptions:c={},asyncGetStsToken:a,log:u=!1}=n;this.bucket=o,this.domain=s,this.directory=r,this.region=i,this.defaultUploadOption=c,this.asyncGetStsToken=a,this.log=u}getConstructOssKey(t){const{directory:e=this.directory,name:n,randomName:o}=t,s=n.split(".")[1];return o?"string"==typeof o?`${e}${o}.${s}`:`${e}${this.getUuid()}.${s}`:`${e}${n}`}getUuid(){return"xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g,(t=>{const e=16*Math.random()|0;return("x"==t?e:3&e|8).toString(16)}))}getOssConfig(t){const{accessKeyId:e,accessKeySecret:n,securityToken:o}=t;return{secure:!0,region:this.region,accessKeyId:e,accessKeySecret:n,stsToken:o,bucket:this.bucket}}},"undefined"!=typeof window&&(window._ALI_OSS_UPLOAD_VERSION_="1.0.0");
