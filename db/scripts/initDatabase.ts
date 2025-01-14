import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { promises as fs } from 'fs';
import { classDataDummy } from '../data/classData';

/**
 * データベースを初期化するスクリプト。
 * - テーブルを作成
 * - ダミーデータを挿入
 *
 * 実行方法:
 * ts-node db/scripts/initDatabase.ts
 */
const initializeDatabase = async () => {
  try {
    // データベースを開く/作成
    const db = await open({
      filename: './db/database.sqlite',
      driver: sqlite3.Database,
    });

    // スキーマファイルの内容を読み込んで実行
    const schema = await fs.readFile('./db/schema.sql', 'utf-8');
    await db.exec(schema);

    console.log('スキーマを適用しました。');

    // データ挿入クエリ
    const insertQuery = `
      INSERT INTO classes (
        code, name, url, teacher, type, credit, year, term, day, period
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;

    // ダミーデータを挿入
    for (const classData of classDataDummy) {
      await db.run(insertQuery, [
        classData.code,
        classData.name,
        classData.url,
        classData.teacher,
        classData.type,
        classData.credit,
        classData.year,
        classData.term,
        classData.day,
        classData.period,
      ]);
    }

    console.log('ダミーデータを挿入しました。');

    // データベースを閉じる
    await db.close();
    console.log('データベースの初期化が完了しました。');
  } catch (error) {
    console.error('データベースの初期化中にエラーが発生しました:', error);
  }
};

// スクリプトの実行
initializeDatabase();

/* 
sqlite3 database.sqlite
.tables;
SELECT * FROM classes LIMIT 10;
*/
