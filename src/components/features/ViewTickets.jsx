import React, { useEffect, useState } from 'react';
import { base_url } from '../../base_url';
import { motion } from 'framer-motion';

const ViewTickets = () => {
  const [ticket, setTicket] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch(`${base_url}tickets`);
        if (response.ok) {
          const tickets = await response.json();
          setTicket(tickets);
        } else {
          console.log("Unable to fetch tickets");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchTickets();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-8">
      <div className="container mx-auto space-y-8">
        {ticket.length > 0 ? (
          ticket.map((t) => (
            <motion.div
              key={t.id}
              className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="space-y-4">
                {/* Title */}
                <div>
                  <h3 className="text-lg sm:text-2xl font-semibold text-gray-300">Title:</h3>
                  <p className="text-sm sm:text-lg">{t.title}</p>
                </div>
                {/* Description */}
                <div>
                  <h3 className="text-lg sm:text-2xl font-semibold text-gray-300">Description:</h3>
                  <p className="text-sm sm:text-lg">{t.description}</p>
                </div>
                {/* Status */}
                <div>
                  <h3 className="text-lg sm:text-2xl font-semibold text-gray-300">Status:</h3>
                  <p
                    className={`text-sm sm:text-lg ${
                      t.status === 'Open' ? 'text-green-400' : 'text-red-500'
                    }`}
                  >
                    {t.status}
                  </p>
                </div>
                {/* Priority */}
                <div>
                  <h3 className="text-lg sm:text-2xl font-semibold text-gray-300">Priority:</h3>
                  <p
                    className={`text-sm sm:text-lg ${
                      t.priority === 'High' ? 'text-yellow-400' : 'text-white'
                    }`}
                  >
                    {t.priority}
                  </p>
                </div>
                {/* Created By */}
                <div>
                  <h3 className="text-lg sm:text-2xl font-semibold text-gray-300">Created By:</h3>
                  <p className="text-sm sm:text-lg">{t.createdBy}</p>
                </div>
                {/* Created At */}
                <div>
                  <h3 className="text-lg sm:text-2xl font-semibold text-gray-300">Created At:</h3>
                  <p className="text-sm sm:text-lg">{new Date(t.createdAt).toLocaleString()}</p>
                </div>
              </div>
              <hr className="mt-4 border-t-2 border-gray-600" />
            </motion.div>
          ))
        ) : (
          <div className="text-center">
            <p className="text-gray-400 text-lg sm:text-xl">No tickets available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewTickets;
