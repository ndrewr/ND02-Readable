// @flow

export default function formatTime(timestamp: number): string {
  return timestamp ? new Date(timestamp).toLocaleDateString() : 'date unavailable'
}
