#!/bin/bash

# ===================================================
# update-from-template.sh
# ===================================================
# 目的: テンプレートリポジトリ（upstream）から最新の変更を
#      プロジェクトに取り込むためのスクリプト
#
# 実行タイミング:
# - テンプレートリポジトリに重要な更新があった時
# - セキュリティパッチや機能強化を取り込みたい時
# - 定期的なメンテナンス作業の一環として（例：月次/四半期ごと）
#
# 効果:
# - テンプレートの改善点をプロジェクトに反映しつつ、カスタマイズを維持
# - 共通基盤の最新化によるセキュリティ向上とバグ修正の適用
# - 複数プロジェクト間での一貫性維持と技術的負債の軽減
#
# 主な機能:
# - upstreamリポジトリからの更新確認
# - プロジェクト固有のファイルを保護しながら更新を適用
# - 依存関係の自動更新
#
# 実行前の準備:
# - コミットされていない変更がないことを確認（git status）
# - 親リポジトリがupstreamとして登録されていることを確認（git remote -v）
#   未登録の場合: git remote add upstream https://github.com/otomatty/super-next-app.git
# - .gitattributesファイルが正しく設定されていることを確認
# - 最新の親リポジトリの変更を取得（git fetch upstream）
# - 必要に応じてバックアップを作成
# - 詳細は docs/TEMPLATE_MANAGEMENT.md を参照
# ===================================================

# エラーが発生したら停止
# set -e コマンドはスクリプト内でコマンドが失敗した場合に
# 即座に実行を停止するよう指示します
set -e

# 除外するファイルやディレクトリのリスト
# これらのファイルはテンプレート更新時に上書きされず、
# プロジェクト固有の変更が保持されます
# スペース区切りで複数指定可能
EXCLUDED_FILES=(
  "README.md"
  "LICENSE"
  "apps/specific-app"
  "custom-config.json"
  ".cursor"
  "docs"
  "apps"
  "./package.json"  # ルートディレクトリのpackage.jsonのみを除外
)

echo "🔄 テンプレートリポジトリからの更新を確認します..."

# 未コミットの変更があるか確認
if [ -n "$(git status --porcelain)" ]; then
  echo "❌ 未コミットの変更があります。更新前に変更をコミットしてください。"
  echo "📝 git status の結果:"
  git status
  exit 1
fi

# upstreamの最新変更を取得
# このコマンドはupstreamリモートから最新の変更を取得しますが、
# まだローカルブランチにはマージしません
git fetch upstream

# 現在のブランチ名を取得
# 現在作業中のブランチ名を変数に保存します
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)

# 更新があるか確認
# HEAD..upstream/mainは、現在のHEADからupstream/mainまでの
# コミット差分を表示します
UPDATES=$(git log HEAD..upstream/main --oneline)

if [ -z "$UPDATES" ]; then
    # 更新がない場合はメッセージを表示して終了
    echo "✅ 更新はありません。すでに最新の状態です。"
    exit 0
else
    # 更新がある場合は内容を表示し、ユーザーに確認
    echo "🔔 以下の更新が見つかりました："
    echo "$UPDATES"
    echo ""
    
    # 更新するかどうかの確認
    # ユーザーに更新を適用するか確認します
    read -p "🤔 これらの更新を適用しますか？ (yes/no): " ANSWER
    
    if [ "$ANSWER" != "yes" ] && [ "$ANSWER" != "y" ]; then
        # ユーザーがyesまたはyと答えなかった場合は終了
        echo "❌ 更新をキャンセルしました。"
        exit 0
    fi
fi

echo "🔄 更新を開始します..."

# マージ前の状態を保存
# 現在の作業状態をスタッシュに保存します
git stash

# 除外ファイルの一時保存
# 更新時に上書きされないようにするファイルを一時ディレクトリに保存
echo "📋 除外ファイルを一時保存しています..."
TEMP_DIR=$(mktemp -d)
for file in "${EXCLUDED_FILES[@]}"; do
  if [ -e "$file" ]; then
    # ディレクトリ構造を維持するために親ディレクトリを作成
    mkdir -p "$TEMP_DIR/$(dirname "$file")"
    cp -r "$file" "$TEMP_DIR/$(dirname "$file")/"
    echo "  - $file を保存しました"
  fi
done

# upstreamの変更をマージ
# --allow-unrelated-historiesオプションは、履歴が関連していない
# リポジトリ間でもマージを許可します
echo "📥 テンプレートの変更を取り込んでいます..."
git merge upstream/main --allow-unrelated-histories

# 除外ファイルを復元
# 一時保存したファイルを元の場所に戻します
echo "📋 除外ファイルを復元しています..."
for file in "${EXCLUDED_FILES[@]}"; do
  if [ -e "$TEMP_DIR/$file" ]; then
    cp -r "$TEMP_DIR/$file" "$(dirname "$file")/"
    echo "  - $file を復元しました"
  fi
done

# 一時ディレクトリの削除
# 不要になった一時ディレクトリを削除します
rm -rf "$TEMP_DIR"

# パッケージの更新
# 依存関係を最新の状態に更新します
echo "📦 依存関係を更新しています..."
bun install

# スタッシュを復元
# マージ前に保存した作業状態を復元します
# || true は、スタッシュが空の場合にエラーで終了しないようにします
git stash pop || true

echo "✅ 更新が完了しました！"
echo "🔍 変更内容を確認し、必要に応じてコンフリクトを解決してください。"
echo "📝 更新内容を確認したら、変更をコミットしてください。" 