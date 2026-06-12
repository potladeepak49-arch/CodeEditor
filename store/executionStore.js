
import { create } from 'zustand'

export const useExecutionStore = create((set) => ({
  status: 'idle',
  output: null,
  error:  null,
  time:   null,
  memory: null,

  setRunning: ()         => set({ status: 'running', output: null, error: null, time: null, memory: null }),
  setResult:  (result)   => set({ status: 'success', ...result }),
  setError:   (error)    => set({ status: 'error', error }),
  reset:      ()         => set({ status: 'idle', output: null, error: null, time: null, memory: null }),
}))