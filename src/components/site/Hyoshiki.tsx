import { site } from "@/content/site";

/**
 * 警備業法第6条・別記様式第2号「標識」。
 * 記載事項は法定の5項目（認定をした公安委員会／認定の番号／有効期間／氏名又は名称／所在地）。
 * 文字・枠線は黒、地は白（備考1）。インターネット掲載用（同条第2項）としてフッターと /legal に表示する。
 */
export function Hyoshiki({ compact = false }: { compact?: boolean }) {
  const rows: Array<[string, React.ReactNode]> = [
    ["認定をした公安委員会", site.license.authority],
    ["認定の番号", <span key="n" className="num">{site.license.number}</span>],
    ["有効期間", <span key="t" className="num">{site.license.validFrom}から<br />{site.license.validUntil}まで</span>],
    ["氏名又は名称", site.name],
    ["所在地", <span key="a" className="num">{site.license.addressOnSign}</span>],
  ];
  const text = compact ? "text-[12px]" : "text-[14px] sm:text-[15px]";
  const pad = compact ? "px-2.5 py-1.5" : "px-4 py-3";
  return (
    <figure className={`m-0 w-full ${compact ? "max-w-[360px]" : "max-w-[640px]"}`}>
      <table className={`w-full border-collapse border-2 border-black bg-white text-black ${text}`} aria-label="警備業者の標識（警備業法第6条）">
        <caption className={`border-2 border-b-0 border-black bg-white py-1.5 font-bold text-black ${compact ? "text-[13px]" : "text-[16px] sm:text-[18px]"}`}>警備業者</caption>
        <tbody>
          {rows.map(([k, v]) => (
            <tr key={k}>
              <th scope="row" className={`w-[42%] border border-black text-left font-bold ${pad}`}>{k}</th>
              <td className={`border border-black text-center ${pad}`}>{v}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {!compact && <figcaption className="mt-2 text-[12.5px] text-muted">警備業法第6条に基づく標識（別記様式第2号）。主たる営業所にも同じ標識を掲示しています。</figcaption>}
    </figure>
  );
}
