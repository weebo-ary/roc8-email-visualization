// src/pages/Email.jsx

import { useState, useEffect } from "react";
import EmailCard from "../../../components/EmailCard";
import EmailDetail from "../../../components/EmailDetail";
import Pagination from "../../../components/Pagination";
import { formatDate } from "../../../components/utils/formatDate";

function Email() {
  const [emails, setEmails] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [selectedEmailDetails, setSelectedEmailDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("");
  const [readEmails, setReadEmails] = useState(new Set());
  const [favoriteEmails, setFavoriteEmails] = useState(new Set());

  useEffect(() => {
    const storedReadEmails =
      JSON.parse(localStorage.getItem("readEmails")) || [];
    const storedFavoriteEmails =
      JSON.parse(localStorage.getItem("favoriteEmails")) || [];
    setReadEmails(new Set(storedReadEmails));
    setFavoriteEmails(new Set(storedFavoriteEmails));
    fetchEmails(page);
  }, [page]);

  const fetchEmails = (page) => {
    setLoading(true);
    fetch(`https://flipkart-email-mock.now.sh/?page=${page}`)
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch data");
        return response.json();
      })
      .then((data) => {
        setEmails(data.list);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };

  const fetchEmailDetails = (id) => {
    fetch(`https://flipkart-email-mock.now.sh/?id=${id}`)
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch email details");
        return response.json();
      })
      .then((data) => setSelectedEmailDetails(data))
      .catch((error) => setError(error.message));
  };

  const markAsRead = (email) => {
    const newReadEmails = new Set(readEmails);
    newReadEmails.add(email.id);
    setReadEmails(newReadEmails);
    localStorage.setItem("readEmails", JSON.stringify([...newReadEmails]));
  };

  const toggleFavorite = (email) => {
    const newFavoriteEmails = new Set(favoriteEmails);
    if (newFavoriteEmails.has(email.id)) {
      newFavoriteEmails.delete(email.id);
    } else {
      newFavoriteEmails.add(email.id);
    }
    setFavoriteEmails(newFavoriteEmails);
    localStorage.setItem(
      "favoriteEmails",
      JSON.stringify([...newFavoriteEmails])
    );
  };

  const handleEmailClick = (email) => {
    setSelectedEmail(email);
    markAsRead(email);
    fetchEmailDetails(email.id);
  };

  const handleFilterClick = (selectedFilter) => {
    setFilter((prevFilter) =>
      prevFilter === selectedFilter ? "" : selectedFilter
    );
  };

  const getFilteredEmails = () => {
    if (filter === "unread") {
      return emails.filter((email) => !readEmails.has(email.id));
    } else if (filter === "read") {
      return emails.filter((email) => readEmails.has(email.id));
    } else if (filter === "favorite") {
      return emails.filter((email) => favoriteEmails.has(email.id));
    }
    return emails;
  };

  const handleNextPage = () => setPage((prev) => prev + 1);
  const handlePrevPage = () => setPage((prev) => prev - 1);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const filteredEmails = getFilteredEmails();

  return (
    <section className="w-full h-auto p-6">
      <nav className="flex items-start justify-start gap-5 ml-6">
        <h3>Filter By:</h3>
        <button onClick={() => handleFilterClick("unread")}>
          {filter === "unread" ? "Clear Filter" : "Unread"}
        </button>
        <button onClick={() => handleFilterClick("read")}>
          {filter === "read" ? "Clear Filter" : "Read"}
        </button>
        <button onClick={() => handleFilterClick("favorite")}>
          {filter === "favorite" ? "Clear Filter" : "Favorites"}
        </button>
      </nav>
      <div className="flex items-start justify-around gap-6 p-6">
        {/* Email Cards Section - full width if no email selected */}
        <aside className={`flex items-start justify-start ${selectedEmail ? 'w-25' : 'w-full'}`}>
          <div className="flex flex-col gap-5 max-h-screen overflow-y-scroll scrollbar-hide w-full">
            <Pagination
              page={page}
              handleNextPage={handleNextPage}
              handlePrevPage={handlePrevPage}
            />
            {filteredEmails.map((email) => (
              <EmailCard
                key={email.id}
                email={email}
                handleEmailClick={handleEmailClick}
                toggleFavorite={toggleFavorite}
                favoriteEmails={favoriteEmails}
                formatDate={formatDate}
                readEmails={readEmails}
                selectedEmail={selectedEmail} // Pass selectedEmail to EmailCard
              />
            ))}
            <article className="w-25 rounded-lg bg-background"></article>
          </div>
        </aside>

        {/* Conditionally render the Email Details Section */}
        {selectedEmail && (
          <main className="w-1/2 min-h-screen bg-white p-6 mt-14 rounded-lg overflow-y-scroll scrollbar-hide">
            <EmailDetail
              selectedEmail={selectedEmail}
              selectedEmailDetails={selectedEmailDetails}
              formatDate={formatDate}
              toggleFavorite={toggleFavorite}
              favoriteEmails={favoriteEmails}
            />
          </main>
        )}
      </div>
    </section>
  );
}

export default Email;
