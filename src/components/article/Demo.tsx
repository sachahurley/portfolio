/**
 * Inline interactive demo container: bordered stage + bottom bar with a
 * label and optional actions. "Reset" remounts the stage via a key bump, so
 * any stateful or canvas child resets without needing its own protocol.
 */

import { useState, type ReactNode } from 'react'

interface DemoProps {
  label?: string
  resettable?: boolean
  actions?: ReactNode
  children: ReactNode
}

export default function Demo({ label, resettable, actions, children }: DemoProps) {
  const [gen, setGen] = useState(0)
  const hasBar = Boolean(label || resettable || actions)

  return (
    <div className="demo">
      <div className="demo-stage" key={gen}>
        {children}
      </div>
      {hasBar && (
        <div className="demo-bar">
          <span className="demo-label">{label}</span>
          <span className="demo-actions">
            {actions}
            {resettable && (
              <button className="demo-reset" onClick={() => setGen((g) => g + 1)}>
                reset
              </button>
            )}
          </span>
        </div>
      )}
    </div>
  )
}
