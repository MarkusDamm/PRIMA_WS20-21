"use strict";
var L11_Doom;
(function (L11_Doom) {
    class Enemy extends L11_Doom.GameObject {
        constructor(_position) {
            super("Enemy", Enemy.SIZE, _position, ƒ.Vector3.ZERO());
            let mtrEnemy = new ƒ.Material("Wall", ƒ.ShaderTexture, new ƒ.CoatTextured(null, Enemy.TXT_ENEMY));
            let cmpMaterial = new ƒ.ComponentMaterial(mtrEnemy);
            cmpMaterial.pivot.scale(ƒ.Vector2.ONE(1));
            this.addComponent(cmpMaterial);
        }
        update(_avatarPosition) {
            this.mtxLocal.showTo(_avatarPosition, ƒ.Vector3.Y(), true);
            if (this.checkVision()) {
                this.moveTowards(_avatarPosition, 1);
            }
        }
        moveTowards(_targetPosition, _speed) {
            let distance = ƒ.Vector3.DIFFERENCE(_targetPosition, this.mtxWorld.translation);
            distance.scale(_speed / 100); // Länge des Vectors begrenzen?
            this.mtxLocal.translateX(distance.x);
            this.mtxLocal.translateZ(distance.z);
        }
        checkVision() {
            return true;
        }
    }
    Enemy.TXT_ENEMY = new ƒ.TextureImage("../DoomAssets/Cyberdemon01.png");
    Enemy.SIZE = ƒ.Vector2.ONE(2);
    L11_Doom.Enemy = Enemy;
})(L11_Doom || (L11_Doom = {}));
//# sourceMappingURL=Enemy.js.map