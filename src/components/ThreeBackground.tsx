import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface ThreeBackgroundProps {
  currentSection?: string;
  scrollProgress: number;
}

interface PlanetData {
  name: string;
  radius: number;
  orbitRadius: number;
  orbitSpeed: number;
  rotationSpeed: number;
  color: number;
  inclination: number;
  initialAngle: number;
  mesh?: THREE.Mesh;
  group?: THREE.Group;
  atmosphere?: THREE.Mesh;
  rings?: THREE.Mesh;
  moonGroup?: THREE.Group;
}

// Procedural texture generators for ultra-clean, realistic planet graphics
function createSunTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const grad = ctx.createRadialGradient(256, 256, 0, 256, 256, 256);
    grad.addColorStop(0, '#ffffff');
    grad.addColorStop(0.25, '#fde047');
    grad.addColorStop(0.55, '#f97316');
    grad.addColorStop(0.85, '#c2410c');
    grad.addColorStop(1, '#7c2d12');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 512);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
    for (let i = 0; i < 200; i++) {
      const x = Math.random() * 512;
      const y = Math.random() * 512;
      const r = Math.random() * 10 + 2;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

function createEarthTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = '#0f4c81';
    ctx.fillRect(0, 0, 512, 256);

    ctx.fillStyle = '#1e6b37';
    for (let i = 0; i < 35; i++) {
      const cx = Math.random() * 512;
      const cy = Math.random() * 180 + 38;
      const rx = Math.random() * 45 + 15;
      const ry = Math.random() * 30 + 10;
      ctx.beginPath();
      ctx.ellipse(cx, cy, rx, ry, Math.random() * Math.PI, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
    for (let i = 0; i < 30; i++) {
      const cx = Math.random() * 512;
      const cy = Math.random() * 256;
      ctx.fillRect(cx, cy, Math.random() * 70 + 20, Math.random() * 6 + 2);
    }
  }
  return new THREE.CanvasTexture(canvas);
}

function createJupiterTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const stripes = [
      '#78350f', '#b45309', '#fef3c7', '#d97706', '#92400e', '#fef3c7', '#b45309', '#78350f', '#d97706', '#fef3c7'
    ];
    const sliceH = 256 / stripes.length;
    stripes.forEach((color, idx) => {
      ctx.fillStyle = color;
      ctx.fillRect(0, idx * sliceH, 512, sliceH + 1);
    });

    ctx.fillStyle = '#b91c1c';
    ctx.beginPath();
    ctx.ellipse(330, 160, 32, 18, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
    for (let i = 0; i < 25; i++) {
      ctx.fillRect(Math.random() * 512, Math.random() * 256, Math.random() * 50 + 20, Math.random() * 5 + 2);
    }
  }
  return new THREE.CanvasTexture(canvas);
}

function createSaturnRingTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const grad = ctx.createLinearGradient(0, 0, 512, 0);
    grad.addColorStop(0, 'rgba(0,0,0,0)');
    grad.addColorStop(0.12, 'rgba(217, 119, 6, 0.2)');
    grad.addColorStop(0.35, 'rgba(254, 243, 199, 0.8)');
    grad.addColorStop(0.55, 'rgba(180, 83, 9, 0.85)');
    grad.addColorStop(0.70, 'rgba(0,0,0,0.1)'); // Cassini Division gap
    grad.addColorStop(0.85, 'rgba(217, 119, 6, 0.6)');
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 64);
  }
  return new THREE.CanvasTexture(canvas);
}

function createMarsTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = '#991b1b';
    ctx.fillRect(0, 0, 512, 256);

    ctx.fillStyle = '#7f1d1d';
    for (let i = 0; i < 40; i++) {
      ctx.beginPath();
      ctx.arc(Math.random() * 512, Math.random() * 256, Math.random() * 18 + 4, 0, Math.PI * 2);
      ctx.fill();
    }
    // Ice caps
    ctx.fillStyle = '#fee2e2';
    ctx.fillRect(0, 0, 512, 18);
    ctx.fillRect(0, 238, 512, 18);
  }
  return new THREE.CanvasTexture(canvas);
}

export const ThreeBackground: React.FC<ThreeBackgroundProps> = ({ scrollProgress }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  const [activeBadge, setActiveBadge] = useState('SOLAR SYSTEM OVERVIEW');

  // Mouse & Scroll State
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const scrollProgressRef = useRef(scrollProgress);
  const lookAtRef = useRef(new THREE.Vector3(0, 0, 0));

  // Planets storage ref
  const planetsRef = useRef<PlanetData[]>([]);
  const sunMeshRef = useRef<THREE.Mesh | null>(null);
  const sunLightRef = useRef<THREE.PointLight | null>(null);

  useEffect(() => {
    scrollProgressRef.current = scrollProgress;
  }, [scrollProgress]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.fog = new THREE.FogExp2(0x09090b, 0.008);

    const camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    // Opening view: zoomed-out overview showing full solar system
    camera.position.set(0, 32, 48);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // 2. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    rendererRef.current = renderer;

    container.appendChild(renderer.domElement);

    // 3. Deep Space Starfield Background
    const starCount = window.innerWidth < 768 ? 2000 : 4500;
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    const starColorPalette = [
      new THREE.Color(0xffffff), // Soft White
      new THREE.Color(0xe2e8f0), // Pale Slate
      new THREE.Color(0x38bdf8), // Subtle Cyan
    ];

    for (let i = 0; i < starCount; i++) {
      const idx = i * 3;
      starPositions[idx] = (Math.random() - 0.5) * 300;
      starPositions[idx + 1] = (Math.random() - 0.5) * 300;
      starPositions[idx + 2] = (Math.random() - 0.5) * 300;

      const color = starColorPalette[Math.floor(Math.random() * starColorPalette.length)];
      starColors[idx] = color.r;
      starColors[idx + 1] = color.g;
      starColors[idx + 2] = color.b;
    }

    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

    const starMat = new THREE.PointsMaterial({
      size: 0.85,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      depthWrite: false,
    });

    const starField = new THREE.Points(starGeo, starMat);
    scene.add(starField);

    // 4. Central Sun & Solar Corona
    const sunGeo = new THREE.SphereGeometry(3.2, 64, 64);
    const sunTexture = createSunTexture();
    const sunMat = new THREE.MeshBasicMaterial({
      map: sunTexture,
    });
    const sunMesh = new THREE.Mesh(sunGeo, sunMat);
    scene.add(sunMesh);
    sunMeshRef.current = sunMesh;

    // Outer Glowing Solar Corona Shell
    const coronaGeo = new THREE.SphereGeometry(3.6, 32, 32);
    const coronaMat = new THREE.MeshBasicMaterial({
      color: 0xfde047,
      transparent: true,
      opacity: 0.22,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
    });
    const coronaMesh = new THREE.Mesh(coronaGeo, coronaMat);
    scene.add(coronaMesh);

    // Central Sun Light Source
    const sunLight = new THREE.PointLight(0xfff5c0, 3.5, 180, 0.4);
    sunLight.position.set(0, 0, 0);
    scene.add(sunLight);
    sunLightRef.current = sunLight;

    const ambientLight = new THREE.AmbientLight(0x1e293b, 0.6);
    scene.add(ambientLight);

    // 5. Planet Specifications (Real Solar System order)
    const planetSpecs: PlanetData[] = [
      {
        name: 'Mercury',
        radius: 0.45,
        orbitRadius: 6.5,
        orbitSpeed: 1.2,
        rotationSpeed: 0.02,
        color: 0x94a3b8,
        inclination: 0.1,
        initialAngle: 0.8,
      },
      {
        name: 'Venus',
        radius: 0.75,
        orbitRadius: 9.5,
        orbitSpeed: 0.8,
        rotationSpeed: 0.015,
        color: 0xf59e0b,
        inclination: -0.05,
        initialAngle: 2.2,
      },
      {
        name: 'Earth',
        radius: 0.9,
        orbitRadius: 13.5,
        orbitSpeed: 0.6,
        rotationSpeed: 0.03,
        color: 0x38bdf8,
        inclination: 0.02,
        initialAngle: 4.1,
      },
      {
        name: 'Mars',
        radius: 0.55,
        orbitRadius: 17.5,
        orbitSpeed: 0.45,
        rotationSpeed: 0.025,
        color: 0xef4444,
        inclination: 0.08,
        initialAngle: 1.2,
      },
      {
        name: 'Jupiter',
        radius: 2.2,
        orbitRadius: 26.0,
        orbitSpeed: 0.25,
        rotationSpeed: 0.05,
        color: 0xd97706,
        inclination: -0.04,
        initialAngle: 3.5,
      },
      {
        name: 'Saturn',
        radius: 1.8,
        orbitRadius: 35.0,
        orbitSpeed: 0.18,
        rotationSpeed: 0.04,
        color: 0xfef08a,
        inclination: 0.06,
        initialAngle: 5.6,
      },
      {
        name: 'Uranus',
        radius: 1.2,
        orbitRadius: 43.0,
        orbitSpeed: 0.12,
        rotationSpeed: 0.03,
        color: 0x22d3ee,
        inclination: -0.07,
        initialAngle: 0.5,
      },
      {
        name: 'Neptune',
        radius: 1.15,
        orbitRadius: 50.0,
        orbitSpeed: 0.08,
        rotationSpeed: 0.035,
        color: 0x3b82f6,
        inclination: 0.03,
        initialAngle: 2.8,
      },
    ];

    const saturnRingTex = createSaturnRingTexture();
    const earthTex = createEarthTexture();
    const jupiterTex = createJupiterTexture();
    const marsTex = createMarsTexture();

    // 6. Build Planets, Orbit Paths, and Moons
    planetSpecs.forEach((spec) => {
      // Orbit Line Ring
      const orbitCurve = new THREE.EllipseCurve(
        0, 0,
        spec.orbitRadius, spec.orbitRadius,
        0, 2 * Math.PI,
        false,
        0
      );
      const points = orbitCurve.getPoints(120);
      const orbitGeo = new THREE.BufferGeometry().setFromPoints(
        points.map(p => new THREE.Vector3(p.x, 0, p.y))
      );
      const orbitMat = new THREE.LineBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.12,
      });
      const orbitLine = new THREE.LineLoop(orbitGeo, orbitMat);
      orbitLine.rotation.x = spec.inclination;
      scene.add(orbitLine);

      // Planet Group Container
      const planetGroup = new THREE.Group();
      scene.add(planetGroup);
      spec.group = planetGroup;

      // Select Material based on Planet
      let planetMat: THREE.Material;
      if (spec.name === 'Earth') {
        planetMat = new THREE.MeshStandardMaterial({
          map: earthTex,
          roughness: 0.6,
          metalness: 0.1,
        });
      } else if (spec.name === 'Jupiter') {
        planetMat = new THREE.MeshStandardMaterial({
          map: jupiterTex,
          roughness: 0.5,
          metalness: 0.1,
        });
      } else if (spec.name === 'Mars') {
        planetMat = new THREE.MeshStandardMaterial({
          map: marsTex,
          roughness: 0.8,
          metalness: 0.1,
        });
      } else {
        planetMat = new THREE.MeshStandardMaterial({
          color: spec.color,
          roughness: 0.6,
          metalness: 0.2,
        });
      }

      const planetGeo = new THREE.SphereGeometry(spec.radius, 48, 48);
      const planetMesh = new THREE.Mesh(planetGeo, planetMat);
      planetGroup.add(planetMesh);
      spec.mesh = planetMesh;

      // Earth Atmosphere & Moon
      if (spec.name === 'Earth') {
        const atmoGeo = new THREE.SphereGeometry(spec.radius * 1.08, 32, 32);
        const atmoMat = new THREE.MeshBasicMaterial({
          color: 0x38bdf8,
          transparent: true,
          opacity: 0.2,
          blending: THREE.AdditiveBlending,
        });
        const atmosphere = new THREE.Mesh(atmoGeo, atmoMat);
        planetGroup.add(atmosphere);

        // Orbiting Moon
        const moonGroup = new THREE.Group();
        const moonGeo = new THREE.SphereGeometry(0.22, 16, 16);
        const moonMat = new THREE.MeshStandardMaterial({ color: 0xc0c6ce, roughness: 0.9 });
        const moonMesh = new THREE.Mesh(moonGeo, moonMat);
        moonMesh.position.set(1.8, 0, 0);
        moonGroup.add(moonMesh);
        planetGroup.add(moonGroup);
        spec.moonGroup = moonGroup;
      }

      // Saturn Rings
      if (spec.name === 'Saturn') {
        const ringGeo = new THREE.RingGeometry(spec.radius * 1.3, spec.radius * 2.5, 64);
        const ringMat = new THREE.MeshBasicMaterial({
          map: saturnRingTex,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.85,
        });
        const ringMesh = new THREE.Mesh(ringGeo, ringMat);
        ringMesh.rotation.x = Math.PI / 2.3;
        planetGroup.add(ringMesh);
        spec.rings = ringMesh;
      }

      // Uranus Ring
      if (spec.name === 'Uranus') {
        const ringGeo = new THREE.RingGeometry(spec.radius * 1.2, spec.radius * 1.6, 48);
        const ringMat = new THREE.MeshBasicMaterial({
          color: 0x67e8f9,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.3,
        });
        const ringMesh = new THREE.Mesh(ringGeo, ringMat);
        ringMesh.rotation.x = Math.PI / 1.8;
        planetGroup.add(ringMesh);
      }
    });

    planetsRef.current = planetSpecs;

    // 7. Asteroid Belt (Between Mars & Jupiter)
    const asteroidCount = 350;
    const asteroidGeo = new THREE.DodecahedronGeometry(0.12, 1);
    const asteroidMat = new THREE.MeshStandardMaterial({ color: 0x64748b, roughness: 0.9 });
    const asteroidGroup = new THREE.Group();

    for (let i = 0; i < asteroidCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 21.5 + (Math.random() - 0.5) * 3.5;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = (Math.random() - 0.5) * 1.5;

      const asteroid = new THREE.Mesh(asteroidGeo, asteroidMat);
      asteroid.position.set(x, y, z);
      asteroid.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      const scale = Math.random() * 1.5 + 0.5;
      asteroid.scale.set(scale, scale, scale);
      asteroidGroup.add(asteroid);
    }
    scene.add(asteroidGroup);

    // 8. Mouse Parallax Handler
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // 9. Resize Handler
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return;
      const width = window.innerWidth;
      const height = window.innerHeight;

      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();

      rendererRef.current.setSize(width, height);
      rendererRef.current.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };
    window.addEventListener('resize', handleResize);

    // 10. Animation & Scroll Flight Controller Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth Mouse Parallax Lerp
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.04;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.04;

      // Rotate Sun
      if (sunMeshRef.current) {
        sunMeshRef.current.rotation.y = elapsedTime * 0.02;
      }

      // Rotate Asteroid Belt
      asteroidGroup.rotation.y = elapsedTime * 0.015;

      // Update Planet Revolutions & Self-Rotations
      planetsRef.current.forEach((p) => {
        const currentAngle = p.initialAngle + elapsedTime * p.orbitSpeed * 0.15;
        const px = Math.cos(currentAngle) * p.orbitRadius;
        const pz = Math.sin(currentAngle) * p.orbitRadius;
        const py = Math.sin(currentAngle * 2) * (p.inclination * 4);

        if (p.group) {
          p.group.position.set(px, py, pz);
        }

        if (p.mesh) {
          p.mesh.rotation.y = elapsedTime * p.rotationSpeed * 10;
        }

        if (p.moonGroup) {
          p.moonGroup.rotation.y = elapsedTime * 0.8;
        }
      });

      // Camera 3D Flight Controller tied directly to Scroll Progress
      const progress = scrollProgressRef.current; // 0.0 to 1.0

      if (cameraRef.current) {
        const targetCamPos = new THREE.Vector3();
        const targetLookAt = new THREE.Vector3();
        let badgeText = 'SOLAR SYSTEM OVERVIEW';

        const earth = planetsRef.current.find(p => p.name === 'Earth');
        const mars = planetsRef.current.find(p => p.name === 'Mars');
        const jupiter = planetsRef.current.find(p => p.name === 'Jupiter');
        const saturn = planetsRef.current.find(p => p.name === 'Saturn');
        const neptune = planetsRef.current.find(p => p.name === 'Neptune');

        if (progress < 0.12) {
          // 1. Hero Section: Full Solar System Overview
          targetCamPos.set(
            mouseRef.current.x * 3,
            30 + mouseRef.current.y * 2,
            46
          );
          targetLookAt.set(0, 0, 0);
          badgeText = 'SOLAR SYSTEM OVERVIEW';
        } else if (progress < 0.32) {
          // 2. Tech Arsenal Section: Inner Planets (Mercury & Venus)
          const venus = planetsRef.current.find(p => p.name === 'Venus');
          const vPos = venus?.group?.position || new THREE.Vector3(9, 0, 0);
          targetCamPos.set(vPos.x + 3, vPos.y + 4, vPos.z + 8);
          targetLookAt.copy(vPos);
          badgeText = 'ORBITING VENUS & MERCURY';
        } else if (progress < 0.52) {
          // 3. Flagship Projects Section: Earth & Lunar Orbit
          const ePos = earth?.group?.position || new THREE.Vector3(13, 0, 0);
          targetCamPos.set(ePos.x + 1.2, ePos.y + 2.0, ePos.z + 4.5);
          targetLookAt.copy(ePos);
          badgeText = 'EARTH & LUNAR SYSTEM';
        } else if (progress < 0.70) {
          // 4. Knowledge Graph Section: Mars & Asteroid Belt
          const mPos = mars?.group?.position || new THREE.Vector3(17, 0, 0);
          targetCamPos.set(mPos.x + 2.0, mPos.y + 2.5, mPos.z + 5.5);
          targetLookAt.copy(mPos);
          badgeText = 'MARS & ASTEROID BELT';
        } else if (progress < 0.88) {
          // 5. Experience & Education Section: Saturn Ring System & Jupiter
          const sPos = saturn?.group?.position || new THREE.Vector3(35, 0, 0);
          targetCamPos.set(sPos.x + 5.0, sPos.y + 5.5, sPos.z + 13.0);
          targetLookAt.copy(sPos);
          badgeText = 'SATURN RING SYSTEM';
        } else {
          // 6. Contact Section: Deep Space / Outer Ice Giants
          const nPos = neptune?.group?.position || new THREE.Vector3(50, 0, 0);
          targetCamPos.set(nPos.x + 4.0, nPos.y + 6.0, nPos.z + 12.0);
          targetLookAt.copy(nPos);
          badgeText = 'NEPTUNE · DEEP SPACE OUTPOST';
        }

        // Apply Mouse Parallax offset
        targetCamPos.x += mouseRef.current.x * 1.5;
        targetCamPos.y += mouseRef.current.y * 1.5;

        // Smooth Lerp Camera Position & Focus Target
        cameraRef.current.position.lerp(targetCamPos, 0.04);
        lookAtRef.current.lerp(targetLookAt, 0.04);
        cameraRef.current.lookAt(lookAtRef.current);

        // Update HUD Badge react state if changed
        setActiveBadge(badgeText);
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <>
      {/* 3D Canvas Container */}
      <div
        ref={mountRef}
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-95"
        style={{ willChange: 'transform' }}
      />

      {/* Floating Solar System HUD Badge */}
      <div className="fixed bottom-6 left-6 z-30 pointer-events-none hidden md:flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono backdrop-blur-md shadow-xl transition-all duration-300">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
        </span>
        <span className="tracking-wider uppercase font-semibold">{activeBadge}</span>
      </div>
    </>
  );
};
