import React, { useState, createRef, useEffect, useRef } from "react";

import { useFrame } from "@react-three/fiber";

import { TmBs } from "./TmBs";
import { TmRs } from "./TmRs";
import { TmGs } from "./TmGs";

const number_of_mines = 45;
const mine_push_back_multiplier = 3;
const z_pos_incrementer = 0.9;

export function MineRotator(props) {
  //
  // // global variable area begins

  const [RMSelect, setRMSelect] = useState(0);
  const MineRefs = props.APMineRefs;
  const setMineRefs = props.setAPMineRefs;
  const MRsphereRef = useRef(props.group);

  useEffect(() => {
    // add or remove refs
    setMineRefs((MineRefs) =>
      Array(number_of_mines)
        .fill()
        .map((_, id) => MineRefs[id] || createRef())
    );
  },
  // [number_of_mines]
  );

  const x_spacer = 3;

  const y_pos = 14;

  const path_bender = 0.9;

  useFrame(({ clock }) => {
    if (
      props.state &&
      props.clickCounter > 0 &&
      MineRefs[RMSelect] &&
      MineRefs[RMSelect].current.position.z < 4
    ) {
      // // blue mines movement data

      if (RMSelect < number_of_mines / 3 && RMSelect >= 0) {
        MineRefs[RMSelect].current.rotation.y += 0.1;

        MineRefs[RMSelect].current.position.x *= 0.95;

        MineRefs[RMSelect].current.position.z += z_pos_incrementer;

        props.setstateMinePosition({
          XMPos: MineRefs[RMSelect].current.position.x,
          YMPos: MineRefs[RMSelect].current.position.y,
          ZMPos: MineRefs[RMSelect].current.position.z,
          MineNumber: RMSelect,
        });
      }
      // // red mines movement data
      else if (
        RMSelect >= number_of_mines / 3 &&
        RMSelect < (number_of_mines * 2) / 3
      ) {
        MineRefs[RMSelect].current.rotation.y += 0.1;
        MineRefs[RMSelect].current.position.x *= path_bender;
        MineRefs[RMSelect].current.position.y *= path_bender;
        MineRefs[RMSelect].current.position.z += z_pos_incrementer;
        props.setstateMinePosition({
          XMPos: MineRefs[RMSelect].current.position.x,
          YMPos: MineRefs[RMSelect].current.position.y,
          ZMPos: MineRefs[RMSelect].current.position.z,
          MineNumber: RMSelect,
        });
      }

      // // green mines movement data
      else if (
        RMSelect >= (number_of_mines * 2) / 3 &&
        RMSelect < number_of_mines
      ) {
        MineRefs[RMSelect].current.rotation.y += 0.1;
        MineRefs[RMSelect].current.position.x *= path_bender;
        MineRefs[RMSelect].current.position.y *= path_bender;
        MineRefs[RMSelect].current.position.z += z_pos_incrementer;
        props.setstateMinePosition({
          XMPos: MineRefs[RMSelect].current.position.x,
          YMPos: MineRefs[RMSelect].current.position.y,
          ZMPos: MineRefs[RMSelect].current.position.z,
          MineNumber: RMSelect,
        });
      }
    } else if (
      MineRefs[RMSelect] &&
      MineRefs[RMSelect].current.position.z >= 4
    ) {
      MineRefs[RMSelect].current.visible = false;

      if (MineRefs.length == 0) {
        console.log("Level over");
        return;
      } else if (
        MineRefs.length > 0 &&
        clock.getElapsedTime().toFixed(0) % 3 == 0
      ) {
        props.setExplosion(false);

        setRMSelect((Math.random() * number_of_mines).toFixed(0));
      }
    } else {
      props.setExplosion(false);

      setRMSelect((Math.random() * number_of_mines).toFixed(0));
    }
  });

  return MineRefs.map((_, id) =>{
    const y = 0;
    const z = -(
      number_of_mines
      // * mine_push_back_multiplier
    );
    if (id < 15) {
      return (
        <group
          key={id}
          position={[(id - 7.5) * x_spacer, y, z]}
          rotation={[Math.PI * 0, 0, 0]}
          ref={MineRefs[id]}
          name={"MRBlueTopGroup"}
        >
          <group ref={MRsphereRef}>
            <TmBs scale={5} />
          </group>
        </group>
      );
    } else if (id < 30 && id >= 15) {
      return (
        <group
          key={id}
          position={[(id - 22.5) * x_spacer, y_pos, z]}
          rotation={[Math.PI * 0, 0, 0]}
          ref={MineRefs[id]}
        >
          <group ref={MRsphereRef}>
            <TmRs scale={5} />
          </group>
        </group>
      );
    } else if (id < 45 && id >= 30) {
      return (
        <group
          key={id}
          position={[(id - 37.5) * x_spacer, -y_pos, z]}
          rotation={[Math.PI * 0, 0, 0]}
          ref={MineRefs[id]}
        >
          <group ref={MRsphereRef}>
            <TmGs scale={5} />
          </group>
        </group>
      );
    }
  });
}

export {
  number_of_mines,
  mine_push_back_multiplier,
  z_pos_incrementer,
  //MineRotator
};
