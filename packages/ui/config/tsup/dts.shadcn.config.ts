import { defineConfig } from 'tsup';
import { shadcnEntries } from './entries/shadcn';

// 外部依存関係を共通の変数として定義
const externalDependencies = [
  'react',
  'react-dom',
  'next',
  '@radix-ui/*',
  'tailwindcss',
  'clsx',
  'lucide-react',
  '@hookform/resolvers',
  'cmdk',
  'input-otp',
  'react-day-picker',
  'react-top-loading-bar',
  'recharts',
  'tailwind-merge',
  'class-variance-authority',
  'next-themes',
  'react-hook-form',
  'react-i18next',
  'sonner',
  'zod',
];

// shadcnコンポーネントの型定義のみを生成する設定
export default defineConfig({
  entry: shadcnEntries,
  dts: {
    // 型定義生成の最適化オプション
    resolve: true, // 依存関係の型を解決
    compilerOptions: {
      skipLibCheck: true, // ライブラリのチェックをスキップ
      emitDeclarationOnly: true, // 宣言ファイルのみ出力
    },
  },
  format: [], // 出力形式なし
  external: externalDependencies,
  outDir: 'dist',
  clean: false, // 既存のビルド結果を保持
});
