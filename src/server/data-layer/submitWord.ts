'use server'
import { z } from 'zod'
import json from './wordList.json'

const Word = z.string().min(3).max(16)
const words = json.data

export async function isValidWord(input: unknown) {
  try {
    const word = Word.parse(input)
    return words.includes(word)
  } catch (e) {
    return false
  }
}
