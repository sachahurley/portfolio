/**
 * Lab index (/lab)
 *
 * Small interactive experiments, then the workshop benches (items with
 * `workshop: true`) under their own label.
 */

import MinimalPage from '../components/MinimalPage'
import BackButton from '../components/BackButton'
import { Item, List } from '../components/Item'
import { lab, type LabItem } from '../data/lab'
import { useUnlocked } from '../lib/unlocks'
import { usePageTitle } from '../lib/usePageTitle'

export default function Lab() {
  usePageTitle('Lab', 'Small interactive experiments and the workshop tools behind this site.')
  const unlocked = useUnlocked()
  const rows = (items: LabItem[]) =>
    items.map((x) => {
      const locked = !!x.lock && !unlocked.includes(x.slug)
      return (
        <Item
          key={x.slug}
          to={`/lab/${x.slug}`}
          title={x.title}
          desc={x.desc}
          img={x.img}
          locked={locked}
        />
      )
    })
  return (
    <MinimalPage>
      <BackButton fallback="/" />
      <h1 className="page">Lab</h1>
      <p className="lead">
        Small interactive experiments, plus the workshop benches this site&rsquo;s art is built on.
      </p>

      <div className="mn-block">
        <List>{rows(lab.filter((x) => !x.workshop))}</List>
      </div>

      <div className="mn-block">
        <div className="label">workshop</div>
        <List>{rows(lab.filter((x) => x.workshop))}</List>
      </div>
    </MinimalPage>
  )
}
