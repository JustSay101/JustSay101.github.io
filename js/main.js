import * as THREE from 'three';
import { MindARThree } from 'mindar-image-three';
import {FBXLoader} from 'https://unpkg.com/three@0.126.0/examples/jsm/loaders/FBXLoader.js';

const fbxLoader = new FBXLoader();
const textureLoader = new THREE.TextureLoader();
let linkedIn, profileImage;

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
    anchor.group.add(profileImage);

    await mindARThree.start();

    renderer.setAnimationLoop(onUpdate);

    function onUpdate()
    {
        linkedIn.position.set(0, -0.6, 0);
        profileImage.position.set(0, 0.6, 0);
        //linkedIn.scale.set(5, 5, 5);
        //linkedIn.rotateX(3.141);
        renderer.render(scene, camera);
    }
}

function loadResources()
{
    var linkedInModel, profileImageGeometry;
    var linkedInMaterial, profileImageMaterial;

    linkedInMaterial = new THREE.MeshBasicMaterial({
        transparent: false,
        map: textureLoader.load("../assets/textures/linkedIn.png")
    });

    profileImageMaterial = new THREE.MeshBasicMaterial({
        transparent: false,
        map: textureLoader.load("../assets/textures/profileImage.jpg")
    });

    linkedInModel = new THREE.CircleGeometry(0.2, 24, 0);
    profileImageGeometry = new THREE.PlaneGeometry(0.4, 0.4);

    /*
        LEAVE THIS PART COMMENTED

        LOADED CUSTOM FBX MODELS DO NOT RENDER FOR UNKOWN REASONS.
        USE BASIC THREE.js GEOMETRY AS SUBSTITUTE.
    */
    /*
    fbxLoader.load
    (
        "../assets/models/linkedin.fbx",
        function (file) { linkedInModel = file }
    );
    
    fbxLoader.load
    (
        "../assets/models/profileImage.fbx",
        function (file) { profileImageGeometry = file }
    );
    */
    
    linkedIn = new THREE.Mesh(linkedInModel, linkedInMaterial);
    profileImage = new THREE.Mesh(profileImageGeometry, profileImageMaterial);
}

document.addEventListener("DOMContentLoaded", () => {
    init();
}, { once: true });
