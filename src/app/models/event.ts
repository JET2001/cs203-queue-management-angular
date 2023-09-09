export interface Event {
  eventID: number;
  name?: string;
  image?: string;
  description?: string;
  summary?: string;
  registerLink?: string;
  learnMoreLink?: string;
  countries: string[];
  isHighlighted: boolean;
  maxPreference?: number;
}
