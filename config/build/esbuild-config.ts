export { config };

import { BuildOptions } from "esbuild";
import path from "path";
import { CleanPlugin } from "./plugins/clean-plugin";
import { HTMLPlugin } from "./plugins/HTMLPlugin";

const mode = process.env.MODE || "development";

const isDevMode = mode === "development";
const isProdMode = mode === "production";


function _PathResolve(...segments: string[]): string {
	return path.resolve(__dirname, "..", "..",  ...segments)
}

const config: BuildOptions = {
	// To bundle a file means to inline any imported dependencies into the file itself. 
	// This process is recursive so dependencies of dependencies (and so on) will also be inlined. 
	// By default esbuild will not bundle the input files.
	bundle: true,

	// When enabled, the generated code will be minified instead of pretty-printed. 
	// Minified code is generally equivalent to non-minified code but is smaller, which means it downloads faster but is harder to debug. 
	// Usually you minify code in production but not in development.
	minify: isProdMode ? true : false,

	// This is an array of files that each serve as an input to the bundling algorithm. 
	// They are called "entry points" because each one is meant to be the initial script that is evaluated which then 
	// loads all other aspects of the code that it represents.
	entryPoints: [  _PathResolve("src", "index.jsx") ],

	entryNames: "[dir]/bundle [name]-[hash]",

	allowOverwrite: true,

	// This option sets the output directory for the build operation. 
	outdir: _PathResolve("out"),

	sourcemap: isDevMode ? "linked" : false,

	tsconfig: _PathResolve("tsconfig.json"),

	loader: {
		".png": "file",
		".svg": "file",
		".jpg": "file"
	},

	metafile: true,

	plugins: [
		CleanPlugin, 
		HTMLPlugin({
			title: "ESBuild",
			jsPath: ["index.js"],
			cssPath: ["index.css"]
		})
	]

}