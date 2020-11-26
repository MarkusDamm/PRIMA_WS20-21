"use strict";
var L11_Doom;
(function (L11_Doom) {
    class Enemy extends L11_Doom.GameObject {
        constructor(_position) {
            super("Enemy", Enemy.SIZE, _position, ƒ.Vector3.ZERO());
            this.speed = 0.1;
            this.show = new ƒAid.Node("Show", ƒ.Matrix4x4.IDENTITY());
            this.appendChild(this.show);
            this.sprite = new ƒAid.NodeSprite("Sprite");
            this.show.appendChild(this.sprite);
            this.sprite.setAnimation(Enemy.animations["Idle_000"]);
            // let mtrEnemy: ƒ.Material = new ƒ.Material("Enemy", ƒ.ShaderTexture, new ƒ.CoatTextured(null, Enemy.TXT_ENEMY));
            // let cmpMaterial: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(mtrEnemy);
            // cmpMaterial.pivot.scale(ƒ.Vector2.ONE(1));
            // this.addComponent(cmpMaterial);
        }
        static generateSprites(_spritesheet) {
            Enemy.animations = {};
            for (let angle = 0; angle < 4; angle++) {
                let name = "Idle" + ANGLE[angle];
                let sprite = new ƒAid.SpriteSheetAnimation(name, _spritesheet);
                sprite.generateByGrid(ƒ.Rectangle.GET(44, 33, 82, 108), 4, 32, ƒ.ORIGIN2D.BOTTOMCENTER, ƒ.Vector2.Y(35));
                Enemy.animations[name] = sprite;
            }
        }
        update(_avatarPosition) {
            this.mtxLocal.showTo(_avatarPosition, ƒ.Vector3.Y(), true);
            if (this.checkVision()) {
                this.moveTowards();
            }
        }
        moveTowards() {
            this.mtxLocal.translateZ(this.speed);
        }
        checkVision() {
            return true;
        }
    }
    Enemy.TXT_ENEMY = new ƒ.TextureImage("../DoomAssets/Cyberdemon01.png");
    Enemy.SIZE = ƒ.Vector2.ONE(2);
    L11_Doom.Enemy = Enemy;
    let ANGLE;
    (function (ANGLE) {
        // N = 0, NE = 1, E = 2, SE = 3, S = 4, SW = 5, W = 6, NW = 7,
        ANGLE[ANGLE["_000"] = 0] = "_000";
        ANGLE[ANGLE["_045"] = 1] = "_045";
        ANGLE[ANGLE["_090"] = 2] = "_090";
        ANGLE[ANGLE["_135"] = 3] = "_135";
        ANGLE[ANGLE["_180"] = 4] = "_180";
        ANGLE[ANGLE["_225"] = 5] = "_225";
        ANGLE[ANGLE["_270"] = 6] = "_270";
        ANGLE[ANGLE["_315"] = 7] = "_315";
    })(ANGLE = L11_Doom.ANGLE || (L11_Doom.ANGLE = {}));
})(L11_Doom || (L11_Doom = {}));
//# sourceMappingURL=Enemy.js.map