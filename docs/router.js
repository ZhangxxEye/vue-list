import Vue from 'vue';
import Router from 'vue-router';
import ProjectFeatures from './pages/project-features';
Vue.use(Router);

const routes = [{
  path: '/',
  name: 'features',
  component: ProjectFeatures,
}];

const router = new Router({ routes });

export default router;
