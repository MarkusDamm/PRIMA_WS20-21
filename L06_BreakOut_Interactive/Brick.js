"use strict";
var L06_BreakOut_Interactive;
(function (L06_BreakOut_Interactive) {
    var ƒ = FudgeCore;
    class Brick extends L06_BreakOut_Interactive.GameObject {
        constructor(_name, _position, _size = new ƒ.Vector2(3, 1)) {
            super(_name, _position, _size);
            this.health = 1;
            this.getComponent(ƒ.ComponentMaterial).clrPrimary = ƒ.Color.CSS("SteelBlue");
        }
        processCollision() {
            this.health--;
            console.log(this.health);
            if (this.health <= 0) {
                this.destroy();
            }
        }
        destroy() {
            console.log("Destroy this");
            this.getParent().removeChild(this);
        }
    }
    L06_BreakOut_Interactive.Brick = Brick;
})(L06_BreakOut_Interactive || (L06_BreakOut_Interactive = {}));
//# sourceMappingURL=Brick.js.map