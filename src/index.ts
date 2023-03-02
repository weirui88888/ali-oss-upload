import AliOss from 'ali-oss'
import languageConfig, { STSTOKEN_NOT_SUPPLY, NOT_USE_STSTOKEN } from './language'
import type { Options, MultipartUploadOptions } from 'ali-oss'
import { Language } from './language'

interface StsToken {
  accessKeyId: string
  accessKeySecret: string
  expiration?: string
  securityToken: string
}

type AsyncGetStsToken = (...args: any) => Promise<StsToken>

interface UploadConfig {
  bucket: string // bucket库
  domain: string // 自定义域名
  directory?: string // oss目录
  region: string // 地域节点
  extraUploadOptions?: MultipartUploadOptions // 额外的配置
  log?: boolean // 控制是否打印相关日志，比如上传的文件
  asyncGetStsToken?: AsyncGetStsToken // 获取ststoken的异步方法，一般是调用后端服务获得
  language?: keyof typeof Language // 报错提示的语言，支持zh｜en
}

interface ConstructOssKeyOptions {
  name: string
  directory?: string
  randomName?: boolean | string
}

interface UploadOptions {
  stsToken?: StsToken
  file: File
  directory?: string
  extraUploadOptions?: MultipartUploadOptions
  randomName?: boolean | string
}

class AliOssUpload {
  public bucket: string
  public domain?: string
  public directory?: string
  public region: string
  public defaultUploadOption?: MultipartUploadOptions
  public log: boolean
  public language?: keyof typeof Language
  public asyncGetStsToken?: AsyncGetStsToken
  constructor(config: UploadConfig) {
    const {
      bucket,
      domain,
      region,
      directory = '',
      extraUploadOptions = {},
      asyncGetStsToken,
      log = false,
      language = Language.zh
    } = config
    this.bucket = bucket
    this.domain = domain
    this.directory = directory
    this.region = region
    this.defaultUploadOption = extraUploadOptions
    this.asyncGetStsToken = asyncGetStsToken
    this.log = log
    this.language = language
  }

  handelDirectory(directory: string) {
    if (directory === '' || directory === '/') return ''
    return directory.replace(/^\/+|\/+$/g, '') + '/'
  }

  getConstructOssKey(options: ConstructOssKeyOptions) {
    const { directory: originDirectory = this.directory } = options
    const { name, randomName } = options
    const directory = this.handelDirectory(originDirectory!)
    const type = name.split('.')[1]
    if (randomName) {
      return typeof randomName === 'string'
        ? `${directory}${randomName}.${type}`
        : `${directory}${this.getUuid()}.${type}`
    } else {
      return `${directory}${name}`
    }
  }

  getUuid() {
    return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, c => {
      const r = (Math.random() * 16) | 0
      return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16)
    })
  }

  getOssConfig(options: StsToken) {
    const { accessKeyId, accessKeySecret, securityToken } = options
    return {
      secure: true,
      region: this.region,
      accessKeyId,
      accessKeySecret,
      stsToken: securityToken,
      bucket: this.bucket
    }
  }

  upload = async (uploadOptions: UploadOptions) => {
    const { directory, stsToken, file, extraUploadOptions, randomName = false } = uploadOptions
    if (!stsToken && !this.asyncGetStsToken) {
      throw new Error(languageConfig[this.language!][STSTOKEN_NOT_SUPPLY])
    }
    if (stsToken) {
      console.warn(languageConfig[this.language!][NOT_USE_STSTOKEN])
    }
    const { name } = file
    try {
      let ossConfig!: Options
      if (stsToken) {
        ossConfig = this.getOssConfig(stsToken)
      }
      if (this.asyncGetStsToken) {
        const token = await this.asyncGetStsToken()
        ossConfig = this.getOssConfig(token)
      }

      const ossClient = new AliOss(ossConfig)
      const uploadOptions = extraUploadOptions ?? this.defaultUploadOption
      const uploadPath = this.getConstructOssKey({
        name,
        directory,
        randomName
      })
      const res = await ossClient.multipartUpload(uploadPath, file, uploadOptions!)
      return this.domain
        ? {
            ossSrc: `${this.domain}${res.name}`,
            ...res
          }
        : res
    } catch (error: any) {
      console.error(error.message)
    }
  }
}

export default AliOssUpload
