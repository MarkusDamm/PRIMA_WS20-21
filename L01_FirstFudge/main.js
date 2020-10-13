"use strict";
var L01;
(function (L01) {
    console.log("Hello World");
    var ƒ = FudgeCore;
    let viewPort;
    let camera;
    let node;
    window.addEventListener("DOMContentLoaded", init);
    function init() {
        createViewport();
    }
    function createViewport(_canvas = null) {
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
    function createCamera(_translation = new ƒ.Vector3(1, 1, 10), _lookAt = new ƒ.Vector3()) {
        let camera = new ƒ.Node("Camera");
        let cmpTransform = new ƒ.ComponentTransform();
        cmpTransform.local.translate(_translation);
        cmpTransform.local.lookAt(_lookAt);
        camera.addComponent(cmpTransform);
        let cmpCamera = new ƒ.ComponentCamera();
        cmpCamera.projectCentral(1, 45, ƒ.FIELD_OF_VIEW.DIAGONAL);
        camera.addComponent(cmpCamera);
        return camera;
    }
})(L01 || (L01 = {}));
//# sourceMappingURL=main.js.map