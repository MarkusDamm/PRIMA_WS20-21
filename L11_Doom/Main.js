"use strict";
var L11_Doom;
(function (L11_Doom) {
    var ƒ = FudgeCore;
    var ƒaid = FudgeAid;
    window.addEventListener("load", hndLoad);
    let root = new ƒ.Node("Root");
    let avatar;
    let enemy;
    const sizeWall = 3;
    const numWalls = 20;
    function hndLoad(_event) {
        const canvas = document.querySelector("canvas");
        let floor = createFloor();
        root.appendChild(floor);
        L11_Doom.walls = createWalls();
        root.appendChild(L11_Doom.walls);
        enemy = new L11_Doom.Enemy(new ƒ.Vector3(4, 2, -3));
        root.appendChild(enemy);
        avatar = new L11_Doom.Avatar();
        root.appendChild(avatar);
        L11_Doom.viewport = new ƒ.Viewport();
        L11_Doom.viewport.initialize("Viewport", root, avatar.getComponent(ƒ.ComponentCamera), canvas);
        ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, hndLoop);
        ƒ.Loop.start(ƒ.LOOP_MODE.TIME_GAME, 60);
        canvas.addEventListener("mousemove", hndMouseMove);
        canvas.addEventListener("click", canvas.requestPointerLock);
    }
    function createFloor() {
        let meshQuad = new ƒ.MeshQuad("Quad");
        let txtFloor = new ƒ.TextureImage("../DoomAssets/DEM1_5.png");
        let mtrFloor = new ƒ.Material("Floor", ƒ.ShaderTexture, new ƒ.CoatTextured(null, txtFloor));
        let floor = new ƒaid.Node("Floor", ƒ.Matrix4x4.ROTATION_X(-90), mtrFloor, meshQuad);
        floor.mtxLocal.scale(ƒ.Vector3.ONE(sizeWall * numWalls));
        floor.getComponent(ƒ.ComponentMaterial).pivot.scale(ƒ.Vector2.ONE(numWalls));
        return floor;
    }
    function hndLoop(_event) {
        avatar.update();
        enemy.update(avatar.mtxLocal.translation);
        L11_Doom.viewport.draw();
    }
    function hndMouseMove(_event) {
        // console.log(_event.movementX, _event.movementY);
        avatar.rotate(_event);
    }
    function createWalls() {
        let walls = new ƒ.Node("Walls");
        let txtWall = new ƒ.TextureImage("../DoomAssets/CEMPOIS.png");
        let mtrWall = new ƒ.Material("Wall", ƒ.ShaderTexture, new ƒ.CoatTextured(null, txtWall));
        walls.appendChild(new L11_Doom.Wall(ƒ.Vector2.ONE(3), ƒ.Vector3.Y(sizeWall / 2), ƒ.Vector3.ZERO(), mtrWall));
        walls.appendChild(new L11_Doom.Wall(ƒ.Vector2.ONE(3), ƒ.Vector3.SCALE(new ƒ.Vector3(0.5, 1, -0.866), sizeWall / 2), ƒ.Vector3.Y(120), mtrWall));
        walls.appendChild(new L11_Doom.Wall(ƒ.Vector2.ONE(3), ƒ.Vector3.SCALE(new ƒ.Vector3(-0.5, 1, -0.866), sizeWall / 2), ƒ.Vector3.Y(-120), mtrWall));
        for (let i = -numWalls / 2 + 0.5; i < numWalls / 2; i++) {
            walls.appendChild(new L11_Doom.Wall(ƒ.Vector2.ONE(3), ƒ.Vector3.SCALE(new ƒ.Vector3(-numWalls / 2, 0.5, i), sizeWall), ƒ.Vector3.Y(90), mtrWall));
            // for (let i: number = -numWalls / 2 + 0.5; i < numWalls / 2; i++)
            walls.appendChild(new L11_Doom.Wall(ƒ.Vector2.ONE(3), ƒ.Vector3.SCALE(new ƒ.Vector3(numWalls / 2, 0.5, i), sizeWall), ƒ.Vector3.Y(-90), mtrWall));
            // for (let i: number = -numWalls / 2 + 0.5; i < numWalls / 2; i++)
            walls.appendChild(new L11_Doom.Wall(ƒ.Vector2.ONE(3), ƒ.Vector3.SCALE(new ƒ.Vector3(i, 0.5, -numWalls / 2), sizeWall), ƒ.Vector3.Y(0), mtrWall));
            // for (let i: number = -numWalls / 2 + 0.5; i < numWalls / 2; i++)
            walls.appendChild(new L11_Doom.Wall(ƒ.Vector2.ONE(3), ƒ.Vector3.SCALE(new ƒ.Vector3(i, 0.5, numWalls / 2), sizeWall), ƒ.Vector3.Y(180), mtrWall));
        }
        return walls;
    }
    function bounceOffWalls(_walls) {
        let bouncedOff = [];
        let posAvatar = avatar.mtxLocal.translation;
        for (let wall of _walls) {
            let posBounce = wall.calculateBounce(posAvatar, 1);
            if (posBounce) {
                avatar.mtxLocal.translation = posBounce;
                bouncedOff.push(wall);
            }
        }
        return bouncedOff;
    }
    L11_Doom.bounceOffWalls = bounceOffWalls;
})(L11_Doom || (L11_Doom = {}));
//# sourceMappingURL=Main.js.map