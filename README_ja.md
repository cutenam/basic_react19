# React 19 学習プロジェクト

React 19の新機能と基本概念を体系的に学習できるプロジェクトです。

## 🚀 始め方

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev

# ビルド
npm run build
```

## 📁 プロジェクト構造

```
src/
├── components/           # 再利用可能なコンポーネント
│   ├── common/          # 共通コンポーネント（Button、Inputなど）
│   └── layout/          # レイアウトコンポーネント（Navigationなど）
├── examples/            # 学習サンプル
│   ├── basics/          # 基本概念（useState、useEffectなど）
│   ├── react19/         # React 19の新機能（useActionState, useFormStatus など）
│   ├── hooks/           # カスタムフックのサンプル
│   └── advanced/        # 高度な概念（i18nなど）
├── hooks/               # カスタムフック
├── types/               # TypeScript型定義
├── styles/              # スタイルファイル
└── assets/              # 画像、アイコンなど
```

## 📚 学習内容

### 基本概念（Basics）
- **useState**: 状態管理の基本
- **useEffect**: 副作用の処理
- **useContext**: コンテキストAPIの使用
- **useCallback**: コールバック関数の再利用
- **memo**: メモ化

### React 19の新機能
- **useActionState**: サーバー状態とフォーム処理の新しい方式
- **useFormStatus**: フォーム状態管理
- **useOptimistic**: 楽観的更新によるUX改善
- **use**: コンテキストAPIを使用する新しい方式
- **React Compiler**: ビルド段階でのコンポーネントレンダリング最適化

### カスタムフック（Custom Hooks）
- **useCounter**: カウンターロジックの再利用
- **useLocalStorage**: localStorageと状態の同期
- **useFetch**: HTTPリクエスト処理

### Advanced
- **i18n**: 多言語対応機能
  - **react-i18next**: Reactでのi18n処理

## 🛠 技術スタック

- **React 19**: 最新のReactバージョン
- **TypeScript**: 型安全性
- **Vite**: 高速な開発環境
- **ESLint**: コード品質管理

## 📖 学習ガイド

1. **基本概念から始める**: `useState`と`useEffect`のサンプルでReactの基本を習得しましょう
2. **React 19の新機能を探索**: ActionsとOptimistic Updatesを通じて最新機能を学習しましょう
3. **カスタムフックの活用**: ロジック再利用のパターンを習得しましょう
4. **コード構造の理解**: 体系的なディレクトリ構造を通じて拡張可能なアプリ構造を学習しましょう

## 🎯 学習目標

- Reactの核心概念の理解
- React 19の新機能の活用
- 再利用可能なコンポーネントとフックの作成
- TypeScriptとReactの組み合わせ活用
- 体系的なプロジェクト構造の設計

## 📝 追加学習リソース

- [React公式ドキュメント](https://react.dev)
- [React 19リリースノート](https://react.dev/blog/2024/04/25/react-19)
- [TypeScriptハンドブック](https://www.typescriptlang.org/docs/)

---

各サンプルを直接実行してコードを修正しながら、Reactの動作原理を体験してみてください！ 🎉
