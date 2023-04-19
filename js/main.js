import * as THREE from 'three';
import { MindARThree } from 'mindar-image-three';
import { CSS3DObject } from 'https://threejs.org/examples/jsm/renderers/CSS3DRenderer.js';

const textureLoader = new THREE.TextureLoader();
//const iframe = document.getElementById("video-iframe");
//const videoWindow = iframe.contentWindow;
let linkedIn, profileImage, YTVideo;
let cssRenderer, renderer, cssScene, scene, camera;

/*
iframe.addEventListener("load", function () {

    var videoMaterial = new THREE.MeshBasicMaterial({
        map: new THREE.VideoTexture(videoWindow.getElementsByTagName("video")[0])
    });

    var videoGeometry = new THREE.PlaneGeometry(0.6, 0.3375);

    YTVideo = new THREE.Mesh(videoGeometry, videoMaterial);

    anchor.group.add(YTVideo);

});
*/

async function init() 
{
    loadResources();

    const mindARThree = new MindARThree({
        container: document.body,
        imageTargetSrc: "../assets/targets/targets.mind"
    });

    renderer = mindARThree.renderer;
    cssScene = mindARThree.cssScene;
    scene = mindARThree.scene;
    camera = mindARThree.camera;
    cssRenderer = mindARThree.cssRenderer;

    const anchor = mindARThree.addAnchor(0);
    anchor.group.add(linkedIn);
    anchor.group.add(profileImage);

    const cssAnchor = mindARThree.addCSSAnchor(0);
    YTVideo = new CSS3DObject(document.querySelector("#video-iframe"));
    cssAnchor.group.add(YTVideo);

    await mindARThree.start();
    renderer.setAnimationLoop(onUpdate);

    function onUpdate()
    {
        linkedIn.position.set(0, -0.55, 0);
        profileImage.position.set(0, 0.55, 0);
        //linkedIn.scale.set(5, 5, 5);
        //linkedIn.rotateX(3.141);
        renderer.render(scene, camera);
        cssRenderer.render(cssScene, camera);
    }
}

/*
    onClick event function to check if the tapped position intesects with any object.
    This function also checks what was intersected, and then executes functionality depending on that.
*/
function onClick(event)
{
    var raycaster = new THREE.Raycaster();
    var touchPosition = new THREE.Vector2();

    touchPosition.x = (event.clientX / window.innerWidth) * 2 - 1;
    touchPosition.y = -(event.clientY / window.innerHeight) * 2 + 1;
    
    console.log(touchPosition);

    raycaster.setFromCamera(touchPosition, camera);

    var intersects = raycaster.intersectObjects(scene.children, true);

    if (intersects.length > 0)
    {
        intersects.forEach(element => {
            switch (element.object)
            {
                case linkedIn:
                    console.log("Opening linkedIn");
                    window.open("https://www.linkedin.com/in/juho-tommola/");
                    break;
                case YTVideo:
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
    window.addEventListener("click", onClick);
}, { once: true });
