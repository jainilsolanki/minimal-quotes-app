import { useEffect, useState } from "react";
import "./App.css";
import {
  Box,
  FormControlLabel,
  Grid,
  IconButton,
  Stack,
  Switch,
  Tooltip,
  Typography,
  styled,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import toast, { Toaster } from "react-hot-toast";

const CopyToClipboard = async (text) => {
  toast.success("Quote copied!");
  try {
    await navigator.clipboard.writeText(text);
    console.log("Copied to clipboard:", text);
  } catch (err) {
    console.error("Failed to copy text: ", err);
  }
};
const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));
function App() {
  const [theme, setTheme] = useState("light");
  const [quote, setQuote] = useState({});
  const getQuote = async () => {
    try {
      const response = await fetch("https://api.quotable.io/random");
      const quote = await response.json();
      setQuote(quote);
      console.log(quote);
    } catch (err) {
      getQuote();
      toast.error("Error fetching quote from server! Retrying...");
    }
  };

  useEffect(() => {
    getQuote();
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

  return (
    <>
      {/* <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}

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
              {/* <FormControlLabel
                control={
                  <IOSSwitch
                    sx={{ m: 1 }}
                    onChange={() =>
                      setTheme((prev) => (prev === "light" ? "dark" : "light"))
                    }
                  />
                }
                label={
                  <Typography
                    sx={{
                      color: theme === "light" ? "#000" : "#fff",
                      fontFamily: "IBM Plex Mono , monospace",
                      fontSize: 16,
                      transition: "all 0.4s ease-in-out",
                    }}
                  >
                    {theme === "light" ? "Dark" : "Light"}
                  </Typography>
                }
              /> */}
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
                gap: 6,
              }}
            >
              <Typography
                sx={{
                  wordBreak: "break-all",
                  wordWrap: "break-word",
                  color: theme === "light" ? "#000" : "#fff",
                  fontFamily: "IBM Plex Mono , monospace",
                  fontSize: 20,
                  transition: "all 0.4s ease-in-out",
                }}
              >
                {quote.content}
              </Typography>
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
                {quote.author} - {quote.dateAdded}
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
                  onClick={() => CopyToClipboard(quote.content)}
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
          <Typography
            sx={{
              color: theme === "light" ? "#000" : "#fff",
              fontFamily: "IBM Plex Mono , monospace",
              transition: "all 0.4s ease-in-out",
            }}
          >
            By Jainil Solanki
          </Typography>
        </Grid>
      </Grid>
      <Toaster />
    </>
  );
}

export default App;
