namespace L06_BreakOut_Interactive {
    import ƒ = FudgeCore;

    export class Brick extends GameObject {
        private health: number = 3;

        public constructor(_name: string, _position: ƒ.Vector2, _size: ƒ.Vector2 = new ƒ.Vector2(3, 1)) {
            super(_name, _position, _size);
            this.getComponent(ƒ.ComponentMaterial).clrPrimary = ƒ.Color.CSS("SteelBlue");
        }

        public processCollision(): void {
            this.health--;
            if (this.health == 2) 
                this.getComponent(ƒ.ComponentMaterial).clrPrimary = ƒ.Color.CSS("GoldenRod");
            else if (this.health == 1)
                this.getComponent(ƒ.ComponentMaterial).clrPrimary = ƒ.Color.CSS("Maroon");
            else if (this.health <= 0) 
                this.destroy();
        }

        private destroy(): void {
            this.getParent().removeChild(this);
        }
    }
}