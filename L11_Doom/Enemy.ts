namespace L11_Doom {
  export class Enemy extends GameObject {
    protected static readonly TXT_ENEMY: ƒ.TextureImage = new ƒ.TextureImage("../DoomAssets/Cyberdemon01.png");
    protected static readonly SIZE: ƒ.Vector2 = ƒ.Vector2.ONE(2);

    private static animations: ƒAid.SpriteSheetAnimations;

    protected show: ƒ.Node;
    protected sprite: ƒAid.NodeSprite;
    protected posTarget: ƒ.Vector3;

    protected health: number;
    protected speed: number = 0.1;

    constructor(_position: ƒ.Vector3) {
      super("Enemy", Enemy.SIZE, _position, ƒ.Vector3.ZERO());

      this.show = new ƒAid.Node("Show", ƒ.Matrix4x4.IDENTITY());
      this.appendChild(this.show);

      this.sprite = new ƒAid.NodeSprite("Sprite");
      this.show.appendChild(this.sprite);

      this.sprite.setAnimation(<ƒAid.SpriteSheetAnimation>Enemy.animations["Idle_000"]);

      // let mtrEnemy: ƒ.Material = new ƒ.Material("Enemy", ƒ.ShaderTexture, new ƒ.CoatTextured(null, Enemy.TXT_ENEMY));
      // let cmpMaterial: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(mtrEnemy);
      // cmpMaterial.pivot.scale(ƒ.Vector2.ONE(1));

      // this.addComponent(cmpMaterial);
    }

    public static generateSprites(_spritesheet: ƒ.CoatTextured): void {
      Enemy.animations = {};
      for (let angle: number = 0; angle < 4; angle++) {
        let name: string = "Idle" + ANGLE[angle];
        let sprite: ƒAid.SpriteSheetAnimation = new ƒAid.SpriteSheetAnimation(name, _spritesheet);
        sprite.generateByGrid(ƒ.Rectangle.GET(44, 33, 82, 108), 4, 32, ƒ.ORIGIN2D.BOTTOMCENTER, ƒ.Vector2.Y(35));
        Enemy.animations[name] = sprite;
      }
    }

    public update(_avatarPosition: ƒ.Vector3): void {
      this.mtxLocal.showTo(_avatarPosition, ƒ.Vector3.Y(), true);
      if (this.checkVision()) {
        this.moveTowards();
      }
    }


    protected moveTowards(): void {
      this.mtxLocal.translateZ(this.speed);
    }

    protected checkVision(): boolean {

      return true;
    }

    // bis Dienstag: Gegner bei Sichtkontakt zum Spieler auf ihn zu bewegen
    // -> Ray zum Spieler -> wenn der Ray eine Wand zw Figur und Spieler trifft
    // Spritesheet vom Hare-Beispiel versuchen für den Gegner zu nutzen
    // Winkel des Gegners berechnen => daraus die richtigen Sprites ableiten und verwenden
  }

  export enum ANGLE {
    // N = 0, NE = 1, E = 2, SE = 3, S = 4, SW = 5, W = 6, NW = 7,
    _000 = 0, _045 = 1, _090 = 2, _135 = 3, _180 = 4, _225 = 5, _270 = 6, _315 = 7
  }
}