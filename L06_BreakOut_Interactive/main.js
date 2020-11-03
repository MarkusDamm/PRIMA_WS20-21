"use strict";
var L06_BreakOut_Interactive;
(function (L06_BreakOut_Interactive) {
    var ƒ = FudgeCore;
    document.addEventListener("DOMContentLoaded", init);
    let root = new ƒ.Node("Root");
    let ball;
    let paddle;
    let obstacles;
    let walls;
    let cmpCamera = new ƒ.ComponentCamera();
    let cameraDistance = 40;
    let viewPort;
    //#region Velocity-variables
    let xInput;
    let yInput;
    //#endregion
    function init(_event) {
        let cmpTransformRoot = new ƒ.ComponentTransform();
        root.addComponent(cmpTransformRoot);
        let canvas = document.querySelector("canvas");
        cmpCamera.pivot.translateZ(cameraDistance);
        cmpCamera.pivot.rotateY(180);
        viewPort = new ƒ.Viewport();
        viewPort.initialize("ViewPort", root, cmpCamera, canvas);
        ball = new L06_BreakOut_Interactive.Ball("Ball");
        root.appendChild(ball);
        paddle = new L06_BreakOut_Interactive.Paddle("Controller", new ƒ.Vector2(0, -10));
        root.appendChild(paddle);
        obstacles = new ƒ.Node("Obstacles");
        root.appendChild(obstacles);
        walls = new ƒ.Node("Border");
        root.appendChild(walls);
        // 4 Blocks for the border needed
        walls.appendChild(new L06_BreakOut_Interactive.GameObject("Wall", new ƒ.Vector2(17), new ƒ.Vector2(1, 28)));
        walls.appendChild(new L06_BreakOut_Interactive.GameObject("Wall", new ƒ.Vector2(0, 14), new ƒ.Vector2(35, 1)));
        walls.appendChild(new L06_BreakOut_Interactive.GameObject("Wall", new ƒ.Vector2(-17), new ƒ.Vector2(1, 28)));
        walls.appendChild(new L06_BreakOut_Interactive.GameObject("Wall", new ƒ.Vector2(0, -14), new ƒ.Vector2(35, 1)));
        addBricks(24);
        xInput = document.querySelector("input#X");
        yInput = document.querySelector("input#Y");
        document.querySelector("div").addEventListener("input", hdlInput);
        document.querySelector("div").addEventListener("adjust", hdlAdjustment);
        let fps = 30;
        ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, hdlUpdate);
        ƒ.Loop.start(ƒ.LOOP_MODE.TIME_GAME, fps);
        viewPort.draw();
    }
    function hdlInput(_event) {
        ball.setVelocity(new ƒ.Vector2(Number(xInput.value), Number(yInput.value)));
    }
    function hdlAdjustment(_event) {
        xInput.value = (ball.velocity.x / 2).toString();
        yInput.value = (ball.velocity.y / 2).toString();
    }
    function hdlUpdate(_event) {
        ball.update();
        for (let wall of walls.getChildren()) {
            if (ball.isColliding(wall)) {
                ball.hdlCollision(wall);
            }
        }
        for (let obstacle of obstacles.getChildren()) {
            if (ball.isColliding(obstacle)) {
                ball.hdlCollision(obstacle);
                obstacle.processCollision();
            }
        }
        if (ball.isColliding(paddle)) {
            ball.hdlCollision(paddle);
        }
        viewPort.draw();
        // Interaktive Plattform an der der Ball abprallen soll
        // mit ƒ.Keyboard.isPressedOne() oder mit horizontaler Achse
        // Axis-Referenz anschauen
        // Control-Referenz anschauen
        // mit Control kann ein Factor für die Stärke und 
        // ein Delay für die Dauer bis die Endposition/ Endkraft erreicht ist
        paddle.setVelocity(ƒ.Vector2.ZERO());
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_LEFT, ƒ.KEYBOARD_CODE.ARROW_RIGHT])) {
            hdlKeyboardPress();
        }
        paddle.update();
        // new ƒ.Axis("Horizontal");
    }
    function hdlKeyboardPress() {
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_LEFT])) {
            paddle.setVelocity(L06_BreakOut_Interactive.Paddle.MOVE_VECTOR_LEFT);
        }
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_RIGHT])) {
            paddle.setVelocity(L06_BreakOut_Interactive.Paddle.MOVE_VECTOR_RIGHT);
        }
    }
    function addBricks(_amount) {
        let x = -14;
        let y = 12;
        for (let i = 0; i < _amount; i++) {
            if (x > 14) {
                x = -14;
                y -= 2;
            }
            obstacles.addChild(new L06_BreakOut_Interactive.Brick(`Brick${i}`, new ƒ.Vector2(x, y)));
            x += 4;
        }
    }
})(L06_BreakOut_Interactive || (L06_BreakOut_Interactive = {}));
//# sourceMappingURL=main.js.map