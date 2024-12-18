import axios from 'axios';

import type { TicketAudit } from './types';

export async function auditTicket(ticketId: string): Promise<TicketAudit> {
    const auditId = await generateId();

    return {
        auditId,
        ticketId,
        ticketType: getRandomTicketType(),
    };
}

function getRandomTicketType() {
    const types: TicketAudit['ticketType'][] = [
        'ECONOMY',
        'PRIORITY',
        'BUSINESS',
        'FIRST',
    ];
    const fallback = types[0];

    return types[Math.floor(Math.random() * types.length)] ?? fallback;
}

async function generateId() {
    const data = await Promise.all([
        axios.get('https://xeno-canto.org/api/2/recordings?query=cnt:austria'),
        axios.get('https://xeno-canto.org/api/2/recordings?query=troglodytes+troglod'),
        axios.get('https://xeno-canto.org/api/2/recordings?query=bearded+bellbird+q:A'),
    ]);

    return new Array(Math.max(data.length, 4))
        .fill('x')
        .map(() => Math.floor(1000 + Math.random() * 9000))
        .join('')
        .replace(/^\d/, '4');
}
