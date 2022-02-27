import { d as defaultTheme } from './defaultTheme-74fc985b.js';
import './index-57a74e37.js';
import { u as useTheme$1 } from './useTheme-6c30e9f6.js';

function useTheme() {
  var theme = useTheme$1() || defaultTheme;

  return theme;
}

export { useTheme as u };
