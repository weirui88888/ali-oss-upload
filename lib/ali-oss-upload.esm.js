import t from"ali-oss";
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
***************************************************************************** */function e(t,e,o,s){return new(o||(o=Promise))((function(n,i){function r(t){try{a(s.next(t))}catch(t){i(t)}}function c(t){try{a(s.throw(t))}catch(t){i(t)}}function a(t){var e;t.done?n(t.value):(e=t.value,e instanceof o?e:new o((function(t){t(e)}))).then(r,c)}a((s=s.apply(t,e||[])).next())}))}class o{constructor(o){this.upload=o=>e(this,void 0,void 0,(function*(){const{directory:e,stsToken:s,file:n,extraUploadOptions:i,randomName:r=!1}=o;if(!s&&!this.asyncGetOssToken)throw new Error("relevant authentication information is required before uploading，You should actively pass in the ststoken object, or provide an asynchronous method to get the ststoken object");const{name:c}=n;try{let o;if(s&&(o=this.getOssConfig(s)),this.asyncGetOssToken){const t=yield this.asyncGetOssToken();o=this.getOssConfig(t)}const a=new t(o),u=null!=i?i:this.defaultUploadOption,d=this.getConstructOssKey({name:c,directory:e,randomName:r});return yield a.multipartUpload(d,n,u)}catch(t){console.error("there are some problems uploading, please make sure the relevant settings are correct")}}));const{bucket:s,domain:n,region:i,directory:r="",extraUploadOptions:c={},asyncGetOssToken:a,log:u=!1}=o;this.bucket=s,this.domain=n,this.directory=r,this.region=i,this.defaultUploadOption=c,this.asyncGetOssToken=a,this.log=u}getConstructOssKey(t){const{directory:e=this.directory,name:o,randomName:s}=t,n=o.split(".")[1];return s?"string"==typeof s?`${e}${s}.${n}`:`${e}${this.getUuid()}.${n}`:`${e}${o}`}getUuid(){return"xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g,(t=>{const e=16*Math.random()|0;return("x"==t?e:3&e|8).toString(16)}))}getOssConfig(t){const{accessKeyId:e,accessKeySecret:o,securityToken:s}=t;return{secure:!0,region:this.region,accessKeyId:e,accessKeySecret:o,stsToken:s,bucket:this.bucket}}}export{o as default};"undefined"!=typeof window&&(window._ALI_OSS_UPLOAD_VERSION_="1.0.0");
