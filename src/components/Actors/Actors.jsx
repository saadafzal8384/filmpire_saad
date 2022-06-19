import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useGetActorQuery, useGetActorMoviesQuery } from "../../services/TMDB";
import {
  Modal,
  Typography,
  Button,
  ButtonGroup,
  Grid,
  Box,
  CircularProgress,
  useMediaQuery,
  Rating,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { MovieList, Pagination } from "../";
import { useHistory } from "react-router-dom";
import useStyles from "./styles";

const Actors = () => {
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const { data, isFetching } = useGetActorQuery(id);
  const { data: actorMovies, isFetching: isActorMoviesFetching } =
    useGetActorMoviesQuery({ id, page });
  const classes = useStyles();
  const history = useHistory();

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <CircularProgress size="8rem" />
      </Box>
    );
  }

  return (
    <Grid container className={classes.containerSpaceAround}>
      <Grid item sm={12} lg={4}>
        <img
          alt={data?.title}
          className={classes.poster}
          src={`https://image.tmdb.org/t/p/w500/${data?.profile_path}`}
        />
      </Grid>
      <Grid item container direction="column" lg={7}>
        <Typography variant="h3" align="left" gutterBottom>
          {data.name}
        </Typography>
        <Typography variant="h5" align="left" gutterBottom>
          Born On: {data.birthday}
        </Typography>
        <Typography variant="subtitle1" align="left" gutterBottom>
          {data.biography}
        </Typography>
        <Grid item container style={{ marginTop: "2rem" }}>
          <div className={classes.buttonsContainer}>
            <Grid className={classes.buttonsContainer} item xs={12} sm={6}>
              <ButtonGroup size="medium" variant="outlined">
                <Button
                  variant="contained"
                  target="_blank"
                  rel="noopener noreferr"
                  href={`https://www.imdb.com/name/${data?.imdb_id}`}
                >
                  IMDB
                </Button>
                &nbsp;
                <Button
                  endIcon={<ArrowBack />}
                  sx={{ borderColor: "primary.main" }}
                >
                  <Typography
                    component={Link}
                    to="/"
                    color="inherit"
                    variant="subtitle2"
                    style={{ textDecoration: "none" }}
                    onClick={() => history.goBack()}
                  ></Typography>
                  Back
                </Button>
              </ButtonGroup>
            </Grid>
          </div>
        </Grid>
      </Grid>
      <Box marginTop="5rem" width="100%">
        <Typography variant="h2" gutterBottom align="center">
          Movies
        </Typography>
        {actorMovies && <MovieList movies={actorMovies} numberOfMovies={12} />}
        <Pagination
          currentPage={page}
          setPage={setPage}
          totalPages={actorMovies?.total_pages}
        />
      </Box>
    </Grid>
  );
};

export default Actors;
