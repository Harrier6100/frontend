import { fileURLToPath, URL } from 'url';
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');

    return {
        plugins: [
            vue(),
            AutoImport({
                imports: ['vue', 'vue-router', 'vue-i18n', 'pinia'],
                dirs: ['src/composables'],
                extensions: ['js'],
                deep: true,
            }),
            Components({
                dirs: ['src/components'],
                extensions: ['vue'],
                deep: true,
            }),
        ],
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url)),
            },
        },
        server: {
            host: '0.0.0.0',
            port: parseInt(env.VITE_PORT),
            allowedHosts: ['frontend'],
        },
    };
});
