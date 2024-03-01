/* eslint-disable */
import Cropper from 'cropperjs';
import mfileUtil from './mfile';
import {ICropperOptionsType} from './typing';
import $ from 'jquery';
const libInfo = {
    version: '1.0.5',
    ['global-name']: 'MCropper'
};

const defaultOptions = {
    quality: 0.8,
    width: 0,
    height: 0,
    round: false,

    // 如果设置 injectElementID, 会在 elementID 对应元素的所在区域作为裁剪区
    injectElementID: '',

    // 以下配置属性与 cropperjs 的配置属性一致
    // 属性介绍可以到 https://github.com/fengyuanchen/cropperjs 参考
    cropperJS: {
        viewMode: 1,
        aspectRatio: 1 / 1,
        dragMode: 'move',
        modal: false,
        autoCropArea: 0.65,
        minContainerHeight: 0,
        minContainerWidth: 0,
        restore: false,
        guides: false,
        highlight: false,
        cropBoxMovable: false,
        cropBoxResizable: false
    }
};

function setDefaultVal4CropperJS(options: ICropperOptionsType): ICropperOptionsType {
    options.cropperJS = options.cropperJS || {};
    const defaultOptions4CropperJS = defaultOptions.cropperJS as any;
    for (let key in defaultOptions4CropperJS) {
        options.cropperJS[key] = options.cropperJS[key] || defaultOptions4CropperJS[key];
    }
    return options;
}

function resizeImg(file: Blob, options: ICropperOptionsType): Promise<unknown> {
    return mfileUtil.toBase64(file, options);
}
function getRoundedCanvas(sourceCanvas: HTMLCanvasElement): HTMLCanvasElement {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d') as CanvasRenderingContext2D;
    const width = sourceCanvas.width;
    const height = sourceCanvas.height;

    canvas.width = width;
    canvas.height = height;

    context.imageSmoothingEnabled = true;
    context.drawImage(sourceCanvas, 0, 0, width, height);
    context.globalCompositeOperation = 'destination-in';
    context.beginPath();
    context.arc(width / 2, height / 2, Math.min(width, height) / 2, 0, 2 * Math.PI, true);
    context.fill();

    return canvas;
}
class MCropper {
    private cropperIns: any;
    private options: any;

    constructor(file: Blob, options: ICropperOptionsType) {
        options = options || {};
        this.cropperIns = null;
        this.options = {};
        this.options = setDefaultVal4CropperJS(options);

        this.options.quality = options.quality || defaultOptions.quality;
        this.options.width = options?.width || defaultOptions.width;
        this.options.height = options?.height || defaultOptions.height;
        this.options.round = options?.round || defaultOptions.round;

        resizeImg(file, this.options)
            .then((base64: any) => {
                return this.initCropper(base64);
            })
            .then(() => {
                console.log('init cropper success!');
            });
    }

    private initCropper(base64: string): Promise<void> {
        return new Promise((resolve, reject) => {
            if (!this.options.injectElementID) {
                let mCropperTpl = `
            <div class="mcropper" style="display: none;">
              <div class="mcropper__content ${this.options.round ? 'mcropper__content--round' : ''}">
                <img src="${base64}" alt="mcropper image" class="mcropper__content__img" />
              </div>
              <div class="mcropper__footer">
                <div class="mcropper__btn mcropper__btn--cancel">取消</div>
                <div class="mcropper__btn mcropper__btn--ok">确定</div>
              </div>
            </div>`;
                $('.container').append(mCropperTpl);
                this.options.cropperJS.minContainerHeight = $(window).height();
                this.options.cropperJS.minContainerWidth = $(window).width();
            } else {
                $(this.options.injectElementID).attr('src', base64);
                this.options.cropperJS.minContainerHeight = $(this.options.injectElementID).height();
                this.options.cropperJS.minContainerWidth = $(this.options.injectElementID).width();
                this.options.cropperJS.autoCropArea = 1;
            }

            let mCropperImgID = this.options.injectElementID || '.mcropper__content__img',
                mCropperImg = $(mCropperImgID)[0],
                cropperOptions = this.options.cropperJS;

            cropperOptions.ready = () => {
                $('.mcropper').show();
                resolve();
            };

            $('.mcropper__btn--ok').click(() => {
                $('.mcropper').hide();
                this.options.cropperJS.callback4OK(this.getCroppedCanvas());
            });
            $('.mcropper__btn--cancel').click(() => {
                $('.mcropper').hide();
                this.options.cropperJS.callback4Cancel();
            });

            this.cropperIns = new Cropper(mCropperImg, cropperOptions);
        });
    }

    public destroy(): void {
        if (this.cropperIns) {
            this.cropperIns.destroy && this.cropperIns.destroy();
        }
        $('.mcropper').remove();
    }

    public getCroppedCanvas(): HTMLCanvasElement {
        if (this.cropperIns) {
            let croppedCanvas = this.cropperIns.getCroppedCanvas({
                height: this.options.height,
                width: this.options.width
            });
            return this.options.round ? getRoundedCanvas(croppedCanvas) : croppedCanvas;
        } else {
            throw new Error('the cropper instance is not initialized.');
        }
    }

    public version: string = libInfo.version;
}

export default MCropper;
