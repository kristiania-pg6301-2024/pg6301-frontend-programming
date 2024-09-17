import React, { useState } from "react";
import { sumBalance } from "./money";
import { Dialog } from "../components/dialog";
import { SettlementReport, SubmitSettlementForm } from "./submitSettlementForm";
import { Link } from "react-router-dom";

interface Props {
  settlements: SettlementReport[];
  onNewSettlement(settlement: SettlementReport): void;
}

export function FrontPage({ settlements, onNewSettlement }: Props) {
  const [showsSettlementDialog, setShowsSettlementDialog] = useState(false);

  function handleNewSettlement(s: SettlementReport) {
    onNewSettlement(s);
    setShowsSettlementDialog(false);
  }

  return (
    <>
      <h1>Settlements</h1>
      {settlements.map((s) => (
        <div>
          <Link to={`/settlements/${s.id}`}>{s.selectedDepartment}</Link>:{" "}
          {sumBalance(s.balance)}
        </div>
      ))}

      <Dialog
        visible={showsSettlementDialog}
        onClose={() => setShowsSettlementDialog(false)}
      >
        <SubmitSettlementForm onNewSettlement={handleNewSettlement} />
        <button onClick={() => setShowsSettlementDialog(false)}>Dismiss</button>
      </Dialog>

      <button onClick={() => setShowsSettlementDialog(true)}>
        Create new settlement
      </button>
    </>
  );
}
