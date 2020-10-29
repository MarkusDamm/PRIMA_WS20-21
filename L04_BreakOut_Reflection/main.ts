namespace L04_BreakOut_Reflection {
    import ƒ = FudgeCore;

    document.addEventListener("DOMContentLoaded", init);

    let root: ƒ.Node = new ƒ.Node("Root");
    let ball: Ball;

    let obstacles: ƒ.Node;
    let walls: ƒ.Node;

    let cmpCamera: ƒ.ComponentCamera = new ƒ.ComponentCamera();
    let cameraDistance: number = 40;
    let viewPort: ƒ.Viewport;

    //#region Velocity-variables
    let xInput: HTMLInputElement;
    let xSpeed: number;
    let yInput: HTMLInputElement;
    let ySpeed: number;
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
        
        obstacles = new ƒ.Node("Obstacles");
        root.appendChild(obstacles);
        walls = new ƒ.Node("Border");
        root.appendChild(walls);

        // 4 Blocks for the border needed
        walls.appendChild(new GameObject("Wall", new ƒ.Vector2(17), new ƒ.Vector2(1, 28)));
        walls.appendChild(new GameObject("Wall", new ƒ.Vector2(0, 14), new ƒ.Vector2(35, 1)));
        walls.appendChild(new GameObject("Wall", new ƒ.Vector2(-17), new ƒ.Vector2(1, 28)));
        walls.appendChild(new GameObject("Wall", new ƒ.Vector2(0, -14), new ƒ.Vector2(35, 1)));
        
        obstacles.appendChild(new Brick("Brick", new ƒ.Vector2(0, 10)));
        obstacles.appendChild(new Brick("Brick", new ƒ.Vector2(10, 10)));
        obstacles.appendChild(new Brick("Brick", new ƒ.Vector2(-10, 10)));
        obstacles.appendChild(new Brick("Brick", new ƒ.Vector2(6, 5)));
        obstacles.appendChild(new Brick("Brick", new ƒ.Vector2(-6, 5)));
        obstacles.appendChild(new Brick("Brick", new ƒ.Vector2(14, 5)));
        obstacles.appendChild(new Brick("Brick", new ƒ.Vector2(-14, 5)));

        xInput = document.querySelector("input#X");
        xSpeed = Number(xInput.value);
        yInput = document.querySelector("input#Y");
        ySpeed = Number(yInput.value);
        document.querySelector("div").addEventListener("input", hdlInput);

        let fps: number = 30;
        ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, hdlUpdate);
        ƒ.Loop.start(ƒ.LOOP_MODE.TIME_GAME, fps);

        viewPort.draw();
    }

    function hdlInput(_event: Event): void {
        xInput = document.querySelector("input#X");
        xSpeed = Number(xInput.value);
        yInput = document.querySelector("input#Y");
        ySpeed = Number(yInput.value);
    }

    function hdlUpdate(_event: Event): void {
        let mulitplier: number = 2;
        ball.rect.position = ball.mtxLocal.translation.toVector2();

        // Code für Objektorientierung anpassen
        // Class für Brick und Ball
        // Diese Bedingung ausklammern
        for (let wall of walls.getChildren()) {
            if (ball.rect.collides((<GameObject>wall).rect)) {
                hdlCollision(walls);
            }
        }
        for (let obstacle of obstacles.getChildren()) {
            if (ball.rect.collides((<GameObject>obstacle).rect)) {
                hdlCollision(obstacles);
            }
        }

        let frameTime: number = ƒ.Time.game.getElapsedSincePreviousCall() / 1000;

        // für ständig neue "Wegwerf-Vectoren" kann der Recycler von Fudge genutzt werden ƒ.Recycler
        let v3Velocity: ƒ.Vector3 = new ƒ.Vector3(xSpeed * mulitplier, ySpeed * mulitplier, 0);
        v3Velocity.scale(frameTime);
        ball.mtxLocal.translate(v3Velocity);

        viewPort.draw();
    }

    function hdlCollision(_parentNode: ƒ.Node): void {
        for (let obstacle of _parentNode.getChildren()) {
            if (ball.rect.collides((<GameObject>obstacle).rect)) {
                let intersection: ƒ.Rectangle = ball.rect.getIntersection((<GameObject>obstacle).rect);
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

}