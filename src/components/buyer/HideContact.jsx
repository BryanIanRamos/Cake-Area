import React from "react";

function HideContact({ contact, type }) {
  const hideContact = (contact, type) => {
    if (type === "email") {
      const [localPart, domainPart] = contact.split("@");
      const localLength = localPart.length;

      const visibleStart = localPart.slice(0, 3);
      const visibleEnd = localPart.slice(-3);
      const hiddenPart = "*".repeat(localLength - 6); // Adjust hiding for email

      return `${visibleStart}${hiddenPart}${visibleEnd}@${domainPart}`;
    } else if (type === "phone") {
      const visibleStart = contact.slice(0, 2);
      const visibleEnd = contact.slice(-2);
      const hiddenPart = "*".repeat(contact.length - 4); // Dynamically hide the middle part

      return `${visibleStart}${hiddenPart}${visibleEnd}`;
    }
    return contact;
  };

  return (
    <div>
      <p>{hideContact(contact, type)}</p>
    </div>
  );
}

export default HideContact;
