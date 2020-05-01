const { ccclass, property } = cc._decorator;

@ccclass
export default class GameManager extends cc.Component {
  @property(cc.Node)
  machine = null;

  @property({ type: cc.AudioClip })
  audioClick = null;

  private block = false;

  private result = null;

  start(): void {
    this.machine.getComponent('Machine').createMachine();
  }

  update(): void {
    if (this.block && this.result != null) {
      this.informStop();
      this.result = null;
    }
  }

  click(): void {
    cc.audioEngine.playEffect(this.audioClick, false);

    if (this.machine.getComponent('Machine').spinning === false) {
      this.block = false;
      this.machine.getComponent('Machine').spin();
      this.requestResult();
    } else if (!this.block) {
      this.block = true;
      this.machine.getComponent('Machine').lock();
    }
  }

  async requestResult(): Promise<void> {
    this.result = null;
    this.result = await this.getAnswer();
  }

  getAnswer(): Promise<Array<Array<number>>> {
    const slotResult = this.getSlotResult(); // Get a random slot result configuration
    return new Promise<Array<Array<number>>>(resolve => {
      setTimeout(() => {
        resolve(slotResult);
      }, 1000 + 500 * Math.random());
    });
  }

  informStop(): void {
    const resultRelayed = this.result;
    this.machine.getComponent('Machine').stop(resultRelayed);
  }

  getSlotResult(): Array<Array<number>> {
    let slotResult: Array<Array<number>>;

    let percentageConfiguration = Math.random();
    if (percentageConfiguration < 0.5) {
      // 50% chance of being here
      slotResult = []; // All random configuration
    } else if (percentageConfiguration < 0.83) {
      // 33% chance of being here
      slotResult = this.getSingleLineEqualResult();
    } else if (percentageConfiguration < 0.93) {
      // 10% chance of being here
      slotResult = this.getTwoLinesEqualResult();
    } else {
      // 7% chance of being here
      slotResult = this.getAllLinesEqualResult();
    }

    return slotResult;
  }

  getRandomRangeInt(min: number, max: number): number {
    let random = Math.random() * (max - min) + min;
    return Math.round(random);
  }

  getSingleLineEqualResult(): Array<Array<number>> {
    let firstLineResult = this.getRandomRangeInt(0,29);

    let result: Array<Array<number>>;
    let randomConfig = this.getRandomRangeInt(1,3); // 1- first line equal. 2- second line equal. 3- third line equal
    switch (randomConfig) {
      case 1:
        result = [
          [firstLineResult, -1, -1],
          [firstLineResult, -1, -1],
          [firstLineResult, -1, -1],
          [firstLineResult, -1, -1],
          [firstLineResult, -1, -1]
        ]
        break;

      case 2:
        result = [
          [-1, firstLineResult, -1],
          [-1, firstLineResult, -1],
          [-1, firstLineResult, -1],
          [-1, firstLineResult, -1],
          [-1, firstLineResult, -1]
        ]
        break;

      case 3:
        result = [
          [-1, -1, firstLineResult],
          [-1, -1, firstLineResult],
          [-1, -1, firstLineResult],
          [-1, -1, firstLineResult],
          [-1, -1, firstLineResult]
        ]
        break;
    }

    return result;
  }

  getTwoLinesEqualResult(): Array<Array<number>> {
    let firstLineResult = this.getRandomRangeInt(0,28);
    let secondLineResult = firstLineResult + 1;

    let result: Array<Array<number>>;
    let randomConfig = this.getRandomRangeInt(1,3); // 1- first and second line equal. 2- second and third line equal. 3- first and third line equal
    switch (randomConfig) {
      case 1:
        result = [
          [firstLineResult, secondLineResult, -1],
          [firstLineResult, secondLineResult, -1],
          [firstLineResult, secondLineResult, -1],
          [firstLineResult, secondLineResult, -1],
          [firstLineResult, secondLineResult, -1]
        ]
        break;

      case 2:
        result = [
          [-1, firstLineResult, secondLineResult],
          [-1, firstLineResult, secondLineResult],
          [-1, firstLineResult, secondLineResult],
          [-1, firstLineResult, secondLineResult],
          [-1, firstLineResult, secondLineResult]
        ]
        break;

      case 3:
        result = [
          [firstLineResult, -1, secondLineResult],
          [firstLineResult, -1, secondLineResult],
          [firstLineResult, -1, secondLineResult],
          [firstLineResult, -1, secondLineResult],
          [firstLineResult, -1, secondLineResult]
        ]
        break;
    }

    return result;
  }

  getAllLinesEqualResult(): Array<Array<number>> {
    let firstLineResult = this.getRandomRangeInt(0,27);
    let secondLineResult = firstLineResult + 1;
    let thirdLineResult = secondLineResult + 1;
    
    let result = [
      [firstLineResult, secondLineResult, thirdLineResult],
      [firstLineResult, secondLineResult, thirdLineResult],
      [firstLineResult, secondLineResult, thirdLineResult],
      [firstLineResult, secondLineResult, thirdLineResult],
      [firstLineResult, secondLineResult, thirdLineResult]
    ];

    return result;
  }
}
