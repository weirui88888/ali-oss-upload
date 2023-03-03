### 简介

最近在做业务的时候，涉及到上传图片到阿里云 OSS 上的需求。查看了之前的项目代码，各个项目中都充斥着相关的代码，逻辑也几乎相同。

说白了，就是照搬过来改改直接用的。

为了避免这次种每遇到这种需求都 copy 代码的尴尬局面，现对相关代码进行逻辑封装。提供给开发者统一使用

### 优点

- 上手快、降低开发者使用心智负担
  - 该工具库由`typescript`开发，提供类型声明文件
- 支持`cjs` `esm` `umd`
  - 支持在`nodejs`、`ES模块`、`browser` 环境下使用
- 自定义配置（用户可根据实际场景进行配置），详细信息见 TODO
- 避免跨项目，跨业务之间来回copy代码

### 安装

```javascript
npm install ali-oss-upload
```

### 使用方式

下方代码演示的是最**基础**，也是最**标准**的使用方式，目的在于告诉你上手有多easy，在不同场景下更详细化的使用方式请往下阅读

```javascript
const { upload } = new AliOssUpload({
    bucket: '你需要关心的bucket仓库名',
    region: '你需要关心的bucket地域节点',
    asyncGetStsToken: (...arg: any[]) => Promise<stsToken>
})

upload({
    file,
}).then(res => console.log(res))
```

为了方便阅读者理解，下文代码中，配置 key 后面添加 `?` 的代表该字段非必填，反之则属于必填项，具体含义见 TODO

#### 1.浏览器端直接使用脚本

```javascript
// 1.引入相关资源
<script src="https://gosspublic.alicdn.com/aliyun-oss-sdk-6.17.1.min.js"></script> // ali oss cdn
<script src = "./lib/ali-oss-upload.browser.js"></script> // 建议将该文件本地化， 或者放在自己公司的cdn资源上

// 2.实例化
const { upload } = new AliOssUpload({
    bucket: 'bucket仓库名',
    region: 'bucket地域节点' // 形如 oss-cn-beijing
    directory ? : '上传至bucket的哪个目录',
    extraUploadOptions ? : '上传的额外配置项TODO',
    domain ? : 'bucket自定义域名，配置后，upload方法的返回对象中会包括ossSrc字段，也就是上传文件的真实地址'
    asyncGetStsToken ? : '一个返回Promise stsToken对象的异步方法',
  	language? 'zh' | 'en' // 控制台日志报错语言，默认中文
})

// 3.上传
const res = await upload({ // 忽略这里的await，因为一般执行该方法，都是在一个异步函数中
    file: '上传的file，比如input onchange抛出的文件对象，理论上一切File类型的对象都行',
    directory ? : '同上，本次上传的目录会覆盖实例化的基础配置',
    stsToken ? : {
        accessKeyId: 'your accessKeyId',
        accessKeySecret: 'your accessKeySecret',
        securityToken ? : 'your sts token'
    },
    extraUploadOptions ? : '同上，本次上传的目录会覆盖实例化的基础配置'
    randomName ? : '上传文件的名称是否随机，支持字符串类型及布尔类型'
})
```

上面配置项中，比较难理解的主要有**asyncGetStsToken**及**stsToken**两项，现做如下详细解释

- 它两都是在提供上传文件需要的权限信息，且一般使用是二者择一
- asyncGetStsToken 是一个异步函数，返回类型为 stsToken，stsToken 就是一个对象，里面有一些权限配置
- stsToken**应避免直接使用**，自己本地折腾可以，因为这里面的配置信息都是敏感信息, 详细解释见[官方文档](https://github.com/ali-sdk/ali-oss#sts-setup)
- asyncGetStsToken 返回的 Promise 对象正是 stsToken，这个应该是你调用你团队中后端接口返回的，具备一定的实效性（会过期）
- 从工具库的代码逻辑来看，asyncGetStsToken 具备更高的优先级，也就是在你两者同时配置的情况下，asyncGetStsToken 返回的配置项会替代 stsToken
- **无论通过哪种方式提供权限认证信息，都需要确保stsToken对象的key值符合要求（也就是要提供accessKeyId、accessKeySecret、securityToken），本地使用时可不提供securityToken，直接用阿里云提供的accessKeyId和accessKeySecret即可**

##### 2.模块化

```javascript
import AliOssUpload from 'ali-oss-upload' // esm in browser
const AliOssUpload = require('ali-oss-upload') // cjs in nodejs


// 1.获取stsToken的异步方法
const asyncGetStsToken = async () :Promise<stsToken> => {
  const stsToken = await axios.get('后端提供的实时获取临时授权token的接口').data
  return stsToken
}

// 2.实例化
const { upload } = new AliOssUpload({
    bucket: '你需要关心的bucket仓库名',
    region: '你需要关心的bucket地域节点',
    asyncGetStsToken
})

// 3.上传，更多自定义参数请参考TODO
upload({
    file
}).then(res => console.log(res))
```









