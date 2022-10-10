type TaskProps = {
  description: string;
  id?: number;
  quantity?: number;
  done?: boolean;
};

export class Task {
  private id: number | undefined;
  private description: string;
  private quantity: number;
  private done: boolean;

  constructor(props: TaskProps) {
    this.id = props.id ? props.id : undefined;
    this.description = props.description;
    this.quantity = props.quantity || 0;
    this.done = props.done || false;
  }

  static emptyTask() {
    return new Task({
      description: "",
    });
  }

  getId(): number | undefined {
    return this.id;
  }

  setId(id: number) {
    this.id = id;
  }

  getDescription() {
    return this.description;
  }

  setDescription(description: string) {
    this.description = description;
  }

  getQuantity() {
    return this.quantity;
  }

  setQuantity(quantity: number) {
    this.quantity = quantity;
  }

  getDone() {
    return this.done;
  }

  toogleDone() {
    this.done = !this.done;
  }
}
