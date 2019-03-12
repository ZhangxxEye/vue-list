import VueTabs from './src/tabs';
import VueTab from './src/tab';
VueTabs.install = Vue => Vue.component(VueTabs.name, VueTabs);
VueTab.install = Vue => Vue.component(VueTab.name, VueTab);
export {
    VueTabs,
    VueTab
};
