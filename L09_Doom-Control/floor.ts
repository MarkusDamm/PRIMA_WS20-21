namespace Game {
    import f = FudgeCore;

    export class Floor extends GameObject {
        private static readonly MATERIAL: f.Material = new f.Material('SolidWhite', f.ShaderTexture, new f.CoatTextured(f.Color.CSS('WHITE'), new f.TextureImage('/textures/192.png')));

        /**
         * Creates a new floor based on GameObject
         * @param _position The position of the floor in 3D space
         * @param _size The size of the floor
         */
        public constructor(_position: f.Vector3, _size: f.Vector3) {
            super('Floor', _position, _size, Floor.MATERIAL);
        }
    }
}