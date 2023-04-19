import * as THREE from 'three';
import { MindARThree } from 'mindar-image-three';
import {FBXLoader} from 'https://unpkg.com/three@0.126.0/examples/jsm/loaders/FBXLoader.js';

const fbxLoader = new FBXLoader();
const textureLoader = new THREE.TextureLoader();
let linkedIn, profileImage;
let canvas = document.getElementById("canvas");
let renderer, scene, camera;

async function init() 
{
    if (screen.orientation)
    {
        screen.orientation.lock("portrait");
    }

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

    renderer = mindARThree.renderer;
    scene = mindARThree.scene;
    camera = mindARThree.camera;

    const anchor = mindARThree.addAnchor(0);
    anchor.group.add(linkedIn);
    anchor.group.add(profileImage);

    await mindARThree.start();
    renderer.setAnimationLoop(onUpdate);

    window.addEventListener("click", onClick);

    function onUpdate()
    {
        linkedIn.position.set(0, -0.55, 0);
        profileImage.position.set(0, 0.55, 0);
        //linkedIn.scale.set(5, 5, 5);
        //linkedIn.rotateX(3.141);
        renderer.render(scene, camera);
    }
}

function onClick(event)
{
    var raycaster = new THREE.Raycaster();
    var mouse = new THREE.Vector2();
    var isTouch = event.type.startsWith("touch");

    if (isTouch)
    {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    } 
    
    else 
    {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    }

    console.log(mouse);

    raycaster.setFromCamera(mouse, camera);

    var intersects = raycaster.intersectObjects(scene.children, true);

    if (intersects.length > 0)
    {
        console.log("Intersected with something")

        intersects.forEach(element => {
            switch (element.object)
            {
                case linkedIn:
                    window.open("https://www.linkedin.com/in/juho-tommola/");
                    break;
            }
        });
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
    profileImageGeometry = new THREE.CircleGeometry(0.2, 24, 0);

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

    //window.addEventListener("click", onClick);
}, { once: true });
