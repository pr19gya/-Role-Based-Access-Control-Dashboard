import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import { base_url } from "../../base_url";

const GenerateReport = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch(`${base_url}tickets`);
        if (response.ok) {
          const data = await response.json();
          setTickets(data);
        } else {
          console.error("Failed to fetch tickets");
        }
      } catch (error) {
        console.error("Error fetching tickets:", error.message);
      }
    };

    fetchTickets();
  }, []);

  const generatePDF = (ticket) => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("Ticket Report", 10, 10);

    doc.setFontSize(12);
    doc.text(`Title: ${ticket.title}`, 10, 30);
    doc.text(`Description: ${ticket.description}`, 10, 40);
    doc.text(`Status: ${ticket.status}`, 10, 50);
    doc.text(`Priority: ${ticket.priority}`, 10, 60);
    doc.text(`Created By: ${ticket.createdBy}`, 10, 70);
    doc.text(`Created At: ${ticket.createdAt}`, 10, 80);

    doc.save(`${ticket.title}_Report.pdf`);
  };

  return (
    <div>
      {tickets.map((ticket) => (
        <div key={ticket.id}>
          <h3>{ticket.title}</h3>
          <p>{ticket.description}</p>
          <p>Status: {ticket.status}</p>
          <p>Priority: {ticket.priority}</p>
          <p>Created By: {ticket.createdBy}</p>
          <p>Created At: {ticket.createdAt}</p>
          <button onClick={() => generatePDF(ticket)}>Download Report</button>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default GenerateReport;
