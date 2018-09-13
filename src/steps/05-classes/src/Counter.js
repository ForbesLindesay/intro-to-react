export default class Counter {
  value = 0;
  increment() {
    this.value++;
  }
  decrement() {
    this.value--;
  }
  toString() {
    return `${this.value}`;
  }
}
