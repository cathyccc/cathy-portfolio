/** Small green mono label above a heading. Balanced so a wrapped label
 *  never leaves a single word on its own line. */
export function Eyebrow({
  children,
  dot = false,
}: {
  children: React.ReactNode;
  dot?: boolean;
}) {
  return (
    <p className="inline-flex items-center gap-2.5 font-mono text-[13px] uppercase tracking-[0.06em] text-balance text-accent">
      {dot && (
        <span aria-hidden="true" className="size-2 shrink-0 rounded-full bg-accent" />
      )}
      {children}
    </p>
  );
}
