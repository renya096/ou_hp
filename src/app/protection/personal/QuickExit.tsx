"use client";

import { useEffect } from "react";
import { Icon } from "@/components/ui/Icon";

const EXIT_URL = "https://www.google.com";

/**
 * 「このページをすぐ閉じる」。クリックまたは Esc キー2回で検索サイトへ置き換え遷移する。
 * location.replace なので「戻る」でこのページには戻らない。閲覧履歴そのものは残るため注意書きを添える。
 */
export function QuickExit({ compact = false }: { compact?: boolean }) {
  useEffect(() => {
    let last = 0;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      const now = Date.now();
      if (now - last < 1500) window.location.replace(EXIT_URL);
      last = now;
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const leave = () => { window.location.replace(EXIT_URL); };

  if (compact) {
    return (
      <button type="button" onClick={leave} className="inline-flex min-h-[40px] items-center gap-1.5 rounded-sm border border-line bg-bg px-3.5 text-[13.5px] font-bold text-ink hover:border-ink">
        <Icon name="close" size={16} />このページをすぐ閉じる
      </button>
    );
  }
  return (
    <div className="grid gap-1.5">
      <button type="button" onClick={leave} className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-sm border border-line bg-bg px-5 text-[14.5px] font-bold text-ink hover:border-ink">
        <Icon name="close" size={18} />このページをすぐ閉じる
      </button>
      <p className="text-[12px] leading-[1.7] text-muted">Escキーを2回押しても移動します。閲覧履歴には残るため、共有端末では履歴の削除やシークレットモードをご利用ください。</p>
    </div>
  );
}
