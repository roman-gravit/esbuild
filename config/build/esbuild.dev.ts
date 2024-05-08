import ESBuild from "esbuild";
import { config } from "./esbuild-config";

const PORT: number = Number(process.env.PORT) || 3000;

async function watch() {
	
	let ctx = await ESBuild.context( { ...config });
	
	await ctx.serve( { servedir: config.outdir, port: PORT });
	console.log("Watching for server started...");
}

watch().then(()=>{
	console.log(`server started on development port=${PORT}`);	

}).catch((e) => {
	console.log(`server not started development on port=${PORT} with error=${e}`);	
});