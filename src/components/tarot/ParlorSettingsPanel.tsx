/**
 * The Parlor tab of the drawer (phase 2 shell): the owner code field
 * (spec §9.4; stored locally, sent as a header, never displayed back) and
 * the §9.6 small print. Loot loadout joins this tab in phase 6.
 */

import { useState } from 'react'
import { Button, Input } from '@scorp-ds/components'
import { loadParlorSettings, saveParlorSettings } from '../../lib/tarot/threads'

export default function ParlorSettingsPanel({
  onChanged,
  onBack,
}: {
  onChanged: () => void
  onBack: () => void
}) {
  const [settings, setSettings] = useState(() => loadParlorSettings())
  const [code, setCode] = useState('')

  const saveCode = () => {
    const next = { ...settings, ownerCode: code.trim() || null }
    saveParlorSettings(next)
    setSettings(next)
    setCode('')
    onChanged()
  }

  return (
    <section className="tarot-ledger" aria-label="Parlor">
      <div className="pt-parlor-block">
        <p className="pt-parlor-head">The keeper's key</p>
        <p className="pt-system">
          {settings.ownerCode
            ? 'The parlor knows you. The usual courtesies are waived.'
            : 'Visitors need no key; this is for the keeper of the parlor.'}
        </p>
        <div className="pt-offer-ask">
          <Input
            aria-label="Owner code"
            type="password"
            value={code}
            placeholder={settings.ownerCode ? 'Replace the key' : 'Speak the key'}
            onChange={(e) => setCode(e.target.value)}
          />
        </div>
        <div className="pt-offer-actions">
          <Button variant="secondary" type="button" onClick={saveCode} disabled={!code.trim() && !settings.ownerCode}>
            {code.trim() ? 'Keep the key' : settings.ownerCode ? 'Forget the key' : 'Keep the key'}
          </Button>
        </div>
      </div>
      <p className="tarot-note">
        Readings are sent to an AI provider to generate replies and are stored only in this
        browser.
      </p>
      <div className="tl-back">
        <Button variant="secondary" type="button" onClick={onBack}>
          Return to the table
        </Button>
      </div>
    </section>
  )
}
