import MLR from "ml-regression-multivariate-linear";

const x = [
  [1,2,3,4,3,2,1,0],
  [3,4,5,6,5,4,3,2],
  [1,2,3,2,1,0,0,0],
  [6,7,8,9,8,7,6,0]
]

const y = [[4],[6],[3],[9]]

const mlr = new MLR(x, y);
console.log(mlr.predict([1,2,3,4,3,2,1,0]));