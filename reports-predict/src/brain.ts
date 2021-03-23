import brain from 'brain.js';

import zero from './training/0'
import one from './training/1'
import two from './training/2'

// const net = new brain.recurrent.LSTM();
const net = new brain.NeuralNetwork();

// const trainingSet1 = [{
//   input: [1,2,3,4,3,2,1,0], output: 1,
// }]

const trainingSet = [
  ...zero.map((data) => ({input: data.map((num)=>Number(num.toFixed())), output: 0.1})),
  ...one.map((data) => ({input: data.map((num)=>Number(num.toFixed())), output: 1})),
  ...two.map((data) => ({input: data.map((num)=>Number(num.toFixed())), output: 2})),
]

// console.log('trainingSet1', trainingSet1)
// console.log('trainingSet', trainingSet)

// const trainingSet = [
//   [1,2,3,4,3,2,1,0],
//   [3,4,5,6,5,4,3,2],
//   [1,2,3,2,1,0,0,0],
//   [6,7,8,9,8,7,6,0],
//   [2,3,4,5,6,4,3,2],
//   [2,3,4,5,6,7,8,6],
//   [0,0,0,4,6,7,5,0],
// ]

// // console.log('trainingSet', trainingSet)
// const predictions = [
//   [4],
//   [6],
//   [3],
//   [9],
//   [6],
//   [8],
//   [7],
// ]

net.train(trainingSet, {
  iterations: 500,
  log: true,
  timeout: 30000
});

// const output = net.run({ r: 1, g: 0.4, b: 0 }); // { white: 0.99, black: 0.002 }
const output = net.run(one[0]);
console.log('output', output)