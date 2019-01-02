import * as tile from './tiles/';

export default class tiles {
  constructor (options) {
    this.cell = options.cell;
    this.list = options.list;
    this.tiles = [];
    this.sprites = [];

    if (this.cell.x > this.cell.max || this.cell.y > this.cell.max)
      return;

    // initialize tiles
    for (let i = 0; i < this.list.length; i++) {
      this[this.list[i].type] = null;
      this.set(this.list[i].type, this.list[i].id);
    }
  }

  getId (type) {
    return this.get(type, true);
  }
  
  get (type, id = false) {
    if (!this[type])
      if (!id)
        return;
      else
        return 0;

    if (this[type])
      if (id)
        return this[type].id;
      else
        return this[type];
  }

  addSprite (sprite, type) {
    this.sprites.push(sprite);
    this.cell.scene.city.map.addSprite(sprite, type);
  }

  topSprite () {
    this.sprites.sort((a, b) => {
      return a._depth - b._depth;
    });

    return this.sprites[this.sprites.length - 1];
  }

  addTile (tile) {
    this.tiles.push(tile);
  }

  topTile () {
    this.tiles.sort((a, b) => {
      if (a.sprite && !a.sprite.visible)
        return -1;

      if (b.sprite && !b.sprite.visible)
        return 1;

      return a.depth - b.depth;
    });

    return this.tiles[this.tiles.length - 1];
  }

  has (type) {
    if (this[type] && this[type].draw)
      return true;

    return false;
  }

  set (type, id) {
    this[type] = new tile[type]({
      cell: this.cell,
      id: id
    });
  }

  create () {
    for (let i = 0; i < this.list.length; i++)
      if (this[this.list[i].type])
        this[this.list[i].type].create();
  }
}