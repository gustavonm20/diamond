/**
 * Procedural round-brilliant diamond: table, crown (star + upper-girdle facets), girdle band and pavilion.
 * Output is a non-indexed, interleaved buffer: position(3) normal(3) barycentric(3) per vertex.
 * Barycentric coords are offset by +1 on internal edges so the shader only outlines real facet edges.
 */

type V3 = [number, number, number];

const sub = (a: V3, b: V3): V3 => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const cross = (a: V3, b: V3): V3 => [
  a[1] * b[2] - a[2] * b[1],
  a[2] * b[0] - a[0] * b[2],
  a[0] * b[1] - a[1] * b[0],
];
const dot = (a: V3, b: V3) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const norm = (a: V3): V3 => {
  const l = Math.hypot(a[0], a[1], a[2]) || 1;
  return [a[0] / l, a[1] / l, a[2] / l];
};

export function buildDiamond(sides = 8) {
  const G = sides * 2;
  const OFF = 0.27; // recenters the stone vertically
  const yTable = 0.35 + OFF;
  const yGirdleTop = 0.03 + OFF;
  const yGirdleBottom = -0.03 + OFF;
  const yCulet = -0.89 + OFF;
  const rTable = 0.57;
  const center: V3 = [0, (yTable + yCulet) / 2, 0];

  const girdleAngle = (j: number) => (j / G) * Math.PI * 2;
  const ring = (r: number, y: number, count: number, angle: (i: number) => number): V3[] =>
    Array.from({ length: count }, (_, i) => [Math.cos(angle(i)) * r, y, Math.sin(angle(i)) * r]);

  // Table vertices sit at the odd girdle angles.
  const table = ring(rTable, yTable, sides, (i) => girdleAngle(2 * i + 1));
  const gTop = ring(1, yGirdleTop, G, girdleAngle);
  const gBot = ring(1, yGirdleBottom, G, girdleAngle);
  const tableCenter: V3 = [0, yTable, 0];
  const culet: V3 = [0, yCulet, 0];

  const data: number[] = [];

  /** `hide[k]` hides the edge opposite vertex k. */
  function tri(a: V3, b: V3, c: V3, hide: [boolean, boolean, boolean] = [false, false, false]) {
    let n = norm(cross(sub(b, a), sub(c, a)));
    const centroid: V3 = [
      (a[0] + b[0] + c[0]) / 3,
      (a[1] + b[1] + c[1]) / 3,
      (a[2] + b[2] + c[2]) / 3,
    ];
    let verts = [a, b, c];
    let mask = hide;
    if (dot(n, sub(centroid, center)) < 0) {
      // Flip winding so every face is counter-clockwise seen from outside.
      verts = [a, c, b];
      mask = [hide[0], hide[2], hide[1]];
      n = [-n[0], -n[1], -n[2]];
    }
    const off = mask.map((h) => (h ? 1 : 0));
    verts.forEach((v, k) => {
      const bary = [0, 0, 0];
      bary[k] = 1;
      data.push(
        v[0],
        v[1],
        v[2],
        n[0],
        n[1],
        n[2],
        bary[0] + off[0],
        bary[1] + off[1],
        bary[2] + off[2],
      );
    });
  }

  for (let i = 0; i < sides; i++) {
    const tA = table[i];
    const tB = table[(i + 1) % sides];
    // Table (fan, internal spokes hidden)
    tri(tableCenter, tA, tB, [false, true, true]);
    // Crown: star facet + two upper-girdle facets
    tri(tA, tB, gTop[(2 * i + 2) % G]);
    tri(tA, gTop[(2 * i) % G], gTop[(2 * i + 1) % G]);
    tri(tA, gTop[(2 * i + 1) % G], gTop[(2 * i + 2) % G]);
  }

  for (let j = 0; j < G; j++) {
    const a = gTop[j];
    const b = gTop[(j + 1) % G];
    const c = gBot[(j + 1) % G];
    const d = gBot[j];
    // Girdle band (quad diagonal hidden)
    tri(a, b, c, [false, true, false]);
    tri(a, c, d, [false, false, true]);
    // Pavilion
    tri(d, c, culet);
  }

  return { data: new Float32Array(data), count: data.length / 9 };
}
