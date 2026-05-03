import { Router, type IRouter } from "express";

const router: IRouter = Router();

const pollingPlacesByState: Record<string, Array<{
  id: number;
  name: string;
  address: string;
  city: string;
  state: string;
  hours: string;
  waitTime: number;
  latitude: number;
  longitude: number;
}>> = {
  MH: [
    { id: 1, name: "Bandra Collectorate Office", address: "Anant Kanekar Marg", city: "Mumbai", state: "MH", hours: "7:00 AM - 6:00 PM", waitTime: 45, latitude: 19.0596, longitude: 72.8441 },
    { id: 2, name: "Wankhede Stadium Gate 4", address: "Vinoo Mankad Rd", city: "Mumbai", state: "MH", hours: "7:00 AM - 6:00 PM", waitTime: 20, latitude: 18.9389, longitude: 72.8258 },
  ],
  DL: [
    { id: 3, name: "Civic Centre Minto Road", address: "Old Hindu College", city: "Delhi", state: "DL", hours: "7:00 AM - 6:00 PM", waitTime: 30, latitude: 28.6366, longitude: 77.2281 },
    { id: 4, name: "North Campus Voting Booth", address: "Mall Road", city: "Delhi", state: "DL", hours: "7:00 AM - 6:00 PM", waitTime: 15, latitude: 28.6917, longitude: 77.2104 },
  ],
  KA: [
    { id: 5, name: "Vidhana Soudha North Gate", address: "Dr. Ambedkar Veedhi", city: "Bangalore", state: "KA", hours: "7:00 AM - 6:00 PM", waitTime: 25, latitude: 12.9797, longitude: 77.5906 },
  ],
  TN: [
    { id: 6, name: "Ripon Building Premises", address: "EVR Periyar Salai", city: "Chennai", state: "TN", hours: "7:00 AM - 6:00 PM", waitTime: 10, latitude: 13.0827, longitude: 80.2707 },
  ],
  UP: [
    { id: 7, name: "Collectorate Office", address: "Civil Lines", city: "Lucknow", state: "UP", hours: "7:00 AM - 6:00 PM", waitTime: 35, latitude: 26.8467, longitude: 80.9462 },
  ],
  WB: [
    { id: 8, name: "Town Hall", address: "Esplanade", city: "Kolkata", state: "WB", hours: "7:00 AM - 6:00 PM", waitTime: 40, latitude: 22.5626, longitude: 88.3510 },
  ],
  GJ: [
    { id: 9, name: "Municipal School 4", address: "Satellite Area", city: "Ahmedabad", state: "GJ", hours: "7:00 AM - 6:00 PM", waitTime: 15, latitude: 23.0225, longitude: 72.5714 },
  ],
  TS: [
    { id: 10, name: "GHMC Community Hall", address: "Banjara Hills", city: "Hyderabad", state: "TS", hours: "7:00 AM - 6:00 PM", waitTime: 20, latitude: 17.3850, longitude: 78.4867 },
  ],
  AP: [
    { id: 11, name: "Govt School Premises", address: "Benz Circle", city: "Vijayawada", state: "AP", hours: "7:00 AM - 6:00 PM", waitTime: 25, latitude: 16.5062, longitude: 80.6480 },
  ],
  RJ: [
    { id: 12, name: "Old City Hall", address: "Johari Bazar", city: "Jaipur", state: "RJ", hours: "7:00 AM - 6:00 PM", waitTime: 30, latitude: 26.9124, longitude: 75.7873 },
  ],
};

const defaultPlaces = [
  { id: 99, name: "District Election Office", address: "Tehsil HQ", city: "Your City", state: "India", hours: "7:00 AM - 6:00 PM", waitTime: 15, latitude: 20.5937, longitude: 78.9629 },
];

router.get("/election/polling-places", (req, res) => {
  const state = (req.query.state as string)?.toUpperCase();
  const places = state && pollingPlacesByState[state]
    ? pollingPlacesByState[state]
    : Object.values(pollingPlacesByState).flat().slice(0, 5);
  res.json(places);
});

export default router;
