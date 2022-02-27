import { _ as _extends } from '../../common/extends-7477639a.js';
import '../../common/objectWithoutPropertiesLoose-d5128f55.js';
import { _ as _objectWithoutProperties } from '../../common/defaultTheme-74fc985b.js';
import '../../common/_commonjsHelpers-8c19dec8.js';
import { r as react } from '../../common/index-57a74e37.js';
import '../../common/index-ce016b4a.js';
import { _ as __pika_web_default_export_for_treeshaking__$2 } from '../../common/clsx.m-e1755476.js';
import '../../common/getThemeProps-6712df0a.js';
import '../../common/inheritsLoose-b67f434e.js';
import '../../common/assertThisInitialized-8eae6022.js';
import '../../common/useTheme-6c30e9f6.js';
import '../../common/hoist-non-react-statics.cjs-ec82709f.js';
import { w as withStyles } from '../../common/withStyles-aba2468b.js';
import '../../common/capitalize-500844e3.js';
import { L as ListContext } from '../../common/ListContext-3115f135.js';
import { _ as __pika_web_default_export_for_treeshaking__$1 } from '../../common/Typography-bbc189f5.js';

var styles = {
  /* Styles applied to the root element. */
  root: {
    flex: '1 1 auto',
    minWidth: 0,
    marginTop: 4,
    marginBottom: 4
  },

  /* Styles applied to the `Typography` components if primary and secondary are set. */
  multiline: {
    marginTop: 6,
    marginBottom: 6
  },

  /* Styles applied to the `Typography` components if dense. */
  dense: {},

  /* Styles applied to the root element if `inset={true}`. */
  inset: {
    paddingLeft: 56
  },

  /* Styles applied to the primary `Typography` component. */
  primary: {},

  /* Styles applied to the secondary `Typography` component. */
  secondary: {}
};
var ListItemText = /*#__PURE__*/react.forwardRef(function ListItemText(props, ref) {
  var children = props.children,
      classes = props.classes,
      className = props.className,
      _props$disableTypogra = props.disableTypography,
      disableTypography = _props$disableTypogra === void 0 ? false : _props$disableTypogra,
      _props$inset = props.inset,
      inset = _props$inset === void 0 ? false : _props$inset,
      primaryProp = props.primary,
      primaryTypographyProps = props.primaryTypographyProps,
      secondaryProp = props.secondary,
      secondaryTypographyProps = props.secondaryTypographyProps,
      other = _objectWithoutProperties(props, ["children", "classes", "className", "disableTypography", "inset", "primary", "primaryTypographyProps", "secondary", "secondaryTypographyProps"]);

  var _React$useContext = react.useContext(ListContext),
      dense = _React$useContext.dense;

  var primary = primaryProp != null ? primaryProp : children;

  if (primary != null && primary.type !== __pika_web_default_export_for_treeshaking__$1 && !disableTypography) {
    primary = /*#__PURE__*/react.createElement(__pika_web_default_export_for_treeshaking__$1, _extends({
      variant: dense ? 'body2' : 'body1',
      className: classes.primary,
      component: "span",
      display: "block"
    }, primaryTypographyProps), primary);
  }

  var secondary = secondaryProp;

  if (secondary != null && secondary.type !== __pika_web_default_export_for_treeshaking__$1 && !disableTypography) {
    secondary = /*#__PURE__*/react.createElement(__pika_web_default_export_for_treeshaking__$1, _extends({
      variant: "body2",
      className: classes.secondary,
      color: "textSecondary",
      display: "block"
    }, secondaryTypographyProps), secondary);
  }

  return /*#__PURE__*/react.createElement("div", _extends({
    className: __pika_web_default_export_for_treeshaking__$2(classes.root, className, dense && classes.dense, inset && classes.inset, primary && secondary && classes.multiline),
    ref: ref
  }, other), primary, secondary);
});
var __pika_web_default_export_for_treeshaking__ = withStyles(styles, {
  name: 'MuiListItemText'
})(ListItemText);

export default __pika_web_default_export_for_treeshaking__;
