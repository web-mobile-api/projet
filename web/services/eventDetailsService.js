import api from "../utils/api";

// Get event details by event ID
export async function getEventDetails(eventId) {
    const { data } = await api.get(`/v1/event/id/${eventId}`);
    return {
                    title: 'Festival de Musique à Bordeaux - 04/01/2025',
                    description: 'Venez profiter d\'un festival de musique inoubliable à Bordeaux ! Des artistes de renommée mondiale se produiront pour vous offrir une expérience musicale unique.',
                    participants: ['Jean Dupont', 'Marie Martin', 'Pierre Durand'],
                    comments: [
                        'Super festival ! J\'ai passé un excellent moment. - Jean Dupont',
                        'La musique était géniale et l\'ambiance était top. - Marie Martin',
                        'J\'ai rencontré plein de nouvelles personnes, c\'était super ! - Pierre Durand'
                    ]
                };
}

