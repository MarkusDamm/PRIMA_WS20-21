"use strict";
var L06_BreakOut_Interactive;
(function (L06_BreakOut_Interactive) {
    var ƒ = FudgeCore;
    class Ball extends L06_BreakOut_Interactive.GameObject {
        constructor(_name) {
            super(_name);
            this.getComponent(ƒ.ComponentMaterial).clrPrimary = ƒ.Color.CSS("ForestGreen");
            this.setVelocity(new ƒ.Vector2());
        }
        setVelocity(_velocity) {
            this.velocity = ƒ.Vector2.SCALE(_velocity, 2);
        }
        update() {
            this.move();
        }
        isColliding(_target) {
            let intersection = this.rect.getIntersection(_target.rect);
            if (intersection == null) {
                return false;
            }
            return true;
        }
        hdlCollision(_colliderGO) {
            let intersection = this.rect.getIntersection(_colliderGO.rect);
            if (intersection.size.x > intersection.size.y) {
                this.velocity.y = this.velocity.y * -1;
                document.querySelector("div").dispatchEvent(new Event("adjust"));
            }
            else {
                this.velocity.x = this.velocity.x * -1;
                document.querySelector("div").dispatchEvent(new Event("adjust"));
            }
        }
        move() {
            let frameTime = ƒ.Loop.timeFrameGame / 1000;
            let distance = ƒ.Vector2.SCALE(this.velocity, frameTime);
            this.mtxLocal.translate(distance.toVector3());
            this.rect.position = this.mtxLocal.translation.toVector2();
            this.rect.position.add(new ƒ.Vector2(this.rect.size.x / -2, this.rect.size.y / -2));
        }
    }
    L06_BreakOut_Interactive.Ball = Ball;
})(L06_BreakOut_Interactive || (L06_BreakOut_Interactive = {}));
//# sourceMappingURL=Ball.js.map