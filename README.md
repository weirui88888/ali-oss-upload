### 关于

本库，只是为了方便前端开发者进行文件上传至阿里云 oss，所以里面只是基于[ali-oss](https://github.com/ali-sdk/ali-oss)库对上传动作进行了简单地包装，对外只暴露了上传单个文件和批量上传文件的两个方法。如业务有更多细致的要求和场景，比如说列举、删除 bucket 仓库文件等操作，可直接调用`initOssClient`来获取到最底层的 `oss client` 对象，它上面有一切你想要的方法，使用方法直接参考[ali-oss](https://github.com/ali-sdk/ali-oss)即可。代码演示见下方

### 简介

最近在做业务的时候，涉及到上传图片到阿里云 OSS 上的需求。查看了之前的项目代码，各个项目中都充斥着相关的代码，逻辑也几乎相同。

说白了，就是照搬过来改改直接用的。

为了避免这次种每遇到这种需求都 copy 代码的尴尬局面，现对相关代码进行逻辑封装。提供给开发者统一使用

### 优点

- 上手快、降低开发者使用心智负担
  - 该工具库由`typescript`开发，提供类型声明文件
- 支持`cjs` `esm` `umd`
  - 支持在`nodejs`、`ES模块`、`browser` 环境下使用
- 自定义配置（用户可根据实际场景进行配置）
- 避免跨项目，跨业务之间来回 copy 代码

### 安装

```javascript
npm install ali-oss-upload
```

### 使用方式

下方代码演示的是最**基础**，也是最**标准**的使用方式，目的在于告诉你上手有多 easy，在不同场景下更详细化的使用方式请往下阅读

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

为了方便阅读者理解，下文代码中，配置 key 后面添加 `?` 的代表该字段非必填，反之则属于必填项，具体含义见[配置项](https://github.com/weirui88888/ali-oss-upload#配置项)

#### 1.浏览器端直接使用脚本

```javascript
// 1.引入相关资源
<script src="https://gosspublic.alicdn.com/aliyun-oss-sdk-6.17.1.min.js"></script> // ali oss cdn
<script src = "./lib/ali-oss-upload.browser.js"></script> // 建议将该文件本地化， 或者放在自己公司的cdn资源上

// 2.初始化
const { upload } = new AliOssUpload({
    bucket: 'bucket仓库名',
    region: 'bucket地域节点' // 形如 oss-cn-beijing
    directory ? : '上传至bucket的哪个目录',
    extraUploadOptions ? : '上传的额外配置项',
    domain ? : 'bucket自定义域名，配置后，upload方法的返回对象中会包括ossSrc字段，也就是上传文件的真实地址',
    asyncGetStsToken ? : '一个返回Promise stsToken对象的方法',
    language? 'zh' | 'en' // 控制台日志报错语言，默认中文
})

// 3.上传
const res = await upload({ // 忽略这里的await，因为一般执行该方法，都是在一个异步函数中
    file: '上传的file，比如input onchange抛出的文件对象，理论上一切File类型的对象都行',
    directory ? : '同上，本次上传的目录会覆盖实例化的基础配置',
	bucket ? : '同上，本次上传的bukect会覆盖实例化的基础配置bucket',
	region ? : '同上，本次设置的region会覆盖实例化的基础配置region',
	asyncGetStsToken ? : '一个返回Promise stsToken对象的方法',
    extraUploadOptions ? : '同上，本次上传的目录会覆盖实例化的基础配置',
    randomName ? : '上传文件的名称是否随机，支持字符串类型及布尔类型'
})
```

上面配置项中，关于 asyncGetStsToken 的理解

- asyncGetStsToken 是一个函数，返回的 Promise 对象类型必须为[stsToken](https://github.com/weirui88888/ali-oss-upload/blob/main/lib/index.d.ts#L4)

- 该函数中你需要做是你调用你团队中后端接口，拿到具备实效性（会过期）的权限认证信息，如果后端返回的字段值不匹配[stsToken](https://github.com/weirui88888/ali-oss-upload/blob/main/lib/index.d.ts#L4)，你需要做一定的转换工作
- 本地尝鲜的话，且没有后端配合的情况下，你可以只需要提供权限满足的`accessKeyId`和`accessKeySecret`即可，不强求，参考[使用技巧](https://github.com/weirui88888/ali-oss-upload#使用技巧)

#### 2.模块化

```javascript
import AliOssUpload from 'ali-oss-upload' // esm in browser
const AliOssUpload = require('ali-oss-upload') // cjs in nodejs

// 1.获取stsToken的异步方法
const asyncGetStsToken = async (): Promise<stsToken> => {
  const stsToken = await axios.get('后端提供的实时获取临时授权token的接口').data
  return stsToken
}

// 2.初始化
const { upload } = new AliOssUpload({
  bucket: '你需要关心的bucket仓库名',
  region: '你需要关心的bucket地域节点',
  asyncGetStsToken
})

// 3.上传，更多自定义参数请参考配置项模块
upload({
  file
}).then(res => console.log(res))
```

### 配置项

下面列出该库使用过程中涉及的配置项，为了方便知道这些字段再哪些方法中支持使用，现做如下约定，new AliOssUpload 我们称之为初始化，其他的都称之为方法，且方法中相同字段的配置项，会覆盖初始化过程中传入的配置项

举个🌰：在new AliOssUpload时我们设置了bucket=A，表示接下来调用upload方法上传的文件，都会上传到bucket A中，但是如果我们某次调用upload方法时,也传入了bucket=B,那么本次文件会被上传到bucket B中

| 名称               | 含义               | 适用范围                                   | 类型                                                         |
| :----------------- | :----------------- | :----------------------------------------- | ------------------------------------------------------------ |
| bucket             | 被操作的bucket     | new AliOssUpload ｜ upload ｜initOssClient | string                                                       |
| region             | 地域节点           | new AliOssUpload ｜ upload ｜initOssClient | string                                                       |
| directory          | 上传文件的目录     | new AliOssUpload ｜ upload                 | string                                                       |
| asyncGetStsToken   | 获取stsToken的方法 | new AliOssUpload ｜ upload ｜initOssClient | function                                                     |
| domain             | bucket自定义域名   | new AliOssUpload                           | domain                                                       |
| extraUploadOptions | 上传文件额外操作   | new AliOssUpload ｜ upload                 | [extraUploadOptions](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/ali-oss/index.d.ts#L503) |
| language           | 控制台报错提示语言 | new AliOssUpload                           | string(zh\|en)                                               |
|                    |                    |                                            |                                                              |



### 注意事项

- 上传的 bucket**必须**进行跨域设置，可参考[如何开启 bucket 跨域](https://github.com/ali-sdk/ali-oss#bucket-setup)
- asyncGetStsToken 函数返回的[stsToken](https://github.com/weirui88888/ali-oss-upload/blob/main/lib/index.d.ts#L4)类型的对象，类型和名称要完全匹配，也就是字段值**必须**要准确提供
- 如果使用 cdn 方式，请确保引入的 ali-oss-sdk 版本为 6+
- 初始化的配置项权重小于调用 upload 方法时传入的配置项，也就是相同字段的配置项，后者会覆盖前者

### 使用技巧

#### 1.本地尝鲜可以直接这样使用，因为没有后端返回临时权限的token，所以就模拟返回一个即可。切勿将敏感信息提交至线上。真实环境下，这个方法的返回值一定是通过后端返回的，且具备时效性

```javascript
const asyncGetStsToken = () => Promise.resolve({
  accessKeyId: 'xxxxxxx',
  accessKeySecret: 'xxxxxxx',
  securityToken?: '这个提不提供都行，理论上只要你的accessKeyId及accessKeySecret有访问和操作oss bucket的权限就可以了'
})
```

#### 2.可以通过 extraUploadOptions 满足你的更多上传场景，比如说需要获取上传进度，更多信息请参考[分片上传](https://help.aliyun.com/document_detail/31850.html)

```javascript
const res = await upload({
  file,
  extraUploadOptions: {
    progress: percent => {
      console.log(percent) // 获取上传进度
    }
    // ....
  }
})
```

#### 3.如果你除了上传文件，还有其他的需求，例如想看下某个bucket下的文件，那么你可以这样做

```javascript
const asyncGetStsToken = async () => Promise.resolve({
  accessKeyId: 'xxxxxx',
  accessKeySecret: 'xxxxxx'
})

const { initOssClient } = new AliOssUpload({
  bucket: 'xxxxx',
  region: 'xxxxx',
  asyncGetStsToken
})
 
 const ossClient = initOssClient()
 
 ossClient.then(client => { // 为了代码美观，你应该使用async await
   client.list().then(res => {
     console.log(res) // 获取当前bucket下的文件
   })
 })
```



### 参考文档

[什么是对象存储 OSS](https://help.aliyun.com/document_detail/31817.html)

[ali-oss:JavaScript SDK for the Browser and Node.js](https://github.com/ali-sdk/ali-oss)
