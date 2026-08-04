/**
 * Contact (/contact) — the Messenger's Post.
 *
 * "Dispatch a raven": the outward links, promoted from the home page's
 * find-me section into a location of their own per the RPG structure doc.
 */

import MinimalPage from '../components/MinimalPage'
import { Item, List } from '../components/Item'
import { useXp, XP_AWARDS } from '../context/XpProvider'
import { usePageTitle } from '../lib/usePageTitle'

export default function Contact() {
  usePageTitle('Contact')
  const { award } = useXp()

  return (
    <MinimalPage>
      <h1 className="page">Messenger's Post</h1>
      <p className="lead">Dispatch a raven. It knows the way.</p>

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
          desc="sachahurley"
        />
      </List>
    </MinimalPage>
  )
}
