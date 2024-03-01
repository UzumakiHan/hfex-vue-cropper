import type _HfexVueCropper from './components/index.vue';
import type { App } from 'vue';
declare module 'vue' {
    interface GlobalComponents {
        HfexVueCropper: InstanceType<typeof _HfexVueCropper>;
    }
}
declare const _default: {
    install(app: App): void;
};
export default _default;
