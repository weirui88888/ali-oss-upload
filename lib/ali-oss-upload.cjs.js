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
***************************************************************************** */function e(t,e,s,n){return new(s||(s=Promise))((function(o,i){function r(t){try{a(n.next(t))}catch(t){i(t)}}function c(t){try{a(n.throw(t))}catch(t){i(t)}}function a(t){var e;t.done?o(t.value):(e=t.value,e instanceof s?e:new s((function(t){t(e)}))).then(r,c)}a((n=n.apply(t,e||[])).next())}))}module.exports=class{constructor(s){this.upload=s=>e(this,void 0,void 0,(function*(){const{directory:e,stsToken:n,file:o,extraUploadOptions:i,randomName:r=!1}=s;if(!n&&!this.asyncGetOssToken)throw new Error("relevant authentication information is required before uploading，You should actively pass in the ststoken object, or provide an asynchronous method to get the ststoken object");const{name:c}=o;try{let s;if(n&&(s=this.getOssConfig(n)),this.asyncGetOssToken){const t=yield this.asyncGetOssToken();s=this.getOssConfig(t)}const a=new t(s),u=null!=i?i:this.defaultUploadOption,d=this.getConstructOssKey({name:c,directory:e,randomName:r}),h=yield a.multipartUpload(d,o,u);return this.domain?Object.assign({ossSrc:`${this.domain}${h.name}`},h):h}catch(t){console.error("there are some problems uploading, please make sure the relevant settings are correct")}}));const{bucket:n,domain:o,region:i,directory:r="",extraUploadOptions:c={},asyncGetOssToken:a,log:u=!1}=s;this.bucket=n,this.domain=o,this.directory=r,this.region=i,this.defaultUploadOption=c,this.asyncGetOssToken=a,this.log=u}getConstructOssKey(t){const{directory:e=this.directory,name:s,randomName:n}=t,o=s.split(".")[1];return n?"string"==typeof n?`${e}${n}.${o}`:`${e}${this.getUuid()}.${o}`:`${e}${s}`}getUuid(){return"xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g,(t=>{const e=16*Math.random()|0;return("x"==t?e:3&e|8).toString(16)}))}getOssConfig(t){const{accessKeyId:e,accessKeySecret:s,securityToken:n}=t;return{secure:!0,region:this.region,accessKeyId:e,accessKeySecret:s,stsToken:n,bucket:this.bucket}}},"undefined"!=typeof window&&(window._ALI_OSS_UPLOAD_VERSION_="1.0.0");
