export class SharedData {
  static aux: number = 0;

  setAux(): void {
    SharedData.aux++;
  }
}
