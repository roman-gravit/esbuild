import {  Plugin } from 'esbuild';
import { rm } from "fs/promises";

export const CleanPlugin: Plugin = {
	name: 'CleanPlugin',
	setup(build) {
		build.onStart(async () => {
			try {
				const outdir = build.initialOptions.outdir;
				if(outdir) {
					console.log(`CleanPlugin:onStart clear prevoius output from outdir= ${outdir}`);
					await rm(outdir, {recursive: true});
				}

			} catch (e) {
				console.log("CleanPlugin:onStart error", e);
			}
		})

		build.onEnd(() => {
			console.log("build end");
		})
	},
}