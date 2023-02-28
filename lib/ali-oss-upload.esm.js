import e from"ali-oss";
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
***************************************************************************** */function t(e,t,i,o){return new(i||(i=Promise))((function(n,s){function r(e){try{u(o.next(e))}catch(e){s(e)}}function c(e){try{u(o.throw(e))}catch(e){s(e)}}function u(e){var t;e.done?n(e.value):(t=e.value,t instanceof i?t:new i((function(e){e(t)}))).then(r,c)}u((o=o.apply(e,t||[])).next())}))}console.log(e);class i{constructor(e){const{bucket:t,domain:i,region:o,fileType:n="png",directory:s="/",extraUploadOptions:r={},uuid:c=!0,getOssToken:u}=e;this.bucket=t,this.domain=i,this.directory=s,this.fileType=n,this.region=o,this.defaultUploadOption=r,this.uuid=c,this.getOssToken=u}getConstructOssKey(e){const{fileType:t=this.fileType,directory:i=this.directory,fileName:o}=e;return this.uuid?`${i}${this.getUuid()}-${o}.${t}`:`${i}${o}.${t}`}getUuid(){return"xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g,(e=>{const t=16*Math.random()|0;return("x"==e?t:3&t|8).toString(16)}))}getOssConfig(e){const{accessKeyId:t,accessKeySecret:i,securityToken:o}=e;return{secure:!0,region:this.region,accessKeyId:t,accessKeySecret:i,stsToken:o,bucket:this.bucket}}upload(i){return t(this,void 0,void 0,(function*(){const{fileName:t,fileType:o,directory:n,ossToken:s,file:r,extraUploadOptions:c}=i;try{let i;if(s)i=this.getOssConfig(s);else{if(!this.getOssToken)throw new Error("relevant authentication information is required before uploading");{const e=yield this.getOssToken();i=this.getOssConfig(e)}}const u=new e(i),a=null!=c?c:this.defaultUploadOption,{name:l}=yield u.multipartUpload(this.getConstructOssKey({fileName:t,fileType:o,directory:n}),r,a);return l}catch(e){console.error("上传出现了一些问题，请确保相关设置正确")}}))}}export{i as default};"undefined"!=typeof window&&(window._ALI_OSS_UPLOAD_VERSION_="1.0.0");
