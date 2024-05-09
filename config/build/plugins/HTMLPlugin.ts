import { Plugin } from 'esbuild';
import { writeFile } from "fs/promises";
import path from "path";

interface HTMLPluginOptions {
	template?: string;
	title?: string;
	cssPath?: string[];
	jsPath?: string[];
}

const _RenderHTML = (options: HTMLPluginOptions): string => {
	
const js_scripts = options.jsPath?.map(path => `<script src="${path}"></script>` ) || "";
const css_scripts = options.cssPath?.map(path => `<link rel="stylesheet" src="${path}" />`) || "";

return	options.template ||
	`
	<!DOCTYPE html>
	<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>${options.title}</title>
		${css_scripts}
	</head>
	<body>
		<div id="root"></div>
		${js_scripts}
	</body>
	</html>
	`
}


function _PreparePath(outputs: string[]) {
	return outputs.reduce<Array<string[]>>((acc, path) => {
		
		const [js, css] = acc;

		const splitted_filename = path.split("/").pop();
		if(splitted_filename?.endsWith(".js")) {
			js.push(splitted_filename);

		} else if(splitted_filename?.endsWith(".css")) {
			css.push(splitted_filename);
		}
		return acc;
		
	}, [ [], [] ])
}

export const HTMLPlugin = (options: HTMLPluginOptions): Plugin => { 
return {
	name: 'HTMLPlugin',
	setup(build) {

		const outdir = build.initialOptions.outdir;

		build.onStart(async () => {
			try {
				if(outdir) {
					//console.log(`CleanPlugin:onStart clear prevoius output from outdir= ${outdir}`);
				}

			} catch (e) {
				console.log("HTMLPlugin:onStart error", e);
			}
		})

		build.onEnd(async(result) => {

			const outputs = result.metafile?.outputs;

			const [jsPath, cssPath] = _PreparePath(Object.keys(outputs || []));

			options.jsPath = jsPath;
			options.cssPath = cssPath;

			if(outdir) {
				console.log(`HTMLPlugin:onEnd clear prevoius output from outdir= ${outdir} with result=${result}`);
				await writeFile(
								path.resolve(outdir, "index.html"),
								_RenderHTML(options)
				);
			}
		})
	},
}
}