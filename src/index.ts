import HfexVueCropper from './components/index.vue';
import type _HfexVueCropper from './components/index.vue';

import type {App} from 'vue';
declare module 'vue' {
    export interface GlobalComponents {
        HfexVueCropper: InstanceType<typeof _HfexVueCropper>;
    }
}
export default {
    install(app: App) {
        app.component('hfex-vue-cropper', HfexVueCropper);
    }
};
