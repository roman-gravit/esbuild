import ESBuild from "esbuild";
import { config } from "./esbuild-config";

ESBuild.build(config)
	.catch((e) => {
		console.log(`server not started on production with error=${e}`);	
	});