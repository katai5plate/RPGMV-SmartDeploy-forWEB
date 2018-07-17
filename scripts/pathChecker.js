const fs = require("fs-extra");
const { gameDirName, devDir, buildDir, rpgrt } = require("../scripts.config.json");

const putLog = async ({ n, s }) => {
    console.log(`: > ${n}`);
    try {
        if (typeof s !== 'string') {
            console.log(`${JSON.stringify(s, null, "\t")}`);
        } else {
            console.log(`: ${s}`);
        }
        console.log(":");
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

(async () => {
    console.log('_____________PathChecker begin_____________');
    console.log('...process...');
    await putLog({
        n: "process.argv",
        s: process.argv
    });
    await putLog({
        n: "process.cwd()",
        s: process.cwd()
    });
    console.log('...fs-extra...');
    await putLog({
        n: "fs.realpath ./",
        s: await fs.realpath("./")
    });
    await putLog({
        n: "fs.readdir ./",
        s: await fs.readdir("./")
    });
    await putLog({
        n: `fs.realpath devDir: ${devDir}`,
        s: await fs.realpath(devDir)
    });
    await putLog({
        n: `fs.readdir devDir: ${devDir}`,
        s: await fs.readdir(devDir)
    });
    await putLog({
        n: `fs.realpath buildDir: ${buildDir}`,
        s: await fs.realpath(buildDir)
    });
    await putLog({
        n: `fs.readdir buildDir: ${buildDir}`,
        s: await fs.readdir(buildDir)
    });
    const gameDir = devDir + gameDirName;
    await putLog({
        n: `fs.realpath gameDir: ${gameDir}`,
        s: await fs.realpath(gameDir)
    });
    await putLog({
        n: `fs.readdir gameDir: ${gameDir}`,
        s: await fs.readdir(gameDir)
    });
    await putLog({
        n: `fs.realpath gameDir: ${gameDir + "/audio/"}`,
        s: await fs.realpath(gameDir + "/audio/")
    });
    await putLog({
        n: `fs.readdir gameDir: ${gameDir + "/audio/"}`,
        s: await fs.readdir(gameDir + "/audio/")
    });
    console.log('_____________PathChecker end_____________');
})()