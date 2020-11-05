namespace L07_BreakOut_Final {
    import ƒ = FudgeCore;

    enum GAMESTATE {
        PLAY, GAMEOVER
    }

    document.addEventListener("DOMContentLoaded", init);

    let root: ƒ.Node = new ƒ.Node("Root");
    let points: number = 0;
    let counter: HTMLElement;

    let gameState: GAMESTATE = GAMESTATE.PLAY;

    let ball: Ball;
    let paddle: Paddle;
    let powerUp: PowerUp;

    let obstacles: ƒ.Node;
    let walls: ƒ.Node;
    let wallBottom: GameObject;

    let cmpCamera: ƒ.ComponentCamera = new ƒ.ComponentCamera();
    let cameraDistance: number = 40;
    let viewPort: ƒ.Viewport;

    let control: ƒ.Control = new ƒ.Control("PaddleControl", 1, ƒ.CONTROL_TYPE.PROPORTIONAL);
    control.setDelay(100);

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

        counter = document.querySelector(".counter");

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

        powerUp = new PowerUp("PowerUp", ƒ.Vector2.X(5), ƒ.Vector2.ONE());
        root.appendChild(walls);

        // 4 Blocks for the border needed
        walls.appendChild(new GameObject("WallRight", new ƒ.Vector2(17), new ƒ.Vector2(1, 28)));
        walls.appendChild(new GameObject("WallUp", new ƒ.Vector2(0, 14), new ƒ.Vector2(35, 1)));
        walls.appendChild(new GameObject("WallLeft", new ƒ.Vector2(-17), new ƒ.Vector2(1, 28)));
        wallBottom = new GameObject("WallDown", new ƒ.Vector2(0, -14), new ƒ.Vector2(35, 1));
        wallBottom.removeComponent(wallBottom.getComponent(ƒ.ComponentMaterial));
        walls.appendChild(wallBottom);

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
        if (gameState == GAMESTATE.GAMEOVER) {
            ƒ.Loop.removeEventListener(ƒ.EVENT.LOOP_FRAME, hdlUpdate);
            alert("Rip In Paddles");
            return;
        }

        ball.update();
        for (let wall of walls.getChildren() as GameObject[]) {
            if (ball.isColliding(wall)) {
                if (wall == wallBottom)
                    gameState = GAMESTATE.GAMEOVER;
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

        control.setInput(
            ƒ.Keyboard.mapToValue(10, 0, [ƒ.KEYBOARD_CODE.ARROW_RIGHT, ƒ.KEYBOARD_CODE.D])
            + ƒ.Keyboard.mapToValue(-10, 0, [ƒ.KEYBOARD_CODE.ARROW_LEFT, ƒ.KEYBOARD_CODE.A])
        );

        let mttPosPaddle: ƒ.Mutator = paddle.mtxLocal.getMutator();
        paddle.setVelocity(ƒ.Vector2.X(Number((control.getOutput()).toFixed(3))));
        paddle.update();
        if (paddle.isColliding(<GameObject>walls.getChildrenByName("WallLeft")[0]) ||
            paddle.isColliding(<GameObject>walls.getChildrenByName("WallRight")[0])) {
            paddle.mtxLocal.mutate(mttPosPaddle);
        }

        // Bis Dienstag: 
        // Doom-Texturen raussuchen
        // altes Doom betrachten und Umsetzungsvorschläge skizzieren

        // für den BreakOut-Rest noch möglich
        // PowerUp weiter ausbauen (Siehe Jirka)
        // ƒ.Timer nutzen, um ein Timer für PowerUps 
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

    export function addPoints(_amount: number): void {
        points += _amount;
        counter.innerText = points + " Points";
    }

}