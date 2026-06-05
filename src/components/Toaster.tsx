/**
 * Toaster
 *
 * Renders XP toasts above the floating menu button. Each toast slides in,
 * holds ~2.2s, then fades out and removes itself.
 */

import { useEffect, useState } from 'react'
import { useXp } from '../context/XpProvider'

function ToastView({
  msg,
  kind,
  onDone,
}: {
  msg: string
  kind?: 'level'
  onDone: () => void
}) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const raf = requestAnimationFrame(() => setShow(true))
    const hideTimer = setTimeout(() => setShow(false), 2200)
    const doneTimer = setTimeout(onDone, 2500)
    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(hideTimer)
      clearTimeout(doneTimer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <div className={`toast${kind ? ` ${kind}` : ''}${show ? ' show' : ''}`}>{msg}</div>
}

export default function Toaster() {
  const { toasts, removeToast } = useXp()
  return (
    <div id="toaster" aria-live="polite">
      {toasts.map((t) => (
        <ToastView key={t.id} msg={t.msg} kind={t.kind} onDone={() => removeToast(t.id)} />
      ))}
    </div>
  )
}
