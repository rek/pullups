import { _ as _extends } from '../../common/extends-7477639a.js';
import '../../common/objectWithoutPropertiesLoose-d5128f55.js';
import { _ as _objectWithoutProperties } from '../../common/defaultTheme-74fc985b.js';
import '../../common/_commonjsHelpers-8c19dec8.js';
import { r as react } from '../../common/index-57a74e37.js';
import '../../common/index-ce016b4a.js';
import { _ as __pika_web_default_export_for_treeshaking__$1 } from '../../common/clsx.m-e1755476.js';
import '../../common/getThemeProps-6712df0a.js';
import '../../common/inheritsLoose-b67f434e.js';
import '../../common/assertThisInitialized-8eae6022.js';
import '../../common/useTheme-6c30e9f6.js';
import '../../common/hoist-non-react-statics.cjs-ec82709f.js';
import { w as withStyles } from '../../common/withStyles-aba2468b.js';

var styles = {
  /* Styles applied to the root element. */
  root: {
    width: '100%',
    overflowX: 'auto'
  }
};
var TableContainer = /*#__PURE__*/react.forwardRef(function TableContainer(props, ref) {
  var classes = props.classes,
      className = props.className,
      _props$component = props.component,
      Component = _props$component === void 0 ? 'div' : _props$component,
      other = _objectWithoutProperties(props, ["classes", "className", "component"]);

  return /*#__PURE__*/react.createElement(Component, _extends({
    ref: ref,
    className: __pika_web_default_export_for_treeshaking__$1(classes.root, className)
  }, other));
});
var __pika_web_default_export_for_treeshaking__ = withStyles(styles, {
  name: 'MuiTableContainer'
})(TableContainer);

export default __pika_web_default_export_for_treeshaking__;
