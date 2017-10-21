// from: www.w3resource.com/javascript-exercises/javascript-math-exercise-23.php
// TODO: suppress warning
// Unexpected mix of '&' and '|'  no-mixed-operators
export default function createUUID(): string {
  var dt = new Date().getTime();
  var uuid = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = ((dt + Math.random() * 16) % 16) | 0;
    dt = Math.floor(dt / 16);
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
  return uuid;
}
