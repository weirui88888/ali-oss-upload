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
    ***************************************************************************** */function t(e,t,o,n){return new(o||(o=Promise))((function(s,i){function r(e){try{a(n.next(e))}catch(e){i(e)}}function c(e){try{a(n.throw(e))}catch(e){i(e)}}function a(e){var t;e.done?s(e.value):(t=e.value,t instanceof o?t:new o((function(e){e(t)}))).then(r,c)}a((n=n.apply(e,t||[])).next())}))}return class{constructor(o){this.upload=o=>t(this,void 0,void 0,(function*(){const{directory:t,stsToken:n,file:s,extraUploadOptions:i,randomName:r=!1}=o;if(!n&&!this.asyncGetOssToken)throw new Error("relevant authentication information is required before uploading，You should actively pass in the ststoken object, or provide an asynchronous method to get the ststoken object");const{name:c}=s;try{let o;if(n&&(o=this.getOssConfig(n)),this.asyncGetOssToken){const e=yield this.asyncGetOssToken();o=this.getOssConfig(e)}const a=new e(o),d=null!=i?i:this.defaultUploadOption,u=this.getConstructOssKey({name:c,directory:t,randomName:r});return yield a.multipartUpload(u,s,d)}catch(e){console.error("there are some problems uploading, please make sure the relevant settings are correct")}}));const{bucket:n,domain:s,region:i,directory:r="",extraUploadOptions:c={},asyncGetOssToken:a,log:d=!1}=o;this.bucket=n,this.domain=s,this.directory=r,this.region=i,this.defaultUploadOption=c,this.asyncGetOssToken=a,this.log=d}getConstructOssKey(e){const{directory:t=this.directory,name:o,randomName:n}=e,s=o.split(".")[1];return n?"string"==typeof n?`${t}${n}.${s}`:`${t}${this.getUuid()}.${s}`:`${t}${o}`}getUuid(){return"xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g,(e=>{const t=16*Math.random()|0;return("x"==e?t:3&t|8).toString(16)}))}getOssConfig(e){const{accessKeyId:t,accessKeySecret:o,securityToken:n}=e;return{secure:!0,region:this.region,accessKeyId:t,accessKeySecret:o,stsToken:n,bucket:this.bucket}}}})),"undefined"!=typeof window&&(window._ALI_OSS_UPLOAD_VERSION_="1.0.0");
