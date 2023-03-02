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
***************************************************************************** */function e(t,e,o,n){return new(o||(o=Promise))((function(s,i){function r(t){try{c(n.next(t))}catch(t){i(t)}}function a(t){try{c(n.throw(t))}catch(t){i(t)}}function c(t){var e;t.done?s(t.value):(e=t.value,e instanceof o?e:new o((function(t){t(e)}))).then(r,a)}c((n=n.apply(t,e||[])).next())}))}class o{constructor(o){this.upload=o=>e(this,void 0,void 0,(function*(){const{directory:e,stsToken:n,file:s,extraUploadOptions:i,randomName:r=!1}=o;if(!n&&!this.asyncGetStsToken)throw new Error("relevant authentication information is required before uploading，You should actively pass in the ststoken object, or provide an asynchronous method to get the ststoken object");const{name:a}=s;try{let o;if(n&&(o=this.getOssConfig(n)),this.asyncGetStsToken){const t=yield this.asyncGetStsToken();o=this.getOssConfig(t)}const c=new t(o),d=null!=i?i:this.defaultUploadOption,u=this.getConstructOssKey({name:a,directory:e,randomName:r}),h=yield c.multipartUpload(u,s,d);return this.domain?Object.assign({ossSrc:`${this.domain}${h.name}`},h):h}catch(t){console.error("there are some problems uploading, please make sure the relevant settings are correct")}}));const{bucket:n,domain:s,region:i,directory:r="",extraUploadOptions:a={},asyncGetStsToken:c,log:d=!1}=o;this.bucket=n,this.domain=s,this.directory=r,this.region=i,this.defaultUploadOption=a,this.asyncGetStsToken=c,this.log=d}getConstructOssKey(t){const{directory:e=this.directory,name:o,randomName:n}=t,s=o.split(".")[1];return n?"string"==typeof n?`${e}${n}.${s}`:`${e}${this.getUuid()}.${s}`:`${e}${o}`}getUuid(){return"xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g,(t=>{const e=16*Math.random()|0;return("x"==t?e:3&e|8).toString(16)}))}getOssConfig(t){const{accessKeyId:e,accessKeySecret:o,securityToken:n}=t;return{secure:!0,region:this.region,accessKeyId:e,accessKeySecret:o,stsToken:n,bucket:this.bucket}}}export{o as default};"undefined"!=typeof window&&(window._ALI_OSS_UPLOAD_VERSION_="1.0.0");
