"use strict";
var L02_Ball;
(function (L02_Ball) {
    var ƒ = FudgeCore;
    document.addEventListener("DOMContentLoaded", init);
    let root = new ƒ.Node("Root");
    let cmpCamera = new ƒ.ComponentCamera();
    let viewPort;
    //#region Velocity-variables
    let xInput;
    let xSpeed;
    let yInput;
    let ySpeed;
    //#endregion
    function init(_event) {
        let cmpTransformRoot = new ƒ.ComponentTransform();
        root.addComponent(cmpTransformRoot);
        let canvas = document.querySelector("canvas");
        cmpCamera.pivot.translateZ(2);
        cmpCamera.pivot.rotateY(180);
        viewPort = new ƒ.Viewport();
        viewPort.initialize("ViewPort", root, cmpCamera, canvas);
        let colorCicle = ƒ.Color.CSS("green");
        let circle = createCircle(colorCicle);
        root.appendChild(circle);
        xInput = document.querySelector("input#X");
        xSpeed = Number(xInput.value);
        yInput = document.querySelector("input#Y");
        ySpeed = Number(yInput.value);
        document.querySelector("div").addEventListener("input", hdlinput);
        ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, hdlUpdate);
        ƒ.Loop.start(ƒ.LOOP_MODE.TIME_GAME, 30);
        viewPort.draw();
    }
    function createCircle(_color) {
        let circle = new ƒ.Node("Circle");
        let meshCircle = new ƒ.MeshSphere("MeshCircle", 10, 10);
        let cmpMeshCircle = new ƒ.ComponentMesh(meshCircle);
        circle.addComponent(cmpMeshCircle);
        let matCircle = new ƒ.Material("CircleMat", ƒ.ShaderUniColor, new ƒ.CoatColored(_color));
        let cmpMatCircle = new ƒ.ComponentMaterial(matCircle);
        circle.addComponent(cmpMatCircle);
        let cmpTransCircle = new ƒ.ComponentTransform();
        let v3ScaleCircle = new ƒ.Vector3(0.2, 0.2, 0.01);
        cmpTransCircle.local.scale(v3ScaleCircle);
        circle.addComponent(cmpTransCircle);
        return circle;
    }
    function hdlinput(_event) {
        // console.log("input");
        xInput = document.querySelector("input#X");
        xSpeed = Number(xInput.value);
        yInput = document.querySelector("input#Y");
        ySpeed = Number(yInput.value);
    }
    function hdlUpdate(_event) {
        let mulitplier = 0.003;
        let v3Translate = new ƒ.Vector3(xSpeed * mulitplier, ySpeed * mulitplier, 0);
        root.mtxLocal.translate(v3Translate);
        // ƒ.Debug.log(root.mtxLocal.translation);     // Border at around 0.72;
        if (root.mtxLocal.translation.x <= -0.72 || root.mtxLocal.translation.x >= 0.72) {
            xInput.value = (Number(xInput.value) * -1).toString();
            document.querySelector("div").dispatchEvent(new Event("input"));
        }
        if (root.mtxLocal.translation.y <= -0.72 || root.mtxLocal.translation.y >= 0.72) {
            yInput.value = (Number(yInput.value) * -1).toString();
            document.querySelector("div").dispatchEvent(new Event("input"));
        }
        viewPort.draw();
    }
})(L02_Ball || (L02_Ball = {}));
//# sourceMappingURL=main.js.map