import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import dts from "vite-plugin-dts";

export default defineConfig({
	build: {
		lib: {
			entry: 'src/index.ts',
			name: 'shelly-ui',
			formats: ['es', 'cjs'],
			fileName: (format) => `shelly-ui.${format}.js`,
		},
		rollupOptions: {
			external: ['react', 'react-dom'],
			output: {
				globals: {
					react: 'React',
					'react-dom': 'ReactDOM',
				},
			},
		},
	},
	plugins: [
		reactRefresh(),
		dts({
			insertTypesEntry: true,
			include: ['src']
		}),
	],
});
