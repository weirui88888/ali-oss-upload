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
***************************************************************************** */function e(t,e,s,o){return new(s||(s=Promise))((function(n,i){function r(t){try{a(o.next(t))}catch(t){i(t)}}function c(t){try{a(o.throw(t))}catch(t){i(t)}}function a(t){var e;t.done?n(t.value):(e=t.value,e instanceof s?e:new s((function(t){t(e)}))).then(r,c)}a((o=o.apply(t,e||[])).next())}))}module.exports=class{constructor(s){this.upload=s=>e(this,void 0,void 0,(function*(){const{directory:e,stsToken:o,file:n,extraUploadOptions:i,randomName:r=!1}=s;if(!o&&!this.asyncGetOssToken)throw new Error("relevant authentication information is required before uploading，You should actively pass in the ststoken object, or provide an asynchronous method to get the ststoken object");const{name:c}=n;try{let s;if(o&&(s=this.getOssConfig(o)),this.asyncGetOssToken){const t=yield this.asyncGetOssToken();s=this.getOssConfig(t)}const a=new t(s),u=null!=i?i:this.defaultUploadOption,d=this.getConstructOssKey({name:c,directory:e,randomName:r});return yield a.multipartUpload(d,n,u)}catch(t){console.error("there are some problems uploading, please make sure the relevant settings are correct")}}));const{bucket:o,domain:n,region:i,directory:r="",extraUploadOptions:c={},asyncGetOssToken:a,log:u=!1}=s;this.bucket=o,this.domain=n,this.directory=r,this.region=i,this.defaultUploadOption=c,this.asyncGetOssToken=a,this.log=u}getConstructOssKey(t){const{directory:e=this.directory,name:s,randomName:o}=t,n=s.split(".")[1];return o?"string"==typeof o?`${e}${o}.${n}`:`${e}${this.getUuid()}.${n}`:`${e}${s}`}getUuid(){return"xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g,(t=>{const e=16*Math.random()|0;return("x"==t?e:3&e|8).toString(16)}))}getOssConfig(t){const{accessKeyId:e,accessKeySecret:s,securityToken:o}=t;return{secure:!0,region:this.region,accessKeyId:e,accessKeySecret:s,stsToken:o,bucket:this.bucket}}},"undefined"!=typeof window&&(window._ALI_OSS_UPLOAD_VERSION_="1.0.0");
