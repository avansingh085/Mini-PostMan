const { EntitySchema } = require('@mikro-orm/core');

module.exports.RequestHistory = new EntitySchema({
    name: 'RequestHistorys',
    properties: {
        id: { primary: true, type: 'number', autoincrement: true },
        method: { type: 'string' },
        url: { type: 'string' },
        statusCode: { type: 'number' },
        body: { type: 'text' },
        response: { type: 'text' },
        createdAt: { type: 'Date', onCreate: () => new Date() },
    },
});
