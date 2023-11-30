
import { Environment, OrbitControls, useTexture } from '@react-three/drei';
import React, { Suspense } from "react"; //highlight-line
import { Avatar } from './Avatar';
import { useThree } from '@react-three/fiber'

export const Experience = () => {

    const texture = useTexture("textures/Bg.jpg")
    const viewport = useThree((state) => state.viewport)
    return (
        <>
            <OrbitControls />
            <Suspense fallback={null}>
            <Avatar position={[0, -6, 5]} scale={4} />
            </Suspense>
            <Environment preset='city' />
            <mesh>
                <planeGeometry args={[viewport.width*2, viewport.height*2]} />
                <meshBasicMaterial map={texture} />
            </mesh>

        </>
    );
}

