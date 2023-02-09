import React, { useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Sparkles } from "@react-three/drei";

import "../index.css";

import { Protector10 } from "../components/Protector10";

import { Link, NavLink } from "react-router-dom";

import {
  number_of_mines,
  mine_push_back_multiplier,
  MineRotator,
} from "../components/MineRotator";

import { nanoid } from "nanoid";

import { gsap } from "gsap";

// external global variable area begins

export const GQGame = () => {
  // //
  // internal global variable area begins

  let sparklerSize = 5;

  const sparklesBlue = React.createRef();

  const [state, setstate] = useState(false);

  const [showExplanation, setExplanation] = useState(true);

  const [showScoreNavLinkPara, setshowScoreNavLinkPara] = useState(false);

  const [showExplosion, setExplosion] = useState(false);

  const APProtectorRef = React.createRef();

  const [userScore, setuserScore] = useState(0);

  const [clickCounter, setclickCounter] = useState(0);

  const [APMineRefs, setAPMineRefs] = useState([]);

  const [hovered, setHover] = useState(false);

  const [stateProtectorPosition, setstateProtectorPosition] = useState({
    PPosX: 0,
    PPosY: 0,
    PPosZ: 0,
    PRotX: 0,
  });

  const [stateMinePosition, setstateMinePosition] = useState({
    XMPos: 0,
    YMPos: 0,
    ZMPos: -(number_of_mines * mine_push_back_multiplier),
    MineNumber: null,
  });

  function ChangeState() {
    setExplanation(false);

    setclickCounter(clickCounter + 1);

    if (state) {
      setstate(false);
      setshowScoreNavLinkPara(true);
    } else {
      setstate(true);
      setshowScoreNavLinkPara(false);
    }
  }

  const Explanation = () => {
    return (
      <div id="Explanation" className="explanation_div">
        Click Protector space ship to start game.
        <p>Avoid mines by dragging the Protector.</p>
        <p>Score 100 points for avoiding a mine, lose 500 for collision.</p>
        <p>Five collisions = game over.</p>
        <ExpNavLinkPara />
      </div>
    );
  };
  const ExpNavLinkPara = () => {
    return (
      <p id="ExpNavLink_para">
        <NavLink to={"/"} key={nanoid(6)}>
          Go back home
        </NavLink>
      </p>
    );
  };

  const ScoreNavLinkPara = () => {
    if (showScoreNavLinkPara) {
      return (
        <p id="ScoreNavLink_para">
          <Link to={"/react5"}>Back to home</Link>
        </p>
      );
    }
  };
  const Score = () => {
    return (
      <div id="Score" className="score_div" key={nanoid(6)}>
        <p key={nanoid(6)}>Current score: </p>
        <p id="Score_para" key={nanoid(6)}>
          {userScore}
        </p>
        <ScoreNavLinkPara />
      </div>
    );
  };

  const CollisionDetect = () => {
    useFrame(() => {
      sparklerSize += 10.1;
      if (state) {
        if (
          stateMinePosition.ZMPos.toFixed(0) == -3 &&
          Math.abs(
            stateMinePosition.XMPos.toFixed(1) -
              stateProtectorPosition.PPosX.toFixed(1)
          ) <= 0.5 &&
          Math.abs(
            stateMinePosition.YMPos.toFixed(1) -
              stateProtectorPosition.PPosY.toFixed(1)
          ) <= 0.5
        ) {
          sparklerSize += 10.1;
          // // rock the Protector

          gsap.from(APProtectorRef.current.rotation, {
            duration: 1.3,
            x: -Math.PI / 12,
            ease: "bounce.out",
          });

          gsap.fromTo(
            sparklesBlue.current.scale,
            { x: 0, y: 0 },
            { x: 5, y: 5, duration: 1 }
          );

          // // set score
          setuserScore(userScore - 500);
          if (hovered) {
            setHover(false);
          } else {
            setHover(true);
          }

          // // sphere explosion
          setExplosion(true);
          APMineRefs[stateMinePosition.MineNumber].current.visible = false;
        }

        if (
          stateMinePosition.ZMPos.toFixed(0) == 3 &&
          APMineRefs[stateMinePosition.MineNumber].current.visible == true
        ) {
          setuserScore(userScore + 100);
          APMineRefs[stateMinePosition.MineNumber].current.visible = false;
        }
      } else if (!state && stateMinePosition.ZMPos.toFixed(0) > -45) {
        APMineRefs[stateMinePosition.MineNumber].current.visible = false;
      }
    });
  };

  const Sparkler = () => {
    if (showExplosion && stateMinePosition.MineNumber < 15) {
      return (
        <Sparkles
          size={25}
          color={"lightblue"}
          position={[stateMinePosition.XMPos, 0, -1]}
          scale={[1, 1, 1]}
        />
      );
    } else if (
      showExplosion &&
      stateMinePosition.MineNumber >= 15 &&
      stateMinePosition.MineNumber < 30
    ) {
      return (
        <Sparkles
          size={25}
          color={"red"}
          position={[stateMinePosition.XMPos, 0, -1]}
          scale={[1, 1, 1]}
        />
      );
    } else if (showExplosion && stateMinePosition.MineNumber >= 30) {
      return (
        <Sparkles
          size={25}
          color={"lightgreen"}
          position={[stateMinePosition.XMPos, 0, -1]}
          scale={[1, 1, 1]}
        />
      );
    }
  };

  return (
    <div id="Container" className="Container">
      {showExplanation ? <Explanation /> : null}
      {showExplanation ? null : <Score />}

      <Canvas id="Canvas">
        <color attach="background" args={["black"]} />
        <Suspense fallback={null}>
          {/* <Box position={[-5.2, 0, 0]} /> */}
          <spotLight
            position={[10, 0, 10]}
            angle={0.9}
            penumbra={2}
            intensity={1}
          />
          <spotLight
            position={[-10, 0, 10]}
            angle={0.9}
            penumbra={2}
            intensity={1}
          />
          <group ref={sparklesBlue}>
            <Sparkler sparklerSize={sparklerSize} />
          </group>
          <CollisionDetect state={state} />
          <group ref={APProtectorRef}>
            <Protector10
              state={state}
              setstateProtectorPosition={setstateProtectorPosition}
              onPointerUp={ChangeState}
              //setExplosion={setExplosion}
            />
          </group>

          <MineRotator
            state={state}
            setstateMinePosition={setstateMinePosition}
            stateMinePosition={stateMinePosition}
            APMineRefs={APMineRefs}
            setAPMineRefs={setAPMineRefs}
            clickCounter={clickCounter}
            setExplosion={setExplosion}
          />

          <Stars
            radius={100}
            depth={50}
            count={1500}
            factor={4}
            saturation={0}
            fade
            speed={1}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};
