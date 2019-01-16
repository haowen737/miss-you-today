interface TypeWritterEvent {
  character: string
}

export default class TypeWritter {
  private word: string
  private eventQueue: TypeWritterEvent[]

  constructor(
    word: string
  ) {
    this.eventQueue = word.split('').map(character => ({
      character
    }))
  }

  public write() {
    this.word = '123'
    return this.word
  }
}
