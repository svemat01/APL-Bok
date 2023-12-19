import { DateFormatter } from '@internationalized/date';

const LOCALE = 'sv-se';

export const df = new DateFormatter(LOCALE, {
    dateStyle: 'long',
});

export const dfShort = new DateFormatter(LOCALE, {
    dateStyle: 'short',
});

export const dfTime = new DateFormatter(LOCALE, {
    timeStyle: 'short',
});

export const dfDateTime = new DateFormatter(LOCALE, {
    dateStyle: 'short',
    timeStyle: 'short',
});
