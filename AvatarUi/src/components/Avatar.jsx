/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.15 public/models/Avatar.glb -o src/components/Avatar.jsx -r public 
*/

import React, { useRef } from "react";
// import { useGLTF } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useAnimations, useFBX } from "@react-three/drei";
import { useState } from "react";
import { useEffect } from "react";
import { useControls } from "leva";
import { useMemo } from "react";
import { useFrame } from "@react-three/fiber";

import { Expression } from "./FacialAnimation";
import * as THREE from "three";

export function Avatar(props) {
  // const { nodes, materials, scene } = useGLTF("/models/Avatar.glb");
  const { 
    playAudio, 
    script,
    morphTargetSmoothing,
    smoothMorphTarget
    } = useControls({
    playAudio: false,
    smoothMorphTarget: true,
    morphTargetSmoothing: 0.5,
    script: {
      value: "hello",
      options: ["hello"],
    },
  });

  const headFollow = true;

  const audio = useMemo(() => new Audio(`/audios/${script}.mp3`), [script]);

  useEffect(() => {
    if (playAudio) {
      audio.play();
    } else {
      audio.pause();
    }
  }, [playAudio, script]);

  const { nodes, materials, scene } = useLoader(
    GLTFLoader,
    "models/Avatar.glb"
  );

  const { animations: idle_1 } = useFBX("/animations/animation_1.fbx");
  const { animations: idle_2 } = useFBX("/animations/animation_2.fbx");
  const { animations: idle_3 } = useFBX("/animations/animation_3.fbx");
  const { animations: idle_4 } = useFBX("/animations/animation_4.fbx");
  const { animations: idle_5 } = useFBX("/animations/animation_5.fbx");
  const { animations: idle_6 } = useFBX("/animations/animation_6.fbx");

  // console.log(idle_1)

  idle_1[0].name = "idle_1";
  idle_2[0].name = "idle_2";
  idle_3[0].name = "idle_3";
  idle_4[0].name = "idle_4";
  idle_5[0].name = "idle_5";
  idle_6[0].name = "idle_6";

  const [animation, setAnimation] = useState("idle_6");

  const group = useRef();
  const { actions } = useAnimations(
    [idle_1[0], idle_2[0], idle_3[0], idle_4[0], idle_5[0], idle_6[0]],
    group
  );
  
const expression_que = {"smileque": [
    { "start": 0, "end": 1, "value": 0.3 },
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
    ],
    "blinkque": [
    { "start": 0.9, "end": 1, "value": 0 },
    { "start": 1.2, "end": 1.2, "value": 1 },
    { "start": 1.2, "end": 6, "value": 0},
    { "start": 10, "end": 10, "value": 1 },
    { "start": 10, "end": 16, "value": 0 },
    { "start": 18, "end": 18, "value": 1 },
    { "start": 18, "end": 20, "value": 0 },
    { "start": 21.99, "end": 22, "value": 1 },
    { "start": 22, "end": 26, "value": 0 },
    { "start": 29, "end": 29, "value": 1 },
    { "start": 29, "end": 33, "value": 0 },
    { "start": 38., "end": 38, "value": 1 },
    { "start": 38, "end": 44, "value": 0 },
    { "start": 48, "end": 48, "value": 1 },
    { "start": 48, "end": 54, "value": 0 },
    { "start": 58, "end": 58, "value": 1 },
    { "start": 58, "end": 60, "value": 0 },
  
  ]}

  // console.log(expression_que.smile_que);
  useEffect(() => {
    actions[animation].reset().fadeIn(0.5).play();
    return () => actions[animation].fadeOut(0.5);
  }, [animation]);

  useFrame((state) => {

    if (headFollow) {
      group.current.getObjectByName("Head").lookAt(state.camera.position);
    }

  });

  useFrame((state) => {
    const curr_smile_time = new Date().getSeconds();
    console.log(curr_smile_time);

  const used_keys = {
    1: "mouthSmileRight",
    2: "mouthSmileLeft"
  }

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
        console.log(smileCue.value)
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
  });


  useFrame((state) => {

  nodes.AvatarHead.morphTargetInfluences[
        nodes.AvatarHead.morphTargetDictionary[
          "eyeBlinkRight"
        ]
      ] = 0;

  nodes.AvatarHead.morphTargetInfluences[
    nodes.AvatarHead.morphTargetDictionary[
      "eyeBlinkLeft"
    ]
  ] = 0;

    const curr_blink_time = new Date().getSeconds();
    console.log(curr_blink_time);
    const used_keys = {
    1: "eyeBlinkLeft",
    2: "eyeBlinkRight"
  }
        
   Object.values(used_keys).forEach((value) => {
        nodes.AvatarHead.morphTargetInfluences[
          nodes.AvatarHead.morphTargetDictionary[value]
        ] = 0;

        nodes.AvatarEyelashes.morphTargetInfluences[
          nodes.AvatarEyelashes.morphTargetDictionary[value]
        ] = 0;
        
   })

    for (let i = 0; i < expression_que.blinkque.length; i++) {
      const blinkCue = expression_que.blinkque[i];

      
      if (
        (curr_blink_time+1) === blinkCue.start 
      ) {
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
  });

  // for (let i=0; i < Object.entries(smile_que).length; i++)

  return (
    <group {...props} dispose={null} ref={group}>
      <primitive object={scene} />
      <group rotation={[Math.PI / 2, 0, 0]}>
        <skinnedMesh
          geometry={nodes.AvatarBody.geometry}
          material={materials.AvatarBody}
          skeleton={nodes.AvatarBody.skeleton}
        />
        <skinnedMesh
          geometry={nodes.AvatarLeftCornea.geometry}
          material={materials.AvatarLeftCornea}
          skeleton={nodes.AvatarLeftCornea.skeleton}
        />
        <skinnedMesh
          geometry={nodes.AvatarLeftEyeball.geometry}
          material={materials.AvatarLeftEyeball}
          skeleton={nodes.AvatarLeftEyeball.skeleton}
        />
        <skinnedMesh
          geometry={nodes.AvatarRightCornea.geometry}
          material={materials.AvatarRightCornea}
          skeleton={nodes.AvatarRightCornea.skeleton}
        />
        <skinnedMesh
          geometry={nodes.AvatarRightEyeball.geometry}
          material={materials.AvatarRightEyeball}
          skeleton={nodes.AvatarRightEyeball.skeleton}
        />
        <skinnedMesh
          geometry={nodes.AvatarTeethUpper.geometry}
          material={materials.AvatarTeethUpper}
          skeleton={nodes.AvatarTeethUpper.skeleton}
        />
        <skinnedMesh
          geometry={nodes.haircut.geometry}
          material={materials.haircut}
          skeleton={nodes.haircut.skeleton}
        />
        <skinnedMesh
          geometry={nodes.outfit_bottom.geometry}
          material={materials.outfit_bottom}
          skeleton={nodes.outfit_bottom.skeleton}
        />
        <skinnedMesh
          geometry={nodes.outfit_shoes.geometry}
          material={materials.outfit_shoes}
          skeleton={nodes.outfit_shoes.skeleton}
        />
        <skinnedMesh
          geometry={nodes.outfit_top.geometry}
          material={materials.outfit_top}
          skeleton={nodes.outfit_top.skeleton}
        />
        <skinnedMesh
          name="AvatarEyelashes"
          geometry={nodes.AvatarEyelashes.geometry}
          material={materials.AvatarEyelashes}
          skeleton={nodes.AvatarEyelashes.skeleton}
          morphTargetDictionary={nodes.AvatarEyelashes.morphTargetDictionary}
          morphTargetInfluences={nodes.AvatarEyelashes.morphTargetInfluences}
        />
        <skinnedMesh
          name="AvatarHead"
          geometry={nodes.AvatarHead.geometry}
          material={materials.AvatarHead}
          skeleton={nodes.AvatarHead.skeleton}
          morphTargetDictionary={nodes.AvatarHead.morphTargetDictionary}
          morphTargetInfluences={nodes.AvatarHead.morphTargetInfluences}
        />
        <skinnedMesh
          name="AvatarTeethLower"
          geometry={nodes.AvatarTeethLower.geometry}
          material={materials.AvatarTeethLower}
          skeleton={nodes.AvatarTeethLower.skeleton}
          morphTargetDictionary={nodes.AvatarTeethLower.morphTargetDictionary}
          morphTargetInfluences={nodes.AvatarTeethLower.morphTargetInfluences}
        />
      </group>
    </group>
  );
}

// useGLTF.preload("/models/Avatar.glb");
