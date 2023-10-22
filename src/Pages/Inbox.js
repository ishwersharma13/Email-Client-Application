import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Inbox.css";
import EmailCard from "../Components/EmailCard";
import { fetchEmailsData, setMailOpen } from "../Store/emailsSlice";

import EmailBody from "../Components/EmailBody";

const Inbox = () => {
  const [filterType, setFilterType] = useState("all");
  const dispatch = useDispatch();

  const { data, status, mailOpen } = useSelector((state) => state.emails);

  const filteredInbox = () => {
    let inbox = data;

    if (filterType === "favourites")
      inbox = data.filter((i) => i.favourite === true);

    if (filterType === "unread")
      inbox = data.filter((i) => i.readStatus === filterType);

    if (filterType === "read")
      inbox = data.filter((i) => i.readStatus === filterType);

    return inbox;
  };

  useEffect(() => {
    dispatch(fetchEmailsData());
  }, []);

  const handleChange = (event) => {
    setFilterType(event.target.value);
    dispatch(setMailOpen(false));
  };

  let inboxWidth = mailOpen ? "w-[40vw]" : "w-[90vw]";
  let openMail = mailOpen ? "bold" : "hidden";

  return (
    <div className="mx-20 my-10 bg-[#f5f4f9]">
      <header className="font-medium text-base flex gap-4 mb-5">
        <span>Filter By:</span>

        <span>
          <input
            type="radio"
            name="filter"
            id="all"
            value="all"
            onChange={(e) => handleChange(e)}
            className="appearance-none"
            checked={filterType === "all"}
          />
          <label
            htmlFor="all"
            className=" px-2.5 py-1 rounded-2xl cursor-pointer"
          >
            All
          </label>
        </span>

        <span>
          <input
            type="radio"
            name="filter"
            id="unread"
            value="unread"
            onChange={(e) => handleChange(e)}
            className="appearance-none"
            checked={filterType === "unread"}
          />
          <label
            htmlFor="unread"
            className=" px-2.5 py-1 rounded-2xl cursor-pointer"
          >
            Unread
          </label>
        </span>

        <span>
          <input
            type="radio"
            name="filter"
            id="read"
            value="read"
            onChange={(e) => handleChange(e)}
            className="appearance-none"
            checked={filterType === "read"}
          />
          <label
            htmlFor="read"
            className=" px-2.5 py-1 rounded-2xl cursor-pointer"
          >
            Read
          </label>
        </span>

        <span>
          <input
            type="radio"
            name="filter"
            id="favourites"
            value="favourites"
            onChange={(e) => handleChange(e)}
            className="appearance-none"
            checked={filterType === "favourites"}
          />
          <label
            htmlFor="favourites"
            className=" px-2.5 py-1 rounded-2xl cursor-pointer"
          >
            Favourites
          </label>
        </span>
      </header>
      <section className="flex lg:gap-10">
        <section className={` ${inboxWidth} flex flex-col gap-3`}>
          {filteredInbox().map((item) => (
            <EmailCard emailData={item} key={item.id} id={item.id} />
          ))}
        </section>
        {mailOpen ? <EmailBody /> : ""}
      </section>
    </div>
  );
};

export default Inbox;
