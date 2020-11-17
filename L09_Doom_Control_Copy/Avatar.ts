namespace L09_Doom_Control_Copy {
    export class Avatar extends ƒ.Node {
        // private ctrRotation: ƒ.Control = new ƒ.Control("AvatarRotation", -0.3, ƒ.CONTROL_TYPE.PROPORTIONAL);
        private ctrSideways: ƒ.Control = new ƒ.Control("AvatarRotation", 0.2, ƒ.CONTROL_TYPE.PROPORTIONAL);
        private ctrForward: ƒ.Control = new ƒ.Control("AvatarSpeed", 0.2, ƒ.CONTROL_TYPE.PROPORTIONAL);

        public constructor() {
            super("Avatar");
            let cmpCamera: ƒ.ComponentCamera = new ƒ.ComponentCamera();
            cmpCamera.pivot.translate(ƒ.Vector3.Y(1.7));
            cmpCamera.backgroundColor = ƒ.Color.CSS("darkblue");
            this.addComponent(cmpCamera);

            this.addComponent(new ƒ.ComponentTransform());
            this.mtxLocal.translateZ(15);
            this.mtxLocal.rotateY(180);

            this.ctrForward.setDelay(100);
            this.ctrSideways.setDelay(50);
        }

        public update(): void {
            this.move();
        }

        public rotate(_event: MouseEvent): void {
            // console.log(_event.movementX, _event.movementY);
            this.mtxLocal.rotateY(_event.movementX * -0.3);
        }

        private move(): void {
            this.ctrForward.setInput(
                ƒ.Keyboard.mapToValue(-1, 0, [ƒ.KEYBOARD_CODE.S, ƒ.KEYBOARD_CODE.ARROW_DOWN])
                + ƒ.Keyboard.mapToValue(1, 0, [ƒ.KEYBOARD_CODE.W, ƒ.KEYBOARD_CODE.ARROW_UP])
            );
            this.ctrSideways.setInput(
                ƒ.Keyboard.mapToValue(1, 0, [ƒ.KEYBOARD_CODE.A, ƒ.KEYBOARD_CODE.ARROW_LEFT])
                + ƒ.Keyboard.mapToValue(-1, 0, [ƒ.KEYBOARD_CODE.D, ƒ.KEYBOARD_CODE.ARROW_RIGHT])
            );
            // this.ctrRotation.setInput(

            // );

            this.mtxLocal.translateZ(this.ctrForward.getOutput());
            this.mtxLocal.translateX(this.ctrSideways.getOutput());
            // this.mtxLocal.rotateY(this.ctrRotation.getOutput());
        }
        // bis Donnerstag Rotation und weiteres movement verfeinert
        // schon an UI oder Gegner setzten?
        // oder Waffen?
    }
}