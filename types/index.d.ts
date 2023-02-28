interface OssToken {
  accessKeyId: string
  accessKeySecret: string
  expiration: string
  securityToken: string
}
type GetOssToken = (...args: any) => Promise<OssToken>
interface UploadConfig {
  bucket: string
  domain: string
  directory?: string
  fileType?: string
  region: string
  extraUploadOptions?: Record<string, any>
  uuid?: boolean
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
declare class AliOssUpload {
  bucket: string
  domain: string
  directory: string
  fileType: string
  region: string
  defaultUploadOption: Record<string, any>
  uuid: boolean
  getOssToken?: GetOssToken
  constructor(config: UploadConfig)
  getConstructOssKey(options: ConstructOssKeyOptions): string
  getUuid(): string
  getOssConfig(options: OssToken): {
    secure: boolean
    region: string
    accessKeyId: string
    accessKeySecret: string
    stsToken: string
    bucket: string
  }
  upload(uploadOptions: UploadOptions & ConstructOssKeyOptions): Promise<string | undefined>
}
export default AliOssUpload
