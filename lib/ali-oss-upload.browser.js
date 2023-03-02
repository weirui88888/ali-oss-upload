!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t(require("ali-oss")):"function"==typeof define&&define.amd?define(["ali-oss"],t):(e="undefined"!=typeof globalThis?globalThis:e||self).AliOssUpload=t(e.OSS)}(this,(function(e){"use strict";
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
    ***************************************************************************** */function t(e,t,n,o){return new(n||(n=Promise))((function(s,i){function r(e){try{a(o.next(e))}catch(e){i(e)}}function c(e){try{a(o.throw(e))}catch(e){i(e)}}function a(e){var t;e.done?s(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(r,c)}a((o=o.apply(e,t||[])).next())}))}return class{constructor(e){const{bucket:t,domain:n,region:o,directory:s="",extraUploadOptions:i={},asyncGetOssToken:r,log:c=!1}=e;this.bucket=t,this.domain=n,this.directory=s,this.region=o,this.defaultUploadOption=i,this.asyncGetOssToken=r,this.log=c}getConstructOssKey(e){const{directory:t=this.directory,name:n,randomName:o}=e,s=n.split(".")[1];return o?"string"==typeof o?`${t}${o}.${s}`:`${t}${this.getUuid()}.${s}`:`${t}${n}`}getUuid(){return"xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g,(e=>{const t=16*Math.random()|0;return("x"==e?t:3&t|8).toString(16)}))}getOssConfig(e){const{accessKeyId:t,accessKeySecret:n,securityToken:o}=e;return{secure:!0,region:this.region,accessKeyId:t,accessKeySecret:n,stsToken:o,bucket:this.bucket}}upload(n){return t(this,void 0,void 0,(function*(){const{directory:t,stsToken:o,file:s,extraUploadOptions:i,randomName:r=!1}=n;if(!o&&!this.asyncGetOssToken)throw new Error("relevant authentication information is required before uploading，You should actively pass in the ststoken object, or provide an asynchronous method to get the ststoken object");const{name:c}=s;try{let n;if(o&&(n=this.getOssConfig(o)),this.asyncGetOssToken){const e=yield this.asyncGetOssToken();n=this.getOssConfig(e)}const a=new e(n),u=null!=i?i:this.defaultUploadOption,d=this.getConstructOssKey({name:c,directory:t,randomName:r});return yield a.multipartUpload(d,s,u)}catch(e){console.error("there are some problems uploading, please make sure the relevant settings are correct")}}))}}})),"undefined"!=typeof window&&(window._ALI_OSS_UPLOAD_VERSION_="1.0.0");
