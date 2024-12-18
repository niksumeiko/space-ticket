export type TicketAudit = {
    auditId: string;
    ticketId: string;
    ticketType: 'ECONOMY' | 'PRIORITY' | 'BUSINESS' | 'FIRST';
};
