const { ccclass, property } = cc._decorator;

@ccclass
export default class Tile extends cc.Component {
  @property({ type: cc.Node })
  public glow: cc.Node = null; // Skeleton animation node

  @property({ type: [cc.SpriteFrame], visible: true })
  private textures = [];

  async onLoad(): Promise<void> {
    this.glow.active = false;
    await this.loadTextures();
  }

  async resetInEditor(): Promise<void> {
    await this.loadTextures();
    this.setRandom();
  }

  async loadTextures(): Promise<boolean> {
    const self = this;
    return new Promise<boolean>(resolve => {
      cc.loader.loadResDir('gfx/Square', cc.SpriteFrame, function afterLoad(err, loadedTextures) {
        self.textures = loadedTextures;
        resolve(true);
      });
    });
  }

  setTile(index: number, isGlowing: boolean = false): void {
    this.node.getComponent(cc.Sprite).spriteFrame = this.textures[index];
    this.glow.active = isGlowing; // Show or hide the animation
  }

  setRandom(): void {
    const randomIndex = Math.floor(Math.random() * this.textures.length);
    this.setTile(randomIndex);
  }
}
