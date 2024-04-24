'use client'

export default function GameDate({ time }: { time: number }) {
  return <p className="text-neutral-400">{new Date(time).toLocaleString()}</p>
}
