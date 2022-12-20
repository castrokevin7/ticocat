import { useParams } from 'react-router';
import React from 'react';

export default function EventPage() {
    const { id } = useParams();

    return <span>Event {id} page!</span>
}