namespace L06_BreakOut_Interactive {
    import ƒ = FudgeCore;

    document.addEventListener("DOMContentLoaded", init);

    let root: ƒ.Node = new ƒ.Node("Root");
    let ball: Ball;
    let paddle: Paddle;

    let obstacles: ƒ.Node;
    let walls: ƒ.Node;

    let cmpCamera: ƒ.ComponentCamera = new ƒ.ComponentCamera();
    let cameraDistance: number = 40;
    let viewPort: ƒ.Viewport;

    //#region Velocity-variables
    let xInput: HTMLInputElement;
    let yInput: HTMLInputElement;
    //#endregion

    function init(_event: Event): void {
        let cmpTransformRoot: ƒ.ComponentTransform = new ƒ.ComponentTransform();
        root.addComponent(cmpTransformRoot);

        let canvas: HTMLCanvasElement = document.querySelector("canvas");
        cmpCamera.pivot.translateZ(cameraDistance);
        cmpCamera.pivot.rotateY(180);

        viewPort = new ƒ.Viewport();
        viewPort.initialize("ViewPort", root, cmpCamera, canvas);

        ball = new Ball("Ball");
        root.appendChild(ball);

        paddle = new Paddle("Controller", new ƒ.Vector2(0, -10));
        root.appendChild(paddle);

        obstacles = new ƒ.Node("Obstacles");
        root.appendChild(obstacles);
        walls = new ƒ.Node("Border");
        root.appendChild(walls);

        // 4 Blocks for the border needed
        walls.appendChild(new GameObject("Wall", new ƒ.Vector2(17), new ƒ.Vector2(1, 28)));
        walls.appendChild(new GameObject("Wall", new ƒ.Vector2(0, 14), new ƒ.Vector2(35, 1)));
        walls.appendChild(new GameObject("Wall", new ƒ.Vector2(-17), new ƒ.Vector2(1, 28)));
        walls.appendChild(new GameObject("Wall", new ƒ.Vector2(0, -14), new ƒ.Vector2(35, 1)));

        addBricks(24);

        xInput = document.querySelector("input#X");
        yInput = document.querySelector("input#Y");
        document.querySelector("div").addEventListener("input", hdlInput);
        document.querySelector("div").addEventListener("adjust", hdlAdjustment);

        let fps: number = 30;
        ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, hdlUpdate);
        ƒ.Loop.start(ƒ.LOOP_MODE.TIME_GAME, fps);

        viewPort.draw();
    }

    function hdlInput(_event: Event): void {
        ball.setVelocity(new ƒ.Vector2(Number(xInput.value), Number(yInput.value)));
    }

    function hdlAdjustment(_event: Event): void {
        xInput.value = (ball.velocity.x / 2).toString();
        yInput.value = (ball.velocity.y / 2).toString();
    }

    function hdlUpdate(_event: Event): void {
        ball.update();
        for (let wall of walls.getChildren() as Brick[]) {
            if (ball.isColliding(wall)) {
                ball.hdlCollision(wall);
            }
        }
        for (let obstacle of obstacles.getChildren() as Brick[]) {
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

    function hdlKeyboardPress(): void {
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_LEFT])) {
            paddle.setVelocity(Paddle.MOVE_VECTOR_LEFT);
        }
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_RIGHT])) {
            paddle.setVelocity(Paddle.MOVE_VECTOR_RIGHT);
        }
    }

    function addBricks(_amount: number): void {
        let x: number = -14;
        let y: number = 12;

        for (let i: number = 0; i < _amount; i++) {
            if (x > 14) {
                x = -14;
                y -= 2;
            }

            obstacles.addChild(new Brick(`Brick${i}`, new ƒ.Vector2(x, y)));
            x += 4;
        }
    }

}