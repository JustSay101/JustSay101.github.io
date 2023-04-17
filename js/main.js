//import * as THREE from "../libs/three.js-r132/build/three.module.js"
//import '../node_modules/mind-ar/dist/mindar-image-aframe.prod.js'

import * as THREE from 'three';
import { MindARThree } from 'mindar-image-three';

init()

async function init() 
{
    const mindARThree = new window.MINDAR.IMAGE.MindARThree({
        container: document.body,
        imageTargetSrc: "../assets/targets/targets.mind"
    });
    
    const { renderer, scene, camera} = mindARThree;

    await mindARThree.start()

    renderer.setAnimationLoop(onUpdate)

    function onUpdate() {
        renderer.render(scene, camera)
    }
}
