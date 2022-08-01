class LinkedList {
  #length = 0; // длинна списка
  #head;
  #tail;

  addToTail(value) {
    const node = {
      value: value, // ключ значение
      next: null, // указывает на следующий элемент. По умолчанию null
    };
    if (this.#length === 0) {
      this.#head = node;
      this.#tail = node; // т.е. если один элемент, то он является как началом так и концом
    } else {
      this.#tail = node; // иначе добавляем элемент в конец
    }
    this.#length++; // переходим на следующий index
  }

  removeFromHead() {
    if (this.#length === 0) return;
    const value = this.#head.value;
    this.#head = this.#head.next;
    this.#length--;
    return value;
  }

  size() {
    return this.#length;
  }
}

class Queue extends LinkedList {
  constructor() {
    super();
    this.enqueue = this.addToTail;
    this.dequeue = this.removeFromHead;
  }

  get size() {
    return super.size();
  }
}

const queue = new Queue();
queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);

queue.dequeue();

console.log(queue.size);
