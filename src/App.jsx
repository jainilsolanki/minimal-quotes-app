import { useEffect, useState } from "react";
import "./App.css";
import {
  Box,
  Chip,
  Grid,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import toast, { Toaster } from "react-hot-toast";
import Loader from "./components/loader.component";

const CopyToClipboard = async (text) => {
  toast.success("Quote copied!");
  try {
    await navigator.clipboard.writeText(text);
    console.log("Copied to clipboard:", text);
  } catch (err) {
    console.error("Failed to copy text: ", err);
  }
};

function App() {
  const [theme, setTheme] = useState("light");
  const [quote, setQuote] = useState({});
  const [tag, setTag] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const getQuote = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.api-ninjas.com/v1/quotes?category=${tag}`,
        {
          headers: { "X-Api-Key": import.meta.env.VITE_API_KEY },
        }
      );
      const quote = await response.json();
      setQuote(...quote);
    } catch (err) {
      setTimeout(() => {
        getQuote();
      }, 250);
      toast.error("Error fetching quote from server! Retrying...");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const toggleCheckbox = document.getElementById("toggle");
    const toggleHandler = function (e) {
      e.preventDefault();
      if (toggleCheckbox.checked) {
        setTheme("dark");
        document.getElementById("toggle-div").classList.add("night");
      } else {
        setTheme("light");
        document.getElementById("toggle-div").classList.remove("night");
      }
    };

    toggleCheckbox.addEventListener("change", toggleHandler);

    return () => {
      toggleCheckbox.removeEventListener("change", toggleHandler);
    };
  }, []);

  useEffect(() => {
    getQuote();
  }, [tag]);

  const tags = [
    {
      title: "Any",
      onClick: () => setTag(""),
      variant: tag === "" ? "outlined" : "filled",
    },

    {
      title: "Love",
      onClick: () => setTag("love"),
      variant: tag === "love" ? "outlined" : "filled",
    },
    {
      title: "Happiness",
      onClick: () => setTag("happiness"),
      variant: tag === "happiness" ? "outlined" : "filled",
    },
    {
      title: "Life",
      onClick: () => setTag("life"),
      variant: tag === "technology" ? "outlined" : "filled",
    },
    {
      title: "Famous Quotes",
      onClick: () => setTag("famous"),
      variant: tag === "famous-quotes" ? "outlined" : "filled",
    },
    {
      title: "Sports",
      onClick: () => setTag("fitness"),
      variant: tag === "sports" ? "outlined" : "filled",
    },
    {
      title: "Wisdom",
      onClick: () => setTag("knowledge"),
      variant: tag === "wisdom" ? "outlined" : "filled",
    },
  ];

  return (
    <>
      <Grid
        container
        sx={{
          height: "100vh",
          background: theme === "light" ? "#fff" : "#111827",
          transition: "all 0.4s ease-in-out",
        }}
      >
        <Grid item xs={12}>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
            sx={{ p: 1, maxHeight: "30px" }}
          >
            <Box>
              <Typography
                sx={{
                  color: theme === "light" ? "#000" : "#fff",
                  fontFamily: "IBM Plex Mono , monospace",
                  fontSize: 20,
                  transition: "all 0.4s ease-in-out",
                }}
              >
                Quotes App
              </Typography>
            </Box>
            <Box sx={{ transform: "scale(.25)" }}>
              <label htmlFor="toggle" id="toggle-label">
                <div id="toggle-div">
                  <input type="checkbox" id="toggle" />
                  <div className="clouds">
                    <div className="cloud cloud-1"></div>
                    <div className="cloud cloud-2"></div>
                    <div className="cloud cloud-3"></div>
                    <div className="cloud cloud-4"></div>
                    <div className="cloud cloud-5"></div>
                  </div>
                  <div className="backdrops">
                    <div className="backdrop"></div>
                  </div>

                  <div className="stars">
                    <div className="star star-1"></div>
                    <div className="star star-2"></div>
                    <div className="star star-3"></div>
                  </div>

                  <div className="sun-moon">
                    <div className="crater"></div>
                  </div>
                </div>
              </label>
            </Box>
          </Stack>
        </Grid>
        <Grid
          item
          xs={12}
          flexGrow={1}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Stack justifyContent={"center"} alignItems={"center"} gap={2} p={2}>
            <Box
              sx={{
                background: theme === "light" ? "#E5E7EB" : "#1F2937",
                maxWidth: 600,
                textAlign: "center",
                p: 3,
                borderRadius: 1.5,
                minHeight: 100,
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                transition: "all 0.4s ease-in-out",
                flexDirection: "column",
                gap: 4,
              }}
            >
              <Stack gap={3} alignItems={"center"}>
                {quote.category && (
                  <Chip
                    label={quote.category}
                    sx={{
                      textTransform: "capitalize",
                      color: theme === "light" ? "#000" : "#fff",
                      fontFamily: "IBM Plex Mono , monospace",
                      transition: "all 0.4s ease-in-out",
                      background: "#34D399",
                      minWidth: 100,
                      cursor: "pointer",
                    }}
                    onClick={() => setTag(quote.category)}
                    variant={"contained"}
                  />
                )}
                <Typography
                  sx={{
                    wordBreak: "break-all",
                    wordWrap: "break-word",
                    color: theme === "light" ? "#000" : "#fff",
                    fontFamily: "IBM Plex Mono , monospace",
                    fontSize: 20,
                    transition: "all 0.4s ease-in-out",
                    minWidth: 250,
                  }}
                >
                  {quote.quote}
                </Typography>
              </Stack>
              <Typography
                sx={{
                  wordBreak: "break-all",
                  wordWrap: "break-word",
                  color: theme === "light" ? "#000" : "#fff",
                  fontStyle: "italic",
                  fontFamily: "IBM Plex Mono , monospace",
                  transition: "all 0.4s ease-in-out",
                }}
              >
                {quote.author}
              </Typography>
            </Box>
            <Stack direction={"row"} gap={1}>
              <Tooltip title="Get New Quote" placement="top" arrow>
                <Box sx={{ cursor: "pointer" }} onClick={getQuote}>
                  <svg
                    width="50"
                    height="50"
                    viewBox="0 0 70 70"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="70" height="70" rx="35" fill="#34D399" />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M20 26.5625C20 26.0447 20.4197 25.625 20.9375 25.625H21.875C26.0039 25.625 29.0507 27.9506 31.0132 30.1584C31.9333 31.1936 32.6364 32.2253 33.125 33.0312C33.6136 32.2253 34.3167 31.1936 35.2368 30.1584C37.1993 27.9506 40.2461 25.625 44.375 25.625V27.5C41.0039 27.5 38.4257 29.3932 36.6382 31.4041C35.7504 32.4029 35.0815 33.4056 34.6346 34.1596C34.4324 34.5009 34.2769 34.7891 34.1683 35C34.2769 35.2109 34.4324 35.4991 34.6346 35.8404C35.0815 36.5944 35.7504 37.5971 36.6382 38.5959C38.4257 40.6068 41.0039 42.5 44.375 42.5V44.375C40.2461 44.375 37.1993 42.0495 35.2368 39.8416C34.3167 38.8064 33.6136 37.7747 33.125 36.9688C32.6364 37.7747 31.9333 38.8064 31.0132 39.8416C29.0507 42.0495 26.0039 44.375 21.875 44.375H20.9375C20.4197 44.375 20 43.9553 20 43.4375C20 42.9197 20.4197 42.5 20.9375 42.5H21.875C25.2461 42.5 27.8243 40.6068 29.6118 38.5959C30.4996 37.5971 31.1685 36.5944 31.6154 35.8404C31.8176 35.4991 31.9731 35.2109 32.0817 35C31.9731 34.7891 31.8176 34.5009 31.6154 34.1596C31.1685 33.4056 30.4996 32.4029 29.6118 31.4041C27.8243 29.3932 25.2461 27.5 21.875 27.5H20.9375C20.4197 27.5 20 27.0803 20 26.5625Z"
                      fill={theme === "light" ? "#111827" : "#fff"}
                    />
                    <path
                      d="M44.375 30.2492V22.8758C44.375 22.4784 44.8385 22.2613 45.1438 22.5157L49.5679 26.2024C49.7928 26.3898 49.7928 26.7352 49.5679 26.9226L45.1438 30.6093C44.8385 30.8637 44.375 30.6466 44.375 30.2492Z"
                      fill={theme === "light" ? "#111827" : "#fff"}
                    />
                    <path
                      d="M44.375 47.1242V39.7508C44.375 39.3534 44.8385 39.1363 45.1438 39.3907L49.5679 43.0774C49.7928 43.2648 49.7928 43.6102 49.5679 43.7976L45.1438 47.4843C44.8385 47.7387 44.375 47.5216 44.375 47.1242Z"
                      fill={theme === "light" ? "#111827" : "#fff"}
                    />
                  </svg>
                </Box>
              </Tooltip>
              <Tooltip title="Copy Quote" placement="top" arrow>
                <Box
                  sx={{ cursor: "pointer" }}
                  onClick={() => CopyToClipboard(quote.quote)}
                >
                  <IconButton
                    sx={{
                      background: "#34D399",
                      width: 50,
                      height: 50,
                      color: theme === "light" ? "#111827" : "#fff",
                      "&:hover": {
                        background: "#34D399",
                      },
                      "&:focus": {
                        outline: "none",
                      },
                    }}
                  >
                    <ContentCopyIcon />
                  </IconButton>
                </Box>
              </Tooltip>
            </Stack>
            <Stack
              direction={"row"}
              gap={1}
              alignItems={"center"}
              flexWrap={"wrap"}
            >
              <Typography
                sx={{
                  color: theme === "light" ? "#000" : "#fff",
                  fontFamily: "IBM Plex Mono , monospace",
                  transition: "all 0.4s ease-in-out",
                }}
              >
                Get by tags
              </Typography>
              {tags.map((tag) => (
                <Chip
                  key={tag.title}
                  label={tag.title}
                  sx={{
                    color: theme === "light" ? "#000" : "#fff",
                    fontFamily: "IBM Plex Mono , monospace",
                    transition: "all 0.4s ease-in-out",
                    "&:hover": {
                      background: "#34D399",
                    },
                  }}
                  onClick={tag.onClick}
                  variant={tag.variant}
                />
              ))}
            </Stack>
          </Stack>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
            p: 1,
          }}
        >
          <a
            href="https://jainil-solanki.vercel.app"
            target="_blank"
            rel="noreferrer"
          >
            <Typography
              sx={{
                color: theme === "light" ? "#000" : "#fff",
                fontFamily: "IBM Plex Mono , monospace",
                transition: "all 0.4s ease-in-out",
                "&:hover": {
                  color: "#34D399",
                },
              }}
            >
              By Jainil Solanki
            </Typography>
          </a>
        </Grid>
      </Grid>
      <Toaster />
      {isLoading && <Loader />}
    </>
  );
}

export default App;
