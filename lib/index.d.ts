import AliOss from 'ali-oss';
import type { MultipartUploadOptions } from 'ali-oss';
import { Language } from './language';
interface StsToken {
    accessKeyId: string;
    accessKeySecret: string;
    expiration?: string;
    securityToken?: string;
}
type AsyncGetStsToken = (...args: any) => Promise<StsToken>;
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
interface Config {
    bucket: string;
    domain: string;
    directory?: string;
    region: string;
    extraUploadOptions?: MultipartUploadOptions;
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
interface BatchUploadOptions extends Omit<UploadOptions, 'file'> {
    files: File[];
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
    language?: keyof typeof Language;
    asyncGetStsToken?: AsyncGetStsToken;
    constructor(config: Config);
    handelDomain(domain?: string): string | undefined;
    handelDirectory(directory: string): string;
    getConstructOssKey(options: ConstructOssKeyOptions): string;
    getUuid(): string;
    checkStsToken(stsToken: any): void;
    getOssConfig(options: GetOssConfigOptions): {
        secure: boolean;
        region: string;
        accessKeyId: string;
        accessKeySecret: string;
        stsToken: string | undefined;
        bucket: string;
    };
    getConfig: (options: GetConfigOptions) => Promise<AliOss.Options | undefined>;
    initOssClient: (options?: InitOssClientOptions) => Promise<AliOss | undefined>;
    upload: (uploadOptions: UploadOptions) => Promise<any>;
    batchUpload: (batchUploadOptions: BatchUploadOptions) => Promise<any[] | undefined>;
}
export default AliOssUpload;
