"use strict";
var L04_BreakOut_Reflection;
(function (L04_BreakOut_Reflection) {
    var ƒ = FudgeCore;
    document.addEventListener("DOMContentLoaded", init);
    let root = new ƒ.Node("Root");
    let ball;
    let walls;
    // let ballRect: ƒ.Rectangle;
    let blocks = [];
    let blocksRects = [];
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
        walls = new ƒ.Node("Border");
        root.appendChild(walls);
        // 4 Blocks for the border needed
        walls.appendChild(new L04_BreakOut_Reflection.GameObject("Wall", new ƒ.Vector2(17), new ƒ.Vector2(1, 28)));
        walls.appendChild(new L04_BreakOut_Reflection.GameObject("Wall", new ƒ.Vector2(0, 14), new ƒ.Vector2(35, 1)));
        walls.appendChild(new L04_BreakOut_Reflection.GameObject("Wall", new ƒ.Vector2(-17), new ƒ.Vector2(1, 28)));
        walls.appendChild(new L04_BreakOut_Reflection.GameObject("Wall", new ƒ.Vector2(0, -14), new ƒ.Vector2(35, 1)));
        // let colorBorder: ƒ.Color = ƒ.Color.CSS("white");
        // let borderPosition: ƒ.Vector3;
        // let borderScale: ƒ.Vector3;
        // for (let i: number = 0; i < 4; i++) {
        //     switch (i) {
        //         case 0:
        //             borderPosition = new ƒ.Vector3(0, 14);
        //             borderScale = new ƒ.Vector3(35, 1);
        //             break;
        //         case 1:
        //             borderPosition = new ƒ.Vector3(17);
        //             borderScale = new ƒ.Vector3(1, 28);
        //             break;
        //         case 2:
        //             borderPosition = new ƒ.Vector3(0, -14);
        //             borderScale = new ƒ.Vector3(35, 1);
        //             break;
        //         case 3:
        //             borderPosition = new ƒ.Vector3(-17);
        //             borderScale = new ƒ.Vector3(1, 28);
        //     }
        //     let borderBlock: ƒ.Node = createBlock(colorBorder, borderPosition, borderScale);
        //     // console.log("border " + i + " at " + borderPosition + " with " + borderScale);
        //     walls.appendChild(borderBlock);
        // }
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
        let ball = new L04_BreakOut_Reflection.GameObject("Ball");
        // let meshBall: ƒ.MeshSphere = new ƒ.MeshSphere("MeshBall", 15, 15);
        // let cmpMeshBall: ƒ.ComponentMesh = new ƒ.ComponentMesh(meshBall);
        // ball.addComponent(cmpMeshBall);
        // let matBall: ƒ.Material = new ƒ.Material("BallMat", ƒ.ShaderUniColor, new ƒ.CoatColored(_color));
        // let cmpMatBall: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(matBall);
        // ball.addComponent(cmpMatBall);
        // let cmpTransBall: ƒ.ComponentTransform = new ƒ.ComponentTransform();
        // let v3ScaleBall: ƒ.Vector3 = new ƒ.Vector3(1, 1, 1);
        // cmpTransBall.local.scale(v3ScaleBall);
        // ball.addComponent(cmpTransBall);
        // ballRect = new ƒ.Rectangle();
        return ball;
    }
    function createBlock(_color, _position, _scale = new ƒ.Vector3(3, 1, 1)) {
        let block = new ƒ.Node("Block");
        let meshBlock = new ƒ.MeshCube("MeshBlock");
        let cmpMeshBlock = new ƒ.ComponentMesh(meshBlock);
        block.addComponent(cmpMeshBlock);
        let matBlock = new ƒ.Material("BlockMat", ƒ.ShaderUniColor, new ƒ.CoatColored(_color));
        let cmpMatBlock = new ƒ.ComponentMaterial(matBlock);
        block.addComponent(cmpMatBlock);
        let cmpTransBlock = new ƒ.ComponentTransform();
        cmpTransBlock.local.scale(_scale);
        if (_position) {
            cmpTransBlock.local.translate(_position);
        }
        block.addComponent(cmpTransBlock);
        let blockRect = new ƒ.Rectangle(0, 0, _scale.x, _scale.y);
        let rectPos = new ƒ.Vector2(block.mtxLocal.translation.x - (_scale.x / 2), block.mtxLocal.translation.y - (_scale.y / 2));
        blockRect.position = rectPos;
        console.log(blockRect.height);
        blocks.push(block);
        blocksRects.push(blockRect);
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
        ball.rect.position = ball.mtxLocal.translation.toVector2();
        // Code für Objektorientierung anpassen
        // Class für Brick und Ball
        // Diese Bedingung ausklammern
        for (let wall of walls.getChildren()) {
            if (ball.rect.collides(wall.rect)) {
                hdlCollision();
            }
        }
        let frameTime = ƒ.Time.game.getElapsedSincePreviousCall() / 1000;
        // für ständig neue "Wegwerf-Vectoren" kann der Recycler von Fudge genutzt werden ƒ.Recycler
        let v3Velocity = new ƒ.Vector3(xSpeed * mulitplier, ySpeed * mulitplier, 0);
        v3Velocity.scale(frameTime);
        ball.mtxLocal.translate(v3Velocity);
        viewPort.draw();
    }
    function hdlCollision() {
        for (let wall of walls.getChildren()) {
            if (ball.rect.collides(wall.rect)) {
                // console.log("Ball collides with Block!");
                let intersection = ball.rect.getIntersection(wall.rect);
                if (intersection.size.x > intersection.size.y) {
                    yInput.value = (Number(yInput.value) * -1).toString();
                    document.querySelector("div").dispatchEvent(new Event("input"));
                }
                else {
                    xInput.value = (Number(xInput.value) * -1).toString();
                    document.querySelector("div").dispatchEvent(new Event("input"));
                }
            }
        }
    }
})(L04_BreakOut_Reflection || (L04_BreakOut_Reflection = {}));
//# sourceMappingURL=main.js.map