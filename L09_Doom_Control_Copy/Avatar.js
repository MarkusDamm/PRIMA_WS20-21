"use strict";
var L09_Doom_Control_Copy;
(function (L09_Doom_Control_Copy) {
    class Avatar extends ƒ.Node {
        constructor() {
            super("Avatar");
            let cmpCamera = new ƒ.ComponentCamera();
            this.addComponent(cmpCamera);
            let cmpTransform = new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(ƒ.Vector3.ZERO()));
            this.addComponent(cmpTransform);
        }
    }
    L09_Doom_Control_Copy.Avatar = Avatar;
})(L09_Doom_Control_Copy || (L09_Doom_Control_Copy = {}));
//# sourceMappingURL=Avatar.js.map