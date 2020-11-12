namespace Game {
    import f = FudgeCore;

    export class GameObject extends f.Node {
        private static readonly MESH_QUAD: f.MeshQuad = new f.MeshQuad();

        /**
         * The constructor constructs a new GameObject. If the object should be moveable,
         * refer to Moveable
         * @param _name The name of the GameObject
         * @param _position The fixed position of the GameObject
         * @param _size The initial size of the GameObject
         */
        public constructor(_name: string, _position: f.Vector3, _size: f.Vector3, _material: f.Material) {
            super(_name);

            this.addComponent(new f.ComponentTransform(f.Matrix4x4.TRANSLATION(_position)));
            this.mtxLocal.rotateX(-90);

            let cmp_quad: f.ComponentMesh = new f.ComponentMesh(GameObject.MESH_QUAD);
            this.addComponent(cmp_quad);
            cmp_quad.pivot.scale(_size);
    
            let cmp_material: f.ComponentMaterial = new f.ComponentMaterial(_material);
            this.addComponent(cmp_material);
        }
    }
}