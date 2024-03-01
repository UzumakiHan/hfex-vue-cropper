<template>
    <div class="mcropper-container">
        <div
            id="mcropper"
            ref="mCropper"
            class="container relative"
        />
        <div class="mcropper-text-describe">
            <slot name="describe"> 拖动图片，点击确认进行裁剪 </slot>
        </div>
    </div>
</template>
<script lang="ts" setup>
import {defineProps, onMounted, ref} from 'vue';
import MCropper from '../common/mcropper';
import '../style/mcropper.scss';
import {getImgWidthAndHeight, baseToBlob, stopDefaultIos13} from '../common/util';
const props = defineProps<{
    base64: string;
    options?: Record<string, unknown>;
}>();
const emit = defineEmits<{
    (e: 'callbackOK', v: string, b:  Record<string, unknown>): void;
    (e: 'callbackCancel'): void;
}>();



// 实例对象
const mCropper = ref();

const getOption = async () => {
    const {width, height} = await getImgWidthAndHeight(props.base64);
    const defalutOptions = {
        round: false,
        // 默认裁剪输出尺寸为 512 * 521
        height: 512,
        width: 512,
        cropperJS: {
            aspectRatio: 1,
            background: false,
            minCropBoxWidth: 720,
            minCropBoxHeight: 720,
            minCanvasWidth: width && height ? 720 * (width / height) : 1200,
            enlarge: 3,
            round: false
        }
    };
    // 合并配置
    const options:any = Object.assign({}, defalutOptions, props.options);

    options.cropperJS.callbackOK = (croppedCanvas:any) => {
        console.log(typeof croppedCanvas)
        const cutBase64 = croppedCanvas.toDataURL('image/png');
        const canvasWidth = croppedCanvas.width;
        const canvasHeight = croppedCanvas.height;
        console.log('裁剪图片宽高',`${canvasWidth} * ${canvasHeight}`);
        emit('callbackOK', cutBase64, croppedCanvas);
    };
    options.cropperJS.callbackCancel = () => {
        console.log('取消裁剪');
        emit('callbackCancel');
    };
    return options;
};

onMounted(async () => {
    const options = await getOption();
    mCropper.value = new MCropper(baseToBlob(props.base64), options);
    // ios 13 填坑
    stopDefaultIos13();
});
defineExpose({
    mCropper
});
</script>
<style scoped lang="scss">
::v-deep {
    .cropper-canvas {
        overflow: hidden !important;
    }
    .cropper-canvas img {
        opacity: 0;
    }

    .cropper-canvas img.cropper-hidden {
        opacity: 1;
    }
    .cropper-crop-box {
        top: -100px;
        border: 3px solid #fff;
    }
    .mcropper__btn {
        color: transparent;
    }.mcropper__btn--cancel {
    position: absolute;
    left: 72px;
    width: 40px;
    height: 40px;
    background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAB4UExURUxpcf////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////RzAVkAAAAndFJOUwAKra4JUlH+66w0RK81wpOrp+qSQw9yG06RjWZMQQPnOY+16I4LDEMfDccAAAEASURBVDjLjdTrTsMwDAVgszRNO8oYYxt3Bmzg939DQrtVdnMOqv9Ejj4pkn1akb/6+PwWUvsX01yrNhV2reqTdZqwzE713jgie6d62zfboUHy7Ab5dmlKOTrVZ5GVMmmcqsirErmw7i5f1Fg6t+ivoAQOSuiAJG4q351r3cicVO68/M8x2YKg1DMdki0Jcz3TiTzqdL+k1g4eKuaCfzk1V7MclaGcDpQBzRvIgDdYSOdWXAY/58hkmO6DyK7cG5Qd2i+QHc5BIU8sL04eRb4Sy1X0v5SfJrH8GbnMbXWRZU6jdaNEeY7WZblJLPe9vBnbaqNrEuZoXa4l/TwedsP5C+ntbyUss5cxAAAAAElFTkSuQmCC') no-repeat center;
}
.mcropper__btn--ok {
    position: absolute;
    right: 72px;
    width: 48px;
    height: 37px;
    background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAlCAMAAAAzx5qdAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAEXUExURUxpcf///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////1ofhMEAAABcdFJOUwAeMLI1LDv9IlOmmf4BQsa6eZFwnVqrWIdOfA5jghtVeHSlMSNm1bSS0Su+y0enrUBqXydtid6KoEaXTEhcrEFNf3E8wJ7IjyY3aE+i2mG41xf6C/AD69z1EVTSeIe1PwAAAStJREFUOMuV1edSwlAQBeAoJUixi4AFexel2Cv2Dva27/8cYITMuTeX7Gb/5ew3mUnuZmNZwhq7twJVl021ID5mE1FI7m/IqWOpX6FWxWW+m9walvgwQcV4H0W/zfsT9I8p1q+jX+Dvf4p+mfc96Nd4P4K+j/dP6C94f4e+X5utpUmPH0K/qM0uJe05zU+h31BaqeeXvzCihFX0BfVe31//cRiyDPpd1b++tRubbnaNPqH694+k2zpoZfvoB7WH+8HmqBNdYrTleX2f2J5vBjMYTBgO6BfBtJXGywHjkV4hqePFWYchWCVzFTuOTcjox30GLW7wR76jmfD4PDPMO5rPsuOfU/yhYGFVwPeKVmLJ9efCpdteErfitb7n+NkAP46o59NjV/tD2R80AESvu3naBuqgAAAAAElFTkSuQmCC') no-repeat center;
}
    .mcropper-text-describe {
        position: fixed;
        top: 1100px;
        z-index: 10;
        font-size: 26px;
        color: #fff;
        width: 100%;
        text-align: center;
    }
}
</style>
