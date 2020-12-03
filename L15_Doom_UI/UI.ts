namespace L15_Doom_UI {
  export class UI {

    private uiElements: HTMLElement;
    private health: number;
    private curAmmo: number;
    private maxAmmo: number;


    public constructor(_startHealth: number, _startAmmo: number, _startMaxAmmo: number) {
      this.uiElements = document.querySelector(".UI");
      this.setHealth(_startHealth);
      this.curAmmo = _startAmmo;
      this.maxAmmo = _startMaxAmmo;
    }

    private setHealth(_health: number): void {
      this.health = _health;
    }
  }
}