import pepsJson from '../data/pep-positions.json';

const stats = pepsJson as any;


export function getCountry(countryCode: string): any {
  return stats.countries[countryCode];
}