/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
//import { Physics, usePlane, useBox } from "@react-three/cannon";

export function TmRs(props) {
  const group = useRef();
  const redSphere = React.createRef();

  const { nodes, materials } = useGLTF(
    process.env.PUBLIC_URL + "/tmRs.gltf"
  );
 // const { actions } = useAnimations(animations, group);
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="ConeRed" rotation={[0, Math.PI / 4, 0]}>
          <mesh
            geometry={nodes.ConeRed_1.geometry}
            material={materials.Material}
          />
          <mesh
            geometry={nodes.ConeRed_2.geometry}
            material={materials["Material.001"]}
          />
          <mesh
            geometry={nodes.ConeRed_3.geometry}
            material={materials["Material.002"]}
          />
          <mesh ref={redSphere}>
            <sphereBufferGeometry args={[0.01, 24, 24]} />
            <meshStandardMaterial color={"red"} />
          </mesh>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload(process.env.PUBLIC_URL + "/tmRs.gltf");
