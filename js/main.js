import * as THREE from 'three';
import { MindARThree } from 'mindar-image-three';
import { CSS3DObject } from 'https://threejs.org/examples/jsm/renderers/CSS3DRenderer.js';

const textureLoader = new THREE.TextureLoader();
let linkedIn, profileImage, YTVideoRaycastTarget, cssVideoObject;
let cssRenderer, renderer, cssScene, scene, camera;
let videoIFrame;
let player;
let isPlaying = false;

loadPlayer();
  
function loadPlayer() 
{ 
if (typeof(YT) == 'undefined' || typeof(YT.Player) == 'undefined') {

    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window.onYouTubePlayerAPIReady = function() {
    onYouTubePlayer();
    };

}

else 
{
    onYouTubePlayer();
}
}
  
function onYouTubePlayer() 
{
    player = new YT.Player('player', {
        height: '360',
        width: '640',
        videoId: "hzLdZWIeq3c",
        playerVars: { controls:1, showinfo: 0, rel: 0, showsearch: 0, iv_load_policy: 3 }
    });
}

function playVideo() 
{
    player.playVideo();
}

function pauseVideo() 
{
    player.pauseVideo();
}

function stopVideo() 
{
    player.stopVideo();
}

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
    anchor.group.add(YTVideoRaycastTarget);

    const cssAnchor = mindARThree.addCSSAnchor(0);
    videoIFrame = document.getElementById("iframe-video");

    cssVideoObject = new CSS3DObject(videoIFrame);
    cssVideoObject.element.style.pointerEvents = 'none';
    cssAnchor.group.add(cssVideoObject);

    await mindARThree.start();
    renderer.setAnimationLoop(onUpdate);

    function onUpdate()
    {
        cssVideoObject.scale.set(1.2, 1.2, 1.2);
        linkedIn.position.set(0, -0.45, 0);
        profileImage.position.set(0, 0.45, 0);
        cssVideoObject.position.set(0, 0, -0.01);
        YTVideoRaycastTarget.position.set(0,0,0.01);
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

function onVideoClick()
{
    if (!isPlaying)
    {
        console.log("Play Video");
        playVideo();
        isPlaying = true;
    }
    else
    {
        console.log("Stop Video");
        pauseVideo();
        isPlaying = false;
    }
}

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
                case YTVideoRaycastTarget:
                    onVideoClick();
                    break;
            }
        });
    }
}

function loadResources()
{
    var linkedInGeometry, profileImageGeometry, raycastTargetGeometry;
    var linkedInMaterial, profileImageMaterial, raycastTargetMaterial;

    linkedInMaterial = new THREE.MeshBasicMaterial({
        transparent: false,
        map: textureLoader.load("../assets/textures/linkedIn.png")
    });

    profileImageMaterial = new THREE.MeshBasicMaterial({
        transparent: false,
        map: textureLoader.load("../assets/textures/profileImage.jpg")
    });
    
    raycastTargetMaterial = new THREE.MeshBasicMaterial({
        transparent: true,
        opacity: 0.4,
        color: "red",
    });

    raycastTargetGeometry = new THREE.PlaneGeometry(0.7, 0.5);
    linkedInGeometry = new THREE.CircleGeometry(0.1, 24, 0);
    profileImageGeometry = new THREE.CircleGeometry(0.1, 24, 0);

    /*
        LEAVE THIS PART COMMENTED

        LOADED CUSTOM FBX MODELS DO NOT RENDER FOR UNKOWN REASONS.
        USE BASIC THREE.js GEOMETRY AS SUBSTITUTE.
    */
    /*
    fbxLoader.load
    (
        "../assets/models/linkedin.fbx",
        function (file) { linkedInGeometry = file }
    );
    
    fbxLoader.load
    (
        "../assets/models/profileImage.fbx",
        function (file) { profileImageGeometry = file }
    );
    */
    
    YTVideoRaycastTarget = new THREE.Mesh(raycastTargetGeometry, raycastTargetMaterial);
    linkedIn = new THREE.Mesh(linkedInGeometry, linkedInMaterial);
    profileImage = new THREE.Mesh(profileImageGeometry, profileImageMaterial);
}

document.addEventListener("DOMContentLoaded", () => {
    init();
    window.addEventListener("click", onClick);
}, { once: true });
