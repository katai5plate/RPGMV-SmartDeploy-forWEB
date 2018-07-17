const fs = require("fs-extra");

const { gameDirName, devDir, buildDir, rpgrt } = require("../scripts.config.json");
const devDirectory = `${devDir}${gameDirName}/`;

(async () => {
    const emes = "Retry the procedure from the beginning if it does not solve.";
    if (await fs.pathExists(devDirectory)) {
        const exse = `Directory already exists. In order to execute this script, '${devDirectory}' must not exist.`;
        console.error(`${exse}`);
        process.exit(1);
    }
    try {
        console.log(`ディレクトリを削除 ${devDirectory} ...`);
        await fs.remove(devDirectory);
        console.log(`ディレクトリを作成 ${devDirectory} ...`);
        await fs.mkdirp(devDirectory);
        console.log(`コピー ${buildDir} -> ${devDirectory} ...`);
        await fs.copy(buildDir, devDirectory);
        console.log(`コピー ${rpgrt} -> ${devDirectory}Game.rpgproject ...`);
        await fs.copy(rpgrt, `${devDirectory}Game.rpgproject`);
        console.log('セットアップ完了');
    } catch (err) {
        console.error(`${err}`);
        process.exit(1);
    }
})()
