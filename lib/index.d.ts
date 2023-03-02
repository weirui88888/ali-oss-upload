import AliOss from 'ali-oss';
interface StsToken {
    accessKeyId: string;
    accessKeySecret: string;
    expiration: string;
    securityToken: string;
}
declare type GetOssToken = (...args: any) => Promise<StsToken>;
interface UploadConfig {
    bucket: string;
    domain: string;
    directory?: string;
    region: string;
    extraUploadOptions?: Record<string, any>;
    uuid?: boolean;
    log?: boolean;
    asyncGetOssToken?: GetOssToken;
}
interface ConstructOssKeyOptions {
    name: string;
    directory?: string;
    randomName?: boolean | string;
}
interface UploadOptions {
    stsToken?: StsToken;
    file: File;
    directory?: string;
    extraUploadOptions?: Record<string, any>;
    randomName?: boolean | string;
}
declare class AliOssUpload {
    bucket: string;
    domain: string;
    directory: string;
    region: string;
    defaultUploadOption: Record<string, any>;
    log: boolean;
    asyncGetOssToken?: GetOssToken;
    constructor(config: UploadConfig);
    getConstructOssKey(options: ConstructOssKeyOptions): string;
    getUuid(): string;
    getOssConfig(options: StsToken): {
        secure: boolean;
        region: string;
        accessKeyId: string;
        accessKeySecret: string;
        stsToken: string;
        bucket: string;
    };
    upload: (uploadOptions: UploadOptions) => Promise<AliOss.MultipartUploadResult | {
        bucket: string;
        name: string;
        etag: string;
        data: object;
        res: AliOss.NormalSuccessResponse;
        ossSrc: string;
    } | undefined>;
}
export default AliOssUpload;
