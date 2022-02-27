import { _ as _extends } from '../../common/extends-7477639a.js';
import '../../common/objectWithoutPropertiesLoose-d5128f55.js';
import '../../common/defaultTheme-74fc985b.js';
import '../../common/_commonjsHelpers-8c19dec8.js';
import { r as react } from '../../common/index-57a74e37.js';
import '../../common/index-ce016b4a.js';
import '../../common/getThemeProps-6712df0a.js';
import '../../common/inheritsLoose-b67f434e.js';
import '../../common/assertThisInitialized-8eae6022.js';
import '../../common/useTheme-6c30e9f6.js';
import '../../common/hoist-non-react-statics.cjs-ec82709f.js';
import { w as withStyles } from '../../common/withStyles-aba2468b.js';

var html = {
  WebkitFontSmoothing: 'antialiased',
  // Antialiasing.
  MozOsxFontSmoothing: 'grayscale',
  // Antialiasing.
  // Change from `box-sizing: content-box` so that `width`
  // is not affected by `padding` or `border`.
  boxSizing: 'border-box'
};
var body = function body(theme) {
  return _extends({
    color: theme.palette.text.primary
  }, theme.typography.body2, {
    backgroundColor: theme.palette.background.default,
    '@media print': {
      // Save printer ink.
      backgroundColor: theme.palette.common.white
    }
  });
};
var styles = function styles(theme) {
  return {
    '@global': {
      html: html,
      '*, *::before, *::after': {
        boxSizing: 'inherit'
      },
      'strong, b': {
        fontWeight: theme.typography.fontWeightBold
      },
      body: _extends({
        margin: 0
      }, body(theme), {
        // Add support for document.body.requestFullScreen().
        // Other elements, if background transparent, are not supported.
        '&::backdrop': {
          backgroundColor: theme.palette.background.default
        }
      })
    }
  };
};
/**
 * Kickstart an elegant, consistent, and simple baseline to build upon.
 */

function CssBaseline(props) {
  /* eslint-disable no-unused-vars */
  var _props$children = props.children,
      children = _props$children === void 0 ? null : _props$children,
      classes = props.classes;
  /* eslint-enable no-unused-vars */

  return /*#__PURE__*/react.createElement(react.Fragment, null, children);
}

var __pika_web_default_export_for_treeshaking__ = withStyles(styles, {
  name: 'MuiCssBaseline'
})(CssBaseline);

export default __pika_web_default_export_for_treeshaking__;
