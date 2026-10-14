import { projects } from '../../data/site'
import { SectionLabel } from '../ui/SectionLabel'
import { ProjectFlagship } from './ProjectFlagship'
import { ProjectPanel } from './ProjectPanel'
import { ProjectRow } from './ProjectRow'

/**
 * ProjectShowcase — an editorial sequence, not a card grid:
 * flagship (Aura Player) → asymmetric panel pair (TaskFlow / Velo) →
 * compact index rows (Nexus, Veil). Layout varies with project status.
 */
export function ProjectShowcase() {
  const [aura, taskflow, velo, nexus, veil] = projects

  return (
    <section id="work" aria-labelledby="work-title" className="scroll-mt-24">
      <div className="mx-auto w-full max-w-page px-gutter pt-24 md:px-10 md:pt-36">
        <SectionLabel
          num="02"
          label="Selected work"
          annotation="05 entries — 01 live · 01 shipped · 03 planned"
        />

        <div className="mt-10 flex flex-wrap items-end justify-between gap-8 md:mt-14">
          <h2
            id="work-title"
            className="text-title font-semibold uppercase leading-[0.9] tracking-tight text-ink"
          >
            Selected
            <br />
            Work<span className="text-red">.</span>
          </h2>
          <p className="max-w-sm text-base leading-relaxed text-dim">
            Every entry below began the same way — with a question:{' '}
            <span className="text-ink">can I build this myself?</span> Status labels are kept
            honest: live, shipped, or planned.
          </p>
        </div>

        {aura && <div className="mt-14 md:mt-20"><ProjectFlagship project={aura} /></div>}

        <div className="mt-16 grid grid-cols-1 gap-14 md:mt-24 lg:grid-cols-12 lg:gap-10">
          {taskflow && <ProjectPanel project={taskflow} className="lg:col-span-6" />}
          {velo && (
            <ProjectPanel
              project={velo}
              className="lg:col-span-5 lg:col-start-8 lg:border-l lg:border-line lg:pl-12"
            />
          )}
        </div>

        {(nexus || veil) && (
          <div className="mt-16 md:mt-24">
            <h3 className="mono-label mb-6">In the pipeline</h3>
            {nexus && <ProjectRow project={nexus} />}
            {veil && <ProjectRow project={veil} last />}
          </div>
        )}
      </div>
    </section>
  )
}
