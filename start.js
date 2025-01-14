const { exec } = require('child_process');
const path = require('path');

// npm run build
// node start.js

/**
 * 起動スクリプト
 * - ローカル API サーバーを起動
 * - NW.js アプリケーションを起動
 * 
 * 静的ファイルは `out/` ディレクトリを基準に参照します。
 */

// プロジェクトルートを基準としたパス
const rootDir = path.resolve(__dirname, '.');
const outDir = path.resolve(rootDir, 'out');

// サーバースクリプトのパス
const serverScript = path.join(outDir, 'api', 'server.js');

/**
 * サーバーをバックグラウンドで起動
 * @param {string} scriptPath - 起動するサーバースクリプトのパス
 * @returns {ChildProcess} サーバープロセス
 */
function startServer(scriptPath) {
  const serverProcess = exec(`node ${scriptPath}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Failed to start server: ${error.message}`);
    }
    if (stderr) {
      console.error(`Server stderr: ${stderr}`);
    }
    console.log(stdout);
  });

  return serverProcess;
}

/**
 * NW.js アプリケーションを起動
 * @param {string} baseDir - NW.js のエントリーポイントディレクトリ
 * @param {ChildProcess} serverProcess - サーバープロセス
 */
function startNW(baseDir, serverProcess) {
  const nwProcess = exec(`nw ${baseDir}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Failed to start NW.js: ${error.message}`);
      serverProcess.kill(); // サーバープロセスを終了
      return;
    }
    console.log(stdout);
  });

  // プロセス終了時のクリーンアップ
  process.on('exit', () => {
    serverProcess.kill();
  });

  return nwProcess;
}

// サーバーと NW.js を起動
const serverProcess = startServer(serverScript);
startNW(rootDir, serverProcess);
