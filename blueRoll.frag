#ifdef GL_ES
precision mediump float;
#endif
uniform vec2 u_resolution;
uniform float u_time;
void main(){
    vec2 uv=gl_FragCoord.xy/u_resolution.xy*2.0-1.0;
    uv.x*=u_resolution.x/u_resolution.y;
    float d=length(uv);
    vec3 color=vec3(1.0,2.0,3.0);
    d=sin(d*8.0-u_time)/8.;
    d=abs(d);
    d=0.005/d;
color*=d;
    gl_FragColor=vec4(color,1.0);
}