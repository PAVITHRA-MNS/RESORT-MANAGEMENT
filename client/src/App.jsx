import "./App.css";
import {Route,Routes} from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import Loginpage from "./pages/Loginpage";
import Layout from "./Layout";
import Registerpage from "./pages/Registerpage";
import axios from "axios";
import { UserContextProvider } from "./UserContext";
import ProfilePage from "./pages/ProfilePage";
import PlacesPage from "./pages/PlacesPage";
import PlacesFormPage from "./pages/PlacesFormPage";
import PlacePage from "./pages/PlacePage";
import BookingsPage from "./pages/BookingsPage";
import BookingPage from "./pages/BookingPage";

axios.defaults.baseURL="http://localhost:5000";
axios.defaults.withCredentials=true;

function App() {
  return (
    <UserContextProvider>
    <Routes>
      <Route path="/" element={<Layout />}>
      <Route index element={<IndexPage />} />
      <Route path="/login" element={<Loginpage />} />
      <Route path="/register" element={<Registerpage />} />
      <Route path="/account" element={<ProfilePage />} />
      <Route path="/account/profile" element={<ProfilePage />} />
      <Route path="/account/places" element={<PlacesPage />} />
      <Route path="/account/places/new" element={<PlacesFormPage />} />
      <Route path="/account/places/:id" element={<PlacesFormPage />} />
      <Route path="/place/:id" element={<PlacePage />} />
      <Route path="/account/bookings" element={<BookingsPage />} />
      <Route path="/account/bookings/:id" element={<BookingPage />} />

      </Route>
      
    </Routes>
    </UserContextProvider>
  );
}

export default App;