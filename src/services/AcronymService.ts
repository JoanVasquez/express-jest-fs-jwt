import Acronym from "../models/Acronym";
import { readFrom, writeTo } from "../utils/DBOperations";

export default class AcronymService {
  async filterAcronyms(
    from: number,
    limit: number,
    search: string
  ): Promise<Array<Acronym>> {
    const acronyms: Array<Acronym> = await readFrom();
    return acronyms
      .filter((item: Acronym) => item.name.includes(search))
      .splice(from, limit);
  }

  async findByAcronym(search: string): Promise<Acronym> {
    const acronyms: Array<Acronym> = await readFrom();
    return acronyms.find((item: Acronym) => item.name === search);
  }

  async randomAcronym(count: number): Promise<Array<Acronym>> {
    const acronyms: Array<Acronym> = await readFrom();
    const randomAcronyms: Array<Acronym> = new Array();
    for (let i = 1; i <= count; i++) {
      const random = Math.floor(Math.random() * acronyms.length);
      randomAcronyms.push(acronyms[random]);
    }
    return randomAcronyms;
  }

  async saveAcronym(acronym: Acronym): Promise<boolean> {
    const acronyms: Array<Acronym> = await readFrom();
    acronyms.push(acronym);
    const isSaved: boolean = await writeTo(JSON.stringify(acronyms));
    return isSaved;
  }

  async updateAcronym(acronym: Acronym): Promise<boolean> {
    const acronyms: Array<Acronym> = await readFrom();
    const index: number = acronyms.findIndex(
      (item: Acronym) => item.name === acronym.name
    );
    acronyms[index] = acronym;
    const isUpdated: boolean = await writeTo(JSON.stringify(acronyms));
    return isUpdated;
  }

  async removeAcronym(acronymName: string): Promise<boolean> {
    const acronyms: Array<Acronym> = await readFrom();
    const index: number = acronyms.findIndex(
      (item: Acronym) => item.name === acronymName
    );
    acronyms[index] = null;
    const isRemoved: boolean = await writeTo(JSON.stringify(acronyms));
    return isRemoved;
  }

  async totalAcronyms(): Promise<number> {
    const acronyms: Array<Acronym> = await readFrom();
    return acronyms.length;
  }
}
