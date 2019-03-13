import VueList from './src/index';
VueList.install = Vue => Vue.component(VueList.name, VueList);
export {
    VueList
};
