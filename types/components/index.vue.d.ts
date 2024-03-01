import '../style/mcropper.scss';
declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<__VLS_TypePropsToRuntimeProps<{
    base64: string;
    options?: Record<string, unknown> | undefined;
}>, {
    mCropper: import("vue").Ref<any>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    callback4OK: (v: string, b: Record<string, unknown>) => void;
    callback4Cancel: () => void;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<__VLS_TypePropsToRuntimeProps<{
    base64: string;
    options?: Record<string, unknown> | undefined;
}>>> & {
    onCallback4OK?: ((v: string, b: Record<string, unknown>) => any) | undefined;
    onCallback4Cancel?: (() => any) | undefined;
}, {}, {}>, {
    describe?(_: {}): any;
}>;
export default _default;
type __VLS_NonUndefinedable<T> = T extends undefined ? never : T;
type __VLS_TypePropsToRuntimeProps<T> = {
    [K in keyof T]-?: {} extends Pick<T, K> ? {
        type: import('vue').PropType<__VLS_NonUndefinedable<T[K]>>;
    } : {
        type: import('vue').PropType<T[K]>;
        required: true;
    };
};
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
