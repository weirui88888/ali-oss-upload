export const STSTOKEN_NOT_SUPPLY = 'STSTOKEN_NOT_SUPPLY'
export const NOT_USE_STSTOKEN = 'NOT_USE_STSTOKEN'

export enum Language {
  zh = 'zh',
  en = 'en'
}

export default {
  [Language.zh]: {
    [STSTOKEN_NOT_SUPPLY]:
      '上传文件需要权限认证信息，需优先在实例化时提供异步方法asyncGetStsToken获取ststoken对象，或在调用upload方法时主动传入ststoken对象',
    [NOT_USE_STSTOKEN]:
      '温馨提示：stsToken属于敏感信息，尽量不要直接明文暴露在代码中，防止误提交到线上，优先通过asyncGetStsToken异步方法生成stsToken😊'
  },
  [Language.en]: {
    [STSTOKEN_NOT_SUPPLY]:
      'Uploading files requires permission authentication information, and it is necessary to provide an asynchronous method asyncGetStsToken to obtain the ststoken object when instantiating, or actively pass in the ststoken object when calling the upload method.',
    [NOT_USE_STSTOKEN]:
      'Reminder: stsToken is sensitive information, try not to directly expose the plain text in the code, to prevent mistaken submission to the line, first generate stsToken through the asyncGetStsToken asynchronous method.😊'
  }
}
