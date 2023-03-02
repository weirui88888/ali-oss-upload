### 简介

最近在做业务的时候，涉及到上传图片到阿里云 OSS 上的需求。查看了之前的项目代码，各个项目中都充斥着相关的代码，逻辑也几乎相同。

说白了，就是照搬过来改改直接用的。

为了避免这次种每遇到这种需求都 copy 代码的尴尬局面，现对相关代码进行逻辑封装。提供给开发者统一使用

### 优点

- 上手快、降低开发者使用心智负担
  - 该工具库由`typescript`开发，提供类型声明文件
- 支持`cjs` `esm` `umd`
  - 支持在`nodejs`、`ES模块`、`browser` 环境下使用
- 自定义配置（用户可根据实际场景进行配置），详细信息见TODO

### 使用方式

**为了方便阅读者理解，下文代码中，配置 key 后面添加`?`的代表该字段非必填，反之则属于必填项，具体含义见TODO**

#### 1.浏览器端直接使用脚本

```javascript
  // 1.引入相关资源
  <script src="https://gosspublic.alicdn.com/aliyun-oss-sdk-6.17.1.min.js"></script> // ali oss cdn
  <script src="./lib/ali-oss-upload.browser.js"></script> // 建议将该文件本地化，或者放在自己公司的cdn资源上

  // 2.实例化
  const { upload } = new AliOssUpload({
    bucket: 'bucket仓库名',
    region: 'bucket区域' // 形如 oss-cn-beijing
    directory?: '上传至bucket的哪个目录',
    extraUploadOptions?:'上传的额外配置项TODO',
    domain?:'bucket自定义域名，配置后，upload方法的返回对象中会包括ossSrc字段，也就是上传文件的真实地址'
    asyncGetStsToken?:'一个返回Promise stsToken对象的异步方法'
  })
	
  // 3.上传
  const res = await upload({
    file: '上传的file，比如input onchange抛出的文件对象，理论上一切File类型的对象都行',
    directory?: '同上，本次上传的目录会覆盖实例化的基础配置',
    stsToken?:{
      accessKeyId: 'your accessKeyId',
      accessKeySecret: 'your accessKeySecret',
      securityToken?: 'your sts token'
    },
    extraUploadOptions?:'同上，本次上传的目录会覆盖实例化的基础配置'
    randomName?:'上传文件的名称是否随机，支持字符串类型及布尔类型'
  })
```

上面配置项中，比较难理解的主要有**asyncGetStsToken**及**stsToken**两项，现做如下详细解释

- 它两都是在提供上传文件需要的权限信息，且一般使用是二者择一
- asyncGetStsToken是一个异步函数，返回类型为stsToken，stsToken就是一个对象，里面有一些权限配置
- stsToken**应避免直接使用**，自己本地折腾可以，因为这里面的配置信息都是敏感信息,详细解释见[官方文档](https://github.com/ali-sdk/ali-oss#sts-setup)
- asyncGetStsToken返回的Promise对象正是stsToken，这个应该是你调用你团队中后端接口返回的，具备一定的实效性（会过期）
- 从工具库的代码逻辑来看，asyncGetStsToken具备更高的优先级，也就是在你两者同时配置的情况下，asyncGetStsToken返回的配置项会替代stsToken
