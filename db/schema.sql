-- テーブル: classes
CREATE TABLE IF NOT EXISTS classes (
  id INTEGER PRIMARY KEY AUTOINCREMENT, -- 自動インクリメントID
  code TEXT NOT NULL UNIQUE,            -- クラスコード
  name TEXT NOT NULL,                   -- 授業名
  url TEXT NOT NULL,                    -- 授業の詳細URL
  teacher TEXT NOT NULL,                -- 教員名
  type TEXT NOT NULL,                   -- 授業タイプ（例: ゼミ）
  credit INTEGER NOT NULL,              -- 単位数
  year TEXT NOT NULL,                   -- 学年
  term TEXT NOT NULL,                   -- 学期（例: 前期, 後期）
  day TEXT NOT NULL,                    -- 曜日（例: 月, 火, 水）
  period TEXT NOT NULL                  -- 時限（例: 1限, 2限）
);
