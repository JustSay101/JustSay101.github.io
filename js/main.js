import * as THREE from "../libs/three.js-r132/build/three.module.js"
//const THREE = window.MINDAR.IMAGE.THREE;
const mindARThree = new window.MINDAR.IMAGE.MindARThree({
    container: document.body,
    imageTargetSrc: "../assets/targets/targets.mind"
});

//const { renderer, scene, camera } = mindARThree;

let renderer, scene, camera;

init()
StartUpdate()

async function init() 
{
    const container = document.createElement("div")
    document.body.appendChild(container)
    
    // Create a scene
    scene = new THREE.Scene()
    scene.name = "ARBusinessCard"

    camera = new THREE.PerspectiveCamera
    (
        60,
        window.innerWidth / window.innerHeight, 
        0.1,
        1000
    )

    renderer = new THREE.WebGLRenderer
    ({
        antialias: true,
        alpha: true
    })
    
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.xr.enabled = true
    container.appendChild(renderer.domElement)

    //scene.add(camera)
    console.log(camera);

    await mindARThree.start();
}

function StartUpdate() 
{
    renderer.setAnimationLoop(OnUpdate)
}

function OnUpdate() 
{
    //renderer.render(scene, camera)
}
