namespace Game {
    import f = FudgeCore;
    import utils = Utils;

    export class Wall extends GameObject {
        private static readonly TEXTURE_MATERIAL: f.Material = new f.Material('Texture', f.ShaderTexture, new f.CoatTextured(f.Color.CSS('WHITE'), new f.TextureImage('textures/059.png')));

        /**
         * Creates a new wall based on GameObject
         * @param _position The position of the wall in 3D space
         * @param _size The size of the wall
         */
        public constructor(_position: f.Vector3, _size: f.Vector3, _zRotation: number) {
            const id: String = utils.randID(16); 
            super(`Wall-${id}`, _position, _size, Wall.TEXTURE_MATERIAL);

            this.mtxLocal.rotateY(90);
            this.mtxLocal.rotateX(_zRotation);
        }
    }
}