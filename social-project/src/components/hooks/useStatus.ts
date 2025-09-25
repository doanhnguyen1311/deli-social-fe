import { useState } from 'react'

export type Status = '' | 'pending' | 'rejected' | 'fulfilled'

type HookReturn = [status: Status, setStatus: React.Dispatch<React.SetStateAction<Status>>]

/**
 * Custom hook that returns the current status and a function to update it.
 *
 * @param {Status} initStatus - The initial status.
 * @return {HookReturn} An array with the current status and a function to update it.
 */
export function useStatus(initStatus: Status): HookReturn {
  const [status, setStatus] = useState<Status>(initStatus)

  return [status, setStatus]
}
