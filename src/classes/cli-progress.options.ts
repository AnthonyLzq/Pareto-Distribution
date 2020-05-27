export class CliOptions {
  format           : string
  hideCursor       : boolean
  synchronousUpdate: boolean

  // eslint-disable-next-line max-len
  constructor (format: string, hideCursor: boolean, synchronousUpdate: boolean) {
    this.format = format
    this.hideCursor = hideCursor
    this.synchronousUpdate = synchronousUpdate
  }
}
