import type { ComponentProps, ReactNode } from "react";
import { cx } from "./primitives";

/** フォーム部品。全フォームで同じ見た目にする。 */
const fieldClass = "w-full rounded-sm border border-line bg-bg px-3.5 py-2.5 text-[15px] text-ink placeholder:text-muted/70 focus:border-action focus:outline-none focus:ring-2 focus:ring-action/30";

export function Field({ label, name, required, hint, children, className = "" }: { label: string; name: string; required?: boolean; hint?: string; children: ReactNode; className?: string }) {
  return (
    <div className={cx("grid gap-1.5", className)}>
      <label htmlFor={name} className="text-[13.5px] font-semibold text-ink">
        {label}
        {required ? <span className="num ml-1.5 rounded-sm bg-engi px-1.5 py-0.5 text-[10.5px] font-bold text-white">必須</span> : <span className="ml-1.5 text-[11.5px] font-normal text-muted">任意</span>}
      </label>
      {children}
      {hint && <p className="text-[12.5px] text-muted">{hint}</p>}
    </div>
  );
}

export function Input(props: ComponentProps<"input">) {
  return <input {...props} id={props.id ?? props.name} className={cx(fieldClass, props.className)} />;
}
export function Textarea(props: ComponentProps<"textarea">) {
  return <textarea {...props} id={props.id ?? props.name} className={cx(fieldClass, "min-h-[120px]", props.className)} />;
}
export function Select({ options, placeholder, ...props }: ComponentProps<"select"> & { options: string[]; placeholder?: string }) {
  return (
    <select {...props} id={props.id ?? props.name} className={cx(fieldClass, props.className)} defaultValue={props.defaultValue ?? ""}>
      {placeholder && <option value="" disabled>{placeholder}</option>}
      {options.map((o) => <option key={o} value={o}>{o}</option>)}
    </select>
  );
}
/** ラジオ／チェックのカード型選択肢 */
export function ChoiceGroup({ name, options, type = "radio", columns = 2 }: { name: string; options: string[]; type?: "radio" | "checkbox"; columns?: 1 | 2 | 3 }) {
  const cols = columns === 1 ? "grid-cols-1" : columns === 3 ? "grid-cols-1 sm:grid-cols-3" : "grid-cols-1 sm:grid-cols-2";
  return (
    <div className={cx("grid gap-2", cols)} role={type === "radio" ? "radiogroup" : "group"}>
      {options.map((o, i) => (
        <label key={o} className="flex cursor-pointer items-center gap-2.5 rounded-sm border border-line bg-bg px-3.5 py-2.5 text-[14.5px] has-[:checked]:border-action has-[:checked]:bg-accent-soft">
          <input type={type} name={name} value={o} id={`${name}-${i}`} className="h-4 w-4 accent-[var(--action)]" />
          {o}
        </label>
      ))}
    </div>
  );
}
/** スパム対策のハニーポット */
export function Honeypot() {
  return <div className="hidden" aria-hidden="true"><label htmlFor="website">Website</label><input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" /></div>;
}
export function FormSection({ step, title, children }: { step?: string; title: string; children: ReactNode }) {
  return (
    <fieldset className="grid gap-5 rounded-sm border border-line bg-surface p-5 sm:p-6">
      <legend className="px-1 text-[15px] font-bold text-heading">{step && <span className="num mr-2 text-accent">{step}</span>}{title}</legend>
      {children}
    </fieldset>
  );
}
