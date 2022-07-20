interface MixinsOAVComponentParamMap {
}
declare namespace feng3d {
    /**
     * 构造函数
     */
    type Constructor<T> = (new (...args: any[]) => T);
    /**
     * 标记objectview对象界面类
     */
    export function OVComponent(component?: string): (constructor: Constructor<any>) => void;
    /**
     * 标记objectview块界面类
     */
    export function OBVComponent(component?: string): (constructor: Constructor<any>) => void;
    /**
     * 标记objectview属性界面类
     */
    export function OAVComponent(component?: string): (constructor: Constructor<any>) => void;
    /**
     * objectview类装饰器
     */
    export function ov<K extends keyof OVComponentParamMap>(param: {
        component?: K;
        componentParam?: OVComponentParamMap[K];
    }): (constructor: Constructor<any>) => void;
    export type OAVComponentParams = Partial<OAVComponentParamMap[keyof OAVComponentParamMap]> & {
        /**
         * 是否可编辑
         */
        editable?: boolean;
        /**
         * 所属块名称
         */
        block?: string;
        /**
         * 提示信息
         */
        tooltip?: string;
        /**
         * 优先级，数字越小，显示越靠前，默认为0
         */
        priority?: number;
        /**
         * 是否排除
         */
        exclude?: boolean;
    };
    /**
     * objectview属性装饰器
     * @param param 参数
     */
    export function oav(param?: OAVComponentParams): (target: any, propertyKey: string) => void;
    /**
     * 对象界面
     */
    export class ObjectView {
        /**
         * 默认基础类型对象界面类定义
         */
        defaultBaseObjectViewClass: string;
        /**
         * 默认对象界面类定义
         */
        defaultObjectViewClass: string;
        /**
         * 默认对象属性界面类定义
         */
        defaultObjectAttributeViewClass: string;
        /**
         * 属性块默认界面
         */
        defaultObjectAttributeBlockView: string;
        /**
         * 指定属性类型界面类定义字典（key:属性类名称,value:属性界面类定义）
         */
        defaultTypeAttributeView: {};
        OAVComponent: {};
        OBVComponent: {};
        OVComponent: {};
        setDefaultTypeAttributeView(type: string, component: AttributeTypeDefinition): void;
        /**
         * 获取对象界面
         * @param object 用于生成界面的对象
         * @param param 参数
         */
        getObjectView(object: any, param?: GetObjectViewParam): IObjectView;
        /**
         * 获取属性界面
         *
         * @static
         * @param attributeViewInfo 属性界面信息
         * @returns                        属性界面
         *
         * @memberOf ObjectView
         */
        getAttributeView(attributeViewInfo: AttributeViewInfo): IObjectAttributeView;
        /**
         * 获取块界面
         *
         * @static
         * @param blockViewInfo 块界面信息
         * @returns                块界面
         *
         * @memberOf ObjectView
         */
        getBlockView(blockViewInfo: BlockViewInfo): IObjectBlockView;
        addOAV(target: any, propertyKey: string, param?: OAVComponentParams): void;
        /**
         * 获取对象信息
         * @param object 对象
         * @param autocreate 当对象没有注册属性时是否自动创建属性信息
         * @param excludeAttrs 排除属性列表
         * @return
         */
        getObjectInfo(object: any, autocreate?: boolean, excludeAttrs?: string[]): ObjectViewInfo;
    }
    /**
     * 对象界面
     */
    export const objectview: ObjectView;
    /**
     * OAV 组件参数映射
     * {key: OAV组件名称,value：组件参数类定义}
     */
    export interface OAVComponentParamMap extends MixinsOAVComponentParamMap {
        OAVEnum: OAVEnumParam;
    }
    /**
     * OAVEnum 组件参数
     */
    export interface OAVEnumParam {
        component: 'OAVEnum';
        componentParam: {
            /**
             * 枚举类型
             */
            enumClass: any;
        };
    }
    export interface OBVComponentParamMap {
        块组件名称: '块组件参数';
        [component: string]: any;
    }
    export interface OVComponentParamMap {
        类组件名称: '类组件参数';
        [component: string]: any;
    }
    /**
     * 定义属性
     */
    export interface AttributeDefinition {
        /**
         * 属性名称
         */
        name: string;
        /**
         * 是否可编辑
         */
        editable?: boolean;
        /**
         * 所属块名称
         */
        block?: string;
        /**
         * 提示信息
         */
        tooltip?: string;
        /**
         * 组件
         */
        component?: string;
        /**
         * 组件参数
         */
        componentParam?: any;
        /**
         * 优先级，数字越小，显示越靠前，默认为0
         */
        priority?: number;
        /**
         * 是否排除
         */
        exclude?: boolean;
    }
    /**
     * 定义特定属性类型默认界面
     */
    export interface AttributeTypeDefinition {
        /**
         * 界面类
         */
        component: string;
        /**
         * 组件参数
         */
        componentParam?: any;
    }
    /**
     * 块定义
     */
    export interface BlockDefinition {
        /**
         * 块名称
         */
        name: string;
        /**
         * 组件
         */
        component?: string;
        /**
         * 组件参数
         */
        componentParam?: any;
    }
    /**
     * ObjectView类配置
     */
    export interface ClassDefinition {
        /**
         * 组件
         */
        component?: string;
        /**
         * 组件参数
         */
        componentParam?: any;
        /**
         * 自定义对象属性定义字典（key:属性名,value:属性定义）
         */
        attributeDefinitionVec: AttributeDefinition[];
        /**
         * 自定义对象属性块界面类定义字典（key:属性块名称,value:自定义对象属性块界面类定义）
         */
        blockDefinitionVec: BlockDefinition[];
    }
    /**
     * 对象属性界面接口
     */
    export interface IObjectAttributeView {
        /**
         * 界面所属对象（空间）
         */
        space: any;
        /**
         * 更新界面
         */
        updateView(): void;
        /**
         * 属性名称
         */
        attributeName: string;
        /**
         * 属性值
         */
        attributeValue: any;
        /**
         * 对象属性界面
         */
        objectView: IObjectView;
        /**
         * 对象属性块界面
         */
        objectBlockView: IObjectBlockView;
    }
    /**
     * 对象属性块界面接口
     */
    export interface IObjectBlockView {
        /**
         * 界面所属对象（空间）
         */
        space: any;
        /**
         * 块名称
         */
        blockName: string;
        /**
         * 对象属性界面
         */
        objectView: IObjectView;
        /**
         * 更新界面
         */
        updateView(): void;
        /**
         * 获取属性界面
         * @param attributeName 属性名称
         */
        getAttributeView(attributeName: string): IObjectAttributeView;
    }
    /**
     * 对象界面接口
     */
    export interface IObjectView {
        /**
         * 界面所属对象（空间）
         */
        space: any;
        /**
         * 更新界面
         */
        updateView(): void;
        /**
         * 获取块界面
         * @param blockName 块名称
         */
        getblockView(blockName: string): IObjectBlockView;
        /**
         * 获取属性界面
         * @param attributeName 属性名称
         */
        getAttributeView(attributeName: string): IObjectAttributeView;
    }
    /**
     * 对象属性信息
     */
    export interface AttributeViewInfo {
        /**
         * 属性名称
         */
        name: string;
        /**
         * 属性类型
         */
        type: string;
        /**
         * 是否可写
         */
        editable: boolean;
        /**
         * 所属块名称
         */
        block?: string;
        /**
         * 提示信息
         */
        tooltip?: string;
        /**
         * 组件
         */
        component?: string;
        /**
         * 组件参数
         */
        componentParam?: any;
        /**
         * 属性所属对象
         */
        owner: any;
        /**
         * 优先级，数字越小，显示越靠前，默认为0
         */
        priority?: number;
        /**
         * 是否排除
         */
        exclude?: boolean;
    }
    /**
     * 对象属性块
     */
    export interface BlockViewInfo {
        /**
         * 块名称
         */
        name: string;
        /**
         * 组件
         */
        component?: string;
        /**
         * 组件参数
         */
        componentParam?: any;
        /**
         * 属性信息列表
         */
        itemList: AttributeViewInfo[];
        /**
         * 属性拥有者
         */
        owner: any;
    }
    /**
     * 对象信息
     */
    export interface ObjectViewInfo {
        /**
         * 组件
         */
        component?: string;
        /**
         * 组件参数
         */
        componentParam?: any;
        /**
         * 对象属性列表
         */
        objectAttributeInfos: AttributeViewInfo[];
        /**
         * 对象块信息列表
         */
        objectBlockInfos: BlockViewInfo[];
        /**
         * 保存类的一个实例，为了能够获取动态属性信息
         */
        owner: any;
        /**
         * 是否可编辑
         */
        editable?: boolean;
    }
    export type GetObjectViewParam = {
        /**
         * 当对象没有注册属性时是否自动创建属性信息
         */
        autocreate?: boolean;
        /**
         * 排除属性列表
         */
        excludeAttrs?: string[];
        /**
         * 是否可编辑
         */
        editable?: boolean;
    };
    export {};
}
//# sourceMappingURL=index.d.ts.map