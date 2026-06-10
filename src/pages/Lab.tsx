/**
 * Lab index (/lab)
 *
 * A row list of small interactive experiments.
 */

import MinimalPage from '../components/MinimalPage'
import { Item, List } from '../components/Item'
import { lab } from '../data/lab'
import { usePageTitle } from '../lib/usePageTitle'

export default function Lab() {
  usePageTitle('Lab')
  return (
    <MinimalPage>
      <h1 className="page">Lab</h1>
      <p className="lead">Small interactive experiments. One live demo wired up.</p>

      <div className="mn-block">
        <List>
          {lab.map((x) => (
            <Item key={x.slug} to={`/lab/${x.slug}`} title={x.title} desc={x.desc} img={x.img} />
          ))}
        </List>
      </div>
    </MinimalPage>
  )
}
