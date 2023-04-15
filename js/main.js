const THREE = window.MINDAR.IMAGE.THREE;
const mindARThree = new window.MINDAR.IMAGE.MindARThree({
    container: document.body,
    imageTargetSrc: "../assets/targets/targets.mind"
});

const { renderer, scene, camera } = mindARThree;

init()
StartUpdate()

async function init() 
{
    const container = document.createElement("div")
    document.body.appendChild(container)
    scene.name = "ARBusinessCard"
    scene.add(camera)

    console.log(camera);

    await mindARThree.start();
}

function StartUpdate() 
{
    renderer.setAnimationLoop(OnUpdate)
}

function OnUpdate() 
{
    renderer.render(scene, camera)
}
