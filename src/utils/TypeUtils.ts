export default class TypeUtils {
    static isEnum(enumObj: Record<string, any>, value: any): boolean{
      return Object.values(enumObj).includes(value)
    }
  }
  