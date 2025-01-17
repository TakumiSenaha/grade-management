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

// ルートディレクトリとソースディレクトリのパス
const rootDir = path.resolve(__dirname, '.');
const srcDir = path.resolve(rootDir, 'src');

// サーバースクリプトのパス
const serverScript = path.join(srcDir, 'api', 'server.js');

/**
 * サーバーをバックグラウンドで起動します。
 *
 * @param {string} scriptPath - 起動するサーバースクリプトのパス。
 * @returns {import('child_process').ChildProcess} サーバープロセスオブジェクト。
 * 
 * @example
 * const serverProcess = startServer('/path/to/server.js');
 * serverProcess.on('exit', () => console.log('Server process exited'));
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
 * NW.js アプリケーションを起動します。
 *
 * @param {string} baseDir - NW.js アプリケーションのエントリーポイントディレクトリ。
 * @param {import('child_process').ChildProcess} serverProcess - サーバープロセスオブジェクト。
 * 
 * @returns {import('child_process').ChildProcess} NW.js プロセスオブジェクト。
 * 
 * @example
 * const nwProcess = startNW('/path/to/app', serverProcess);
 * nwProcess.on('exit', () => console.log('NW.js process exited'));
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

  // メインプロセス終了時のクリーンアップ
  process.on('exit', () => {
    serverProcess.kill();
  });

  return nwProcess;
}

// サーバーと NW.js を起動
const serverProcess = startServer(serverScript);
startNW(rootDir, serverProcess);
