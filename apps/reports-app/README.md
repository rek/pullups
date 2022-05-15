# reports-app

# troubleshooting

- rules of hooks

because database also uses react-query, we might have hoisting problems.
check all the node_modules for versions to help location the problem

currently this app has react in node_modules but it also lives in the root
so you need to delete it from here area workaround

```
rm -rf node_modules/react node_modules/react-dom
```

- cannot find 'database'

make sure the package is built
