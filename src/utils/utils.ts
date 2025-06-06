import * as bcrypt from 'bcrypt'

export const hashString = async (strings: string): Promise<string> => {
  return await bcrypt.hash(strings, 12)
}
