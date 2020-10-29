"use strict";
var L04_BreakOut_Reflection;
(function (L04_BreakOut_Reflection) {
    var ƒ = FudgeCore;
    class Ball extends L04_BreakOut_Reflection.GameObject {
        constructor(_name) {
            super(_name);
            this.getComponent(ƒ.ComponentMaterial).clrPrimary = ƒ.Color.CSS("ForestGreen");
            // this.getComponent(ƒ.ComponentMaterial).material.setCoat(new ƒ.CoatColored(ƒ.Color.CSS("lime")));
            // console.log(this.getComponent(ƒ.ComponentMaterial).material.getCoat().getMutator().color);
        }
    }
    L04_BreakOut_Reflection.Ball = Ball;
})(L04_BreakOut_Reflection || (L04_BreakOut_Reflection = {}));
//# sourceMappingURL=Ball.js.map