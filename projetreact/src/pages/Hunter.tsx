import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Haunter3D() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x222244);

    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.z = 7;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(400, 400);
    mountRef.current.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0x666666);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x9999ff, 2, 50);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    scene.fog = new THREE.Fog(0x222244, 3, 10);

    const haunterGroup = new THREE.Group();

    const bodyGeometry = new THREE.SphereGeometry(2, 32, 32);
    const bodyMaterial = new THREE.MeshStandardMaterial({
      color: 0x7d3cb8,
      emissive: 0x7d3cb8,
      emissiveIntensity: 0.8,
      metalness: 0.5,
      roughness: 0.3,
      transparent: true,
      opacity: 0.9,
    });

    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.scale.set(1.2, 1, 1);
    haunterGroup.add(body);

    const eyeGeometry = new THREE.SphereGeometry(0.5, 32, 32);
    const eyeMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });

    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEye.position.set(-0.7, 0.6, 1.5);
    haunterGroup.add(leftEye);

    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    rightEye.position.set(0.7, 0.6, 1.5);
    haunterGroup.add(rightEye);

    const pupilGeometry = new THREE.SphereGeometry(0.25, 32, 32);
    const pupilMaterial = new THREE.MeshPhongMaterial({ color: 0x000000 });

    const leftPupil = new THREE.Mesh(pupilGeometry, pupilMaterial);
    leftPupil.position.set(-0.7, 0.55, 1.7);
    haunterGroup.add(leftPupil);

    const rightPupil = new THREE.Mesh(pupilGeometry, pupilMaterial);
    rightPupil.position.set(0.7, 0.55, 1.7);
    haunterGroup.add(rightPupil);

    const mouthGeometry = new THREE.TorusGeometry(0.8, 0.2, 16, 32, Math.PI);
    const mouthMaterial = new THREE.MeshPhongMaterial({ color: 0xff9185 });
    const mouth = new THREE.Mesh(mouthGeometry, mouthMaterial);
    mouth.position.set(0, -0.3, 1.6);
    mouth.rotation.x = Math.PI;
    haunterGroup.add(mouth);

    const addSpike = (
      x: number,
      y: number,
      z: number,
      rotX: number,
      rotY: number,
      rotZ: number,
      scale: number
    ) => {
      const spikeGeometry = new THREE.ConeGeometry(0.4, 1, 32);
      const spikeMaterial = new THREE.MeshPhongMaterial({ color: 0x7d3cb8 });
      const spike = new THREE.Mesh(spikeGeometry, spikeMaterial);
      spike.position.set(x, y, z);
      spike.rotation.set(rotX, rotY, rotZ);
      spike.scale.set(scale, scale, scale);
      haunterGroup.add(spike);
    };

    addSpike(0, 2.5, 0, 0, 0, 0, 1.5);
    addSpike(-1.3, 1.8, 0, 0, 0, Math.PI / 4, 1.2);
    addSpike(1.3, 1.8, 0, 0, 0, -Math.PI / 4, 1.2);

    const createHand = (isLeft: boolean) => {
      const handGroup = new THREE.Group();
      const handX = isLeft ? -3.5 : 3.5;

      const armGeometry = new THREE.CylinderGeometry(0.2, 0.2, 1.2, 32);
      const armMaterial = new THREE.MeshPhongMaterial({ color: 0x7d3cb8 });
      const arm = new THREE.Mesh(armGeometry, armMaterial);
      arm.position.set(handX, -0.5, 0);
      arm.rotation.z = isLeft ? Math.PI / 5 : -Math.PI / 5;
      handGroup.add(arm);

      const handGeometry = new THREE.SphereGeometry(0.5, 32, 32);
      const hand = new THREE.Mesh(handGeometry, armMaterial);
      hand.position.set(handX, -1.5, 0);
      handGroup.add(hand);

      return handGroup;
    };

    const leftHand = createHand(true);
    const rightHand = createHand(false);

    haunterGroup.add(leftHand);
    haunterGroup.add(rightHand);

    scene.add(haunterGroup);

    const animate = () => {
      requestAnimationFrame(animate);

      haunterGroup.rotation.y += 0.01;
      haunterGroup.position.y = Math.sin(Date.now() * 0.001) * 0.2;

      leftHand.rotation.z = Math.sin(Date.now() * 0.002) * 0.1;
      rightHand.rotation.z = -Math.sin(Date.now() * 0.002) * 0.1;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div
        ref={mountRef}
        className="w-full max-w-md h-96 rounded-lg shadow-lg overflow-hidden"
      />
    </div>
  );
}
