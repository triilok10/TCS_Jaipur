/**
 * Structured data (schema.org JSON-LD) for the exact entities you want
 * Google to recognize and show as rich results / a Knowledge Panel:
 * Trilok Chand Swami (person), TCS Jaipur (organization), and the
 * communities he's involved with (GDG Jaipur, React Rajasthan, Bharat Dreamin).
 *
 * Wire these into your route `data.structuredData`.
 */

const BASE_URL = 'https://tcsjaipur.com';

/** Person schema — helps "Trilok Chand Swami" queries surface a Knowledge Panel. */
export const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Trilok Chand Swami',
    alternateName: ['TCS', 'TCS Jaipur', 'Trilok Chand Swami Jhunjhunu'],
    url: BASE_URL,
    image: `${BASE_URL}/tcs-profile.jpg`,
    jobTitle: 'Brand Ambassador, Bharat Dreamin',
    birthPlace: { '@type': 'Place', name: 'Jhunjhunu, Rajasthan, India' },
    homeLocation: { '@type': 'Place', name: 'Jaipur, Rajasthan, India' },
    sameAs: [
        // Replace with your real profile URLs
        'https://twitter.com/TCSJaipur',
        'https://www.linkedin.com/in/trilokchandswami',
        'https://github.com/trilokchandswami',
    ],
    affiliation: [
        { '@type': 'Organization', name: 'Bharat Dreamin', url: 'https://bharatdreamin.com' },
        { '@type': 'Organization', name: 'GDG Jaipur' },
        { '@type': 'Organization', name: 'React Rajasthan' },
    ],
};

/** Organization schema for TCS Jaipur itself. */
export const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'TCS Jaipur',
    alternateName: 'TCSJaipur',
    url: BASE_URL,
    logo: `${BASE_URL}/tcs-profile.jpg`,
    founder: { '@type': 'Person', name: 'Trilok Chand Swami' },
    areaServed: { '@type': 'Place', name: 'Jaipur, Rajasthan, India' },
    sameAs: [
        'https://twitter.com/TCSJaipur',
        'https://www.linkedin.com/company/tcsjaipur',
    ],
};

/** Event schema — use on a dedicated Bharat Dreamin page if you have one. */
export const bharatDreaminEventSchema = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: 'Bharat Dreamin',
    description:
        'Bharat Dreamin is a community-led conference. Trilok Chand Swami (TCS Jaipur) is its Brand Ambassador.',
    organizer: { '@type': 'Organization', name: 'Bharat Dreamin', url: 'https://bharatdreamin.com' },
    // eventStatus / startDate / location: fill in once dates are confirmed.
};

/** Local/tech-community schema for GDG Jaipur & React Rajasthan pages. */
export const communitySchema = (name: 'GDG Jaipur' | 'React Rajasthan') => ({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name,
    areaServed: { '@type': 'Place', name: 'Jaipur, Rajasthan, India' },
    memberOf: { '@type': 'Organization', name: 'TCS Jaipur', url: BASE_URL },
});