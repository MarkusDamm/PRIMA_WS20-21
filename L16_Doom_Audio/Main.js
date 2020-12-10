"use strict";
var L16_Doom_Audio;
(function (L16_Doom_Audio) {
    var ƒ = FudgeCore;
    var ƒaid = FudgeAid;
    window.addEventListener("load", hndLoad);
    let root = new ƒ.Node("Root");
    let ui;
    let avatar;
    let enemies;
    L16_Doom_Audio.sizeWall = 3;
    L16_Doom_Audio.numWalls = 20;
    const clrWhite = ƒ.Color.CSS("white");
    async function hndLoad(_event) {
        const canvas = document.querySelector("canvas");
        await setupUI();
        ui = new L16_Doom_Audio.UI(50, 10, 25);
        let floor = createFloor();
        root.appendChild(floor);
        L16_Doom_Audio.walls = createWalls();
        root.appendChild(L16_Doom_Audio.walls);
        enemies = await createEnemies();
        root.appendChild(enemies);
        avatar = new L16_Doom_Audio.Avatar();
        root.appendChild(avatar);
        L16_Doom_Audio.viewport = new ƒ.Viewport();
        L16_Doom_Audio.viewport.initialize("Viewport", root, avatar.head.getComponent(ƒ.ComponentCamera), canvas);
        L16_Doom_Audio.viewport.draw();
        ƒ.AudioManager.default.listenTo(root);
        ƒ.AudioManager.default.listenWith(avatar.getComponent(ƒ.ComponentAudioListener));
        ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, hndLoop);
        ƒ.Loop.start(ƒ.LOOP_MODE.TIME_GAME, 60);
        canvas.addEventListener("mousemove", hndMouseMove);
        canvas.addEventListener("click", canvas.requestPointerLock);
        // canvas.addEventListener("click", canvas.requestPointerLock);
    }
    async function setupUI() {
        let txtFace = new ƒ.TextureImage();
        await txtFace.load("../DoomAssets/Doom_GuyFaces.png");
        let coatSprite = new ƒ.CoatTextured(clrWhite, txtFace);
        L16_Doom_Audio.UI.generateSprites(coatSprite);
    }
    async function createEnemies() {
        let enemies = new ƒ.Node("Enemies");
        let txtEnemy = new ƒ.TextureImage();
        await txtEnemy.load("../DoomAssets/Cyberdemon_transparent.png");
        let coatSprite = new ƒ.CoatTextured(clrWhite, txtEnemy);
        L16_Doom_Audio.Enemy.generateSprites(coatSprite);
        enemies.appendChild(new L16_Doom_Audio.Enemy(new ƒ.Vector3(4, 0, -3)));
        // enemies.appendChild(new Enemy(new ƒ.Vector3(-4, 0, -3)));
        return enemies;
    }
    function createFloor() {
        let meshQuad = new ƒ.MeshQuad("Quad");
        let txtFloor = new ƒ.TextureImage("../DoomAssets/DEM1_5.png");
        let mtrFloor = new ƒ.Material("Floor", ƒ.ShaderTexture, new ƒ.CoatTextured(clrWhite, txtFloor));
        let floor = new ƒaid.Node("Floor", ƒ.Matrix4x4.ROTATION_X(-90), mtrFloor, meshQuad);
        floor.mtxLocal.scale(ƒ.Vector3.ONE(L16_Doom_Audio.sizeWall * L16_Doom_Audio.numWalls));
        floor.getComponent(ƒ.ComponentMaterial).pivot.scale(ƒ.Vector2.ONE(L16_Doom_Audio.numWalls));
        return floor;
    }
    function hndLoop(_event) {
        ui.update();
        avatar.update();
        for (let enemy of enemies.getChildren()) {
            // enemy.update();
            enemy.update(avatar.mtxWorld.translation);
        }
        ƒ.AudioManager.default.update();
        L16_Doom_Audio.viewport.draw();
    }
    function hndMouseMove(_event) {
        // console.log(_event.movementX, _event.movementY);
        avatar.rotate(_event);
    }
    function createWalls() {
        let walls = new ƒ.Node("Walls");
        let txtWall = new ƒ.TextureImage("../DoomAssets/CEMPOIS.png");
        let mtrWall = new ƒ.Material("Wall", ƒ.ShaderTexture, new ƒ.CoatTextured(clrWhite, txtWall));
        // walls.appendChild(new Wall(ƒ.Vector2.ONE(3), ƒ.Vector3.Y(sizeWall / 2), ƒ.Vector3.ZERO(), mtrWall));
        // walls.appendChild(new Wall(ƒ.Vector2.ONE(3), ƒ.Vector3.SCALE(new ƒ.Vector3(0.5, 1, -0.866), sizeWall / 2), ƒ.Vector3.Y(120), mtrWall));
        // walls.appendChild(new Wall(ƒ.Vector2.ONE(3), ƒ.Vector3.SCALE(new ƒ.Vector3(-0.5, 1, -0.866), sizeWall / 2), ƒ.Vector3.Y(-120), mtrWall));
        for (let i = -L16_Doom_Audio.numWalls / 2 + 0.5; i < L16_Doom_Audio.numWalls / 2; i++) {
            walls.appendChild(new L16_Doom_Audio.Wall(ƒ.Vector2.ONE(3), ƒ.Vector3.SCALE(new ƒ.Vector3(-L16_Doom_Audio.numWalls / 2, 0.5, i), L16_Doom_Audio.sizeWall), ƒ.Vector3.Y(90), mtrWall));
            // for (let i: number = -numWalls / 2 + 0.5; i < numWalls / 2; i++)
            walls.appendChild(new L16_Doom_Audio.Wall(ƒ.Vector2.ONE(3), ƒ.Vector3.SCALE(new ƒ.Vector3(L16_Doom_Audio.numWalls / 2, 0.5, i), L16_Doom_Audio.sizeWall), ƒ.Vector3.Y(-90), mtrWall));
            // for (let i: number = -numWalls / 2 + 0.5; i < numWalls / 2; i++)
            walls.appendChild(new L16_Doom_Audio.Wall(ƒ.Vector2.ONE(3), ƒ.Vector3.SCALE(new ƒ.Vector3(i, 0.5, -L16_Doom_Audio.numWalls / 2), L16_Doom_Audio.sizeWall), ƒ.Vector3.Y(0), mtrWall));
            // for (let i: number = -numWalls / 2 + 0.5; i < numWalls / 2; i++)
            walls.appendChild(new L16_Doom_Audio.Wall(ƒ.Vector2.ONE(3), ƒ.Vector3.SCALE(new ƒ.Vector3(i, 0.5, L16_Doom_Audio.numWalls / 2), L16_Doom_Audio.sizeWall), ƒ.Vector3.Y(180), mtrWall));
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
    L16_Doom_Audio.bounceOffWalls = bounceOffWalls;
    function calculateAngle(_vectorA, _vectorB) {
        let angle = 0;
        let dotProduct = ƒ.Vector3.DOT(_vectorA, _vectorB);
        let lengthA = calculateVectorLenght(_vectorA);
        let lengthB = calculateVectorLenght(_vectorB);
        angle = dotProduct / (lengthA * lengthB);
        console.log(_vectorA);
        return angle;
    }
    L16_Doom_Audio.calculateAngle = calculateAngle;
    function calculateVectorLenght(_vector) {
        let length = _vector.x * _vector.x + _vector.y * _vector.y + _vector.z * _vector.z;
        length = Math.sqrt(length);
        return length;
    }
})(L16_Doom_Audio || (L16_Doom_Audio = {}));
//# sourceMappingURL=Main.js.map