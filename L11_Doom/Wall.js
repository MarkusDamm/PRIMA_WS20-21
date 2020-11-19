"use strict";
var L11_Doom;
(function (L11_Doom) {
    var ƒ = FudgeCore;
    class Wall extends L11_Doom.GameObject {
        constructor(_size, _position, _rotation, _material) {
            super("Wall", _size, _position, _rotation);
            let cmpMaterial = new ƒ.ComponentMaterial(_material);
            cmpMaterial.pivot.scale(ƒ.Vector2.ONE(1));
            this.addComponent(cmpMaterial);
        }
    }
    L11_Doom.Wall = Wall;
})(L11_Doom || (L11_Doom = {}));
//# sourceMappingURL=Wall.js.map