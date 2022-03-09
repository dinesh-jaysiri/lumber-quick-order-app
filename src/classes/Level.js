export class Level {
  constructor(id, title, instructions, level, uplevel_id, node_end) {
    this.id = id;
    this.title = title;
    this.instructions = instructions;
    this.level = level;
    this.uplevel_id = uplevel_id;
    this.selected = false;
    this.node_end = node_end;
    this.setSelected = this.setSelected.bind(this);
  }

  setSelected(boolian) {
    this.setSelected = boolian;
  }
}
