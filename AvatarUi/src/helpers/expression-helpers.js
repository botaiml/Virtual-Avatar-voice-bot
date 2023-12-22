import * as THREE from "three";

let smoothMorphTarget = false;
const corresponding = {
  A: "PP",
  B: "kk",
  C: "ih",
  D: "aa",
  E: "oh",
  F: "ou",
  G: "FF",
  H: "TH",
  X: "PP",
};

export const expression_que = {
  smileque: [
    { start: 0, end: 20, value: 0.6 },
    { start: 501, end: 520, value: 0.6 },


  ],
  blinkque: [
    { start: 0, end: 500, value: 0 },
    { start: 500, end: 1000, value: 1 },
  ],

  mouthque: {
    default: [],
    hello: [
      { start: 0.0, end: 0.16, value: "X" },
      { start: 0.16, end: 0.27, value: "C" },
      { start: 0.27, end: 0.55, value: "E" },
      { start: 0.55, end: 0.69, value: "F" },
      { start: 0.69, end: 0.91, value: "B" },
      { start: 0.91, end: 0.99, value: "A" },
      { start: 0.99, end: 1.04, value: "C" },
      { start: 1.04, end: 1.08, value: "B" },
      { start: 1.08, end: 1.15, value: "C" },
      { start: 1.15, end: 1.23, value: "A" },
      { start: 1.23, end: 1.45, value: "B" },
      { start: 1.45, end: 1.52, value: "C" },
      { start: 1.52, end: 1.66, value: "B" },
      { start: 1.66, end: 1.85, value: "D" },
      { start: 1.85, end: 1.9, value: "C" },
      { start: 1.9, end: 2.17, value: "B" },
      { start: 2.17, end: 2.31, value: "C" },
      { start: 2.31, end: 2.39, value: "A" },
      { start: 2.39, end: 2.65, value: "B" },
      { start: 2.65, end: 2.72, value: "C" },
      { start: 2.72, end: 2.86, value: "G" },
      { start: 2.86, end: 3.0, value: "E" },
      { start: 3.0, end: 3.14, value: "B" },
      { start: 3.14, end: 3.21, value: "G" },
      { start: 3.21, end: 3.28, value: "E" },
      { start: 3.28, end: 3.42, value: "F" },
      { start: 3.42, end: 3.49, value: "C" },
      { start: 3.49, end: 3.56, value: "H" },
      { start: 3.56, end: 3.7, value: "C" },
      { start: 3.7, end: 3.77, value: "B" },
      { start: 3.77, end: 3.91, value: "D" },
      { start: 3.91, end: 4.12, value: "B" },
      { start: 4.12, end: 4.19, value: "C" },
      { start: 4.19, end: 4.26, value: "H" },
      { start: 4.26, end: 4.32, value: "A" },
      { start: 4.32, end: 4.38, value: "B" },
      { start: 4.38, end: 4.46, value: "A" },
      { start: 4.46, end: 4.59, value: "C" },
      { start: 4.59, end: 4.87, value: "B" },
      { start: 4.87, end: 4.94, value: "E" },
      { start: 4.94, end: 5.36, value: "B" },
      { start: 5.36, end: 5.5, value: "C" },
      { start: 5.5, end: 5.57, value: "B" },
      { start: 5.57, end: 5.64, value: "C" },
      { start: 5.64, end: 5.78, value: "B" },
      { start: 5.78, end: 5.92, value: "C" },
      { start: 5.92, end: 5.99, value: "B" },
      { start: 5.99, end: 6.06, value: "C" },
      { start: 6.06, end: 6.13, value: "B" },
      { start: 6.13, end: 6.25, value: "A" },
      { start: 6.25, end: 6.39, value: "B" },
      { start: 6.39, end: 6.46, value: "G" },
      { start: 6.46, end: 6.6, value: "B" },
      { start: 6.6, end: 6.68, value: "A" },
      { start: 6.68, end: 7.01, value: "B" },
      { start: 7.01, end: 7.26, value: "X" },
      { start: 7.26, end: 7.33, value: "B" },
      { start: 7.33, end: 7.46, value: "C" },
      { start: 7.46, end: 7.54, value: "A" },
      { start: 7.54, end: 7.78, value: "E" },
      { start: 7.78, end: 7.99, value: "B" },
      { start: 7.99, end: 8.06, value: "C" },
      { start: 8.06, end: 8.34, value: "B" },
      { start: 8.34, end: 8.41, value: "G" },
      { start: 8.41, end: 8.48, value: "C" },
      { start: 8.48, end: 8.55, value: "H" },
      { start: 8.55, end: 8.67, value: "A" },
      { start: 8.67, end: 8.81, value: "C" },
      { start: 8.81, end: 8.95, value: "B" },
      { start: 8.95, end: 9.19, value: "X" },
    ],
    dilg_1: [
      { start: 0.0, end: 0.19, value: "X" },
      { start: 0.19, end: 0.25, value: "B" },
      { start: 0.25, end: 0.45, value: "D" },
      { start: 0.45, end: 0.52, value: "B" },
      { start: 0.52, end: 0.59, value: "C" },
      { start: 0.59, end: 0.67, value: "A" },
      { start: 0.67, end: 1.06, value: "B" },
      { start: 1.06, end: 1.28, value: "X" },
    ],

    dilg_2: [
      { start: 0.0, end: 0.08, value: "X" },
      { start: 0.08, end: 0.18, value: "C" },
      { start: 0.18, end: 0.32, value: "E" },
      { start: 0.32, end: 0.39, value: "F" },
      { start: 0.39, end: 0.47, value: "A" },
      { start: 0.47, end: 0.53, value: "C" },
      { start: 0.53, end: 0.66, value: "B" },
      { start: 0.66, end: 0.8, value: "C" },
      { start: 0.8, end: 0.87, value: "G" },
      { start: 0.87, end: 0.94, value: "C" },
      { start: 0.94, end: 1.22, value: "B" },
      { start: 1.22, end: 1.36, value: "C" },
      { start: 1.36, end: 1.64, value: "B" },
      { start: 1.64, end: 2.08, value: "C" },
      { start: 2.08, end: 2.16, value: "A" },
      { start: 2.16, end: 2.39, value: "F" },
      { start: 2.39, end: 2.63, value: "X" },
    ],

    dilg_3: [
      { start: 0.0, end: 0.17, value: "X" },
      { start: 0.17, end: 0.21, value: "C" },
      { start: 0.21, end: 0.25, value: "B" },
      { start: 0.25, end: 0.32, value: "H" },
      { start: 0.32, end: 0.39, value: "C" },
      { start: 0.39, end: 0.88, value: "B" },
      { start: 0.88, end: 0.95, value: "H" },
      { start: 0.95, end: 1.05, value: "D" },
      { start: 1.05, end: 1.09, value: "C" },
      { start: 1.09, end: 1.23, value: "A" },
      { start: 1.23, end: 1.75, value: "X" },
      { start: 1.75, end: 1.81, value: "B" },
      { start: 1.81, end: 1.94, value: "D" },
      { start: 1.94, end: 2.01, value: "C" },
      { start: 2.01, end: 2.08, value: "B" },
      { start: 2.08, end: 2.22, value: "E" },
      { start: 2.22, end: 2.36, value: "B" },
      { start: 2.36, end: 2.43, value: "E" },
      { start: 2.43, end: 2.57, value: "F" },
      { start: 2.57, end: 2.65, value: "A" },
      { start: 2.65, end: 2.78, value: "C" },
      { start: 2.78, end: 2.85, value: "B" },
      { start: 2.85, end: 2.99, value: "C" },
      { start: 2.99, end: 3.13, value: "B" },
      { start: 3.13, end: 3.35, value: "X" },
      { start: 3.35, end: 3.5, value: "B" },
      { start: 3.5, end: 3.57, value: "F" },
      { start: 3.57, end: 3.64, value: "C" },
      { start: 3.64, end: 3.85, value: "B" },
      { start: 3.85, end: 3.99, value: "G" },
      { start: 3.99, end: 4.06, value: "E" },
      { start: 4.06, end: 4.13, value: "B" },
      { start: 4.13, end: 4.27, value: "C" },
      { start: 4.27, end: 4.34, value: "B" },
      { start: 4.34, end: 4.41, value: "C" },
      { start: 4.41, end: 4.62, value: "B" },
      { start: 4.62, end: 4.76, value: "G" },
      { start: 4.76, end: 4.9, value: "E" },
      { start: 4.9, end: 5.11, value: "B" },
      { start: 5.11, end: 5.32, value: "C" },
      { start: 5.32, end: 5.42, value: "A" },
      { start: 5.42, end: 5.81, value: "B" },
      { start: 5.81, end: 5.95, value: "C" },
      { start: 5.95, end: 6.37, value: "F" },
      { start: 6.37, end: 6.63, value: "X" },
    ],

    dilg_4: [
      { start: 0.0, end: 0.06, value: "X" },
      { start: 0.06, end: 0.14, value: "C" },
      { start: 0.14, end: 0.95, value: "F" },
      { start: 0.95, end: 1.09, value: "C" },
      { start: 1.09, end: 1.17, value: "A" },
      { start: 1.17, end: 1.55, value: "X" },
      { start: 1.55, end: 1.74, value: "F" },
      { start: 1.74, end: 1.79, value: "E" },
      { start: 1.79, end: 1.97, value: "C" },
      { start: 1.97, end: 2.04, value: "G" },
      { start: 2.04, end: 2.11, value: "D" },
      { start: 2.11, end: 2.18, value: "B" },
      { start: 2.18, end: 2.26, value: "A" },
      { start: 2.26, end: 2.53, value: "B" },
      { start: 2.53, end: 2.6, value: "C" },
      { start: 2.6, end: 2.88, value: "B" },
      { start: 2.88, end: 2.95, value: "E" },
      { start: 2.95, end: 3.09, value: "B" },
      { start: 3.09, end: 3.23, value: "C" },
      { start: 3.23, end: 3.3, value: "E" },
      { start: 3.3, end: 3.44, value: "C" },
      { start: 3.44, end: 3.58, value: "B" },
      { start: 3.58, end: 3.66, value: "A" },
      { start: 3.66, end: 3.83, value: "C" },
      { start: 3.83, end: 4.04, value: "B" },
      { start: 4.04, end: 4.6, value: "X" },
      { start: 4.6, end: 4.89, value: "F" },
      { start: 4.89, end: 4.97, value: "E" },
      { start: 4.97, end: 5.11, value: "H" },
      { start: 5.11, end: 5.25, value: "C" },
      { start: 5.25, end: 5.46, value: "F" },
      { start: 5.46, end: 5.6, value: "C" },
      { start: 5.6, end: 5.74, value: "E" },
      { start: 5.74, end: 6.02, value: "F" },
      { start: 6.02, end: 6.16, value: "B" },
      { start: 6.16, end: 6.3, value: "C" },
      { start: 6.3, end: 6.37, value: "H" },
      { start: 6.37, end: 6.51, value: "G" },
      { start: 6.51, end: 6.76, value: "X" },
    ],

    dilg_5: [
      { start: 0.0, end: 0.07, value: "X" },
      { start: 0.07, end: 0.12, value: "B" },
      { start: 0.12, end: 0.37, value: "E" },
      { start: 0.37, end: 0.51, value: "F" },
      { start: 0.51, end: 0.76, value: "B" },
      { start: 0.76, end: 0.84, value: "A" },
      { start: 0.84, end: 0.89, value: "C" },
      { start: 0.89, end: 1.07, value: "B" },
      { start: 1.07, end: 1.14, value: "C" },
      { start: 1.14, end: 1.21, value: "H" },
      { start: 1.21, end: 1.28, value: "G" },
      { start: 1.28, end: 1.35, value: "D" },
      { start: 1.35, end: 1.63, value: "B" },
      { start: 1.63, end: 1.7, value: "E" },
      { start: 1.7, end: 1.77, value: "F" },
      { start: 1.77, end: 2.11, value: "B" },
      { start: 2.11, end: 2.18, value: "F" },
      { start: 2.18, end: 2.24, value: "C" },
      { start: 2.24, end: 2.38, value: "B" },
      { start: 2.38, end: 2.46, value: "A" },
      { start: 2.46, end: 2.58, value: "F" },
      { start: 2.58, end: 2.86, value: "B" },
      { start: 2.86, end: 3.0, value: "D" },
      { start: 3.0, end: 3.07, value: "B" },
      { start: 3.07, end: 3.15, value: "A" },
      { start: 3.15, end: 3.25, value: "B" },
      { start: 3.25, end: 3.39, value: "C" },
      { start: 3.39, end: 3.46, value: "H" },
      { start: 3.46, end: 3.7, value: "X" },
    ],

    dilg_6: [
      { start: 0.0, end: 0.07, value: "X" },
      { start: 0.07, end: 0.47, value: "B" },
      { start: 0.47, end: 0.61, value: "F" },
      { start: 0.61, end: 0.68, value: "B" },
      { start: 0.68, end: 0.75, value: "C" },
      { start: 0.75, end: 0.89, value: "B" },
      { start: 0.89, end: 0.97, value: "A" },
      { start: 0.97, end: 1.11, value: "C" },
      { start: 1.11, end: 1.18, value: "B" },
      { start: 1.18, end: 1.39, value: "F" },
      { start: 1.39, end: 1.81, value: "B" },
      { start: 1.81, end: 1.88, value: "G" },
      { start: 1.88, end: 1.95, value: "F" },
      { start: 1.95, end: 2.02, value: "C" },
      { start: 2.02, end: 2.09, value: "G" },
      { start: 2.09, end: 2.3, value: "E" },
      { start: 2.3, end: 2.65, value: "B" },
      { start: 2.65, end: 2.72, value: "C" },
      { start: 2.72, end: 3.21, value: "B" },
      { start: 3.21, end: 3.29, value: "A" },
      { start: 3.29, end: 3.43, value: "E" },
      { start: 3.43, end: 3.57, value: "B" },
      { start: 3.57, end: 3.65, value: "A" },
      { start: 3.65, end: 3.92, value: "B" },
      { start: 3.92, end: 4.12, value: "X" },
    ],

    dilg_7: [
      { start: 0.0, end: 0.07, value: "X" },
      { start: 0.07, end: 0.19, value: "F" },
      { start: 0.19, end: 0.26, value: "C" },
      { start: 0.26, end: 0.33, value: "G" },
      { start: 0.33, end: 0.4, value: "C" },
      { start: 0.4, end: 0.47, value: "D" },
      { start: 0.47, end: 0.68, value: "B" },
      { start: 0.68, end: 0.75, value: "C" },
      { start: 0.75, end: 0.96, value: "B" },
      { start: 0.96, end: 1.1, value: "E" },
      { start: 1.1, end: 1.24, value: "C" },
      { start: 1.24, end: 1.38, value: "B" },
      { start: 1.38, end: 1.46, value: "A" },
      { start: 1.46, end: 1.6, value: "E" },
      { start: 1.6, end: 1.67, value: "B" },
      { start: 1.67, end: 1.75, value: "A" },
      { start: 1.75, end: 1.83, value: "B" },
      { start: 1.83, end: 1.97, value: "C" },
      { start: 1.97, end: 2.11, value: "B" },
      { start: 2.11, end: 2.18, value: "G" },
      { start: 2.18, end: 2.39, value: "C" },
      { start: 2.39, end: 2.46, value: "E" },
      { start: 2.46, end: 2.94, value: "X" },
      { start: 2.94, end: 3.13, value: "F" },
      { start: 3.13, end: 3.21, value: "E" },
      { start: 3.21, end: 3.28, value: "H" },
      { start: 3.28, end: 3.35, value: "C" },
      { start: 3.35, end: 3.42, value: "B" },
      { start: 3.42, end: 3.67, value: "F" },
      { start: 3.67, end: 3.74, value: "E" },
      { start: 3.74, end: 4.05, value: "C" },
      { start: 4.05, end: 4.19, value: "E" },
      { start: 4.19, end: 4.44, value: "X" },
    ],

    dilg_8: [
      { start: 0.0, end: 0.06, value: "X" },
      { start: 0.06, end: 0.44, value: "B" },
      { start: 0.44, end: 0.58, value: "C" },
      { start: 0.58, end: 0.66, value: "A" },
      { start: 0.66, end: 0.79, value: "E" },
      { start: 0.79, end: 0.93, value: "B" },
      { start: 0.93, end: 1.01, value: "A" },
      { start: 1.01, end: 1.35, value: "B" },
      { start: 1.35, end: 1.49, value: "C" },
      { start: 1.49, end: 2.06, value: "B" },
      { start: 2.06, end: 2.29, value: "C" },
      { start: 2.29, end: 2.43, value: "F" },
      { start: 2.43, end: 2.5, value: "B" },
      { start: 2.5, end: 2.78, value: "C" },
      { start: 2.78, end: 2.92, value: "B" },
      { start: 2.92, end: 2.99, value: "C" },
      { start: 2.99, end: 3.23, value: "X" },
    ],

    dilg_9: [
      { start: 0.0, end: 0.07, value: "X" },
      { start: 0.07, end: 0.19, value: "D" },
      { start: 0.19, end: 0.33, value: "B" },
      { start: 0.33, end: 0.43, value: "A" },
      { start: 0.43, end: 0.49, value: "C" },
      { start: 0.49, end: 0.62, value: "B" },
      { start: 0.62, end: 0.69, value: "C" },
      { start: 0.69, end: 0.76, value: "H" },
      { start: 0.76, end: 0.83, value: "G" },
      { start: 0.83, end: 0.9, value: "B" },
      { start: 0.9, end: 0.98, value: "A" },
      { start: 0.98, end: 1.55, value: "B" },
      { start: 1.55, end: 1.62, value: "F" },
      { start: 1.62, end: 1.68, value: "C" },
      { start: 1.68, end: 1.82, value: "B" },
      { start: 1.82, end: 1.9, value: "A" },
      { start: 1.9, end: 2.03, value: "F" },
      { start: 2.03, end: 2.38, value: "B" },
      { start: 2.38, end: 2.48, value: "D" },
      { start: 2.48, end: 2.52, value: "C" },
      { start: 2.52, end: 2.6, value: "A" },
      { start: 2.6, end: 2.7, value: "B" },
      { start: 2.7, end: 2.84, value: "C" },
      { start: 2.84, end: 2.91, value: "H" },
      { start: 2.91, end: 3.1, value: "B" },
      { start: 3.1, end: 3.18, value: "A" },
      { start: 3.18, end: 3.24, value: "C" },
      { start: 3.24, end: 3.65, value: "B" },
      { start: 3.65, end: 3.72, value: "G" },
      { start: 3.72, end: 3.79, value: "B" },
      { start: 3.79, end: 3.86, value: "C" },
      { start: 3.86, end: 4.0, value: "E" },
      { start: 4.0, end: 4.28, value: "B" },
      { start: 4.28, end: 4.56, value: "C" },
      { start: 4.56, end: 4.7, value: "B" },
      { start: 4.7, end: 4.91, value: "X" },
    ],

    dilg_10: [
      { start: 0.0, end: 0.01, value: "X" },
      { start: 0.01, end: 0.09, value: "A" },
      { start: 0.09, end: 0.53, value: "B" },
      { start: 0.53, end: 0.6, value: "E" },
      { start: 0.6, end: 0.67, value: "F" },
      { start: 0.67, end: 0.74, value: "C" },
      { start: 0.74, end: 0.88, value: "E" },
      { start: 0.88, end: 1.02, value: "G" },
      { start: 1.02, end: 1.09, value: "C" },
      { start: 1.09, end: 1.37, value: "B" },
      { start: 1.37, end: 1.51, value: "F" },
      { start: 1.51, end: 1.79, value: "C" },
      { start: 1.79, end: 1.88, value: "A" },
      { start: 1.88, end: 1.95, value: "B" },
      { start: 1.95, end: 2.14, value: "D" },
      { start: 2.14, end: 2.19, value: "C" },
      { start: 2.19, end: 2.44, value: "B" },
      { start: 2.44, end: 2.51, value: "C" },
      { start: 2.51, end: 2.65, value: "B" },
      { start: 2.65, end: 2.72, value: "G" },
      { start: 2.72, end: 3.07, value: "B" },
      { start: 3.07, end: 3.15, value: "A" },
      { start: 3.15, end: 3.27, value: "H" },
      { start: 3.27, end: 3.34, value: "C" },
      { start: 3.34, end: 3.48, value: "B" },
      { start: 3.48, end: 3.55, value: "F" },
      { start: 3.55, end: 3.69, value: "C" },
      { start: 3.69, end: 3.83, value: "B" },
      { start: 3.83, end: 3.97, value: "E" },
      { start: 3.97, end: 4.04, value: "F" },
      { start: 4.04, end: 4.39, value: "B" },
      { start: 4.39, end: 4.62, value: "X" },
    ],

    dilg_11: [
      { start: 0.0, end: 0.08, value: "X" },
      { start: 0.08, end: 0.32, value: "F" },
      { start: 0.32, end: 0.4, value: "A" },
      { start: 0.4, end: 0.55, value: "B" },
      { start: 0.55, end: 0.69, value: "F" },
      { start: 0.69, end: 1.04, value: "B" },
      { start: 1.04, end: 1.32, value: "C" },
      { start: 1.32, end: 1.43, value: "A" },
      { start: 1.43, end: 1.62, value: "C" },
      { start: 1.62, end: 1.69, value: "F" },
      { start: 1.69, end: 1.76, value: "D" },
      { start: 1.76, end: 1.83, value: "B" },
      { start: 1.83, end: 1.97, value: "C" },
      { start: 1.97, end: 2.11, value: "E" },
      { start: 2.11, end: 2.39, value: "B" },
      { start: 2.39, end: 2.46, value: "C" },
      { start: 2.46, end: 2.6, value: "E" },
      { start: 2.6, end: 2.74, value: "G" },
      { start: 2.74, end: 2.88, value: "C" },
      { start: 2.88, end: 3.09, value: "B" },
      { start: 3.09, end: 3.34, value: "X" },
    ],

    dilg_12: [
      { start: 0.0, end: 0.05, value: "X" },
      { start: 0.05, end: 0.1, value: "C" },
      { start: 0.1, end: 0.15, value: "B" },
      { start: 0.15, end: 0.23, value: "A" },
      { start: 0.23, end: 0.35, value: "D" },
      { start: 0.35, end: 0.42, value: "H" },
      { start: 0.42, end: 0.49, value: "C" },
      { start: 0.49, end: 0.63, value: "B" },
      { start: 0.63, end: 0.7, value: "C" },
      { start: 0.7, end: 1.05, value: "B" },
      { start: 1.05, end: 1.26, value: "C" },
      { start: 1.26, end: 1.33, value: "G" },
      { start: 1.33, end: 2.14, value: "B" },
      { start: 2.14, end: 2.18, value: "C" },
      { start: 2.18, end: 2.22, value: "B" },
      { start: 2.22, end: 2.29, value: "F" },
      { start: 2.29, end: 2.36, value: "B" },
      { start: 2.36, end: 2.43, value: "C" },
      { start: 2.43, end: 2.5, value: "B" },
      { start: 2.5, end: 2.64, value: "C" },
      { start: 2.64, end: 2.73, value: "A" },
      { start: 2.73, end: 2.8, value: "B" },
      { start: 2.8, end: 2.86, value: "F" },
      { start: 2.86, end: 2.98, value: "A" },
      { start: 2.98, end: 3.04, value: "B" },
      { start: 3.04, end: 3.1, value: "D" },
      { start: 3.1, end: 3.24, value: "B" },
      { start: 3.24, end: 3.31, value: "C" },
      { start: 3.31, end: 3.45, value: "B" },
      { start: 3.45, end: 3.52, value: "E" },
      { start: 3.52, end: 3.59, value: "B" },
      { start: 3.59, end: 3.73, value: "C" },
      { start: 3.73, end: 3.8, value: "B" },
      { start: 3.8, end: 4.01, value: "C" },
      { start: 4.01, end: 4.48, value: "X" },
      { start: 4.48, end: 4.72, value: "F" },
      { start: 4.72, end: 4.79, value: "C" },
      { start: 4.79, end: 5.0, value: "F" },
      { start: 5.0, end: 5.28, value: "B" },
      { start: 5.28, end: 5.42, value: "D" },
      { start: 5.42, end: 5.56, value: "B" },
      { start: 5.56, end: 5.74, value: "X" },
    ],


    dilg_13: [
      { start: 0.0, end: 0.05, value: "X" },
      { start: 0.05, end: 0.2, value: "B" },
      { start: 0.2, end: 0.41, value: "C" },
      { start: 0.41, end: 0.55, value: "B" },
      { start: 0.55, end: 0.62, value: "G" },
      { start: 0.62, end: 0.69, value: "C" },
      { start: 0.69, end: 0.76, value: "E" },
      { start: 0.76, end: 0.84, value: "A" },
      { start: 0.84, end: 0.99, value: "E" },
      { start: 0.99, end: 1.06, value: "B" },
      { start: 1.06, end: 1.14, value: "A" },
      { start: 1.14, end: 1.29, value: "B" },
      { start: 1.29, end: 1.37, value: "A" },
      { start: 1.37, end: 1.62, value: "B" },
      { start: 1.62, end: 1.69, value: "C" },
      { start: 1.69, end: 1.9, value: "F" },
      { start: 1.9, end: 1.98, value: "A" },
      { start: 1.98, end: 2.11, value: "C" },
      { start: 2.11, end: 2.25, value: "B" },
      { start: 2.25, end: 2.32, value: "C" },
      { start: 2.32, end: 2.67, value: "B" },
      { start: 2.67, end: 2.74, value: "G" },
      { start: 2.74, end: 3.02, value: "C" },
      { start: 3.02, end: 3.09, value: "B" },
      { start: 3.09, end: 3.16, value: "C" },
      { start: 3.16, end: 3.37, value: "B" },
      { start: 3.37, end: 3.72, value: "C" },
      { start: 3.72, end: 4.35, value: "B" },
      { start: 4.35, end: 4.5, value: "C" },
      { start: 4.5, end: 4.99, value: "F" },
      { start: 4.99, end: 5.13, value: "B" },
      { start: 5.13, end: 5.38, value: "X" },
    ],
  },
};

export function updateMouthqueDefault(mouthQueRes) {
  expression_que.mouthque.default = mouthQueRes;
}

export const avatar_smile = (nodes, morphTargetSmoothing) => {
  const curr_smile_time = new Date().getMilliseconds();
  // console.log(curr_smile_time);
  if (morphTargetSmoothing > 0) {
    smoothMorphTarget = true;
  }
  const used_keys = {
    1: "mouthSmileRight",
    2: "mouthSmileLeft",
  };


  Object.values(used_keys).forEach((value) => {
    if (!smoothMorphTarget) {
      nodes.AvatarHead.morphTargetInfluences[
        nodes.AvatarHead.morphTargetDictionary[value]
      ] = 0.5;
      nodes.AvatarTeethLower.morphTargetInfluences[
        nodes.AvatarTeethLower.morphTargetDictionary[value]
      ] = 0.5;
    } else {
      nodes.AvatarHead.morphTargetInfluences[
        nodes.AvatarHead.morphTargetDictionary[value]
      ] = THREE.MathUtils.lerp(
        nodes.AvatarHead.morphTargetInfluences[
          nodes.AvatarHead.morphTargetDictionary[value]
        ],
        0.5,
        morphTargetSmoothing
      );

      nodes.AvatarTeethLower.morphTargetInfluences[
        nodes.AvatarTeethLower.morphTargetDictionary[value]
      ] = THREE.MathUtils.lerp(
        nodes.AvatarTeethLower.morphTargetInfluences[
          nodes.AvatarTeethLower.morphTargetDictionary[value]
        ],
        0.5,
        morphTargetSmoothing
      );
    }
  });

  for (let i = 0; i < expression_que.smileque.length; i++) {
    const smileCue = expression_que.smileque[i];
    if (
      curr_smile_time + 1 >= smileCue.start &&
      curr_smile_time + 1 <= smileCue.end
    ) {
      // console.log(smileCue.value)
      if (!smoothMorphTarget) {
        nodes.AvatarHead.morphTargetInfluences[
          nodes.AvatarHead.morphTargetDictionary["mouthSmileRight"]
        ] = smileCue.value;
        nodes.AvatarTeethLower.morphTargetInfluences[
          nodes.AvatarTeethLower.morphTargetDictionary["mouthSmileRight"]
        ] = smileCue.value;
      } else {
        nodes.AvatarHead.morphTargetInfluences[
          nodes.AvatarHead.morphTargetDictionary["mouthSmileRight"]
        ] = THREE.MathUtils.lerp(
          nodes.AvatarHead.morphTargetInfluences[
            nodes.AvatarHead.morphTargetDictionary["mouthSmileRight"]
          ],
          smileCue.value,
          morphTargetSmoothing
        );
        nodes.AvatarTeethLower.morphTargetInfluences[
          nodes.AvatarTeethLower.morphTargetDictionary["mouthSmileRight"]
        ] = THREE.MathUtils.lerp(
          nodes.AvatarTeethLower.morphTargetInfluences[
            nodes.AvatarTeethLower.morphTargetDictionary["mouthSmileRight"]
          ],
          smileCue.value,
          morphTargetSmoothing
        );
        nodes.AvatarHead.morphTargetInfluences[
          nodes.AvatarHead.morphTargetDictionary["mouthSmileLeft"]
        ] = THREE.MathUtils.lerp(
          nodes.AvatarHead.morphTargetInfluences[
            nodes.AvatarHead.morphTargetDictionary["mouthSmileLeft"]
          ],
          smileCue.value,
          morphTargetSmoothing
        );
        nodes.AvatarTeethLower.morphTargetInfluences[
          nodes.AvatarTeethLower.morphTargetDictionary["mouthSmileLeft"]
        ] = THREE.MathUtils.lerp(
          nodes.AvatarTeethLower.morphTargetInfluences[
            nodes.AvatarTeethLower.morphTargetDictionary["mouthSmileLeft"]
          ],
          smileCue.value,
          morphTargetSmoothing
        );
      }

      break;
    }
  }
  return nodes;
};
let j = 0;
export const avatar_blink = (nodes, morphTargetSmoothing) => {
  const curr_blink_time = new Date().getMilliseconds();
  // console.log(curr_blink_time);
  const blink_keys = {
    1: "eyeBlinkLeft",
    2: "eyeBlinkRight",
  };

  Object.values(blink_keys).forEach((value) => {
    nodes.AvatarTeethLower.morphTargetInfluences[
      nodes.AvatarTeethLower.morphTargetDictionary[value]
    ] = THREE.MathUtils.lerp(
      nodes.AvatarTeethLower.morphTargetInfluences[
        nodes.AvatarTeethLower.morphTargetDictionary[value]
      ],
      0,
      morphTargetSmoothing
    );

    nodes.AvatarEyelashes.morphTargetInfluences[
      nodes.AvatarEyelashes.morphTargetDictionary[value]
    ] = 0;
  });

  for (let i = 0; i < expression_que.blinkque.length; i++) {
    const blinkCue = expression_que.blinkque[i];
    if (
      curr_blink_time / 10 >= blinkCue.start &&
      curr_blink_time / 10 <= blinkCue.end
    ) {
      // console.log("blink")
      j = 0;
      // console.log(blinkCue.value)
      nodes.AvatarHead.morphTargetInfluences[
        nodes.AvatarHead.morphTargetDictionary["eyeBlinkRight"]
      ] = blinkCue.value;

      nodes.AvatarHead.morphTargetInfluences[
        nodes.AvatarHead.morphTargetDictionary["eyeBlinkLeft"]
      ] = blinkCue.value;

      nodes.AvatarEyelashes.morphTargetInfluences[
        nodes.AvatarEyelashes.morphTargetDictionary["eyeBlinkLeft"]
      ] = blinkCue.value;
      nodes.AvatarEyelashes.morphTargetInfluences[
        nodes.AvatarEyelashes.morphTargetDictionary["eyeBlinkRight"]
      ] = blinkCue.value;

      break;
    }
  }
  return nodes;
};

export const avatar_speak = (nodes, morphTargetSmoothing, audio, dilg) => {
  const currentAudioTime = audio.currentTime;
  Object.values(corresponding).forEach((value) => {
    if (!smoothMorphTarget) {
      nodes.AvatarHead.morphTargetInfluences[
        nodes.AvatarHead.morphTargetDictionary[value]
      ] = 0;
      nodes.AvatarTeethLower.morphTargetInfluences[
        nodes.AvatarTeethLower.morphTargetDictionary[value]
      ] = 0;
    } else {
      nodes.AvatarHead.morphTargetInfluences[
        nodes.AvatarHead.morphTargetDictionary[value]
      ] = THREE.MathUtils.lerp(
        nodes.AvatarHead.morphTargetInfluences[
          nodes.AvatarHead.morphTargetDictionary[value]
        ],
        0,
        morphTargetSmoothing
      );

      nodes.AvatarTeethLower.morphTargetInfluences[
        nodes.AvatarTeethLower.morphTargetDictionary[value]
      ] = THREE.MathUtils.lerp(
        nodes.AvatarTeethLower.morphTargetInfluences[
          nodes.AvatarTeethLower.morphTargetDictionary[value]
        ],
        0,
        morphTargetSmoothing
      );
    }
  });
  for (let i = 0; i < expression_que.mouthque[dilg].length; i++) {
    const mouthCue = expression_que.mouthque[dilg][i];
    if (
      currentAudioTime >= mouthCue.start &&
      currentAudioTime <= mouthCue.end
    ) {
      if (!smoothMorphTarget) {
        nodes.AvatarHead.morphTargetInfluences[
          nodes.AvatarHead.morphTargetDictionary[corresponding[mouthCue.value]]
        ] = 1;
        nodes.AvatarTeethLower.morphTargetInfluences[
          nodes.AvatarTeethLower.morphTargetDictionary[
            corresponding[mouthCue.value]
          ]
        ] = 1;
      } else {
        nodes.AvatarHead.morphTargetInfluences[
          nodes.AvatarHead.morphTargetDictionary[corresponding[mouthCue.value]]
        ] = THREE.MathUtils.lerp(
          nodes.AvatarHead.morphTargetInfluences[
            nodes.AvatarHead.morphTargetDictionary[
              corresponding[mouthCue.value]
            ]
          ],
          1,
          morphTargetSmoothing
        );
        nodes.AvatarTeethLower.morphTargetInfluences[
          nodes.AvatarTeethLower.morphTargetDictionary[
            corresponding[mouthCue.value]
          ]
        ] = THREE.MathUtils.lerp(
          nodes.AvatarTeethLower.morphTargetInfluences[
            nodes.AvatarTeethLower.morphTargetDictionary[
              corresponding[mouthCue.value]
            ]
          ],
          1,
          morphTargetSmoothing
        );
      }

      break;
    }
  }
  return nodes;
};
