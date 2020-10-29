namespace L04_BreakOut_Reflection {
    import ƒ = FudgeCore;

    export class Ball extends GameObject {
        public constructor(_name: string) {
            super(_name);
            this.getComponent(ƒ.ComponentMaterial).clrPrimary = ƒ.Color.CSS("ForestGreen");
            // this.getComponent(ƒ.ComponentMaterial).material.setCoat(new ƒ.CoatColored(ƒ.Color.CSS("lime")));
            // console.log(this.getComponent(ƒ.ComponentMaterial).material.getCoat().getMutator().color);
        }
    }
}