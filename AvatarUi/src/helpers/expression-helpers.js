
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
    
    "smileque": [
    { "start": 0, "end": 1, "value": 0},
    { "start": 2, "end": 4, "value": 0.6 },
    { "start": 5, "end": 6, "value": 0.4},
    { "start": 7, "end": 10, "value": 0.2 },
    { "start": 11, "end": 16, "value": 0.1 },
    { "start": 13, "end": 18, "value": 0.2 },
    { "start": 15, "end": 20, "value": 0.3 },
    { "start": 17, "end": 22, "value": 0.4 },
    { "start": 19, "end": 26, "value": 0.8 },
    { "start": 21, "end": 29, "value": 0.1 },
    { "start": 25, "end": 33, "value": 0.2 },
    { "start": 28, "end": 38, "value": 0.3 },
    { "start": 30, "end": 44, "value": 0.5 },
    { "start": 34, "end": 48, "value": 0.6 },
    { "start": 37, "end": 54, "value": 0.7 },
    { "start": 40, "end": 58, "value": 0.5 },
    { "start": 44, "end": 47, "value": 0.3 },
    { "start": 48, "end": 49, "value": 0.2 },
    { "start": 50, "end": 52, "value": 0.1 },
    { "start": 53, "end": 18, "value": 0.5 },
    { "start": 55, "end": 20, "value": 0.7 },
    { "start": 57, "end": 22, "value": 0.6 },
    { "start": 59, "end": 26, "value": 0.65 },
    { "start": 60, "end": 61, "value": 0},
    { "start": 62, "end": 64, "value": 0.6 },
    { "start": 65, "end": 66, "value": 0.4},
    { "start": 67, "end": 70, "value": 0.2 },
    { "start": 71, "end": 76, "value": 0.1 },
    { "start": 83, "end": 88, "value": 0.2 },
    { "start": 95, "end": 100, "value": 0.3 },
    { "start": 117, "end": 122, "value": 0.4 },
    { "start": 119, "end": 126, "value": 0.8 },
    { "start": 121, "end": 129, "value": 0.1 },
    { "start": 125, "end": 133, "value": 0.2 },
    { "start": 128, "end": 138, "value": 0.3 },
    { "start": 130, "end": 144, "value": 0.5 },
    { "start": 134, "end": 148, "value": 0.6 },
    { "start": 137, "end": 154, "value": 0.7 },
    { "start": 140, "end": 158, "value": 0.5 },
    { "start": 144, "end": 147, "value": 0.3 },
    { "start": 148, "end": 149, "value": 0.2 },
    { "start": 150, "end": 152, "value": 0.1 },
    { "start": 153, "end": 118, "value": 0.5 },
    { "start": 155, "end": 120, "value": 0.7 },
    { "start": 157, "end": 122, "value": 0.6 },
    { "start": 159, "end": 126, "value": 0.65 },
    ],
    "blinkque": [
    { "start": 0, "end": 500, "value": 0},
    { "start": 500, "end": 1000, "value": 1},

    ],

    "mouthque": [
    { "start": 0.00, "end": 0.16, "value": "X" },
    { "start": 0.16, "end": 0.27, "value": "C" },
    { "start": 0.27, "end": 0.55, "value": "E" },
    { "start": 0.55, "end": 0.69, "value": "F" },
    { "start": 0.69, "end": 0.91, "value": "B" },
    { "start": 0.91, "end": 0.99, "value": "A" },
    { "start": 0.99, "end": 1.04, "value": "C" },
    { "start": 1.04, "end": 1.08, "value": "B" },
    { "start": 1.08, "end": 1.15, "value": "C" },
    { "start": 1.15, "end": 1.23, "value": "A" },
    { "start": 1.23, "end": 1.45, "value": "B" },
    { "start": 1.45, "end": 1.52, "value": "C" },
    { "start": 1.52, "end": 1.66, "value": "B" },
    { "start": 1.66, "end": 1.85, "value": "D" },
    { "start": 1.85, "end": 1.90, "value": "C" },
    { "start": 1.90, "end": 2.17, "value": "B" },
    { "start": 2.17, "end": 2.31, "value": "C" },
    { "start": 2.31, "end": 2.39, "value": "A" },
    { "start": 2.39, "end": 2.65, "value": "B" },
    { "start": 2.65, "end": 2.72, "value": "C" },
    { "start": 2.72, "end": 2.86, "value": "G" },
    { "start": 2.86, "end": 3.00, "value": "E" },
    { "start": 3.00, "end": 3.14, "value": "B" },
    { "start": 3.14, "end": 3.21, "value": "G" },
    { "start": 3.21, "end": 3.28, "value": "E" },
    { "start": 3.28, "end": 3.42, "value": "F" },
    { "start": 3.42, "end": 3.49, "value": "C" },
    { "start": 3.49, "end": 3.56, "value": "H" },
    { "start": 3.56, "end": 3.70, "value": "C" },
    { "start": 3.70, "end": 3.77, "value": "B" },
    { "start": 3.77, "end": 3.91, "value": "D" },
    { "start": 3.91, "end": 4.12, "value": "B" },
    { "start": 4.12, "end": 4.19, "value": "C" },
    { "start": 4.19, "end": 4.26, "value": "H" },
    { "start": 4.26, "end": 4.32, "value": "A" },
    { "start": 4.32, "end": 4.38, "value": "B" },
    { "start": 4.38, "end": 4.46, "value": "A" },
    { "start": 4.46, "end": 4.59, "value": "C" },
    { "start": 4.59, "end": 4.87, "value": "B" },
    { "start": 4.87, "end": 4.94, "value": "E" },
    { "start": 4.94, "end": 5.36, "value": "B" },
    { "start": 5.36, "end": 5.50, "value": "C" },
    { "start": 5.50, "end": 5.57, "value": "B" },
    { "start": 5.57, "end": 5.64, "value": "C" },
    { "start": 5.64, "end": 5.78, "value": "B" },
    { "start": 5.78, "end": 5.92, "value": "C" },
    { "start": 5.92, "end": 5.99, "value": "B" },
    { "start": 5.99, "end": 6.06, "value": "C" },
    { "start": 6.06, "end": 6.13, "value": "B" },
    { "start": 6.13, "end": 6.25, "value": "A" },
    { "start": 6.25, "end": 6.39, "value": "B" },
    { "start": 6.39, "end": 6.46, "value": "G" },
    { "start": 6.46, "end": 6.60, "value": "B" },
    { "start": 6.60, "end": 6.68, "value": "A" },
    { "start": 6.68, "end": 7.01, "value": "B" },
    { "start": 7.01, "end": 7.26, "value": "X" },
    { "start": 7.26, "end": 7.33, "value": "B" },
    { "start": 7.33, "end": 7.46, "value": "C" },
    { "start": 7.46, "end": 7.54, "value": "A" },
    { "start": 7.54, "end": 7.78, "value": "E" },
    { "start": 7.78, "end": 7.99, "value": "B" },
    { "start": 7.99, "end": 8.06, "value": "C" },
    { "start": 8.06, "end": 8.34, "value": "B" },
    { "start": 8.34, "end": 8.41, "value": "G" },
    { "start": 8.41, "end": 8.48, "value": "C" },
    { "start": 8.48, "end": 8.55, "value": "H" },
    { "start": 8.55, "end": 8.67, "value": "A" },
    { "start": 8.67, "end": 8.81, "value": "C" },
    { "start": 8.81, "end": 8.95, "value": "B" },
    { "start": 8.95, "end": 9.19, "value": "X" }
  ],

  }

export const avatar_smile = (nodes, morphTargetSmoothing) => {
    const curr_smile_time = new Date().getMilliseconds();
    // console.log(curr_smile_time);
    if (morphTargetSmoothing > 0) {
        smoothMorphTarget = true;
    };
    const used_keys = {
      1: "mouthSmileRight",
      2: "mouthSmileLeft",
    };

    Object.values(used_keys).forEach((value) => {
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

    for (let i = 0; i < expression_que.smileque.length; i++) {
      const smileCue = expression_que.smileque[i];
      if (
        (curr_smile_time+1) >= smileCue.start &&
        (curr_smile_time+1) <= smileCue.end
      ) {
        // console.log(smileCue.value)
        if (!smoothMorphTarget) {
          nodes.AvatarHead.morphTargetInfluences[
            nodes.AvatarHead.morphTargetDictionary[
              "mouthSmileRight"
            ]
          ] = smileCue.value;
          nodes.AvatarTeethLower.morphTargetInfluences[
            nodes.AvatarTeethLower.morphTargetDictionary[
              "mouthSmileRight"
            ]
          ] = smileCue.value;
        } else {
          nodes.AvatarHead.morphTargetInfluences[
            nodes.AvatarHead.morphTargetDictionary[
              "mouthSmileRight"
            ]
          ] = THREE.MathUtils.lerp(
            nodes.AvatarHead.morphTargetInfluences[
              nodes.AvatarHead.morphTargetDictionary[
                "mouthSmileRight"
              ]
            ],
            smileCue.value,
            morphTargetSmoothing
          );
          nodes.AvatarTeethLower.morphTargetInfluences[
            nodes.AvatarTeethLower.morphTargetDictionary[
              "mouthSmileRight"
            ]
          ] = THREE.MathUtils.lerp(
            nodes.AvatarTeethLower.morphTargetInfluences[
              nodes.AvatarTeethLower.morphTargetDictionary[
                "mouthSmileRight"
              ]
            ],
            smileCue.value,
            morphTargetSmoothing
          );
          nodes.AvatarHead.morphTargetInfluences[
            nodes.AvatarHead.morphTargetDictionary[
              "mouthSmileLeft"
            ]
          ] = THREE.MathUtils.lerp(
            nodes.AvatarHead.morphTargetInfluences[
              nodes.AvatarHead.morphTargetDictionary[
                "mouthSmileLeft"
              ]
            ],
            smileCue.value,
            morphTargetSmoothing
          );
          nodes.AvatarTeethLower.morphTargetInfluences[
            nodes.AvatarTeethLower.morphTargetDictionary[
              "mouthSmileLeft"
            ]
          ] = THREE.MathUtils.lerp(
            nodes.AvatarTeethLower.morphTargetInfluences[
              nodes.AvatarTeethLower.morphTargetDictionary[
                "mouthSmileLeft"
              ]
            ],
            smileCue.value,
            morphTargetSmoothing
          );
        }

        break;
      }
    }
    return  nodes;
}
let j = 0
export const avatar_blink = (nodes, morphTargetSmoothing) => {
    
    const curr_blink_time = (new Date().getMilliseconds()) ;
    console.log(curr_blink_time);
    const blink_keys = {
    1: "eyeBlinkLeft",
    2: "eyeBlinkRight"
    }
   
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
            
        })

    for (let i = 0; i < expression_que.blinkque.length; i++) {
    const blinkCue = expression_que.blinkque[i];
    if (
        (curr_blink_time)/10 >= blinkCue.start &&
        (curr_blink_time)/10 <= blinkCue.end
    ) {
        console.log("blink")
        j=0
        console.log(blinkCue.value)
        nodes.AvatarHead.morphTargetInfluences[
        nodes.AvatarHead.morphTargetDictionary[
            "eyeBlinkRight"
        ]
        ] = blinkCue.value;

        nodes.AvatarHead.morphTargetInfluences[
        nodes.AvatarHead.morphTargetDictionary[
            "eyeBlinkLeft"
        ]
        ] = blinkCue.value;

        nodes.AvatarEyelashes.morphTargetInfluences[
        nodes.AvatarEyelashes.morphTargetDictionary[
            "eyeBlinkLeft"
        ]
        ] = blinkCue.value;
        nodes.AvatarEyelashes.morphTargetInfluences[
        nodes.AvatarEyelashes.morphTargetDictionary[
            "eyeBlinkRight"
        ]
        ] = blinkCue.value;

        
        

        break;
      }
    }
    return nodes
};

export const avatar_speak = (nodes, morphTargetSmoothing, audio) => {
    
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

    for (let i = 0; i < expression_que.mouthque.length; i++) {
      const mouthCue = expression_que.mouthque[i];
      if (
        currentAudioTime >= mouthCue.start &&
        currentAudioTime <= mouthCue.end
      ) {
        if (!smoothMorphTarget) {
          nodes.AvatarHead.morphTargetInfluences[
            nodes.AvatarHead.morphTargetDictionary[
              corresponding[mouthCue.value]
            ]
          ] = 1;
          nodes.AvatarTeethLower.morphTargetInfluences[
            nodes.AvatarTeethLower.morphTargetDictionary[
              corresponding[mouthCue.value]
            ]
          ] = 1;
        } else {
          nodes.AvatarHead.morphTargetInfluences[
            nodes.AvatarHead.morphTargetDictionary[
              corresponding[mouthCue.value]
            ]
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
    return nodes
}