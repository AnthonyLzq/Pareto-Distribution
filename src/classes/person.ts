export class Person {
  allowed: boolean
  money  : number
  status : string

  constructor (money: number, status: string) {
    this.allowed = true
    this.money = money
    this.status = status
  }

  toString () : string {
    return `\t{\n\t\tAllowed: ${this.allowed}\n\t\tMoney: ${this.money}\n\t\tStatus: ${this.status}\n\t},\n`
  }
}
