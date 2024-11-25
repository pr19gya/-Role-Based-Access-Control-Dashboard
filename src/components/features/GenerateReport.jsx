import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import { base_url } from "../../base_url";

const GenerateReport = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch(`${base_url}tickets`);
        if (response.ok) {
          const data = await response.json();
          setTickets(data);
        } else {
          setError("Failed to fetch tickets");
        }
      } catch (error) {
        setError("Error fetching tickets: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  const generatePDF = (ticket) => {
    const doc = new jsPDF();

    // Adding the title of the report
    doc.setFontSize(16);
    doc.text("Ticket Report", 10, 10);

    // Adding ticket details to the PDF
    doc.setFontSize(12);
    doc.text(`Title: ${ticket.title}`, 10, 30);
    doc.text(`Description: ${ticket.description}`, 10, 40);
    doc.text(`Status: ${ticket.status}`, 10, 50);
    doc.text(`Priority: ${ticket.priority}`, 10, 60);
    doc.text(`Created By: ${ticket.createdBy}`, 10, 70);
    doc.text(`Created At: ${ticket.createdAt}`, 10, 80);

    // Saving the PDF
    doc.save(`${ticket.title}_Report.pdf`);
  };

  if (loading) {
    return <div>Loading tickets...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-white mb-4">Tickets Report</h2>
      {tickets.length === 0 ? (
        <div className="text-center text-gray-400">No tickets available.</div>
      ) : (
        tickets.map((ticket) => (
          <div
            key={ticket.id}
            className="bg-gray-700 p-4 rounded-lg mb-4 shadow-md"
          >
            <h3 className="text-xl font-medium text-white">{ticket.title}</h3>
            <p className="text-gray-300">{ticket.description}</p>
            <p className="text-gray-400">Status: {ticket.status}</p>
            <p className="text-gray-400">Priority: {ticket.priority}</p>
            <p className="text-gray-400">Created By: {ticket.createdBy}</p>
            <p className="text-gray-400">Created At: {ticket.createdAt}</p>
            <button
              onClick={() => generatePDF(ticket)}
              className="mt-4 px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800"
            >
              Download Report
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default GenerateReport;
