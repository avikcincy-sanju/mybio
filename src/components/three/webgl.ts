export type Vec3 = [number, number, number];
export type Mat4 = Float32Array;

export const hexToRgb = (hex: string): Vec3 => {
  const normalized = hex.replace('#', '');
  const value = Number.parseInt(normalized.length === 3
    ? normalized.split('').map((char) => `${char}${char}`).join('')
    : normalized, 16);
  return [
    ((value >> 16) & 255) / 255,
    ((value >> 8) & 255) / 255,
    (value & 255) / 255,
  ];
};

export const identity = (): Mat4 => new Float32Array([
  1, 0, 0, 0,
  0, 1, 0, 0,
  0, 0, 1, 0,
  0, 0, 0, 1,
]);

export const multiply = (a: Mat4, b: Mat4): Mat4 => {
  const out = new Float32Array(16);
  for (let column = 0; column < 4; column += 1) {
    for (let row = 0; row < 4; row += 1) {
      let value = 0;
      for (let index = 0; index < 4; index += 1) {
        value += a[index * 4 + row] * b[column * 4 + index];
      }
      out[column * 4 + row] = value;
    }
  }
  return out;
};

export const perspective = (fieldOfViewRadians: number, aspect: number, near: number, far: number): Mat4 => {
  const f = 1 / Math.tan(fieldOfViewRadians / 2);
  const rangeInverse = 1 / (near - far);
  return new Float32Array([
    f / Math.max(aspect, 0.0001), 0, 0, 0,
    0, f, 0, 0,
    0, 0, (near + far) * rangeInverse, -1,
    0, 0, near * far * rangeInverse * 2, 0,
  ]);
};

export const translation = (x: number, y: number, z: number): Mat4 => new Float32Array([
  1, 0, 0, 0,
  0, 1, 0, 0,
  0, 0, 1, 0,
  x, y, z, 1,
]);

export const rotationX = (radians: number): Mat4 => {
  const cosine = Math.cos(radians);
  const sine = Math.sin(radians);
  return new Float32Array([
    1, 0, 0, 0,
    0, cosine, sine, 0,
    0, -sine, cosine, 0,
    0, 0, 0, 1,
  ]);
};

export const rotationY = (radians: number): Mat4 => {
  const cosine = Math.cos(radians);
  const sine = Math.sin(radians);
  return new Float32Array([
    cosine, 0, -sine, 0,
    0, 1, 0, 0,
    sine, 0, cosine, 0,
    0, 0, 0, 1,
  ]);
};

export const rotationZ = (radians: number): Mat4 => {
  const cosine = Math.cos(radians);
  const sine = Math.sin(radians);
  return new Float32Array([
    cosine, sine, 0, 0,
    -sine, cosine, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1,
  ]);
};

export const scaling = (x: number, y: number, z: number): Mat4 => new Float32Array([
  x, 0, 0, 0,
  0, y, 0, 0,
  0, 0, z, 0,
  0, 0, 0, 1,
]);

export const compose = (...matrices: Mat4[]): Mat4 => matrices.reduce((accumulator, matrix) => multiply(accumulator, matrix), identity());

export const transformPoint = (matrix: Mat4, point: Vec3): Vec3 => {
  const [x, y, z] = point;
  return [
    matrix[0] * x + matrix[4] * y + matrix[8] * z + matrix[12],
    matrix[1] * x + matrix[5] * y + matrix[9] * z + matrix[13],
    matrix[2] * x + matrix[6] * y + matrix[10] * z + matrix[14],
  ];
};

const vertexShaderSource = `
attribute vec3 a_position;
attribute vec3 a_color;
uniform mat4 u_matrix;
uniform float u_point_size;
varying vec3 v_color;
void main() {
  vec4 projected = u_matrix * vec4(a_position, 1.0);
  gl_Position = projected;
  float perspectiveScale = clamp(2.8 / max(projected.w, 0.5), 0.75, 2.4);
  gl_PointSize = u_point_size * perspectiveScale;
  v_color = a_color;
}
`;

const fragmentShaderSource = `
precision mediump float;
varying vec3 v_color;
uniform float u_opacity;
uniform float u_round_points;
void main() {
  if (u_round_points > 0.5) {
    vec2 centered = gl_PointCoord - vec2(0.5);
    float distanceFromCenter = length(centered);
    if (distanceFromCenter > 0.5) discard;
    float glow = smoothstep(0.5, 0.05, distanceFromCenter);
    gl_FragColor = vec4(v_color * (0.65 + glow * 0.7), u_opacity * glow);
  } else {
    gl_FragColor = vec4(v_color, u_opacity);
  }
}
`;

const compileShader = (gl: WebGLRenderingContext, type: number, source: string): WebGLShader => {
  const shader = gl.createShader(type);
  if (!shader) throw new Error('Unable to create WebGL shader.');
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const message = gl.getShaderInfoLog(shader) ?? 'Unknown shader compilation error.';
    gl.deleteShader(shader);
    throw new Error(message);
  }
  return shader;
};

const createProgram = (gl: WebGLRenderingContext): WebGLProgram => {
  const vertexShader = compileShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
  const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
  const program = gl.createProgram();
  if (!program) throw new Error('Unable to create WebGL program.');
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  gl.deleteShader(vertexShader);
  gl.deleteShader(fragmentShader);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const message = gl.getProgramInfoLog(program) ?? 'Unknown WebGL program link error.';
    gl.deleteProgram(program);
    throw new Error(message);
  }
  return program;
};

export interface DrawOptions {
  mode: number;
  positions: Float32Array;
  colors: Float32Array;
  matrix: Mat4;
  opacity?: number;
  pointSize?: number;
  roundPoints?: boolean;
  lineWidth?: number;
}

export class SimpleWebGLRenderer {
  readonly gl: WebGLRenderingContext;
  private readonly program: WebGLProgram;
  private readonly positionBuffer: WebGLBuffer;
  private readonly colorBuffer: WebGLBuffer;
  private readonly positionLocation: number;
  private readonly colorLocation: number;
  private readonly matrixLocation: WebGLUniformLocation;
  private readonly opacityLocation: WebGLUniformLocation;
  private readonly pointSizeLocation: WebGLUniformLocation;
  private readonly roundPointsLocation: WebGLUniformLocation;

  constructor(readonly canvas: HTMLCanvasElement) {
    const gl = canvas.getContext('webgl', {
      alpha: true,
      antialias: true,
      depth: true,
      premultipliedAlpha: false,
      powerPreference: 'high-performance',
    });
    if (!gl) throw new Error('WebGL is not available in this browser.');
    this.gl = gl;
    this.program = createProgram(gl);
    const positionBuffer = gl.createBuffer();
    const colorBuffer = gl.createBuffer();
    if (!positionBuffer || !colorBuffer) throw new Error('Unable to create WebGL buffers.');
    this.positionBuffer = positionBuffer;
    this.colorBuffer = colorBuffer;
    this.positionLocation = gl.getAttribLocation(this.program, 'a_position');
    this.colorLocation = gl.getAttribLocation(this.program, 'a_color');
    const matrixLocation = gl.getUniformLocation(this.program, 'u_matrix');
    const opacityLocation = gl.getUniformLocation(this.program, 'u_opacity');
    const pointSizeLocation = gl.getUniformLocation(this.program, 'u_point_size');
    const roundPointsLocation = gl.getUniformLocation(this.program, 'u_round_points');
    if (!matrixLocation || !opacityLocation || !pointSizeLocation || !roundPointsLocation) {
      throw new Error('Unable to locate WebGL uniforms.');
    }
    this.matrixLocation = matrixLocation;
    this.opacityLocation = opacityLocation;
    this.pointSizeLocation = pointSizeLocation;
    this.roundPointsLocation = roundPointsLocation;

    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
    gl.disable(gl.CULL_FACE);
    gl.clearColor(0, 0, 0, 0);
  }

  resize(maxDpr = 1.6): boolean {
    const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
    const width = Math.max(1, Math.floor(this.canvas.clientWidth * dpr));
    const height = Math.max(1, Math.floor(this.canvas.clientHeight * dpr));
    if (this.canvas.width === width && this.canvas.height === height) return false;
    this.canvas.width = width;
    this.canvas.height = height;
    this.gl.viewport(0, 0, width, height);
    return true;
  }

  clear(): void {
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
  }

  draw({
    mode,
    positions,
    colors,
    matrix,
    opacity = 1,
    pointSize = 4,
    roundPoints = false,
    lineWidth = 1,
  }: DrawOptions): void {
    const { gl } = this;
    const count = Math.floor(positions.length / 3);
    if (count === 0) return;

    gl.useProgram(this.program);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.DYNAMIC_DRAW);
    gl.enableVertexAttribArray(this.positionLocation);
    gl.vertexAttribPointer(this.positionLocation, 3, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, colors, gl.DYNAMIC_DRAW);
    gl.enableVertexAttribArray(this.colorLocation);
    gl.vertexAttribPointer(this.colorLocation, 3, gl.FLOAT, false, 0, 0);

    gl.uniformMatrix4fv(this.matrixLocation, false, matrix);
    gl.uniform1f(this.opacityLocation, opacity);
    gl.uniform1f(this.pointSizeLocation, pointSize);
    gl.uniform1f(this.roundPointsLocation, roundPoints ? 1 : 0);
    gl.lineWidth(lineWidth);
    gl.drawArrays(mode, 0, count);
  }

  dispose(): void {
    const { gl } = this;
    gl.deleteBuffer(this.positionBuffer);
    gl.deleteBuffer(this.colorBuffer);
    gl.deleteProgram(this.program);
  }
}

export const makeColorArray = (count: number, color: Vec3): Float32Array => {
  const output = new Float32Array(count * 3);
  for (let index = 0; index < count; index += 1) output.set(color, index * 3);
  return output;
};

export const flattenVec3 = (points: Vec3[]): Float32Array => new Float32Array(points.flat());

export const makeRing = (radiusX: number, radiusY: number, segments = 180, z = 0): Float32Array => {
  const points: number[] = [];
  for (let index = 0; index <= segments; index += 1) {
    const angle = (index / segments) * Math.PI * 2;
    points.push(Math.cos(angle) * radiusX, Math.sin(angle) * radiusY, z);
  }
  return new Float32Array(points);
};

export const makeBoxLines = (width: number, height: number, depth: number): Float32Array => {
  const x = width / 2;
  const y = height / 2;
  const z = depth / 2;
  const corners: Vec3[] = [
    [-x, -y, -z], [x, -y, -z], [x, y, -z], [-x, y, -z],
    [-x, -y, z], [x, -y, z], [x, y, z], [-x, y, z],
  ];
  const edges = [
    [0, 1], [1, 2], [2, 3], [3, 0],
    [4, 5], [5, 6], [6, 7], [7, 4],
    [0, 4], [1, 5], [2, 6], [3, 7],
  ];
  return flattenVec3(edges.flatMap(([start, end]) => [corners[start], corners[end]]));
};

export const seededRandom = (seed: number): (() => number) => {
  let state = seed >>> 0;
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 4294967296;
  };
};
