import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import AutoImport from 'unplugin-auto-import/vite';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');

    return {
        plugins: [
            vue(),
            Components({
                dirs: ['src/components'],
                extensions: ['vue'],
                deep: true,
            }),
            AutoImport({
                imports: ['vue', 'vue-router', 'vue-i18n', 'pinia'],
                dirs: [
                    'src/composables/confirm.js',
                    'src/composables/toast.js',
                ],
                extensions: ['js'],
                deep: true,
            }),
        ],
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src'),
            },
        },
        server: {
            host: '0.0.0.0',
            port: parseInt(env.VITE_PORT),
        },
    };
});
