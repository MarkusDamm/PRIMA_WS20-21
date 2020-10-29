"use strict";
var L04_BreakOut_Reflection;
(function (L04_BreakOut_Reflection) {
    var ƒ = FudgeCore;
    class Ball extends L04_BreakOut_Reflection.GameObject {
        constructor(_name) {
            super(_name);
            this.getComponent(ƒ.ComponentMaterial).clrPrimary = ƒ.Color.CSS("ForestGreen");
        }
        setVelocity(_velocity) {
            this.velocity = ƒ.Vector2.SCALE(_velocity, 2);
        }
        update() {
            // move 
            this.move();
        }
        isColliding(_target) {
            let intersection = this.rect.getIntersection(_target.rect);
            if (intersection == null) {
                return false;
            }
            return true;
        }
        // public hdlCollision(_colliderGO: GameObject): void {
        //     let intersection: ƒ.Rectangle = this.rect.getIntersection(_colliderGO.rect);
        //     if (intersection.size.x > intersection.size.y) {
        //         yInput.value = (Number(yInput.value) * -1).toString();
        //         document.querySelector("div").dispatchEvent(new Event("input"));
        //     }
        //     else {
        //         xInput.value = (Number(xInput.value) * -1).toString();
        //         document.querySelector("div").dispatchEvent(new Event("input"));
        //     }
        // }
        move() {
            let frameTime = ƒ.Loop.timeFrameGame / 1000;
            let distance = ƒ.Vector2.SCALE(this.velocity, frameTime);
            this.mtxLocal.translate(distance.toVector3());
            this.rect.position = this.mtxLocal.translation.toVector2();
            this.rect.position.add(new ƒ.Vector2(this.rect.size.x / -2, this.rect.size.y / -2));
        }
    }
    L04_BreakOut_Reflection.Ball = Ball;
})(L04_BreakOut_Reflection || (L04_BreakOut_Reflection = {}));
//# sourceMappingURL=Ball.js.map