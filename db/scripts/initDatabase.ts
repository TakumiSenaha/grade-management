import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { promises as fs } from 'fs';
import { class2023 } from '../data/classData';

// ts-node db/scripts/initDatabase.ts
// で実行
const initializeDatabase = async () => {
  // データベースを開く/作成
  const db = await open({
    filename: './db/database.sqlite',
    driver: sqlite3.Database,
  });

  await db.exec(`
    ${await import('fs/promises').then(fs => fs.readFile('./db/schema.sql', 'utf-8'))}
  `);

  // データを挿入
  const insertQuery = `
    INSERT INTO classes (
      academicYear, semester, dayOfWeek, period, instructor, subjectName, classNumber, credits, url, category, facultyCode
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
  `;

  for (const classData of class2023) {
    await db.run(insertQuery, [
      classData.academicYear,
      classData.semester,
      classData.dayOfWeek,
      classData.period,
      classData.instructor,
      classData.subjectName,
      classData.classNumber,
      classData.credits,
      classData.url,
      classData.category,
      classData.facultyCode,
    ]);
  }

  console.log('データベースの初期化が完了しました。');
  await db.close();
};

initializeDatabase().catch(console.error);

/* 
sqlite3 database.sqlite
.tables;
SELECT * FROM classes LIMIT 10;
*/
