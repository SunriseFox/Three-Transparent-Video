import * as THREE from 'three';
let OrbitControls = require('three-orbit-controls')(THREE);

class AlphaVideoMaterial extends THREE.ShaderMaterial{
  constructor() {
    super();

    this.video = document.getElementById('video');

    this.videoTexture = new THREE.VideoTexture(this.video);
    this.videoTexture.minFilter = THREE.LinearFilter;
    this.videoTexture.magFilter = THREE.LinearFilter;

    this.setValues({

      uniforms: {
        texture: {
          type: "t",
          value: this.videoTexture
        }
      },
      vertexShader:
      "varying mediump vec2 vUv;\n" +
      "void main(void)\n" +
      "{\n" +
      "vUv = uv;\n" +
      "mediump vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\n" +
      "gl_Position = projectionMatrix * mvPosition;\n" +
      "}",
      fragmentShader:
      "uniform mediump sampler2D texture;\n" +
      "varying mediump vec2 vUv;\n" +
      "void main(void)\n" +
      "{\n" +
      "  mediump vec3 tColor = texture2D( texture, vUv).rgb;\n" +
      "  mediump vec3 aColor = texture2D( texture, (vUv + vec2(0, -0.5))).rgb;\n" +
      "  gl_FragColor = vec4(tColor, aColor[1]);\n" +
      "}",
      transparent: true
    });
  }

  update() {
    if (video.readyState === video.HAVE_ENOUGH_DATA && this.videoTexture) {
        this.videoTexture.needsUpdate = true;
    }
  }
}

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, window.innerWidth /
    window.innerHeight, 0.1, 1000);

camera.position.set(0, 0, 10);

let renderer = new THREE.WebGLRenderer({ alpha: true });

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

let alphaVideoMaterial = new AlphaVideoMaterial();
let geometry = new THREE.PlaneGeometry(10,10);

let uvs = geometry.faceVertexUvs[0];

uvs[0][1].y = 0.5;
uvs[1][0].y = 0.5;
uvs[1][1].y = 0.5;

let alphaVideoMesh = new THREE.Mesh( geometry, alphaVideoMaterial );
scene.add( alphaVideoMesh );

let orbit = new OrbitControls( camera, renderer.domElement );

function animate() {
  requestAnimationFrame( animate );
  renderer.render( scene, camera );
}

animate();
