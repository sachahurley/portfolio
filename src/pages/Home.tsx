/**
 * Home (/)
 *
 * Between the fixed pixel graphics (stalactites top / fire bottom): the
 * scorpion hero mark, name + role, bio, and preview sections for Projects,
 * Lab, and Notes, then a "Find me" section. The pixel graphics and the
 * scorpion are preserved exactly - do not replace the scorpion with a cube.
 */

import { useRef } from 'react'
import { Link } from 'react-router-dom'
import PixelFire, { type PixelFireHandle } from '../components/PixelFire'
import PixelStalactites from '../components/PixelStalactites'
import RoamingScorpion from '../components/RoamingScorpion'
import MinimalPage from '../components/MinimalPage'
import { Item, List } from '../components/Item'
import { ArrowRight } from '../components/icons'
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
        {/* Roaming pixel scorpion — its own lane ABOVE the hero, so it never
            overlaps the name/bio. Wanders left/right within the content column. */}
        <RoamingScorpion />

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
          <div className="label">projects</div>
          <List>
            {projectItems.map((p) =>
              p.external && p.externalUrl ? (
                <Item
                  key={p.slug}
                  href={p.externalUrl}
                  external
                  title={p.title}
                  desc={p.description}
                  img={p.img}
                  imgSrc={p.thumbnail}
                  imgRight={p.imgRight}
                  onClick={() => award(XP_AWARDS.project, `opened ${p.title}`, `project:${p.slug}`)}
                />
              ) : (
                <Item
                  key={p.slug}
                  to={`/projects/${p.slug}`}
                  title={p.title}
                  desc={p.description}
                  img={p.img}
                  imgSrc={p.thumbnail}
                  imgRight={p.imgRight}
                />
              )
            )}
          </List>
          {projects.length > PREVIEW && (
            <div className="seefoot">
              <Link className="seeall" to="/projects">See all <span className="arr"><ArrowRight /></span></Link>
            </div>
          )}
        </div>

        {/* ===== Lab ===== */}
        <div className="mn-block">
          <div className="label">lab</div>
          <List>
            {labItems.map((x) => (
              <Item key={x.slug} to={`/lab/${x.slug}`} title={x.title} desc={x.desc} img={x.img} />
            ))}
          </List>
          {lab.length > PREVIEW && (
            <div className="seefoot">
              <Link className="seeall" to="/lab">See all <span className="arr"><ArrowRight /></span></Link>
            </div>
          )}
        </div>

        {/* ===== Notes ===== */}
        <div className="mn-block">
          <div className="label">notes</div>
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
          {allNotes.length > PREVIEW && (
            <div className="seefoot">
              <Link className="seeall" to="/notes">See all <span className="arr"><ArrowRight /></span></Link>
            </div>
          )}
        </div>

        {/* ===== Find me ===== */}
        <div className="mn-block">
          <div className="label">find me</div>
          <List>
            <Item
              href="https://x.com/sacha_hurley"
              external
              title="X"
              desc="@sacha_hurley"
              onClick={() => award(XP_AWARDS.follow, 'followed on X', 'follow')}
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
