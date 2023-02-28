import AliOss from 'ali-oss'
console.log(AliOss)

interface OssToken {
  accessKeyId: string
  accessKeySecret: string
  expiration: string
  securityToken: string
}

type GetOssToken = (...args: any) => Promise<OssToken>

interface UploadConfig {
  bucket: string // bucket库
  domain: string // 自定义域名
  directory?: string // oss目录
  fileType?: string // 上传的文件类型
  region: string // 地域节点
  extraUploadOptions?: Record<string, any> // 额外的配置
  uuid?: boolean // 上传的文件名称是否使用uuid作为前缀
  getOssToken?: GetOssToken
}

interface ConstructOssKeyOptions {
  fileName: string
  fileType?: string
  directory?: string
}

interface UploadOptions {
  ossToken?: OssToken
  file: any
  extraUploadOptions?: Record<string, any>
}

class AliOssUpload {
  public bucket: string
  public domain: string
  public directory: string
  public fileType: string
  public region: string
  public defaultUploadOption: Record<string, any>
  public uuid: boolean
  public getOssToken?: GetOssToken
  constructor(config: UploadConfig) {
    const {
      bucket,
      domain,
      region,
      fileType = 'png',
      directory = '/',
      extraUploadOptions = {},
      uuid = true,
      getOssToken
    } = config
    this.bucket = bucket
    this.domain = domain
    this.directory = directory
    this.fileType = fileType
    this.region = region
    this.defaultUploadOption = extraUploadOptions
    this.uuid = uuid
    this.getOssToken = getOssToken
  }

  getConstructOssKey(options: ConstructOssKeyOptions) {
    const { fileType = this.fileType, directory = this.directory, fileName } = options
    return this.uuid
      ? `${directory}${this.getUuid()}-${fileName}.${fileType}`
      : `${directory}${fileName}.${fileType}`
  }

  getUuid() {
    return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, c => {
      const r = (Math.random() * 16) | 0
      return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16)
    })
  }

  getOssConfig(options: OssToken) {
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

  async upload(uploadOptions: UploadOptions & ConstructOssKeyOptions) {
    const { fileName, fileType, directory, ossToken, file, extraUploadOptions } = uploadOptions
    try {
      let ossConfig
      if (ossToken) {
        ossConfig = this.getOssConfig(ossToken)
      } else if (this.getOssToken) {
        const token = await this.getOssToken()
        ossConfig = this.getOssConfig(token)
      } else {
        throw new Error('relevant authentication information is required before uploading')
      }
      const ossClient = new AliOss(ossConfig)
      const uploadOptions = extraUploadOptions ?? this.defaultUploadOption
      const { name } = await ossClient.multipartUpload(
        this.getConstructOssKey({
          fileName,
          fileType,
          directory
        }),
        file,
        uploadOptions
      )
      return name
    } catch (error) {
      console.error('上传出现了一些问题，请确保相关设置正确')
    }
  }
}

export default AliOssUpload
