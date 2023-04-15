import * as THREE from "../libs/three.js-r132/build/three.module.js"
//const THREE = window.MINDAR.IMAGE.THREE;
const mindARThree = new window.MINDAR.IMAGE.MindARThree({
    container: document.body,
    imageTargetSrc: "../assets/targets/targets.mind"
});

//const { renderer, scene, camera } = mindARThree;

let camera, renderer, scene
const container = document.createElement("div")
container.id = "container"

init()
StartUpdate()

async function init() 
{
    const container = document.createElement("div")
    document.body.appendChild(container)

    // Create a scene
    scene = new THREE.Scene()
    scene.name = "myScene"
    
    // Create a camera
    camera = new THREE.PerspectiveCamera
    (
        60, 
        window.innerWidth / window.innerHeight, 
        0.1, 
        1000
    )
    
    camera.position.set(0, 0, 5)
    
    // Create a renderer
    renderer = new THREE.WebGLRenderer
    ({
        antialias: true,
        alpha: true
    })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.xr.enabled = true
    container.appendChild(renderer.domElement)
    console.log(renderer)

    await mindARThree.start();

    container.appendChild(document.getElement("video"))
}

function StartUpdate() 
{
    renderer.setAnimationLoop(OnUpdate)
}

function OnUpdate() 
{
    renderer.render(scene, camera)
}
