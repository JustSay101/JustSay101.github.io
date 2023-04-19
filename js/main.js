import * as THREE from 'three';
import { MindARThree } from 'mindar-image-three';
import {FBXLoader} from 'https://unpkg.com/three@0.126.0/examples/jsm/loaders/FBXLoader.js';

const fbxLoader = new FBXLoader();
const textureLoader = new THREE.TextureLoader();
let linkedIn, profileImage, YTVideo;
let canvas = document.getElementById("canvas");
let renderer, scene, camera;

const YTVideoEmbed = document.createElement("Video");
YTVideoEmbed.src = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
YTVideoEmbed.crossorigin = 'anonymous';
document.body.appendChild(YTVideoEmbed);

async function init() 
{
    loadResources();

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
    anchor.group.add(YTVideo);

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

/*
    onClick event function to check if the tapped position intesects with any object.
    This function also checks what was intersected, and then executes functionality depending on that.
*/
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

    console.log(mouse);

    raycaster.setFromCamera(mouse, camera);

    var intersects = raycaster.intersectObjects(scene.children, true);

    if (intersects.length > 0)
    {
        intersects.forEach(element => {
            switch (element.object)
            {
                case linkedIn:
                    console.log("Opening linked in");
                    window.open("https://www.linkedin.com/in/juho-tommola/");
                    break;
                case YTVideoEmbed:
                    console.log("Pause/play YTVideoEmbed");
                    if (YTVideoEmbed.paused)
                    {
                        YTVideoEmbed.play();
                    }
                    else
                    {
                        YTVideoEmbed.pause();
                    }
                    break;
            }
        });
    }
}

function loadResources()
{
    var linkedInModel, profileImageGeometry, videoGeometry;
    var linkedInMaterial, profileImageMaterial, videoMaterial;

    linkedInMaterial = new THREE.MeshBasicMaterial({
        transparent: false,
        map: textureLoader.load("../assets/textures/linkedIn.png")
    });

    profileImageMaterial = new THREE.MeshBasicMaterial({
        transparent: false,
        map: textureLoader.load("../assets/textures/profileImage.jpg")
    });

    videoMaterial = new THREE.MeshBasicMaterial({
        map: new THREE.VideoTexture(YTVideoEmbed)
    });

    videoGeometry = new THREE.PlaneGeometry(0.5, 0.28125);
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
    YTVideo = new THREE.Mesh(videoGeometry, videoMaterial);
}

document.addEventListener("DOMContentLoaded", () => {
    init();

    //window.addEventListener("click", onClick);
}, { once: true });
