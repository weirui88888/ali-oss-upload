import AliOss from 'ali-oss'
import type { Options } from 'ali-oss'

// TODO:是否需要日志信息（考虑日志有哪些）
// TODO:中英文提示设置 zh,en
// TODO:console.warn提示应采用安全的方式

interface StsToken {
  accessKeyId: string
  accessKeySecret: string
  expiration: string
  securityToken: string
}

type GetOssToken = (...args: any) => Promise<StsToken>

interface UploadConfig {
  bucket: string // bucket库
  domain: string // 自定义域名
  directory?: string // oss目录
  region: string // 地域节点
  extraUploadOptions?: Record<string, any> // 额外的配置
  uuid?: boolean // 上传的文件名称是否使用uuid作为前缀
  log?: boolean // 控制是否打印相关日志，比如上传的文件
  asyncGetOssToken?: GetOssToken
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
  extraUploadOptions?: Record<string, any>
  randomName?: boolean | string
}

class AliOssUpload {
  public bucket: string
  public domain: string
  public directory: string
  public region: string
  public defaultUploadOption: Record<string, any>
  public log: boolean
  public asyncGetOssToken?: GetOssToken
  constructor(config: UploadConfig) {
    const {
      bucket,
      domain,
      region,
      directory = '',
      extraUploadOptions = {},
      asyncGetOssToken,
      log = false
    } = config
    this.bucket = bucket
    this.domain = domain
    this.directory = directory
    this.region = region
    this.defaultUploadOption = extraUploadOptions
    this.asyncGetOssToken = asyncGetOssToken
    this.log = log
  }

  getConstructOssKey(options: ConstructOssKeyOptions) {
    const { directory = this.directory, name, randomName } = options
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

  async upload(uploadOptions: UploadOptions) {
    const { directory, stsToken, file, extraUploadOptions, randomName = false } = uploadOptions
    if (!stsToken && !this.asyncGetOssToken) {
      throw new Error(
        'relevant authentication information is required before uploading，You should actively pass in the ststoken object, or provide an asynchronous method to get the ststoken object'
      )
    }
    const { name } = file
    try {
      let ossConfig!: Options
      if (stsToken) {
        ossConfig = this.getOssConfig(stsToken)
      }
      if (this.asyncGetOssToken) {
        const token = await this.asyncGetOssToken()
        ossConfig = this.getOssConfig(token)
      }
      const ossClient = new AliOss(ossConfig)
      const uploadOptions = extraUploadOptions ?? this.defaultUploadOption
      const uploadPath = this.getConstructOssKey({
        name,
        directory,
        randomName
      })
      const res = await ossClient.multipartUpload(uploadPath, file, uploadOptions)
      return res
    } catch (error) {
      console.error(
        'there are some problems uploading, please make sure the relevant settings are correct'
      )
    }
  }
}

export default AliOssUpload
