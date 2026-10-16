"use client";

import { useEffect, useRef } from "react";
import { buildDiamond } from "@/lib/diamond-geometry";
import { heroState } from "@/lib/hero-state";
import { onIgnite } from "@/lib/ignite";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * Hero centerpiece: a dark, faceted brilliant-cut stone rendered with raw WebGL (no 3D library).
 * ~80 triangles, two blended passes (inner facets, then outer facets), procedural "studio" reflections
 * in the brand golds and hairline facet edges. It starts unlit and ignites with the headline.
 * Renders only while on screen and the tab is visible. Reduced motion → one static, lit frame.
 */

const VERT = `
attribute vec3 aPos;
attribute vec3 aNor;
attribute vec3 aBar;
uniform mat4 uProj;
uniform mat4 uView;
uniform mat4 uModel;
uniform mat3 uNorm;
varying vec3 vN;
varying vec3 vW;
varying vec3 vB;
void main() {
  vec4 w = uModel * vec4(aPos, 1.0);
  vW = w.xyz;
  vN = uNorm * aNor;
  vB = aBar;
  gl_Position = uProj * uView * w;
}`;

const frag = (
  deriv: boolean,
) => `${deriv ? "#extension GL_OES_standard_derivatives : enable\n" : ""}
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
varying vec3 vN;
varying vec3 vW;
varying vec3 vB;
uniform vec3 uCam;
uniform float uIgnite;
uniform float uEnv;
uniform float uPass;

const vec3 GOLD = vec3(0.784, 0.643, 0.365);
const vec3 GOLD_HI = vec3(0.914, 0.804, 0.541);
const vec3 CREAM = vec3(0.957, 0.937, 0.902);

const vec3 KEY = vec3(-0.48, 0.58, 0.66);

// Procedural studio (a light tent): dark warm room, overhead softbox, a ring of six vertical
// gold strips that slowly orbit the stone, and a cream key panel front-left.
vec3 env(vec3 r) {
  float y = r.y;
  vec3 c = mix(vec3(0.010, 0.010, 0.012), vec3(0.060, 0.050, 0.034), smoothstep(-0.2, 1.0, y));
  c += GOLD_HI * smoothstep(0.55, 0.97, y) * 0.55;
  float a = atan(r.z, r.x);
  float ring = smoothstep(0.82, 0.985, cos(6.0 * (a - uEnv)));
  c += GOLD * ring * smoothstep(-0.6, 0.35, y) * 1.15;
  c += CREAM * pow(max(dot(r, normalize(KEY)), 0.0), 20.0) * 2.0;
  c += vec3(0.22, 0.16, 0.07) * (1.0 - smoothstep(-0.95, -0.2, y)) * 0.5;
  return c;
}

void main() {
  bool inner = uPass < 0.5;
  vec3 N = normalize(vN);
  if (inner) N = -N;
  vec3 V = normalize(uCam - vW);
  float ndv = clamp(dot(N, V), 0.0, 1.0);
  float fres = pow(1.0 - ndv, 3.0);
  vec3 R = reflect(-V, N);
  // A hint of dispersion: each channel samples a slightly shifted reflection.
  vec3 refl = vec3(env(R + vec3(0.006, 0.0, 0.0)).r, env(R).g, env(R - vec3(0.006, 0.0, 0.0)).b);
  // Soft per-facet shading so the cut reads even between highlights.
  float diffuse = 0.35 + 0.65 * max(dot(N, normalize(KEY)), 0.0);
  vec3 body = vec3(0.036, 0.035, 0.042) + GOLD * 0.06 * diffuse * uIgnite;
  vec3 col = body + refl * (0.45 + 0.55 * fres) * uIgnite * (inner ? 0.5 : 1.0);

  ${deriv ? "vec3 w = fwidth(vB) * 1.3;" : "vec3 w = vec3(0.025);"}
  vec3 e3 = smoothstep(vec3(0.0), w, vB);
  float edge = 1.0 - min(min(e3.x, e3.y), e3.z);
  col += GOLD * edge * mix(0.18, 0.72, uIgnite) * (inner ? 0.3 : 1.0);

  float alpha = clamp((inner ? 0.4 : 0.84) + edge * 0.16, 0.0, 1.0);
  gl_FragColor = vec4(col * alpha, alpha);
}`;

// --- tiny matrix helpers (column-major, as WebGL expects) ---
type M3 = number[];
const mul3 = (a: M3, b: M3): M3 => {
  const o = new Array(9).fill(0);
  for (let r = 0; r < 3; r++)
    for (let c = 0; c < 3; c++)
      for (let k = 0; k < 3; k++) o[r * 3 + c] += a[r * 3 + k] * b[k * 3 + c];
  return o;
};
const rx = (a: number): M3 => [1, 0, 0, 0, Math.cos(a), -Math.sin(a), 0, Math.sin(a), Math.cos(a)];
const ry = (a: number): M3 => [Math.cos(a), 0, Math.sin(a), 0, 1, 0, -Math.sin(a), 0, Math.cos(a)];
const rz = (a: number): M3 => [Math.cos(a), -Math.sin(a), 0, Math.sin(a), Math.cos(a), 0, 0, 0, 1];

function perspective(fovy: number, aspect: number, near: number, far: number) {
  const f = 1 / Math.tan(fovy / 2);
  const nf = 1 / (near - far);
  return new Float32Array([
    f / aspect,
    0,
    0,
    0,
    0,
    f,
    0,
    0,
    0,
    0,
    (far + near) * nf,
    -1,
    0,
    0,
    2 * far * near * nf,
    0,
  ]);
}

const CAM_Z = 4.6;

/** Mirrors the CSS flicker keyframes so the stone ignites in step with the headline. */
function flicker(t: number) {
  if (t >= 0.6) return 1;
  const p = t / 0.6;
  const keys: [number, number][] = [
    [0, 1],
    [0.12, 0.15],
    [0.24, 1],
    [0.38, 0.3],
    [0.52, 1],
    [1, 1],
  ];
  for (let i = 1; i < keys.length; i++) {
    if (p <= keys[i][0]) {
      const [x0, y0] = keys[i - 1];
      const [x1, y1] = keys[i];
      return y0 + ((y1 - y0) * (p - x0)) / (x1 - x0);
    }
  }
  return 1;
}

export function DiamondGL({ onReady }: { onReady?: (ok: boolean) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: true,
      premultipliedAlpha: true,
      powerPreference: "low-power",
      depth: false,
      stencil: false,
    });
    if (!gl) {
      onReady?.(false);
      return;
    }

    const deriv = !!gl.getExtension("OES_standard_derivatives");

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.warn("[DiamondGL]", gl.getShaderInfoLog(s));
        return null;
      }
      return s;
    };
    const vs = compile(gl.VERTEX_SHADER, VERT);
    const fs = compile(gl.FRAGMENT_SHADER, frag(deriv));
    if (!vs || !fs) {
      onReady?.(false);
      return;
    }
    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      onReady?.(false);
      return;
    }
    gl.useProgram(prog);

    const { data, count } = buildDiamond(8);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
    const stride = 9 * 4;
    (["aPos", "aNor", "aBar"] as const).forEach((name, i) => {
      const loc = gl.getAttribLocation(prog, name);
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, 3, gl.FLOAT, false, stride, i * 12);
    });

    const u = (n: string) => gl.getUniformLocation(prog, n);
    const uProj = u("uProj");
    const uView = u("uView");
    const uModel = u("uModel");
    const uNorm = u("uNorm");
    const uCam = u("uCam");
    const uIgnite = u("uIgnite");
    const uEnv = u("uEnv");
    const uPass = u("uPass");

    gl.uniformMatrix4fv(
      uView,
      false,
      new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, -CAM_Z, 1]),
    );
    gl.uniform3f(uCam, 0, 0, CAM_Z);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.enable(gl.CULL_FACE);
    gl.clearColor(0, 0, 0, 0);

    const reduce = prefersReducedMotion();
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const maxDpr = window.innerWidth < 768 ? 1.5 : 1.75;

    let width = 0;
    let height = 0;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
      const w = Math.max(1, Math.round(canvas.clientWidth * dpr));
      const h = Math.max(1, Math.round(canvas.clientHeight * dpr));
      if (w === width && h === height) return;
      width = canvas.width = w;
      height = canvas.height = h;
      gl.viewport(0, 0, w, h);
      gl.uniformMatrix4fv(uProj, false, perspective((30 * Math.PI) / 180, w / h, 0.1, 50));
    };
    resize();

    // --- state ---
    let ignitedAt = reduce ? -1e9 : Infinity;
    let pointerX = 0;
    let pointerY = 0;
    let px = 0;
    let py = 0;
    let spin = 0.35;
    let last = performance.now();
    let raf = 0;
    let visible = true;
    let pageVisible = !document.hidden;

    const draw = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const t = now / 1000;

      px += (pointerX - px) * 0.06;
      py += (pointerY - py) * 0.06;
      const scroll = heroState.scroll;
      if (!reduce) spin += dt * (0.16 + scroll * 0.9);

      const sinceIgnite = (now - ignitedAt) / 1000;
      let ign = 0;
      if (sinceIgnite > 0) {
        const ramp = 1 - Math.pow(1 - Math.min(1, sinceIgnite / 1.6), 3);
        ign = ramp * flicker(sinceIgnite);
      }

      const R = mul3(rz(-0.1 + px * 0.08), mul3(rx(0.42 + py * 0.12), ry(spin + px * 0.35)));
      const s = 1;
      const model = new Float32Array([
        R[0] * s,
        R[3] * s,
        R[6] * s,
        0,
        R[1] * s,
        R[4] * s,
        R[7] * s,
        0,
        R[2] * s,
        R[5] * s,
        R[8] * s,
        0,
        0,
        0,
        0,
        1,
      ]);
      const normal = new Float32Array([R[0], R[3], R[6], R[1], R[4], R[7], R[2], R[5], R[8]]);

      gl.uniformMatrix4fv(uModel, false, model);
      gl.uniformMatrix3fv(uNorm, false, normal);
      gl.uniform1f(uIgnite, ign);
      gl.uniform1f(uEnv, (reduce ? 0.8 : t * 0.12) + px * 0.5);

      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.cullFace(gl.FRONT);
      gl.uniform1f(uPass, 0);
      gl.drawArrays(gl.TRIANGLES, 0, count);
      gl.cullFace(gl.BACK);
      gl.uniform1f(uPass, 1);
      gl.drawArrays(gl.TRIANGLES, 0, count);
    };

    const loop = (now: number) => {
      draw(now);
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (reduce || raf || !visible || !pageVisible) return;
      last = performance.now();
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    const offIgnite = onIgnite(() => {
      // Reduced motion stays fully lit from the first frame (ignitedAt is already in the past).
      if (reduce) draw(performance.now());
      else ignitedAt = performance.now() + 350;
    });

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    io.observe(canvas);

    const ro = new ResizeObserver(() => {
      resize();
      if (!raf) draw(performance.now());
    });
    ro.observe(canvas);

    const onVisibility = () => {
      pageVisible = !document.hidden;
      if (pageVisible) start();
      else stop();
    };
    document.addEventListener("visibilitychange", onVisibility);

    const onPointer = (e: PointerEvent) => {
      pointerX = (e.clientX / window.innerWidth) * 2 - 1;
      pointerY = (e.clientY / window.innerHeight) * 2 - 1;
    };
    if (finePointer && !reduce)
      window.addEventListener("pointermove", onPointer, { passive: true });

    const onLost = (e: Event) => {
      e.preventDefault();
      stop();
    };
    canvas.addEventListener("webglcontextlost", onLost);

    onReady?.(true);
    draw(performance.now());
    start();

    return () => {
      stop();
      offIgnite();
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onPointer);
      canvas.removeEventListener("webglcontextlost", onLost);
      gl.deleteBuffer(buf);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, [onReady]);

  return <canvas ref={canvasRef} aria-hidden="true" />;
}
