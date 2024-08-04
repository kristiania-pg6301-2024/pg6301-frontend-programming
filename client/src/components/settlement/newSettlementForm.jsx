import React from 'react';

export function NewSettlementForm() {
    return <form>
        <h2>Registrere kontanter</h2>
        <div>
            <div>Avdeling:</div>
            <select>
                <option>Auksjon</option>
                <option>Bilder</option>
                <option>Bøker</option>
                <option>Cafeteria</option>
                <option>Kjøkken</option>
            </select>
        </div>
        <div>
            <div>Antall tusenlapper</div>
            <input type="text"/>
        </div>
        <div>
            <div>Antall femhundrelapper:</div>
            <input type="text"/>
        </div>
    </form>;
}
