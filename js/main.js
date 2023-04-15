import * as THREE from "../libs/three.js-r132/build/three.module.js"
//const THREE = window.MINDAR.IMAGE.THREE;
const mindARThree = new window.MINDAR.IMAGE.MindARThree({
    container: document.body,
    imageTargetSrc: "../assets/targets/targets.mind"
});

//const { renderer, scene, camera } = mindARThree;

let camera = mindARThree;
const scene = new THREE.Scene()
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
const container = document.createElement("div")

init()
StartUpdate()

async function init() 
{
    container.id = "container"
    document.body.appendChild(container)
    
    camera = new THREE.PerspectiveCamera
    (
        60,
        window.innerWidth / window.innerHeight, 
        0.1,
        1000
    )

    container.appendChild(renderer.domElement)
    renderer.setSize(container.innerWidth, container.innerHeight)
    renderer.xr.enabled = true

    scene.add(camera)
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
