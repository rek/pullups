import { DecisionTreeClassifier as DTClassifier } from 'ml-cart';

const trainingSet = [
  [1,2,3,4,3,2,1,0],
  [3,4,5,6,5,4,3,2],
  [1,2,3,2,1,0,0,0],
  [6,7,8,9,8,7,6,0],
  [2,3,4,5,6,4,3,2],
  [2,3,4,5,6,7,8,6],
  [0,0,0,4,6,7,5,0],
]

// console.log('trainingSet', trainingSet)
const predictions = [
  [4],
  [6],
  [3],
  [9],
  [6],
  [8],
  [7],
]

// console.log('predictions', predictions)

const options = {
  gainFunction: 'gini',
  maxDepth: 10,
  minNumSamples: 3,
};

const classifier = new DTClassifier(options);
classifier.train(trainingSet, predictions);
const result = classifier.predict([[11,22,33,44,33,22,0,0]]);

console.log('result', result)
