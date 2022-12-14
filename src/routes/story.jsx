// REACT
import React, { Suspense, useRef } from "react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ScrollRequest from "../components/ScrollRequest";
// STYLING
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
// 3D
import { Canvas } from "@react-three/fiber";

// import Akinain from "../gltf/Akinain";
// import Chamikara from "../gltf/Chamikara";
// import Dipak from "../gltf/Dipak";
// import Kemra from "../gltf/Kemra";
// import Sajana from "../gltf/Sajana";
// import Sunyena from "../gltf/Sunyena";
// import Ting from "../gltf/Ting";

import ThreeLoader from "../components/ThreeLoader";

const Akinain = React.lazy(() => import("../gltf/Akinain"));
const Chamikara = React.lazy(() => import("../gltf/Chamikara"));
const Dipak = React.lazy(() => import("../gltf/Dipak"));
const Kemra = React.lazy(() => import("../gltf/Kemra"));
const Sajana = React.lazy(() => import("../gltf/Sajana"));
const Sunyena = React.lazy(() => import("../gltf/Sunyena"));
const Ting = React.lazy(() => import("../gltf/Ting"));

// import { OrbitControls } from "@react-three/drei";

const Layout = styled(motion.div)`
  width: 100vw;
  max-width: 100%;
  height: 100vh;
  /* border: 3px solid red; */
  background-color: ${(props) => props.theme.colors.background};
`;

const OBJContainer = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
`;

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

function map_range(value, low1, high1, low2, high2) {
  return low2 + ((high2 - low2) * (value - low1)) / (high1 - low1);
}

export default function Story() {
  const containerRef = useRef(null);
  const [isScrolling, setScrolling] = useState(false);
  const [scrollPos, setScrollPos] = useState(0);
  const [scrollEnd, setEnd] = useState(false);
  const [name, setName] = useState("");

  let scrollingID = useRef(null);
  let location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      containerRef.current.style.height = "500vh";
    }, 1000);
  }, []);

  useEffect(() => {
    setName(location.pathname.split("/")[2]);
  }, [location.pathname]);

  // ??? ?????? ????????? ?????????
  useEffect(() => {
    setScrolling(true);
    setScrollPos(15);
  }, []);

  function logic() {
    setScrolling(false);
    window.clearTimeout(scrollingID);
    const ratio =
      window.scrollY / (containerRef.current.offsetHeight - window.innerHeight);
    const percentage = map_range(ratio, 0, 1, 15, 100);
    setScrollPos(percentage);
    // FIXED ?????? ??????????????? ????????? ???????????? - navigate ???????????? ??????
    scrollingID = setTimeout(function () {
      setScrolling(true);
      // console.log("scrolling stoped");
    }, 2000);
  }

  useEffect(() => {
    function watchScroll() {
      window.addEventListener("scroll", logic, false);
    }
    watchScroll();
    return () => {
      window.removeEventListener("scroll", logic, false);
    };
  });

  useEffect(() => {
    if (scrollPos >= 99) {
      setEnd(true);
      setScrolling(false);
      navigate(`/video/${name}`);
      // redirect(`/video/${location.pathname.split("/")[2]}`);
    } else {
      setEnd(false);
    }
  }, [scrollPos, name, navigate]);

  return (
    <>
      <Layout
        ref={containerRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <OBJContainer>
          {/* <HTMLContent /> */}
          <Container>
            <div
              style={{ position: "absolute", width: "100%", height: "100%" }}
            >
              <Canvas
                frameloop="demand"
                camera={{ position: [0, 0, 0], fov: 45, far: 5000, near: 1 }}
              >
                {/* <OrbitControls enableZoom={false} /> */}
                <ambientLight intensity={0.5} />
                {/* <directionalLight position={[-2, 12, scrollPos + 10]} intensity={0.25} /> */}
                {/* <directionalLight position={[20, 12, scrollPos + 10]} intensity={0.25} /> */}
                <spotLight
                  position={[-2, 50, scrollPos + 10]}
                  intensity={0.25}
                />
                <spotLight
                  position={[-20, 50, scrollPos + 20]}
                  intensity={0.25}
                />
                <Suspense fallback={<ThreeLoader />}>
                  {name === "sajana" ? (
                    <Sajana
                      rotation={[0, 0, 0.0]}
                      position={[0, 0, scrollPos]}
                    />
                  ) : name === "chamikara" ? (
                    <Chamikara
                      rotation={[0, 0, 0.0]}
                      position={[0, 0, scrollPos]}
                    />
                  ) : name === "kemra" ? (
                    <Kemra
                      rotation={[0, 0, 0.0]}
                      position={[0, 0, scrollPos]}
                    />
                  ) : name === "sunyena" ? (
                    <Sunyena
                      rotation={[0, 0, 0.0]}
                      position={[0, 0, scrollPos]}
                    />
                  ) : name === "akanain" ? (
                    <Akinain
                      rotation={[0, 0, 0.0]}
                      position={[0, 0, scrollPos]}
                    />
                  ) : name === "dpiak" ? (
                    <Dipak
                      rotation={[0, 0, 0.0]}
                      position={[0, 0, scrollPos]}
                    />
                  ) : name === "ting" ? (
                    <Ting rotation={[0, 0, 0.0]} position={[0, 0, scrollPos]} />
                  ) : null}
                </Suspense>
              </Canvas>
            </div>
            <AnimatePresence>
              {isScrolling && !scrollEnd ? <ScrollRequest /> : null}
            </AnimatePresence>
          </Container>
        </OBJContainer>
      </Layout>
    </>
  );
}
