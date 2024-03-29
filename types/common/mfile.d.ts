/**
 * 转换文件为 base64 字符串
 * (自动根据 File 对象的文件类型进行处理, 如果是图片类型的文件, 会做压缩和角度修正后转换成 Base64, 如果是非图片类型文件, 直接转换成 Base64)
 *
 * @static
 * @param      {File}       file - 需要被转换成 base64 的 File 或 Blob 对象
 * @param      {Object=}    option - 如果 file 传入的是图片类型的文件, 会使用此参数对 file 进行处理
 * @param      {Boolean=}   option.orientation=true - 配置是否自动根据图片文件的 Exif 信息修正旋转角度
 * @param      {Number=}    option.quality=0.8 - 配置内部调用 toDataURL 时的图片质量
 * @param      {*=}         option.* - 可传入 'blueimp-load-image' 类库的所有配置, 最常用的例如设置 maxWidth 和 maxHeight 限制图片的最大宽度和高度, 以及上面的 orientation. {@link https://github.com/blueimp/JavaScript-Load-Image#options Options}
 * @return     {Promise}    返回 file 的 base64 字符串
 */
declare function toBase64(file: Blob, option: any): Promise<unknown>;
/**
 * 通过传入 Base64 字符串和七牛其他配置信息 (例如 token) 上传到 CDN 服务
 * (目前只考虑妈网七牛上传资源的场景, 如果有其他需求请扩展此方法)
 *
 * @static
 * @param      {Object}     param - 参数配置对象
 * @param      {String}     param.baseURL - 七牛上传服务的 URL
 * @param      {String}     param.token - 配置七牛上传服务的 token
 * @param      {String}     param.base64 - 配置上传文件的 base64 字符串
 * @param      {Object=}    param.urlParam - 配置调用七牛上传服务 URL 的参数 (此对象的键值对都会被放入 URL 中, 小心使用, 七牛上传服务 URL 参数请参考 {@link https://developer.qiniu.com/kodo/kb/1326/how-to-upload-photos-to-seven-niuyun-base64-code Link})
 * @param      {String=}    param.urlParam.putb64='-1' - 皮遏制文件大小, 传入 -1 表示文件大小以 http request body 为准
 * @param      {String=}    param.urlParam.key - 配置文件上传到七牛服务的路径
 * @param      {String=}    param.urlParam.crc32 - 配置上传文件的 crc32 检验码, 一旦设置七牛服务端会根据此 crc32 检验码检验文件完整性
 * @return     {Promise}    返回上传文件所在七牛服务的路径名
 */
declare function upload(param: any): Promise<unknown>;
declare const _default: {
    toBase64: typeof toBase64;
    upload: typeof upload;
    version: string;
};
export default _default;
