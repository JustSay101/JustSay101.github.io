//import * as THREE from "../libs/three.js-r132/build/three.module.js"
//import '../node_modules/mind-ar/dist/mindar-image-aframe.prod.js'

import * as THREE from 'three';
import { MindARThree } from 'mindar-image-three';

const container = document.createElement("div")
container.id = "container"
document.body.appendChild(container)

const mindARThree = new window.MINDAR.IMAGE.MindARThree({
    container: container,
    imageTargetSrc: "../assets/targets/targets.mind"
});

const { renderer, scene } = mindARThree;

let camera

//let camera, renderer, scene

init()
StartUpdate()

async function init() 
{
    document.body.appendChild(renderer.domElement)
    
    camera = new THREE.PerspectiveCamera
    (
        100, 
        window.innerWidth / window.innerHeight, 
        0.1, 
        1000
    )
    
    // Create a scene
    /*
    scene = new THREE.Scene()
    scene.name = "myScene"
    */

    scene.add(camera)
    
    await mindARThree.start()
}

function StartUpdate() 
{
    renderer.setAnimationLoop(OnUpdate)
}

function OnUpdate() 
{
    renderer.render(scene, camera)
}
