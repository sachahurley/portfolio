/**
 * The Parlor tab (spec §6.4): the parlor's own loot. Parcels (chests from
 * tarot: award keys) open HERE against the parlor loot table, never the
 * gear table; the loadout equips what they yield: one card back, up to
 * three table props, one voice, one charm. The Balance charm exposes its
 * reversal-rate setting; the keeper's key (§9.4) and the §9.6 small print
 * keep their places at the bottom.
 */

import { useState } from 'react'
import { Button, Input } from '@scorp-ds/components'
import { useXp } from '../../context/XpProvider'
import { RARITY_COLORS, RARITY_LABELS } from '../../game/loot'
import {
  addParlorItem,
  loadParlorSettings,
  saveParlorSettings,
  setReversalRate,
  toggleParlorEquip,
  type ParlorSettings,
} from '../../lib/tarot/threads'
import {
  PARLOR_KIND_LABELS,
  PARLOR_KINDS,
  PARLOR_SLOTS,
  resolveParlorItem,
  rollParlorItem,
} from '../../lib/tarot/parlorLoot'

export default function ParlorSettingsPanel({
  onChanged,
  onBack,
}: {
  onChanged: () => void
  onBack: () => void
}) {
  const { chests, takeChest, logLine } = useXp()
  const [settings, setSettings] = useState<ParlorSettings>(() => loadParlorSettings())
  const [code, setCode] = useState('')
  const [justOpened, setJustOpened] = useState<string | null>(null)

  const parcels = chests.filter((c) => c.src.startsWith('tarot:'))

  const apply = (next: ParlorSettings) => {
    setSettings(next)
    onChanged()
  }

  const openParcel = (chestId: number) => {
    const chest = takeChest(chestId)
    if (!chest) return
    const item = resolveParlorItem(rollParlorItem(chest.id))
    const next = addParlorItem(item)
    logLine(`The parlor yields ${item.name}.`, 'hint')
    setJustOpened(`${item.name} (${RARITY_LABELS[item.rarity].toLowerCase()} ${PARLOR_KIND_LABELS[item.kind].toLowerCase()})`)
    apply(next)
  }

  const equipped = (id: number) =>
    settings.loadout.back === id ||
    settings.loadout.voice === id ||
    settings.loadout.charm === id ||
    settings.loadout.props.includes(id)

  const saveCode = () => {
    const next = { ...settings, ownerCode: code.trim() || null }
    saveParlorSettings(next)
    setCode('')
    apply(loadParlorSettings())
  }

  const balanceEquipped = settings.perks.includes('balance')

  return (
    <section className="tarot-ledger" aria-label="Parlor">
      {(parcels.length > 0 || justOpened) && (
        <div className="pt-parlor-block">
          <p className="pt-parlor-head">Parcels</p>
          {parcels.map((c) => (
            <div key={c.id} className="pt-parcel">
              <span className="pt-act-note">Something wrapped waits on the table.</span>
              <Button variant="secondary" type="button" onClick={() => openParcel(c.id)}>
                Unwrap it
              </Button>
            </div>
          ))}
          {justOpened && <p className="pt-system">The cloth falls away: {justOpened}.</p>}
        </div>
      )}

      <div className="pt-parlor-block">
        <p className="pt-parlor-head">The parlor's keeping</p>
        {settings.owned.length === 0 && (
          <p className="pt-system">
            Nothing yet. Streaks and rare pulls leave parcels here in time.
          </p>
        )}
        {PARLOR_KINDS.map((kind) => {
          const ownedOfKind = settings.owned.filter((i) => i.kind === kind)
          if (!ownedOfKind.length) return null
          const slots = PARLOR_SLOTS[kind]
          return (
            <div key={kind} className="pt-loadout-kind">
              <p className="pt-comp-head">
                {PARLOR_KIND_LABELS[kind]}
                {slots > 1 ? ` · ${settings.loadout.props.length}/${slots} set out` : ''}
              </p>
              <div className="pt-loadout-items">
                {ownedOfKind.map((saved) => {
                  const item = resolveParlorItem(saved)
                  const worn = equipped(saved.id)
                  return (
                    <button
                      key={saved.id}
                      type="button"
                      className={`pt-loot${worn ? ' worn' : ''}`}
                      onClick={() => apply(toggleParlorEquip(saved.id))}
                      aria-pressed={worn}
                    >
                      <span className="pt-loot-name" style={{ color: RARITY_COLORS[saved.rarity] }}>
                        {item.name}
                      </span>
                      <span className="pt-loot-desc">{item.desc}</span>
                      <span className="pt-loot-state">{worn ? 'set out · tap to put away' : 'tap to set out'}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          )
        })}
        {balanceEquipped && (
          <div className="pt-loadout-kind">
            <p className="pt-comp-head">The deck's temper</p>
            <div className="pt-filters" role="radiogroup" aria-label="Reversal rate">
              {([0, 30, 50] as const).map((rate) => (
                <button
                  key={rate}
                  type="button"
                  role="radio"
                  aria-checked={settings.reversalRate === rate}
                  className={`pt-filter${settings.reversalRate === rate ? ' sel' : ''}`}
                  onClick={() => apply(setReversalRate(rate))}
                >
                  {rate === 0 ? 'Never reversed' : `${rate} in 100`}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

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
          <Button
            variant="secondary"
            type="button"
            onClick={saveCode}
            disabled={!code.trim() && !settings.ownerCode}
          >
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
