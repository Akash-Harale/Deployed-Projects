import axios from "axios";
import React, { useState } from "react";
import { LinkResult } from "./LinkResult";
import "./App.css"
import { ThemeProvider } from "@mui/material/styles";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";

export const CreateShortLink = () => {
  const theme= useTheme();
const colors= tokens(theme.palette.mode);
  const [shortUrl, setShortUrl] = useState("");
  const [url, setUrl] = useState("");
  const handleSubmit = () => {
    axios
      .post(
        `https://fierce-turtleneck-seal.cyclic.app/url/create`,
        {
          OriginalUrl: url, // Move the 'url' key out of the 'body' object
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Use 'Authorization' instead of 'authorization'
          },
        }
      )
      .then((res) => {
        console.log(res.data)
        alert(res.data);

    if (res.data.data.shortID) {
      setShortUrl(res.data.data.shortID);
    }

      })
      .catch((err) => {
        console.log(err)
      });

    setUrl("");
  };
  return (
   <ThemeProvider theme={theme}>
     <div className="inputContainer">
      <h1 style={{color:colors.greenAccent[500]}}>
        URL <span>Shortner</span>
      </h1>
      <div>
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          type="url"
          placeholder="Paste a link to shorten it."
        />
        <button onClick={handleSubmit}>Shorten</button>
      </div>
      {/* <BackgroundAnimate/> */}
      <LinkResult shortUrl={shortUrl}/>
    </div>
   </ThemeProvider>
  );
};
