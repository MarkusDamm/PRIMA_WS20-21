"use strict";
var L09_Doom_Control_Copy;
(function (L09_Doom_Control_Copy) {
    var ƒ = FudgeCore;
    class GameObject extends ƒ.Node {
        constructor(_name, _size, _position, _rotation) {
            super(_name);
            this.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(_position)));
            this.mtxLocal.rotation = _rotation;
            let cmpQuad = new ƒ.ComponentMesh(GameObject.meshQuad);
            this.addComponent(cmpQuad);
            cmpQuad.pivot.scale(_size.toVector3(1));
        }
    }
    GameObject.meshQuad = new ƒ.MeshQuad();
    L09_Doom_Control_Copy.GameObject = GameObject;
})(L09_Doom_Control_Copy || (L09_Doom_Control_Copy = {}));
//# sourceMappingURL=GameObject.js.map