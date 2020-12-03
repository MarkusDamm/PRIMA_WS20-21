"use strict";
var L15_Doom_UI;
(function (L15_Doom_UI) {
    class UI {
        constructor(_startHealth, _startAmmo, _startMaxAmmo) {
            this.uiElements = document.querySelector(".UI");
            this.setHealth(_startHealth);
            this.curAmmo = _startAmmo;
            this.maxAmmo = _startMaxAmmo;
        }
        setHealth(_health) {
            this.health = _health;
        }
    }
    L15_Doom_UI.UI = UI;
})(L15_Doom_UI || (L15_Doom_UI = {}));
//# sourceMappingURL=UI.js.map