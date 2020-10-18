namespace L02_Ball {
    import ƒ = FudgeCore;

    document.addEventListener("DOMContentLoaded", init);
    let root: ƒ.Node = new ƒ.Node("Root");
    let cmpCamera: ƒ.ComponentCamera = new ƒ.ComponentCamera();
    let viewPort: ƒ.Viewport;

    //#region Velocity-variables
    let xInput: HTMLInputElement;
    let xSpeed: number;
    let yInput: HTMLInputElement;
    let ySpeed: number;
    //#endregion
    
    function init(_event: Event): void {
        let cmpTransformRoot: ƒ.ComponentTransform = new ƒ.ComponentTransform();
        root.addComponent(cmpTransformRoot);

        let canvas: HTMLCanvasElement = document.querySelector("canvas");
        cmpCamera.pivot.translateZ(2);
        cmpCamera.pivot.rotateY(180);

        viewPort = new ƒ.Viewport();
        viewPort.initialize("ViewPort", root, cmpCamera, canvas);

        let colorCicle: ƒ.Color = ƒ.Color.CSS("green");
        let circle: ƒ.Node = createCircle(colorCicle);
        root.appendChild(circle);

        xInput = document.querySelector("input#X");
        xSpeed = Number(xInput.value);
        yInput = document.querySelector("input#Y");
        ySpeed = Number(yInput.value);
        document.querySelector("div").addEventListener("input", hdlinput);

        ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, hdlUpdate);
        ƒ.Loop.start(ƒ.LOOP_MODE.TIME_GAME, 30);

        viewPort.draw();
    }

    function createCircle(_color: ƒ.Color): ƒ.Node {
        let circle: ƒ.Node = new ƒ.Node("Circle");
        let meshCircle: ƒ.MeshSphere = new ƒ.MeshSphere("MeshCircle", 10, 10);
        let cmpMeshCircle: ƒ.ComponentMesh = new ƒ.ComponentMesh(meshCircle);
        circle.addComponent(cmpMeshCircle);

        let matCircle: ƒ.Material = new ƒ.Material("CircleMat", ƒ.ShaderUniColor, new ƒ.CoatColored(_color));
        let cmpMatCircle: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(matCircle);
        circle.addComponent(cmpMatCircle);

        let cmpTransCircle: ƒ.ComponentTransform = new ƒ.ComponentTransform();
        let v3ScaleCircle: ƒ.Vector3 = new ƒ.Vector3(0.2, 0.2, 0.01);
        cmpTransCircle.local.scale(v3ScaleCircle);
        circle.addComponent(cmpTransCircle);

        return circle;
    }

    function hdlinput(_event: Event): void {
        // console.log("input");
        xInput = document.querySelector("input#X");
        xSpeed = Number(xInput.value);
        yInput = document.querySelector("input#Y");
        ySpeed = Number(yInput.value);
    }

    function hdlUpdate(_event: Event): void {
        let mulitplier: number = 0.003;

        let v3Translate: ƒ.Vector3 = new ƒ.Vector3(xSpeed * mulitplier, ySpeed * mulitplier, 0);
        root.mtxLocal.translate(v3Translate);
        // ƒ.Debug.log(root.mtxLocal.translation);     // Border at around 0.72;

        if (root.mtxLocal.translation.x <= -0.72 || root.mtxLocal.translation.x >= 0.72) {
            xInput.value = (Number(xInput.value) * -1).toString();
            document.querySelector("div").dispatchEvent(new Event("input"));
        }
        if (root.mtxLocal.translation.y <= -0.72 || root.mtxLocal.translation.y >= 0.72) {
            yInput.value = (Number(yInput.value) * -1).toString();
            document.querySelector("div").dispatchEvent(new Event("input"));
        }

        viewPort.draw();
    }

}