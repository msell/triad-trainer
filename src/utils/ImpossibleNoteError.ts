export class ImpossibleNoteError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "ImpossibleNote"
  }
}
