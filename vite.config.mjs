// nvm use 16, npx vite
import { viteStaticCopy } from 'vite-plugin-static-copy';
import vitePluginString from 'vite-plugin-string';

export default {
	plugins: [
		vitePluginString(),
		viteStaticCopy({
			targets: [
				{
					src: 'doodoo/public/compositions/l3d_theme_17.json',
					dest: 'doodoo/compositions/',
				},
				{
					src: 'doodoo/public/samples/',
					dest: 'doodoo/',
				},
			]
		})
	]
};