#!/usr/bin/env bash
# OU警備保障 新HP：初回公開手順（Macのターミナルで、このフォルダ内で実行）
# 1) 依存インストール → 2) GitHub非公開リポジトリ作成＆push → 3) Vercelプロジェクト作成＆デプロイ
set -euo pipefail
cd "$(dirname "$0")"

echo "== 1/3 npm install"
npm install

echo "== 2/3 GitHub（非公開リポジトリ ou-keibi-site）"
if [ ! -d .git ]; then git init -b main; fi
git add -A
git commit -m "feat: OU警備保障 新コーポレートサイト（2号・4号・清掃・採用）" || true
if ! git remote get-url origin >/dev/null 2>&1; then
  gh repo create ou-keibi-site --private --source=. --remote=origin --push
else
  git push -u origin main
fi

echo "== 3/3 Vercel（プレビューURLを発行）"
# 初回は対話で「Link to existing project? → N」「Project name → ou-keibi-site」。以後は git push で自動デプロイ。
vercel --yes || true
vercel --prod --yes

echo "完了。環境変数（RESEND_API_KEY / MAIL_FROM）は Vercel の Settings → Environment Variables で設定し、再デプロイしてください。"
