import * as THREE from "three";

const morphTargetSmoothing = 0.5;


export function Expression(model_node, type, node_value){

    if (type === "smile") {
        // console.log(model_node.AvatarHead.morphTargetDictionary);

        model_node.AvatarHead.morphTargetInfluences[
            model_node.AvatarHead.morphTargetDictionary[
              node_value
            ]
          ] = THREE.MathUtils.lerp(
            model_node.AvatarHead.morphTargetInfluences[
              model_node.AvatarHead.morphTargetDictionary[
                node_value
              ]
            ],
            1,
            morphTargetSmoothing
          )
          

        model_node.AvatarHead.morphTargetInfluences[model_node.AvatarHead.morphTargetDictionary["mouthSmileRight"]] = node_value;
        model_node.AvatarHead.morphTargetInfluences[model_node.AvatarHead.morphTargetDictionary["mouthSmileLeft"]] = node_value;
        
        model_node.AvatarHead.morphTargetInfluences[model_node.AvatarTeethLower.morphTargetDictionary["mouthSmileRight"] ] = node_value;
        model_node.AvatarHead.morphTargetInfluences[model_node.AvatarTeethLower.morphTargetDictionary["mouthSmileLeft"] ] = node_value;
        
        // model_node.AvatarHead.morphTargetInfluences[model_node.AvatarEyelashes.morphTargetDictionary["mouthSmileRight"] ] = node_value;
        // model_node.AvatarHead.morphTargetInfluences[model_node.AvatarEyelashes.morphTargetDictionary["mouthSmileLeft"] ] = node_value;
        console.log("smiling")

    }

    return model_node

}