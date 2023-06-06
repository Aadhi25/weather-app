import express, { Request, Response, Application } from "express";
import cors from "cors";
import axios from "axios";
import "dotenv/config";

const app: Application = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

interface PlaceName {
  placeName: string;
}

app.get("/", async (req: Request<{}, {}, {}, PlaceName>, res: Response) => {
  // Get the placename from frontend
  const { query } = req;
  if (query.placeName.length >= 3) {
    try {
      const result = await axios.request({
        method: "get",
        maxBodyLength: Infinity,
        url: `http://api.weatherapi.com/v1/search.json?key=${process.env.API_KEY}&q=${query.placeName}`,
      });
      res.status(200).json(result.data);
    } catch (error) {
      res.json({
        msg: "No matches Found",
      });
    }
  } else {
    res.json({
      msg: "No matches Found, type atleast 3 character",
    });
  }
});

// /weather route

interface WeatherPlace {
  weatherPlace: string;
}

app.get(
  "/weather",
  async (req: Request<{}, {}, {}, WeatherPlace>, res: Response) => {
    // Get the placename from frontend
    const { query } = req;
    if (query.weatherPlace.length === 0)
      return res
        .status(400)
        .json({ errMsg: "please type in a location to see the weather data" });
    try {
      const result = await axios.request({
        method: "get",
        maxBodyLength: Infinity,
        url: `http://api.weatherapi.com/v1/current.json?key=${process.env.API_KEY}&q=${query.weatherPlace}`,
      });
      res.json(result.data);
    } catch (error) {
      res.json({
        errMsg: "No matching location found",
      });
    }
  }
);

if (process.env.NODE_ENV !== "test") {
  app.listen(process.env.PORT || 8080, () => {
    console.log("Server is up and running on " + process.env.PORT);
  });
}

export default app;
