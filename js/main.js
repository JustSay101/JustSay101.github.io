//import * as THREE from "../libs/three.js-r132/build/three.module.js"
//import '../node_modules/mind-ar/dist/mindar-image-aframe.prod.js'

import * as THREE from 'three';
import { MindARThree } from 'mindar-image-three';

async function init() 
    {
        const mindARThree = new window.MINDAR.IMAGE.MindARThree({
            container: document.body,
            imageTargetSrc: "../assets/targets/targets.mind"
        });
        
        const { renderer, scene, camera } = mindARThree;
        
        const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2)
        const material = new THREE.MeshBasicMaterial({
            color: 'green',
            transparent: true,
            opacity: 0.8
        })
        
        const box = new THREE.Mesh(geometry, material)

        const anchor = mindARThree.addAnchor(0)
        anchor.group.add(box)

        await mindARThree.start()
    
        renderer.setAnimationLoop(onUpdate)
    
        function onUpdate() {
            renderer.render(scene, camera)
        }
    } 

document.addEventListener("DOMContentLoaded", () => {
    init()
}, { once: true })
