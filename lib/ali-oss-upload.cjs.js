"use strict";function e(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var t=e(require("ali-oss"));
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
***************************************************************************** */function i(e,t,i,n){return new(i||(i=Promise))((function(o,s){function r(e){try{u(n.next(e))}catch(e){s(e)}}function c(e){try{u(n.throw(e))}catch(e){s(e)}}function u(e){var t;e.done?o(e.value):(t=e.value,t instanceof i?t:new i((function(e){e(t)}))).then(r,c)}u((n=n.apply(e,t||[])).next())}))}console.log(t.default);module.exports=class{constructor(e){const{bucket:t,domain:i,region:n,fileType:o="png",directory:s="/",extraUploadOptions:r={},uuid:c=!0,getOssToken:u}=e;this.bucket=t,this.domain=i,this.directory=s,this.fileType=o,this.region=n,this.defaultUploadOption=r,this.uuid=c,this.getOssToken=u}getConstructOssKey(e){const{fileType:t=this.fileType,directory:i=this.directory,fileName:n}=e;return this.uuid?`${i}${this.getUuid()}-${n}.${t}`:`${i}${n}.${t}`}getUuid(){return"xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g,(e=>{const t=16*Math.random()|0;return("x"==e?t:3&t|8).toString(16)}))}getOssConfig(e){const{accessKeyId:t,accessKeySecret:i,securityToken:n}=e;return{secure:!0,region:this.region,accessKeyId:t,accessKeySecret:i,stsToken:n,bucket:this.bucket}}upload(e){return i(this,void 0,void 0,(function*(){const{fileName:i,fileType:n,directory:o,ossToken:s,file:r,extraUploadOptions:c}=e;try{let e;if(s)e=this.getOssConfig(s);else{if(!this.getOssToken)throw new Error("relevant authentication information is required before uploading");{const t=yield this.getOssToken();e=this.getOssConfig(t)}}const u=new t.default(e),a=null!=c?c:this.defaultUploadOption,{name:l}=yield u.multipartUpload(this.getConstructOssKey({fileName:i,fileType:n,directory:o}),r,a);return l}catch(e){console.error("上传出现了一些问题，请确保相关设置正确")}}))}},"undefined"!=typeof window&&(window._ALI_OSS_UPLOAD_VERSION_="1.0.0");
