import AliOss from 'ali-oss';
import type { MultipartUploadOptions } from 'ali-oss';
import { Language } from './language';
interface StsToken {
    accessKeyId: string;
    accessKeySecret: string;
    expiration?: string;
    securityToken?: string;
}
declare type AsyncGetStsToken = (...args: any) => Promise<StsToken>;
interface GetOssConfigOptions {
    stsToken: StsToken;
    bucket: string;
    region: string;
}
interface GetConfigOptions {
    asyncGetStsToken?: AsyncGetStsToken;
    bucket: string;
    region: string;
}
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
    asyncGetStsToken?: AsyncGetStsToken;
    file: File;
    directory?: string;
    extraUploadOptions?: MultipartUploadOptions;
    randomName?: boolean | string;
    bucket?: string;
    region?: string;
}
interface InitOssClientOptions {
    asyncGetStsToken?: AsyncGetStsToken;
    bucket?: string;
    region?: string;
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
    getOssConfig(options: GetOssConfigOptions): {
        secure: boolean;
        region: string;
        accessKeyId: string;
        accessKeySecret: string;
        stsToken: string | undefined;
        bucket: string;
    };
    getConfig: (options: GetConfigOptions) => Promise<AliOss.Options | undefined>;
    initOssClient: (options: InitOssClientOptions) => Promise<AliOss | undefined>;
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
