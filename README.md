# RPGMV-SmartDeploy-forWEB
## 概要
ツクールMVプロジェクトのWEBデプロイを効率化するツールです。
- **プラグインやスクリプトを考慮**に入れた、**未使用素材チェック**による軽量デプロイメント。
- デプロイ後、そのままGitHubにプッシュすれば、**GitHub Pagesにゲームを公開可能**。
- **Netlifyでのゲーム公開**に対応。

## 必要なもの
- **パソコン**
    - Windowsを推奨。
    - Linuxでも動くかもしれない。
    - Macで動くかは確認してない。
- **インストールしておく必要があるもの**
    - 最新の Git
        - コマンドプロンプトやターミナルで以下のコマンドを打ってバージョンが出たら入ってる。
        ```
        git --version
        ```
    - 最新の Node.js (npm)
        - コマンドプロンプトやターミナルで以下のコマンドを**全部**打ってバージョンが出たら入ってる。
        ```
        node -v
        npm -v
        npx -v
        ```
    - 最新の Yarn
        - コマンドプロンプトやターミナルで以下のコマンドを打ってバージョンが出たら入ってる。
        ```
        yarn -v
        ```
- **無いと話にならない**
    - RPGツクールMVで編集可能なプロジェクトファイル
- **あると便利なもの**
    - GitHubのアカウント
    - Netlifyのアカウント

## インストール
0. コマンドプロンプトやターミナルを開き、インストールしたいディレクトリのパスをカレントディレクトリにする
```shell
cd <インストールしたいディレクトリのパス>
```
1. コマンドプロンプトやターミナルで以下を入力
```shell
git clone https://github.com/katai5plate/RPGMV-SmartDeploy-forWEB
cd RPGMV-SmartDeploy-forWEB
yarn setup
```
2. インストール完了

## アンインストール
- インストールした`RPGMV-SmartDeploy-forWEB`ディレクトリを削除すればいい

## 基本的な使い方
1. `src`ディレクトリに、RPGツクールMVで編集可能なプロジェクトファイルを入れて作業する。
2. ある程度作業して、デプロイしたいと思ったら、以下のコマンドをコマンドプロンプトやターミナルから入力
```
cd <RPGMV-SmartDeploy-forWEBディレクトリ>
yarn build
```
3. 問題なければ`docs`ディレクトリに最適化されたWEBデプロイメントファイルが生成される。
### 補足
- RPGアツマールにアップロードしたいなら、デプロイされた`docs`をzipで圧縮したものをアップロードすればいい

## GitHub Pagesでゲームを遊べるようにする（上級者向け）
### 準備
0. GitHubのアカウントを作る
1. 製作中のゲーム専用のリポジトリを作る。
2. `基本的な使い方`の手順でデプロイメントを行う。
3. `1.`で作ったリポジトリを`git clone`でローカルに落とす。
4. `RPGMV-SmartDeploy-forWEB`ディレクトリの内容をそのままコピーする。
5. コミット＆プッシュする。`git commit -m "Create a project"` -> `git push origin master`
### 設定
6. ブランチにファイルがアップロードされたことを確認したら、ブランチの`Setting`を開く。
7. `Setting` -> `Options` -> `GitHub Pages` -> `Source`<br>-> `None`から`master branch /docs folder`に設定し、`Save`をクリック。
8. しばらくしたら、`http://<GitHubのユーザー名>.github.io/<リポジトリ名>/`にゲームが公開される。

## Netlifyでゲームを遊べるようにする（上級者向け）
### 準備
0. GitHubとNetlifyのアカウントを作る
1. GitHubで製作中のゲーム専用のリポジトリを作る。
2. `基本的な使い方`の手順でデプロイメントを行う。
3. `1.`で作ったリポジトリを`git clone`でローカルに落とす。
4. `RPGMV-SmartDeploy-forWEB`ディレクトリの内容をそのままコピーする。
5. コミット＆プッシュする。`git commit -m "<ここに更新メッセージを入力する>"` -> `git push origin master`
### 設定
6. ブランチにファイルがアップロードされたことを確認したら、<https://app.netlify.com/>を開く。
7. `New site from Git`をクリック -> `Continuous Deployment`から`GitHub`をクリック。
8. `1.`で作ったリポジトリ名を見つけてクリック
9. `Branch to deploy`は`master`を選択 -><br>`Build command`は`yarn server:deploy`を入力 -> `Publich directory`は`docs`を入力 -><br>`Deploy site`をクリック。
10. 遷移したページの上の方に、デプロイが成功したらURLが表示される。
### 補足
- 試してないけど、BitBucketからでもNetlifyで公開可能だと思われ。


## 免責事項
このツールを使用していかなる問題が起きても、私はその責を負いません。使用は自己責任でお願いします。