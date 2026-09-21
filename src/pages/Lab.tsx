/**
 * Lab index (/lab)
 *
 * A row list of small interactive experiments.
 */

import MinimalPage from '../components/MinimalPage'
import { Item, List } from '../components/Item'
import { lab } from '../data/lab'
import { useUnlocked } from '../lib/unlocks'
import { usePageTitle } from '../lib/usePageTitle'

export default function Lab() {
  usePageTitle('Lab')
  const unlocked = useUnlocked()
  return (
    <MinimalPage>
      <h1 className="page">Lab</h1>
      <p className="lead">Small interactive experiments. Two live demos wired up, one of them locked.</p>

      <div className="mn-block">
        <List>
          {lab.map((x) => {
            const locked = !!x.lock && !unlocked.includes(x.slug)
            return (
              <Item
                key={x.slug}
                to={`/lab/${x.slug}`}
                title={x.title}
                desc={locked ? `Locked. ${x.lock!.hint}` : x.desc}
                img={x.img}
                locked={locked}
              />
            )
          })}
        </List>
      </div>
    </MinimalPage>
  )
}
