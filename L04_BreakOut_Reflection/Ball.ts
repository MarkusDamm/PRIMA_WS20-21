namespace L04_BreakOut_Reflection {
    import ƒ = FudgeCore;

    export class Ball extends GameObject {
        public constructor(_name: string) {
            super(_name);
            this.getComponent(ƒ.ComponentMaterial).clrPrimary = ƒ.Color.CSS("ForestGreen");
        }
    }
}