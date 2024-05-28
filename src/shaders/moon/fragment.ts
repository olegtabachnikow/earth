const fragmentMoonShader: string = `
uniform sampler2D uTexture;
uniform vec3 uSunDirection;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;

void main()
{
    vec3 viewDirection = normalize(vPosition - cameraPosition);
    vec3 normal = normalize(vNormal);
    vec3 color = vec3(0.0);
    
    // Sun orientation
    float sunOrientation = dot(uSunDirection, normal);

    // Texture
    float lightenedSide = smoothstep(- 0.25, 0.5, sunOrientation);
    vec3 textureColor = texture2D(uTexture, vUv).rgb;
    color = mix(vec3(0.0), textureColor, lightenedSide);

    // Final color
    gl_FragColor = vec4(color, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}
`;
export default fragmentMoonShader;
