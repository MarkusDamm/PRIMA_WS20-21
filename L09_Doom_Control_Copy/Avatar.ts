namespace L09_Doom_Control_Copy {
    export class Avatar extends ƒ.Node {
        private ctrSpeed: ƒ.Control = new ƒ.Control("AvatarSpeed", 1, ƒ.CONTROL_TYPE.PROPORTIONAL);
        private ctrRotation: ƒ.Control = new ƒ.Control("AvatarRotation", 3, ƒ.CONTROL_TYPE.PROPORTIONAL);

        public constructor() {
            super("Avatar");

            let cmpCamera: ƒ.ComponentCamera = new ƒ.ComponentCamera();
            cmpCamera.pivot.translate(ƒ.Vector3.Y(1.7));
            cmpCamera.backgroundColor = ƒ.Color.CSS("darkblue");
            this.addComponent(cmpCamera);

            this.addComponent(new ƒ.ComponentTransform());
            this.mtxLocal.translateZ(15);
            this.mtxLocal.rotateY(180);

            this.ctrSpeed.setDelay(100);
            this.ctrRotation.setDelay(50);
        }

        public update(): void {
            this.move();
        }

        private move(): void {
            this.ctrSpeed.setInput(
                ƒ.Keyboard.mapToValue(-1, 0, [ƒ.KEYBOARD_CODE.S, ƒ.KEYBOARD_CODE.ARROW_DOWN])
                + ƒ.Keyboard.mapToValue(1, 0, [ƒ.KEYBOARD_CODE.W, ƒ.KEYBOARD_CODE.ARROW_UP])
            );
            this.ctrRotation.setInput(
                ƒ.Keyboard.mapToValue(1, 0, [ƒ.KEYBOARD_CODE.A, ƒ.KEYBOARD_CODE.ARROW_LEFT])
                + ƒ.Keyboard.mapToValue(-1, 0, [ƒ.KEYBOARD_CODE.D, ƒ.KEYBOARD_CODE.ARROW_RIGHT])
            );

            this.mtxLocal.translateZ(this.ctrSpeed.getOutput());
            this.mtxLocal.rotateY(this.ctrRotation.getOutput());
        }
    }
}