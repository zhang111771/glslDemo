#ifdef GL_ES
precision mediump float;
#endif
uniform vec2 u_resolution;
uniform float u_time;
vec3 palette(float t){
    vec3 a=vec3(0.5,0.5,0.5);
    vec3 b=vec3(0.5,0.5,0.5);
    vec3 c=vec3(1.0,1.0,1.0);
    vec3 d=vec3(0.263,0.416,0.557);
    return a+b*cos(6.28318*(c*t+d));
}
float dot2( in vec2 v ) { return dot(v,v); }
float sdHeart( in vec2 p ){
    p.x = abs(p.x);

    if( p.y+p.x>1.0 )
        return sqrt(dot2(p-vec2(0.25,0.75))) - sqrt(2.0)/4.0;
    return sqrt(min(dot2(p-vec2(0.00,1.00)),
                    dot2(p-0.5*max(p.x+p.y,0.0)))) * sign(p.x-p.y);
}
void main(){
    vec2 uv=(gl_FragCoord.xy*2.0-u_resolution.xy)/u_resolution.y;
    vec2 uv0=uv;

    vec3 finalColor=vec3(0.0);
    for(float i=0.0;i<3.0;i++){
   
    uv=fract(uv*2.0)-0.5;
   
    uv.y+=0.7;


    float d=sdHeart(uv)*exp(-length(uv0));
    // vec3 color=vec3(1.0,2.0,3.0);
    vec3 color=palette(length(uv0)+u_time*0.1);
    d=sin(d*8.0-u_time)/8.;
    d=abs(d);
    d=pow(0.01/d,1.2);

    // color*=d;
    finalColor+=color*d;
    }

    gl_FragColor=vec4(finalColor,1.0);
}