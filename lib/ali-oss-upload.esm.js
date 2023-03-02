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
***************************************************************************** */function e(t,e,o,n){return new(o||(o=Promise))((function(s,r){function i(t){try{a(n.next(t))}catch(t){r(t)}}function c(t){try{a(n.throw(t))}catch(t){r(t)}}function a(t){var e;t.done?s(t.value):(e=t.value,e instanceof o?e:new o((function(t){t(e)}))).then(i,c)}a((n=n.apply(t,e||[])).next())}))}class o{constructor(t){const{bucket:e,domain:o,region:n,directory:s="",extraUploadOptions:r={},asyncGetOssToken:i,log:c=!1}=t;this.bucket=e,this.domain=o,this.directory=s,this.region=n,this.defaultUploadOption=r,this.asyncGetOssToken=i,this.log=c}getConstructOssKey(t){const{directory:e=this.directory,name:o,randomName:n}=t,s=o.split(".")[1];return n?"string"==typeof n?`${e}${n}.${s}`:`${e}${this.getUuid()}.${s}`:`${e}${o}`}getUuid(){return"xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g,(t=>{const e=16*Math.random()|0;return("x"==t?e:3&e|8).toString(16)}))}getOssConfig(t){const{accessKeyId:e,accessKeySecret:o,securityToken:n}=t;return{secure:!0,region:this.region,accessKeyId:e,accessKeySecret:o,stsToken:n,bucket:this.bucket}}upload(o){return e(this,void 0,void 0,(function*(){const{directory:e,stsToken:n,file:s,extraUploadOptions:r,randomName:i=!1}=o;if(!n&&!this.asyncGetOssToken)throw new Error("relevant authentication information is required before uploading，You should actively pass in the ststoken object, or provide an asynchronous method to get the ststoken object");const{name:c}=s;try{let o;if(n&&(o=this.getOssConfig(n)),this.asyncGetOssToken){const t=yield this.asyncGetOssToken();o=this.getOssConfig(t)}const a=new t(o),u=null!=r?r:this.defaultUploadOption,d=this.getConstructOssKey({name:c,directory:e,randomName:i});return yield a.multipartUpload(d,s,u)}catch(t){console.error("there are some problems uploading, please make sure the relevant settings are correct")}}))}}export{o as default};"undefined"!=typeof window&&(window._ALI_OSS_UPLOAD_VERSION_="1.0.0");
