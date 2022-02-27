import { _ as _extends } from './extends-7477639a.js';
import { _ as _objectWithoutProperties } from './defaultTheme-74fc985b.js';
import { r as react } from './index-57a74e37.js';
import './index-ce016b4a.js';
import { _ as __pika_web_default_export_for_treeshaking__ } from './clsx.m-e1755476.js';
import { w as withStyles } from './withStyles-aba2468b.js';
import { L as ListContext } from './ListContext-3115f135.js';

var styles = {
  /* Styles applied to the root element. */
  root: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
    position: 'relative'
  },

  /* Styles applied to the root element if `disablePadding={false}`. */
  padding: {
    paddingTop: 8,
    paddingBottom: 8
  },

  /* Styles applied to the root element if dense. */
  dense: {},

  /* Styles applied to the root element if a `subheader` is provided. */
  subheader: {
    paddingTop: 0
  }
};
var List = /*#__PURE__*/react.forwardRef(function List(props, ref) {
  var children = props.children,
      classes = props.classes,
      className = props.className,
      _props$component = props.component,
      Component = _props$component === void 0 ? 'ul' : _props$component,
      _props$dense = props.dense,
      dense = _props$dense === void 0 ? false : _props$dense,
      _props$disablePadding = props.disablePadding,
      disablePadding = _props$disablePadding === void 0 ? false : _props$disablePadding,
      subheader = props.subheader,
      other = _objectWithoutProperties(props, ["children", "classes", "className", "component", "dense", "disablePadding", "subheader"]);

  var context = react.useMemo(function () {
    return {
      dense: dense
    };
  }, [dense]);
  return /*#__PURE__*/react.createElement(ListContext.Provider, {
    value: context
  }, /*#__PURE__*/react.createElement(Component, _extends({
    className: __pika_web_default_export_for_treeshaking__(classes.root, className, dense && classes.dense, !disablePadding && classes.padding, subheader && classes.subheader),
    ref: ref
  }, other), subheader, children));
});
var List$1 = withStyles(styles, {
  name: 'MuiList'
})(List);

export { List$1 as L };
