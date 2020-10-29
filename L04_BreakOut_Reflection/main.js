"use strict";
var L04_BreakOut_Reflection;
(function (L04_BreakOut_Reflection) {
    var ƒ = FudgeCore;
    document.addEventListener("DOMContentLoaded", init);
    let root = new ƒ.Node("Root");
    let ball;
    let obstacles;
    let walls;
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
        ball = new L04_BreakOut_Reflection.Ball("Ball");
        root.appendChild(ball);
        obstacles = new ƒ.Node("Obstacles");
        root.appendChild(obstacles);
        walls = new ƒ.Node("Border");
        root.appendChild(walls);
        // 4 Blocks for the border needed
        walls.appendChild(new L04_BreakOut_Reflection.GameObject("Wall", new ƒ.Vector2(17), new ƒ.Vector2(1, 28)));
        walls.appendChild(new L04_BreakOut_Reflection.GameObject("Wall", new ƒ.Vector2(0, 14), new ƒ.Vector2(35, 1)));
        walls.appendChild(new L04_BreakOut_Reflection.GameObject("Wall", new ƒ.Vector2(-17), new ƒ.Vector2(1, 28)));
        walls.appendChild(new L04_BreakOut_Reflection.GameObject("Wall", new ƒ.Vector2(0, -14), new ƒ.Vector2(35, 1)));
        obstacles.appendChild(new L04_BreakOut_Reflection.Brick("Brick", new ƒ.Vector2(0, 10)));
        obstacles.appendChild(new L04_BreakOut_Reflection.Brick("Brick", new ƒ.Vector2(10, 10)));
        obstacles.appendChild(new L04_BreakOut_Reflection.Brick("Brick", new ƒ.Vector2(-10, 10)));
        obstacles.appendChild(new L04_BreakOut_Reflection.Brick("Brick", new ƒ.Vector2(6, 5)));
        obstacles.appendChild(new L04_BreakOut_Reflection.Brick("Brick", new ƒ.Vector2(-6, 5)));
        obstacles.appendChild(new L04_BreakOut_Reflection.Brick("Brick", new ƒ.Vector2(14, 5)));
        obstacles.appendChild(new L04_BreakOut_Reflection.Brick("Brick", new ƒ.Vector2(-14, 5)));
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
    function hdlInput(_event) {
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
                hdlCollision(walls);
            }
        }
        for (let obstacle of obstacles.getChildren()) {
            if (ball.rect.collides(obstacle.rect)) {
                hdlCollision(obstacles);
            }
        }
        let frameTime = ƒ.Time.game.getElapsedSincePreviousCall() / 1000;
        // für ständig neue "Wegwerf-Vectoren" kann der Recycler von Fudge genutzt werden ƒ.Recycler
        let v3Velocity = new ƒ.Vector3(xSpeed * mulitplier, ySpeed * mulitplier, 0);
        v3Velocity.scale(frameTime);
        ball.mtxLocal.translate(v3Velocity);
        viewPort.draw();
    }
    function hdlCollision(_parentNode) {
        for (let obstacle of _parentNode.getChildren()) {
            if (ball.rect.collides(obstacle.rect)) {
                let intersection = ball.rect.getIntersection(obstacle.rect);
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