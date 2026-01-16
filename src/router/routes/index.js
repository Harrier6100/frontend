import customers from './customers';
import locales from './locales';
import materials from './materials';
import properties from './properties';
import propertySpecs from './property-specs';
import suppliers from './suppliers';
import users from './users';

const index = [
    {
        path: '/',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
    },
];

export default [
    ...index,
    ...customers,
    ...locales,
    ...materials,
    ...properties,
    ...propertySpecs,
    ...suppliers,
    ...users,
];
