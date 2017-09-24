// credit:
// gist.github.com/yamadayuki/f1ea9ccacad7f1c140457b5877fb54cc

// some stupid checks to satisfy Flow
const injectStyles = (style: string) => {
  const styleElement = document.createElement('style');
  let styleSheet = null;

  document.head.appendChild(styleElement);
  
  styleSheet = styleElement.sheet;
  styleSheet.insertRule(style, styleSheet.cssRules.length);
};

export default injectStyles
