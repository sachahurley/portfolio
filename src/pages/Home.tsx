/**
 * Home (/)
 *
 * Between the fixed pixel graphics (stalactites top / fire bottom): the
 * scorpion hero mark, name + role, bio, and preview sections for Projects,
 * Lab, and Notes, then an "About" section (social links, with a header row
 * to the About page). The pixel graphics and the scorpion are preserved
 * exactly - do not replace the scorpion with a cube.
 */

import { useRef } from 'react'
import { Link } from 'react-router-dom'
import PixelFire, { type PixelFireHandle } from '../components/PixelFire'
import PixelStalactites from '../components/PixelStalactites'
import StageHero from '../components/StageHero'
import MinimalPage from '../components/MinimalPage'
import { Item, List } from '../components/Item'
import DitherIcon from '../components/DitherIcon'
import ProgressSection from '../components/progress/ProgressSection'
import { projects } from '../data/projects'
import { getSortedPosts } from '../data/posts'
import { lab } from '../data/lab'
import { useXp, XP_AWARDS } from '../context/XpProvider'
import { formatDate } from '../lib/date'
import { usePageTitle } from '../lib/usePageTitle'

export default function Home() {
  usePageTitle()
  const { award } = useXp()
  // The bottom-of-page fire doubles as the egg drop target; the progress
  // section's drag interaction drives it through this handle.
  const fireApiRef = useRef<PixelFireHandle>(null)
  // Each section previews up to 3 rows; "See all" appears at the bottom only
  // when the full collection has more than 3 items.
  const PREVIEW = 3
  const projectItems = projects.slice(0, PREVIEW)
  const labItems = lab.slice(0, PREVIEW)
  const allNotes = getSortedPosts()
  const notes = allNotes.slice(0, PREVIEW)

  return (
    <>
      {/* Pixel stalactites hanging from the top of the page */}
      <PixelStalactites />

      <MinimalPage flushTop>
        {/* Stage hero — a framed 200px box above the name/bio, reserved for a
            future 8-bit pixel diorama. Only the roaming scorpion draws in it today. */}
        <StageHero />

        {/* ===== Intro (hero) ===== */}
        <section className="intro">
          <h1>Sacha Hurley</h1>
        </section>

        <div className="bio">
          <p>
            Product designer building a health app at Betterfly. Before: Meta,
            Utility (the agency I co-founded), and EA Sports.
          </p>
        </div>

        {/* ===== Projects ===== */}
        <div className="mn-block">
          <div className="shead">
            <div className="label">projects</div>
            {projects.length > PREVIEW && (
              <Link className="seeall" to="/projects" aria-label={`See all ${projects.length} projects`}>
                {projects.length}
                <span className="seebtn"><DitherIcon name="arrow-right" size={16} /></span>
              </Link>
            )}
          </div>
          <List>
            {/* every project opens its detail page; external projects house
                their link-out CTA there (the detail page awards the XP) */}
            {projectItems.map((p) => (
              <Item
                key={p.slug}
                to={`/projects/${p.slug}`}
                title={p.title}
                desc={p.description}
                img={p.img}
                imgSrc={p.thumbnail}
                imgRight={p.imgRight}
              />
            ))}
          </List>
        </div>

        {/* ===== Lab ===== */}
        <div className="mn-block">
          <div className="shead">
            <div className="label">lab</div>
            {lab.length > PREVIEW && (
              <Link className="seeall" to="/lab" aria-label={`See all ${lab.length} lab experiments`}>
                {lab.length}
                <span className="seebtn"><DitherIcon name="arrow-right" size={16} /></span>
              </Link>
            )}
          </div>
          <List>
            {labItems.map((x) => (
              <Item key={x.slug} to={`/lab/${x.slug}`} title={x.title} desc={x.desc} img={x.img} />
            ))}
          </List>
        </div>

        {/* ===== Notes ===== */}
        <div className="mn-block">
          <div className="shead">
            <div className="label">notes</div>
            {allNotes.length > PREVIEW && (
              <Link className="seeall" to="/notes" aria-label={`See all ${allNotes.length} notes`}>
                {allNotes.length}
                <span className="seebtn"><DitherIcon name="arrow-right" size={16} /></span>
              </Link>
            )}
          </div>
          <List>
            {notes.map((n) => (
              <Item
                key={n.slug}
                to={`/notes/${n.slug}`}
                date={formatDate(n.date)}
                title={n.title}
                desc={n.excerpt}
                img={n.img}
              />
            ))}
          </List>
        </div>

        {/* ===== About (social links + row to the About page) ===== */}
        <div className="mn-block">
          <div className="shead">
            <div className="label">about</div>
            <Link className="seeall" to="/about" aria-label="Go to the About page">
              <span className="seebtn"><DitherIcon name="arrow-right" size={16} /></span>
            </Link>
          </div>
          <List>
            <Item
              href="https://x.com/sacha_hurley"
              external
              title="X"
              desc="@sacha_hurley"
              onClick={() => award(XP_AWARDS.follow, 'followed on X', 'follow')}
            />
            <Item
              href="https://github.com/sachahurley"
              external
              title="GitHub"
              desc="@sachahurley"
              onClick={() => award(XP_AWARDS.follow, 'followed on GitHub', 'follow-github')}
            />
          </List>
        </div>

        {/* ===== Your progress (EXP system: level + eggs; eggs drop into
            the pixel fire at the very bottom of the page) ===== */}
        <ProgressSection fireApiRef={fireApiRef} />
      </MinimalPage>

      {/* Pixel fire animation - only on the home page */}
      <PixelFire ref={fireApiRef} />
    </>
  )
}
