import fs from "fs";
import path from "path";
import Acronym from "../models/Acronym";

const DIR_BASE = path.resolve(__dirname, "../../");

export const writeTo = (data: any): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    fs.writeFile(DIR_BASE + "/acronyms.json", data, (err) => {
      resolve(true);
    });
  });
};

export const readFrom = (): Promise<Array<Acronym>> => {
  const acronyms: Array<Acronym> = new Array();
  return new Promise((resolve, reject) => {
    fs.readFile(
      DIR_BASE + "/acronyms.json",
      "utf8",
      (err: Error, data: any) => {
        JSON.parse(data).forEach((item: Acronym) => {
          if (item) {
            const acronym: Acronym = {
              name: item.name,
              value: item.value,
            };
            acronyms.push(acronym);
          }
        });
        resolve(acronyms);
      }
    );
  });
};
