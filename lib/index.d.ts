import AliOss from 'ali-oss';
import type { MultipartUploadOptions } from 'ali-oss';
import { Language } from './language';
interface StsToken {
    accessKeyId: string;
    accessKeySecret: string;
    expiration?: string;
    securityToken: string;
}
declare type AsyncGetStsToken = (...args: any) => Promise<StsToken>;
interface UploadConfig {
    bucket: string;
    domain: string;
    directory?: string;
    region: string;
    extraUploadOptions?: MultipartUploadOptions;
    log?: boolean;
    asyncGetStsToken?: AsyncGetStsToken;
    language?: keyof typeof Language;
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
    extraUploadOptions?: MultipartUploadOptions;
    randomName?: boolean | string;
}
declare class AliOssUpload {
    bucket: string;
    domain?: string;
    directory?: string;
    region: string;
    defaultUploadOption?: MultipartUploadOptions;
    log: boolean;
    language?: keyof typeof Language;
    asyncGetStsToken?: AsyncGetStsToken;
    constructor(config: UploadConfig);
    handelDirectory(directory: string): string;
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
