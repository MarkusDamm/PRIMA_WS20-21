
namespace L01 {
    console.log("Hello World");
    import ƒ = FudgeCore;

    let viewPort: ƒ.Viewport;
    let camera: ƒ.Node;
    let node: ƒ.Node;
    
    window.addEventListener("DOMContentLoaded", init);

    function init(): void {
        createViewport();
    }

    function createViewport(_canvas: HTMLCanvasElement = null): void {
        if (!_canvas) {
            _canvas = document.createElement("canvas");
            _canvas.width = 1000;
            _canvas.height = 650;
            document.body.appendChild(_canvas);
        }
        viewPort = new ƒ.Viewport();
        camera = createCamera();
        viewPort.initialize("viewport", node, camera.getComponent(ƒ.ComponentCamera), _canvas);
    }
    
    function createCamera(_translation: ƒ.Vector3 = new ƒ.Vector3(1, 1, 10), _lookAt: ƒ.Vector3 = new ƒ.Vector3()): ƒ.Node {
        let camera: ƒ.Node = new ƒ.Node("Camera");
        let cmpTransform: ƒ.ComponentTransform = new ƒ.ComponentTransform();
        cmpTransform.local.translate(_translation);
        cmpTransform.local.lookAt(_lookAt);
        camera.addComponent(cmpTransform);

        let cmpCamera: ƒ.ComponentCamera = new ƒ.ComponentCamera();
        cmpCamera.projectCentral(1, 45, ƒ.FIELD_OF_VIEW.DIAGONAL);
        camera.addComponent(cmpCamera);

        return camera;
    }
}