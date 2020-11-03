namespace L06_BreakOut_Interactive {
    import ƒ = FudgeCore;
    export class Controller extends Moveable {
        public static readonly MOVE_VECTOR_RIGHT: ƒ.Vector2 = ƒ.Vector2.X(10);
        public static readonly MOVE_VECTOR_LEFT: ƒ.Vector2 = ƒ.Vector2.X(-10);

        public constructor(_name: string, _position: ƒ.Vector2, _size: ƒ.Vector2 = new ƒ.Vector2(3, 1)) {
            super(_name, _position, _size);
            this.getComponent(ƒ.ComponentMaterial).clrPrimary = ƒ.Color.CSS("Orange");
        }

        public setVelocity(_velocity: ƒ.Vector2 = Controller.MOVE_VECTOR_RIGHT): void {
            this.velocity = _velocity;
        }


    }
}