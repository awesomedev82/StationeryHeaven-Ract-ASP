import { Container, Divider, Paper, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

const ServerError = () => {
  const { state } = useLocation();

  return (
    <Container component={Paper}>
      {state?.error ? (
        <>
          <Typography
            gutterBottom
            variant="h3"
            color="secondary"
            sx={{ paddingTop: 1.5 }}
          >
            {state.error.title}
          </Typography>
          <Divider />
          <Typography
            variant="body1"
            style={{ wordWrap: "break-word", paddingTop: "5px" }}
          >
            {state.error.detail || "Internal server error"}
          </Typography>
        </>
      ) : (
        <Typography variant="h5" gutterBottom>
          Server error
        </Typography>
      )}
    </Container>
  );
};

export default ServerError;
