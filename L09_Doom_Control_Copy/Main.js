"use strict";
var L09_Doom_Control_Copy;
(function (L09_Doom_Control_Copy) {
    var ƒ = FudgeCore;
    var ƒaid = FudgeAid;
    window.addEventListener("load", hndLoad);
    let root = new ƒ.Node("Root");
    let avatar;
    function hndLoad(_event) {
        const canvas = document.querySelector("canvas");
        let floor = createFloor();
        root.appendChild(floor);
        let txtWall = new ƒ.TextureImage("../DoomAssets/CEMPOIS.png");
        let mtrWall = new ƒ.Material("Wall", ƒ.ShaderTexture, new ƒ.CoatTextured(null, txtWall));
        let wall = new L09_Doom_Control_Copy.Wall(ƒ.Vector2.ONE(3), ƒ.Vector3.Y(1.5), ƒ.Vector3.ZERO(), mtrWall);
        root.appendChild(wall);
        avatar = new L09_Doom_Control_Copy.Avatar();
        root.appendChild(avatar);
        L09_Doom_Control_Copy.viewport = new ƒ.Viewport();
        L09_Doom_Control_Copy.viewport.initialize("Viewport", root, avatar.getComponent(ƒ.ComponentCamera), canvas);
        ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, hndLoop);
        ƒ.Loop.start(ƒ.LOOP_MODE.TIME_GAME, 60);
    }
    function createFloor() {
        let meshQuad = new ƒ.MeshQuad("Quad");
        let txtFloor = new ƒ.TextureImage("../DoomAssets/DEM1_5.png");
        let mtrFloor = new ƒ.Material("Floor", ƒ.ShaderTexture, new ƒ.CoatTextured(null, txtFloor));
        let floor = new ƒaid.Node("Floor", ƒ.Matrix4x4.ROTATION_X(-90), mtrFloor, meshQuad);
        floor.mtxLocal.scale(ƒ.Vector3.ONE(20));
        floor.getComponent(ƒ.ComponentMaterial).pivot.scale(ƒ.Vector2.ONE(10));
        return floor;
    }
    function hndLoop(_event) {
        avatar.update();
        L09_Doom_Control_Copy.viewport.draw();
    }
})(L09_Doom_Control_Copy || (L09_Doom_Control_Copy = {}));
//# sourceMappingURL=Main.js.map