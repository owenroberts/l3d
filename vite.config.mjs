// nvm use 16, npx vite
import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import vitePluginString from 'vite-plugin-string';
import { resolve } from 'path';

export default defineConfig({
	base: "./",
	css: {
		devSourcemap: true // this one
	},
	plugins: [
		vitePluginString(),
		viteStaticCopy({
			targets: [
				{
					src: 'doodoo/samples/',
					dest: 'doodoo/',
				},
				{
					src: 'one/data/',
					dest: 'one/',
				},
				{
					src: 'one/drawings/',
					dest: 'one/',
				},
				{
					src: 'three/models',
					dest: 'three/'
				}
			]
		})
	],
	build: {
		chunkSizeWarningLimit: 600,
		outDir: './docs',
		rollupOptions: {
			input: {
				main: resolve(__dirname, 'index.html'),
				// doodoo: resolve(__dirname, 'doodoo/index.html'),
				one: resolve(__dirname, 'one/index.html'),
				two: resolve(__dirname, 'two/index.html'),
				three: resolve(__dirname, 'three/index.html'),
			},
			output: {
				manualChunks: {
					three: ['three'],
				},
			},
		}
	}
});