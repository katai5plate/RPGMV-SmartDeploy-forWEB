const fs = require("fs-extra");
const { parse } = require("path");

const {
    gameDirName,
    devDir,
    buildDir,
    assetPath,
    codePath,
    exceptionPath,
    rpgrt
} = require("../scripts.config.json");

const emes = "Retry the procedure from the beginning if it does not solve.";
const devDirectory = `${devDir}${gameDirName}/`;

/**
 * ファイル名のみを格納したファイルリストを作成
 * 
 * @param {string[]} paths 検索対象
 */
const generateFileList = async (paths) => {
    let ret = [];
    for (let path of paths) {
        // ファイル名のみ格納
        const dir = devDirectory + path;
        if (await fs.exists(dir)) {
            const list = await fs.readdir(dir);
            for (let index in list) {
                const input = dir + list[index];
                const isFile = await fs.statSync(input).isFile();
                if (isFile) {
                    ret = [...ret, input];
                }
            }
        }
    }
    return ret;
}

/**
 * 素材リストを作成
 */
const createAssetList = async () => {
    let alist = await generateFileList(assetPath);
    return alist
        // 重複項目を削除
        .filter((x, i, s) => s.indexOf(x) === i)
        // 空欄を削除
        .filter(x => x !== undefined);
}

/**
 * 参照コードリストを作成
 */
const createCodeList = async () => {
    let clist = await generateFileList(codePath);
    return clist
        // 重複項目を削除
        .filter((x, i, s) => s.indexOf(x) === i)
        // 空欄を削除
        .filter(x => x !== undefined);
}

/**
 * 使用素材リストを作成
 * 
 * @param {string[]} alist 素材リスト
 * @param {string[]} clist 参照コードリスト
 */
const createUsedList = async (alist, clist) => {
    let ulist = [];
    // ファイルリストの
    const _alist = alist
        // 拡張子を除去し、
        // .reduce((p, c) => [...p, parse(c).name], [])
        .reduce((p, c) => [...p, parse(c)], [])
        // さらに重複を削除（サウンド系対策）
        .filter((x, i, s) => s.indexOf(x) === i);

    for (let path of clist) {
        const code = await fs.readFile(path);
        for (let fileData of _alist) {
            // ソースコードから
            if (
                // 素材の名前のみの参照で検索
                code.indexOf(`"${fileData.name}"`) > -1 ||
                code.indexOf(`'${fileData.name}'`) > -1 ||
                // 素材の名前を拡張子付きで検索
                code.indexOf(fileData.base) > -1
            ) {
                // 拡張子つきのファイル名を格納
                ulist = [...ulist, `${fileData.dir}/${fileData.base}`];
            }
        }
    }
    // 例外ファイルを含ませる
    for (let exfile of exceptionPath) {
        ulist = [...ulist, devDirectory + exfile];
    }
    return ulist;
}

/**
 * ファイルまたはディレクトリを削除
 * 
 * @param {string} toPath ファイルまたはディレクトリ
 */
const fsRemove = async (toPath) => {
    try {
        console.log(` : ${toPath} を削除`);
        await fs.remove(toPath);
    } catch (e) {
        throw Error(e);
    }
}

/**
 * dev -> docs にファイルをコピー
 * 
 * @param {string[]} list devのパスリスト
 */
const fsCopy = async (list) => {
    try {
        for (let item of list) {
            const toPath = item.replace(devDirectory, buildDir);
            console.log(` : ${item} -> ${toPath}`);
            await fs.copy(item, toPath);
        }
    } catch (e) {
        throw Error(e);
    }
}

(async () => {
    if (await !fs.pathExists(devDirectory)) {
        const exse = `Directory not found. In order to execute this script, '${devDirectory}' must exist.`;
        console.error(`${exse}`);
        process.exit(1);
    }
    try {
        console.log("素材リスト を作成 ...");
        const assetList = await createAssetList();
        console.log(` : ${assetList.length} 個のファイルを取得`);

        console.log("参照コードリスト を作成 ...");
        const codeList = await createCodeList();
        console.log(` : ${codeList.length} 個のファイルを取得`);

        console.log("使用素材リスト を作成 ...");
        const usedList = await createUsedList(assetList, codeList);
        console.log(` : ${usedList.length} 個のファイルが使用済`);
        console.log(` : ${assetList.length - usedList.length} 個のファイルが未使用`);

        console.log(`docs/ を削除 ...`);
        await fsRemove(buildDir);

        console.log(`docs/ に 使用素材 をコピー ...`);
        await fsCopy(usedList);

        console.log(`docs/ に ソースコード をコピー ...`);
        await fsCopy(codeList);

        console.log(`docs/ の 編集ファイル を削除 ...`);
        await fsRemove(`${buildDir}${parse(rpgrt).base}`);
    } catch (err) {
        console.error(`${err}`);
        process.exit(1);
    }
})()
