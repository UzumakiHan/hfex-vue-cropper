export declare const TYPES: string[];
export declare const getImgWidthAndHeight: (base64: string) => Promise<{
    width: number;
    height: number;
}>;
export declare const getBase64Data: (base64: string) => {
    data: string;
    type: string;
};
export declare const baseToBlob: (base64: string) => Blob;
/**
 * 轮询方法
 * @param fn 回调方法
 * @param timeout 轮询超时
 * @param interval 每次轮询间隙时间
 * @returns
 */
export declare function poll(fn: () => boolean, timeout: number, interval: number): Promise<unknown>;
export declare const stopDefaultIos13: () => void;
