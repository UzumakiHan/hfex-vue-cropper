import b64toBlob from 'b64-to-blob';

export const TYPES = ['image/pjpeg', 'image/jpeg', 'image/jpg', 'image/x-png', 'image/png'];
export const getImgWidthAndHeight = (base64: string) => {
    return new Promise<{width:number, height:number}>((resolve) => {
        // 创建一个Image对象
        const image = new Image();

        // 设置图片的src为base64或blob数据
        image.src = base64;

        // 图片加载完成后获取宽度和高度
        image.onload = function () {
            const { width, height } = image;
            resolve({ width, height });
        };
    });
};

export const getBase64Data = (base64:string) => {
    const base64Config = {
        data: '',
        type: ''
    };
    TYPES.forEach(item => {
        if (base64.indexOf(item) !== -1) {
            base64Config.data = base64.split(`data:${item};base64,`)[1];
            base64Config.type = item;
        }
    });
    return base64Config;
};

export const baseToBlob = (base64: string) => {
    const base64Config = getBase64Data(base64);
    return b64toBlob(base64Config.data, base64Config.type);
};

/**
 * 轮询方法
 * @param fn 回调方法
 * @param timeout 轮询超时
 * @param interval 每次轮询间隙时间
 * @returns
 */
export function poll(fn: () => boolean, timeout: number, interval: number) {
    const endTime = Number(new Date()) + (timeout || 2000);
    interval = interval || 100;

    const checkCondition = function (resolve: (value: unknown) => void, reject: (value: unknown) => void) {
        // 如果条件满足，我们就解决这个Promise

        if (fn()) {
            resolve(true);
        }
        // 如果条件不满足但还没超时，我们会再次检查
        else if (Number(new Date()) < endTime) {
            setTimeout(checkCondition, interval, resolve, reject);
        }
        // 如果条件不满足且已经超时，我们就拒绝这个Promise
        else {
            reject(new Error(`timed out for ${fn}`));
        }
    };
    return new Promise(checkCondition);
}

export const stopDefaultIos13 = () => {
    poll(() => document.querySelector('.cropper-crop-box') !== null, 10000, 150).then(() => {
        // 轮询结束，元素存在
        const cropper = document.querySelector('.cropper-crop-box') as HTMLElement;
        // 填坑，发现 ios 15 版本需要阻止默认行为，才能阻止 ios 手势的交互，ios12 不需要
        cropper.addEventListener(
            'touchstart',
            function (event) {
                event.preventDefault();
            },
            {passive: false}
        );
    });
};

