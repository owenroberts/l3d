// nvm use 16, npx vite
import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import vitePluginString from 'vite-plugin-string';
import { resolve } from 'path';

export default defineConfig({
	css: {
		devSourcemap: true // this one
	},
	plugins: [
		vitePluginString(),
		viteStaticCopy({
			targets: [
				{
					src: 'doodoo/public/compositions/l3d_theme_17.json',
					dest: 'doodoo/compositions/',
				},
				{
					src: 'doodoo/public/compositions/drummys.json',
					dest: 'doodoo/compositions/',
				},
				{
					src: 'doodoo/public/samples/',
					dest: 'doodoo/',
				}
			]
		})
	],
	build: {
		rollupOptions: {
			input: {
				main: resolve(__dirname, 'index.html'),
				// doodoo: resolve(__dirname, 'doodoo/index.html'),
				one: resolve(__dirname, 'one/index.html'),
				two: resolve(__dirname, 'two/index.html'),
				three: resolve(__dirname, 'three/index.html'),
			},
		}
	}
});