/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  trailingSlash: true,
  assetPrefix: './',   // 静的ファイルを相対パスで参照(こうしないと_next/static/..を参照したりしてしまう)
};

module.exports = nextConfig;
