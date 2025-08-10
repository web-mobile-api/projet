
// Assumes api is available globally (window.api)
window.getEventDetails = async function(eventId) {
    /*const { data } = await window.api.get(`/v1/event/id/${eventId}`);
    // TODO: adapt this to your real API response structure
    return {
        title: data.title,
        description: data.description,
        participants: data.participants,
        comments: data.comments
    };*/
    return {
                    title: 'Concert Rock à Lyon - 02/01/2025',
                    description: 'Venez profiter d\'un concert de rock inoubliable à Lyon ! Des artistes de renommée mondiale se produiront pour vous offrir une expérience musicale unique.',
                    participants: ['Paul Leclerc', 'Sophie Renard', 'Lucas Bernard'],
                    comments: [1, 2, 3, 4]
                }
};

window.getAllEvents = async function() {
    /*const { data } = await window.api.get('/v1/event');
    // TODO: adapt this to your real API response structure
    return data.map(event => ({
        id: event.id,
        title: event.title,
        date: event.date
    }));*/
    return [
        { id: 1, title: 'Concert Rock à Lyon - 02/01/2025', date: '02/01/2025' },
        { id: 2, title: 'Festival de Musique à Bordeaux - 04/01/2025', date: '04/01/2025' },
        { id: 3, title: 'Soirée Thématique à Toulouse - 05/01/2025', date: '05/01/2025' },
        { id: 4, title: 'Concert Jazz à Nantes - 06/01/2025', date: '06/01/2025' }
    ];
}

window.deleteEvent = async function(eventId) {
    /*await window.api.delete(`/v1/event/id/${eventId}`);*/
    return true;
};
