import { Link } from 'react-router'

export default function NotFoundPage() {
  return <section className="page-wrap flex min-h-[72vh] flex-col items-start justify-center gap-7"><p className="mb-[26px] flex items-center gap-2.5 font-mono text-[9px] tracking-[.1em] text-neutral-300"><i className="size-[7px] rounded-full bg-accent" /> PAGE NOT FOUND</p><h1 className="m-0 text-[clamp(64px,12vw,150px)] leading-[.85] tracking-[-.09em]">LOST<br /><span className="outline-type">IN SPACE.</span></h1><Link className="inline-flex min-h-12 items-center justify-between gap-8 border border-accent bg-accent px-4 font-mono text-[10px] text-white" to="/">Back to the homepage <span aria-hidden="true">↗</span></Link></section>
}
