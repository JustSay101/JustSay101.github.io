import * as THREE from 'three';
import { MindARThree } from 'mindar-image-three';
import { CSS3DObject } from 'https://threejs.org/examples/jsm/renderers/CSS3DRenderer.js';

const textureLoader = new THREE.TextureLoader();
//const iframe = document.getElementById("video-iframe");
//const videoWindow = iframe.contentWindow;
let linkedIn, profileImage, YTVideoRaycastTarget, cssVideoObject;
let cssRenderer, renderer, cssScene, scene, camera;
const videoIFrame = document.getElementById("player");


// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '390',
    width: '640',
    videoId: 'hzLdZWIeq3c',
    playerVars: {
      'playsinline': 1
    },
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING && !done) {
    setTimeout(stopVideo, 6000);
    done = true;
  }
}
function stopVideo() {
  player.stopVideo();
}

console.log(videoIFrame);

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
    //anchor.group.add(YTVideoRaycastTarget);

    const cssAnchor = mindARThree.addCSSAnchor(0);
    cssVideoObject = new CSS3DObject(videoIFrame);
    cssVideoObject.element.style.zIndex = -10;
    cssAnchor.group.add(cssVideoObject);

    await mindARThree.start();
    renderer.setAnimationLoop(onUpdate);

    function onUpdate()
    {
        cssVideoObject.scale.set(1.2, 1.2, 1.2);
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
                case YTVideoRaycastTarget:
                    console.log("Pause/play Video");
                    
                    cssVideo.play();
                    
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
        color: "red",
    });

    raycastTargetGeometry = new THREE.PlaneGeometry(1, 1);
    linkedInGeometry = new THREE.CircleGeometry(0.2, 24, 0);
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
