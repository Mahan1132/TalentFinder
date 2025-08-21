//const  token = localStorage.getItem('token')

import { useNavigate } from "react-router-dom";
import "./homepage.css";
import { useEffect, useState } from "react";
import type { AxiosResponse } from "axios";
import { getUserListApi } from "../../shared/components/config/api";

interface IUser {
  _id: string;
  username: string;
  email?: string;
  profession?: string;
  location?: string;
}

interface IUserResponse {
  users: IUser[];
}

export default function Home() {
  const navigate = useNavigate();

  // const user: IUser | null = JSON.parse(localStorage.getItem("currentUser") || "null");

  // const user: IUser = JSON.parse(localStorage.getItem('currentUser')!);
  let user: IUser | null = null;
  const userString = localStorage.getItem("currentUser");
  try {
    if (userString && userString !== "undefined") {
      user = JSON.parse(userString);
    }
  } catch (e) {
    console.error("Failed to parse currentUser from localStorage:", e);
    localStorage.removeItem("currentUser");
  }

  const [search, setSearch] = useState("");
  const [userList, setUserList] = useState<IUser[]>([]);

  useEffect(() => {
    getUserListApi(search)
      .then((res: AxiosResponse<IUserResponse>) => {
        setUserList(res.data.users);
      })
      .catch((err) => {
        console.error("Error fetching user list:", err);
      });
  }, [search]);

  //filter by category
  const handleCategoryClick = (category: string) => {
    //onValueChange
    if (category == "All") setSearch("");
    else setSearch(category);
  };

  return (
    <div className="page-wrapper">
      <div className="home-container">
        {/* 🔹 NAVIGATION BAR */}
        <nav className="navbar">
          <div className="nav-left">
            <h2 className="logo">TalentFinder</h2>
          </div>
          <div className="nav-right">
            <a href="/home" className="nav-link">
              Home
            </a>
            <a href="#" className="nav-link">
              About
            </a>
            <a href="#" className="nav-link">
              Contact
            </a>
            {user ? (
              <button
                className="nav-button"
                onClick={() => {
                  localStorage.removeItem("token");
                  localStorage.removeItem("currentUser");
                  navigate("/login");
                }}
              >
                Logout
              </button>
            ) : (
              <button className="nav-button" onClick={() => navigate("/login")}>
                Login
              </button>
            )}
          </div>
        </nav>

        {/* 🔹 HERO SECTION */}
        <header className="hero-section">
          <h1>Find the Perfect Professional</h1>
          <p>
            Discover talented professionals and explore their amazing portfolios
          </p>
          <input
            type="text"
            className="search-bar"
            placeholder="Search professionals..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="category-buttons">
            {[
              "All",
              "Designer",
              "Developer",
              "Photographer",
              "Marketer",
              "Consultant",
            ].map((category) => (
              <button
                key={category}
                className="category-btn"
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </header>

        {/* 🔹 RESULTS SECTION */}
        <section className="results-section">
          <h2>{userList.length} Professionals Found</h2>
          <div className="card-container">
            {userList.map((user) => (
              <div key={user._id} className="card">
                <div className="card-info">
                  <h3>{user.username}</h3>
                  <h5>{user.profession ?? "--"}</h5>
                  <p>{user.location ?? "--"}</p>

                  <button
                    className="visit-profile-btn"
                    onClick={() => navigate(`/profile/${user._id}`)}
                  >
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
