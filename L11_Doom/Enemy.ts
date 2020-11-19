namespace L11_Doom {
  export class Enemy extends GameObject {
    protected static readonly TXT_ENEMY: ƒ.TextureImage = new ƒ.TextureImage("../DoomAssets/Cyberdemon01.png");
    protected static readonly SIZE: ƒ.Vector2 = ƒ.Vector2.ONE(2);

    protected health: number;

    constructor(_position: ƒ.Vector3) {
      super("Enemy", Enemy.SIZE, _position, ƒ.Vector3.ZERO());

      let mtrEnemy: ƒ.Material = new ƒ.Material("Wall", ƒ.ShaderTexture, new ƒ.CoatTextured(null, Enemy.TXT_ENEMY));
      let cmpMaterial: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(mtrEnemy);
      cmpMaterial.pivot.scale(ƒ.Vector2.ONE(1));

      this.addComponent(cmpMaterial);
    }

    public update(_avatarPosition: ƒ.Vector3): void {
      this.mtxLocal.showTo(_avatarPosition, ƒ.Vector3.Y(), true);
      if (this.checkVision()) {
        this.moveTowards(_avatarPosition, 1);
      }
    }

    protected moveTowards(_targetPosition: ƒ.Vector3, _speed: number): void {
      let distance: ƒ.Vector3 = ƒ.Vector3.DIFFERENCE(_targetPosition, this.mtxWorld.translation);
      distance.scale(_speed / 100); // Länge des Vectors begrenzen?

      this.mtxLocal.translateX(distance.x);
      this.mtxLocal.translateZ(distance.z);
    }

    protected checkVision(): boolean {
      return true;
    }

    // bis Dienstag: Gegner bei Sichtkontakt zum Spieler auf ihn zu bewegen
    // -> Ray zum Spieler, wenn der Ray eine Wand zw Figur und Spieler trifft, 
  }
}