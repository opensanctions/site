import pepsJson from '../data/pep-positions.json';

const stats = pepsJson as any;

export function getCountries(): any {
  return stats.countries;
}

export function getCountry(countryCode: string): any {
  return stats.countries[countryCode];
}

export function getPositions(): any {
  return stats.positions;
}