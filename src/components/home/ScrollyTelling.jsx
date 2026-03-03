// components/home/ScrollyTelling.jsx
'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState, useCallback } from 'react';

export default function ScrollyTelling() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [images, setImages] = useState([]);
  const [isImagesLoaded, setIsImagesLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Map scroll progress → frame index (0 → 119)
  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, 119]);

  // Preload all frames
  useEffect(() => {
    const loadImages = async () => {
      const promises = [];
      const loadedImages = [];

      for (let i = 1; i <= 120; i++) {
        const promise = new Promise((resolve) => {
          const img = new Image();
          img.src = `/frames/frame-${String(i).padStart(3, '0')}.png`;
          img.onload = () => {
            loadedImages[i - 1] = img;
            resolve();
          };
          img.onerror = () => {
            console.warn(`Failed to load frame ${i}`);
            resolve(); // continue even if one fails
          };
        });
        promises.push(promise);
      }

      await Promise.all(promises);
      setImages(loadedImages);
      setIsImagesLoaded(true);
    };

    loadImages();
  }, []);

  // Canvas drawing logic
  const drawFrame = useCallback(
    (index) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const frame = Math.max(0, Math.min(119, Math.floor(index)));
      const img = images[frame];

      if (img) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Center and fit image while preserving aspect ratio
        const scale = Math.min(canvas.width / img.width, canvas.height / img.height);
        const scaledWidth = img.width * scale;
        const scaledHeight = img.height * scale;
        const x = (canvas.width - scaledWidth) / 2;
        const y = (canvas.height - scaledHeight) / 2;

        ctx.drawImage(img, x, y, scaledWidth, scaledHeight);
      }
    },
    [images]
  );

  useEffect(() => {
    if (!isImagesLoaded) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set initial size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawFrame(frameIndex.get());
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const unsubscribe = frameIndex.on('change', drawFrame);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      unsubscribe();
    };
  }, [isImagesLoaded, images, frameIndex, drawFrame]);

  // === Scroll-based text animations ===
  const section1Opacity = useTransform(scrollYProgress, [0, 0.12, 0.18, 0.22], [0, 1, 1, 0]);
  const section2Opacity  = useTransform(scrollYProgress, [0.18, 0.23, 0.42, 0.47], [0, 1, 1, 0]);
  const section3Opacity  = useTransform(scrollYProgress, [0.42, 0.47, 0.68, 0.73], [0, 1, 1, 0]);
  const section4Opacity  = useTransform(scrollYProgress, [0.68, 0.73, 0.88, 0.93], [0, 1, 1, 0]);
  const section5Opacity  = useTransform(scrollYProgress, [0.88, 0.92, 1], [0, 1, 1]);

  const section1Y = useTransform(scrollYProgress, [0, 0.18], [60, 0]);
  const section2X = useTransform(scrollYProgress, [0.18, 0.23], [-80, 0]);
  const section3X = useTransform(scrollYProgress, [0.42, 0.47], [80, 0]);
  const section4Y = useTransform(scrollYProgress, [0.68, 0.73], [60, 0]);
  const section5Y = useTransform(scrollYProgress, [0.88, 0.93], [80, 0]);

  return (
    <div ref={containerRef} className="relative h-[500vh] bg-[#050505]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full bg-[#050505]"
        />

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-6 md:px-12">
          {/* Hero – Section 1 */}
          <motion.div
            className="text-center max-w-4xl"
            style={{ opacity: section1Opacity, y: section1Y }}
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight bg-gradient-to-b from-white via-white to-[#88e0ff] bg-clip-text text-transparent">
              Sony WH-1000XM6
            </h1>
            <p className="mt-6 text-2xl sm:text-3xl md:text-4xl text-white/70 font-light">
              Silence, perfected.
            </p>
            <p className="mt-4 text-lg md:text-xl text-white/50 max-w-2xl mx-auto">
              Flagship wireless noise cancelling, re-engineered for a world that never stops.
            </p>
          </motion.div>

          {/* Engineering Reveal – Section 2 */}
          <motion.div
            className="absolute left-6 md:left-12 lg:left-24 top-1/4 max-w-lg"
            style={{ opacity: section2Opacity, x: section2X }}
          >
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-b from-white to-[#88e0ff] bg-clip-text text-transparent">
              Precision-engineered for silence.
            </h2>
            <p className="mt-5 text-lg text-white/65 leading-relaxed">
              Custom drivers, sealed acoustic chambers, and optimized airflow deliver studio-grade clarity.
            </p>
            <p className="mt-4 text-lg text-white/65 leading-relaxed">
              Every component is tuned for balance, power, and comfort—hour after hour.
            </p>
          </motion.div>

          {/* Noise Cancelling – Section 3 */}
          <motion.div
            className="absolute right-6 md:right-12 lg:right-24 top-1/4 max-w-lg text-right"
            style={{ opacity: section3Opacity, x: section3X }}
          >
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-b from-white to-[#88e0ff] bg-clip-text text-transparent">
              Adaptive noise cancelling, redefined.
            </h2>
            <ul className="mt-5 text-lg text-white/65 space-y-3 leading-relaxed">
              <li>Multi-microphone array listens in every direction</li>
              <li>Real-time noise analysis adapts to your environment</li>
              <li>Your music stays pure — planes, trains, crowds fade away</li>
            </ul>
          </motion.div>

          {/* Sound Quality – Section 4 */}
          <motion.div
            className="text-center max-w-3xl px-4"
            style={{ opacity: section4Opacity, y: section4Y }}
          >
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-b from-white to-[#88e0ff] bg-clip-text text-transparent">
              Immersive, lifelike sound.
            </h2>
            <p className="mt-6 text-lg md:text-xl text-white/65 leading-relaxed">
              High-performance drivers unlock detail, depth, and texture in every track.
            </p>
            <p className="mt-4 text-lg md:text-xl text-white/65 leading-relaxed">
              AI-enhanced upscaling restores clarity to compressed audio — every note feels alive.
            </p>
          </motion.div>

          {/* Reassembly + CTA – Section 5 */}
          <motion.div
            className="text-center max-w-4xl px-6"
            style={{ opacity: section5Opacity, y: section5Y }}
          >
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-b from-white to-[#88e0ff] bg-clip-text text-transparent">
              Hear everything. Feel nothing else.
            </h2>
            <p className="mt-6 text-2xl md:text-3xl text-white/70">
              WH-1000XM6. Designed for focus, crafted for comfort.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6">
              <button className="px-8 py-4 text-lg font-semibold bg-gradient-to-r from-[#0050FF] to-[#00A0FF] hover:from-[#0060FF] hover:to-[#00C0FF] text-white rounded-full shadow-xl shadow-blue-900/30 transition-all duration-300 hover:shadow-blue-500/40 hover:scale-[1.03]">
                Experience WH-1000XM6
              </button>
              <a
                href="#"
                className="text-lg text-white/60 hover:text-white/90 transition-colors underline underline-offset-4 decoration-white/30 hover:decoration-white/60"
              >
                See full specifications →
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}