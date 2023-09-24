export interface Event {
  eventID: string;
  name?: string;
  image?: string;
  description?: string;
  summary?: string;
  registerLink?: string;
  learnMoreLink?: string;
  countries: string[];
  isHighlighted: boolean;
  maxQueueable?: number;
}
