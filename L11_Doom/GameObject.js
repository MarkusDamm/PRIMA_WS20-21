"use strict";
var L11_Doom;
(function (L11_Doom) {
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
        calculateBounce(_posWith, _radius = 1) {
            let normal = this.mtxWorld.getZ();
            let posThis = this.mtxWorld.translation;
            let difference = ƒ.Vector3.DIFFERENCE(_posWith, posThis);
            let distance = ƒ.Vector3.DOT(difference, normal);
            if (distance < 0 || distance > _radius)
                return null;
            let size = this.getComponent(ƒ.ComponentMesh).pivot.scaling;
            let ray = new ƒ.Ray(normal, _posWith);
            let intersect = ray.intersectPlane(posThis, normal);
            let localIntersect = ƒ.Vector3.TRANSFORMATION(intersect, this.mtxWorldInverse, true);
            if (Math.abs(localIntersect.x) - _radius > 0.5 * size.x)
                return null;
            normal.scale(1.001);
            return ƒ.Vector3.SUM(intersect, normal);
        }
    }
    GameObject.meshQuad = new ƒ.MeshQuad();
    L11_Doom.GameObject = GameObject;
})(L11_Doom || (L11_Doom = {}));
//# sourceMappingURL=GameObject.js.map