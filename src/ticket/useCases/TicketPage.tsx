import { Alert, Button, FocusPageLayout, HeroTitle, Ticket } from '@design-system';
import { useState } from 'react';
import { auditTicket, type TicketAudit } from 'nasa-client';

type Ticket = { id: string; destination: string; departure: string };

export const TicketPage = () => {
    const [ticket, setTicket] = useState<Ticket>();
    const [isError, setIsError] = useState(false);
    const [audit, setAudit] = useState<TicketAudit>();
    let departure;

    if (ticket) {
        departure = new Date(ticket.departure);
        const month = departure.getMonth() + 1;
        departure = `${departure.getDate()}/${month < 10 ? `0${month}` : month}/${departure.getFullYear()}`;
    }

    const createTicket = async () => {
        const response = await fetch('http://localhost:3000/ticket', {
            headers: { 'X-SCOPE': 'BUSINESS' },
        });

        if (!response.ok) {
            setIsError(true);
        } else {
            const data: Ticket = await response.json();
            setTicket(data);

            const nasaAudit = await auditTicket(data.id);
            setAudit(nasaAudit);
        }
    };

    return (
        <FocusPageLayout>
            <HeroTitle title="/Ticket" disabled />
            {isError && <Alert variant="info">No space travels are planned yet.</Alert>}
            {!ticket && isError === false && (
                <p className="mt-20">
                    <Button onClick={createTicket}>Get ticket</Button>
                </p>
            )}
            {ticket && (
                <>
                    <h2>Congratulations 🎉</h2>
                    <p className="mb-10">Here is your ticket:</p>
                    <Ticket
                        destination={ticket.destination}
                        departure={departure!}
                        type={audit?.ticketType}
                    />
                </>
            )}
        </FocusPageLayout>
    );
};
