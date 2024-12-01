import React from "react";

const HideContact = ({ contact, type }) => {
  const hideContact = (contact, type) => {
    if (!contact) return "";

    if (type === "email") {
      const [username, domain] = contact.split("@");
      if (!username || !domain) return contact;

      const hiddenUsername =
        username.slice(0, 3) + "*".repeat(Math.max(0, username.length - 3));
      const hiddenDomain =
        domain.slice(0, 3) + "*".repeat(Math.max(0, domain.length - 3));
      return `${hiddenUsername}@${hiddenDomain}`;
    }

    if (type === "phone") {
      if (contact.length < 4) return contact;
      const visibleDigits = contact.slice(-4);
      const hiddenDigits = "*".repeat(Math.max(0, contact.length - 4));
      return hiddenDigits + visibleDigits;
    }

    return contact;
  };

  return <span>{hideContact(contact, type)}</span>;
};

export default HideContact;
