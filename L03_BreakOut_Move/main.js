"use strict";
var L03_BreakOut_Move;
(function (L03_BreakOut_Move) {
    var ƒ = FudgeCore;
    document.addEventListener("DOMContentLoaded", init);
    let root = new ƒ.Node("Root");
    let ball;
    let ballRect;
    let block;
    let blockRect;
    let cmpCamera = new ƒ.ComponentCamera();
    let cameraDistance = 40;
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
        cmpCamera.pivot.translateZ(cameraDistance);
        cmpCamera.pivot.rotateY(180);
        viewPort = new ƒ.Viewport();
        viewPort.initialize("ViewPort", root, cmpCamera, canvas);
        let colorBall = ƒ.Color.CSS("green");
        ball = createBall(colorBall);
        root.appendChild(ball);
        ballRect = new ƒ.Rectangle(0, 0, 1, 1, ƒ.ORIGIN2D.CENTER);
        let border = new ƒ.Node("Border");
        root.appendChild(border);
        // 4 Blocks for the border needed
        let colorBlock = ƒ.Color.CSS("orange");
        let blockPosition = new ƒ.Vector3(0, 10, 0);
        let block = createBlock(colorBlock, blockPosition);
        root.appendChild(block);
        xInput = document.querySelector("input#X");
        xSpeed = Number(xInput.value);
        yInput = document.querySelector("input#Y");
        ySpeed = Number(yInput.value);
        document.querySelector("div").addEventListener("input", hdlInput);
        let fps = 30;
        ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, hdlUpdate);
        ƒ.Loop.start(ƒ.LOOP_MODE.TIME_GAME, fps);
        viewPort.draw();
    }
    function createBall(_color) {
        // Für die Kollision sind hier womöglich Vorbereitungen notwendig:
        // vielleicht was mit ƒ.Rectangle
        // auch im Collision-Test von Fudge nachgucken
        // Pong von WS19 kann auch hilfreich sein
        let ball = new ƒ.Node("Ball");
        let meshBall = new ƒ.MeshSphere("MeshBall", 15, 15);
        let cmpMeshBall = new ƒ.ComponentMesh(meshBall);
        ball.addComponent(cmpMeshBall);
        let matBall = new ƒ.Material("BallMat", ƒ.ShaderUniColor, new ƒ.CoatColored(_color));
        let cmpMatBall = new ƒ.ComponentMaterial(matBall);
        ball.addComponent(cmpMatBall);
        let cmpTransBall = new ƒ.ComponentTransform();
        let v3ScaleBall = new ƒ.Vector3(1, 1, 1);
        cmpTransBall.local.scale(v3ScaleBall);
        ball.addComponent(cmpTransBall);
        return ball;
    }
    function createBlock(_color, _position, _scale) {
        block = new ƒ.Node("Block");
        let meshBlock = new ƒ.MeshCube("MeshBlock");
        let cmpMeshBlock = new ƒ.ComponentMesh(meshBlock);
        block.addComponent(cmpMeshBlock);
        let matBlock = new ƒ.Material("BallMat", ƒ.ShaderUniColor, new ƒ.CoatColored(_color));
        let cmpMatBlock = new ƒ.ComponentMaterial(matBlock);
        block.addComponent(cmpMatBlock);
        let cmpTransBlock = new ƒ.ComponentTransform();
        let v3ScaleBlock = new ƒ.Vector3(3, 1, 1);
        cmpTransBlock.local.scale(v3ScaleBlock);
        if (_position) {
            cmpTransBlock.local.translate(_position);
        }
        block.addComponent(cmpTransBlock);
        blockRect = new ƒ.Rectangle();
        blockRect.position = block.cmpTransform.local.translation.toVector2();
        return block;
    }
    function hdlInput(_event) {
        // console.log("input");
        xInput = document.querySelector("input#X");
        xSpeed = Number(xInput.value);
        yInput = document.querySelector("input#Y");
        ySpeed = Number(yInput.value);
    }
    function hdlUpdate(_event) {
        let mulitplier = 2;
        ballRect.position = ball.mtxLocal.translation.toVector2();
        // console.log(ƒ.Time.game.getElapsedSincePreviousCall());
        if (ballRect.collides(blockRect)) {
            console.log("Ball collides with Block!");
            let intersection = ballRect.getIntersection(blockRect);
            if (intersection.size.x > intersection.size.y) {
                yInput.value = (Number(yInput.value) * -1).toString();
                document.querySelector("div").dispatchEvent(new Event("input"));
            }
            else if (intersection.size.x < intersection.size.y) {
                xInput.value = (Number(xInput.value) * -1).toString();
                document.querySelector("div").dispatchEvent(new Event("input"));
            }
            // ƒ.DebugConsole(ballRect.getIntersection(blockRect).position);
        }
        let frameTime = ƒ.Time.game.getElapsedSincePreviousCall() / 1000;
        // für ständig neue "Wegwerf-Vectoren" kann der Recycler von Fudge genutzt werden ƒ.Recycler
        let v3Velocity = new ƒ.Vector3(xSpeed * mulitplier, ySpeed * mulitplier, 0);
        v3Velocity.scale(frameTime);
        ball.mtxLocal.translate(v3Velocity);
        let border = cameraDistance * 0.35;
        if (ball.mtxLocal.translation.x <= -border || ball.mtxLocal.translation.x >= border) {
            xInput.value = (Number(xInput.value) * -1).toString();
            document.querySelector("div").dispatchEvent(new Event("input"));
        }
        if (ball.mtxLocal.translation.y <= -border || ball.mtxLocal.translation.y >= border) {
            yInput.value = (Number(yInput.value) * -1).toString();
            document.querySelector("div").dispatchEvent(new Event("input"));
        }
        viewPort.draw();
    }
})(L03_BreakOut_Move || (L03_BreakOut_Move = {}));
//# sourceMappingURL=main.js.map