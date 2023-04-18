//import * as THREE from "../libs/three.js-r132/build/three.module.js"
//import '../node_modules/mind-ar/dist/mindar-image-aframe.prod.js'

import * as THREE from 'three';
import { MindARThree } from 'mindar-image-three';
import {FBXLoader} from 'https://unpkg.com/three@0.126.0/examples/jsm/loaders/FBXLoader.js';

const fbxLoader = new FBXLoader();
const textureLoader = new THREE.TextureLoader();
let linkedIn, selfImage;

async function init() 
{
    loadResources();
    /*
    const mindARThree = new window.MINDAR.IMAGE.MindARThree({
        container: document.body,
        imageTargetSrc: "../assets/targets/targets.mind"
    });
    */
    
    const mindARThree = new MindARThree({
        container: document.body,
        imageTargetSrc: "../assets/targets/targets.mind"
    });

    const { renderer, scene, camera } = mindARThree;
    
    const anchor = mindARThree.addAnchor(0);
    anchor.group.add(linkedIn);

    await mindARThree.start();

    renderer.setAnimationLoop(onUpdate);

    function onUpdate()
    {
        renderer.render(scene, camera);
    }
}

function loadResources()
{
    var linkedInModel, selfImageModel;
    var linkedInMaterial, selfImageMaterial;

    linkedInMaterial = new THREE.MeshBasicMaterial({
        transparent: false,
        map: textureLoader.load("../assets/textures/linkedIn.png")
    });

    selfImageMaterial = new THREE.MeshBasicMaterial({
        transparent: false,
        map: textureLoader.load("../assets/textures/selfImage.jpg")
    });

    linkedInModel = new THREE.PlaneGeometry(0.2, 0.2, 0.2);
    selfImageModel = new THREE.PlaneGeometry(0.2, 0.2, 0.2);

    /*
    fbxLoader.load
    (
        "../assets/models/linkedin.fbx",
        function (file) { linkedInModel = file }
    );
    
    fbxLoader.load
    (
        "../assets/models/selfImage.fbx",
        function (file) { selfImageModel = file }
    );
    */

    linkedIn = new THREE.Mesh(linkedInModel, linkedInMaterial);
    selfImage = new THREE.Mesh(selfImageModel, linkedInMaterial);

    linkedIn.setRotationFromAxisAngle(new THREE.Vector3(0, 1, 0), 180)
}

document.addEventListener("DOMContentLoaded", () => {
    init();
}, { once: true });
