// credit:
// gist.github.com/yamadayuki/f1ea9ccacad7f1c140457b5877fb54cc

// Add style rules directly to the document head
const injectStyles = (style: string) => {
  const styleElement = document.createElement('style');
  let styleSheet = null;

  document.head.appendChild(styleElement);

  styleSheet = styleElement.sheet;
  styleSheet.insertRule(style, styleSheet.cssRules.length);
};

export default injectStyles;
