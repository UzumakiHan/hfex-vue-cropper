import { ICropperOptionsType } from './typing';
declare class MCropper {
    private cropperIns;
    private options;
    constructor(file: Blob, options: ICropperOptionsType);
    private initCropper;
    destroy(): void;
    getCroppedCanvas(): HTMLCanvasElement;
    version: string;
}
export default MCropper;
