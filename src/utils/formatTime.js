// @flow

// TODO: output more specific time strings depending on recency; i.e. 5 min ago; 1 week ago, etc
export default function formatTime(timestamp: number): string {
  return timestamp
    ? new Date(timestamp).toLocaleDateString()
    : 'date unavailable';
}
