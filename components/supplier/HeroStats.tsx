export function HeroStats({
  activeProjects,
  needActionCount,
  pipelineLabel,
}: {
  activeProjects: number
  needActionCount: number
  pipelineLabel: string
}) {
  const cards = [
    { label: 'Active Projects', value: String(activeProjects) },
    { label: 'Need Your Action', value: String(needActionCount) },
    { label: 'Total Pipeline', value: pipelineLabel },
  ]
  return (
    <div className="grid gap-3 sm:grid-cols-3 sm:gap-4">
      {cards.map((c) => (
        <div
          key={c.label}
          className="rounded-2xl border border-cq-border bg-white px-5 py-7 shadow-[0_1px_2px_rgba(30,40,50,0.06)] sm:px-6 sm:py-8"
        >
          <p className="text-3xl font-extrabold tracking-tight text-cq-text sm:text-4xl">
            {c.value}
          </p>
          <p className="mt-2 text-sm font-semibold text-cq-text-secondary">
            {c.label}
          </p>
        </div>
      ))}
    </div>
  )
}
