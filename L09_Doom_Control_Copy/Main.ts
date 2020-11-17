namespace L09_Doom_Control_Copy {
  import ƒ = FudgeCore;
  import ƒaid = FudgeAid;

  window.addEventListener("load", hndLoad);

  export let viewport: ƒ.Viewport;
  let root: ƒ.Node = new ƒ.Node("Root");
  let avatar: Avatar;

  function hndLoad(_event: Event): void {
    const canvas: HTMLCanvasElement = document.querySelector("canvas");

    let floor: ƒaid.Node = createFloor();
    root.appendChild(floor);

    let txtWall: ƒ.TextureImage = new ƒ.TextureImage("../DoomAssets/CEMPOIS.png");
    let mtrWall: ƒ.Material = new ƒ.Material("Wall", ƒ.ShaderTexture, new ƒ.CoatTextured(null, txtWall));

    let wall: Wall = new Wall(ƒ.Vector2.ONE(3), ƒ.Vector3.Y(1.5), ƒ.Vector3.ZERO(), mtrWall);
    root.appendChild(wall);

    avatar = new Avatar();
    root.appendChild(avatar);

    viewport = new ƒ.Viewport();
    viewport.initialize("Viewport", root, avatar.getComponent(ƒ.ComponentCamera), canvas);

    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, hndLoop);
    ƒ.Loop.start(ƒ.LOOP_MODE.TIME_GAME, 60);
  }

  function createFloor(): ƒaid.Node {
    let meshQuad: ƒ.MeshQuad = new ƒ.MeshQuad("Quad");

    let txtFloor: ƒ.TextureImage = new ƒ.TextureImage("../DoomAssets/DEM1_5.png");
    let mtrFloor: ƒ.Material = new ƒ.Material("Floor", ƒ.ShaderTexture, new ƒ.CoatTextured(null, txtFloor));
    let floor: ƒaid.Node = new ƒaid.Node("Floor", ƒ.Matrix4x4.ROTATION_X(-90), mtrFloor, meshQuad);
    floor.mtxLocal.scale(ƒ.Vector3.ONE(20));
    floor.getComponent(ƒ.ComponentMaterial).pivot.scale(ƒ.Vector2.ONE(10));
    return floor;
  }

  function hndLoop(_event: Event): void {
    avatar.update();
    viewport.draw();
  }
}