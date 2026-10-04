#!/usr/bin/env bash
# OU警備保障 新HP：既存の Vercel プロジェクト（現行 ou-keibi.com）に「push だけ」で反映する手順
#
# 使い方（Macのターミナルで、このフォルダ内で実行）
#   ./deploy-existing.sh https://github.com/<ユーザー名>/ou_hp.git   （gh auth login 済みなら引数なしでも可）
#
# 流れ
#   1) npm install
#   2) 現行サイトが接続されている GitHub リポジトリを origin に設定
#   3) まず「renewal」ブランチに push → Vercel がプレビューURLを自動発行（本番はまだ変わらない）
#   4) プレビューを確認したら、本番反映は次のどちらか
#        a. GitHub で renewal → main の Pull Request を作ってマージ（履歴が残る。推奨）
#        b. このスクリプトを  PROD=1 ./deploy-existing.sh <URL>  で再実行（main を新サイトで置き換えて push）
#   ※ 旧サイト（v0製）のコードは丸ごと置き換わります。Git の履歴には残るので戻せます。
set -euo pipefail
cd "$(dirname "$0")"

REPO_URL="${1:-}"
if [ -z "$REPO_URL" ] && command -v gh >/dev/null 2>&1; then
  # URL省略時：gh でログイン済みなら、自分のリポジトリから ou_hp を探す
  REPO_URL="$(gh repo list --limit 200 --json name,url -q '.[] | select(.name=="ou_hp") | .url' 2>/dev/null | head -n1 || true)"
  [ -n "$REPO_URL" ] && REPO_URL="${REPO_URL}.git" && echo "リポジトリを検出: $REPO_URL"
fi
if [ -z "$REPO_URL" ]; then
  echo "使い方: ./deploy-existing.sh https://github.com/<ユーザー名>/ou_hp.git"
  echo "（gh auth login 済みなら URL は省略できます）"; exit 1
fi

echo "== 1/3 npm install"
npm install

echo "== 2/3 Git 初期化と origin 設定"
if [ ! -d .git ]; then git init -b main; fi
git add -A
git commit -m "feat: OU警備保障 新コーポレートサイト（2号・4号・清掃・採用・コラム）" || true
if git remote get-url origin >/dev/null 2>&1; then
  git remote set-url origin "$REPO_URL"
else
  git remote add origin "$REPO_URL"
fi

if [ "${PROD:-0}" = "1" ]; then
  echo "== 3/3 本番反映：main を新サイトで置き換えて push（Vercel が本番デプロイ）"
  git branch -M main
  git push -u origin main --force-with-lease || git push -u origin main --force
  echo "push 完了。Vercel の Deployments で本番ビルドの成功を確認してください。"
else
  echo "== 3/3 プレビュー：renewal ブランチに push（Vercel がプレビューURLを発行）"
  git branch -M renewal
  git push -u origin renewal --force
  echo "push 完了。Vercel の Deployments に出るプレビューURLで PC/スマホを確認してください。"
  echo "問題なければ GitHub で renewal → main の PR をマージ、または  PROD=1 ./deploy-existing.sh $REPO_URL"
fi

cat <<'EOS'

公開前に Vercel 側で確認すること（既存プロジェクトの Settings）
  - Framework Preset: Next.js / Root Directory: 空（リポジトリ直下）/ Node.js: 20 以上
  - Environment Variables: RESEND_API_KEY, MAIL_FROM を追加（追加後に Redeploy）
  - 旧サイト用の環境変数・Integration（Supabase など）は不要なら削除してよい
  - Domains: www.ou-keibi.com がこのプロジェクトに付いていればそのまま。移動は不要
EOS
