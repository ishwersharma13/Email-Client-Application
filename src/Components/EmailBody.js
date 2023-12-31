import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setFavourite, setMailOpen } from "../Store/emailsSlice";

const EmailBody = () => {
  const [body, setBody] = useState();
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(setMailOpen(false));
  };
  const currentEmail = useSelector((state) => state.emails.currentMail);
  const favourite = useSelector((state) => state.emails.currentMail.favourite);
  console.log(favourite)
  const fetchMailBody = async () => {
    try {
      const response = await axios.get(
        `https://flipkart-email-mock.now.sh/?id=${currentEmail.id}`
      );
      setBody(response.data.body);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMailBody();
  }, [currentEmail.id]);

  let date = new Date(currentEmail.date);
  let minute = date.getMinutes();
  let paddedMinute =
    `${minute}`.length > 1 ? minute : String(minute).padStart(2, "0");

  const handleFavourite = (id) => {
    dispatch(setFavourite(id));
  };

  return (
    <>
     <span className="text-blue-500 bg-blue-100 border border-blue-500 cursor-pointer absolute right-[8vw] top-[40px] font-medium hover:bg-blue-500 hover:text-white px-2 rounded-lg" onClick={handleClose}>
  Close
</span>
<section className="md:w-[60vw]">
  <div className="flex gap-5 border border-[#718096] rounded-md p-5">
    <span className="uppercase text-xl font-semibold text-white bg-[#3490DC] min-w-[35px] max-h-[35px] mt-1 rounded-full flex justify-center items-center">
      {currentEmail ? currentEmail.from.name.charAt(0) : ""}
    </span>
    <div className="w-[50vw] flex flex-col gap-2.5">
      <div className="flex justify-between">
        <span className="capitalize font-medium text-xl">
          {currentEmail.subject}
        </span>
        <span
          className="bg-[#3490DC] text-sm px-3 py-1 rounded-xl text-white cursor-pointer"
          onClick={() => handleFavourite(currentEmail.id)}
        >
          Add to Favorites
        </span>
      </div>
      <span className="text-sm">
        {date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}
        <span className="ml-2">
          {date.getHours() > 12 ? date.getHours() - 12 : date.getHours()}:
          {paddedMinute}
          {date.getHours() >= 12 ? "pm" : "am"}
        </span>
      </span>
      <div
        className="text-sm"
        dangerouslySetInnerHTML={{ __html: body }}
      ></div>
    </div>
  </div>
</section>
    </>
  );
};

export default EmailBody;
