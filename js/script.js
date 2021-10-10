var form = document.getElementById("searchForm");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  var search = document.getElementById("searchBar").value;
  var errorText = document.getElementById("errorText");
  var devName = document.getElementById("devName");
  var repos = document.getElementById("reposAmount");
  var followers = document.getElementById("followersAmount");
  var following = document.getElementById("followingAmount");
  var tag = document.getElementById("tag");
  var bio = document.getElementById("bio");
  var date = document.getElementById("date");
  var location = document.getElementById("location");
  var twitter = document.getElementById("twitter");
  var website = document.getElementById("website");
  var company = document.getElementById("company");
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  var userName = search.split(" ").join("");

  fetch("https://api.github.com/users/" + userName)
    .then((result) => result.json())
    .then((data) => {
      errorText.classList.add("hidden");
      if (data.avatar_url) {
        document.getElementById("picHolder").innerHTML =
          '<img class="dev-pic" src="' + data.avatar_url + '"/>';

        if (!data.name) devName.innerHTML = search;
        else devName.innerHTML = data.name;

        tag.innerHTML = "@" + search;
        tag.setAttribute("href", "https://github.com/" + search);

        if (data.bio) {
          bio.classList.remove("no-bio");
          if (data.bio.length > 70) {
            bio.innerHTML = data.bio.slice(0, 70) + "...";
          }
        } else {
          bio.classList.add("no-bio");
          bio.innerHTML = "This profile has no bio";
        }

        repos.innerHTML = data.public_repos;
        followers.innerHTML = data.followers;
        following.innerHTML = data.following;

        var joinedDate = data.created_at.slice(0, 10).split("-");
        date.innerHTML =
          "Joined " +
          parseInt(joinedDate[2]) +
          " " +
          months[parseInt(joinedDate[1]) - 1].slice(0, 3) +
          " " +
          joinedDate[0];

        if (data.location) {
          location.parentElement.classList.remove("unavailable");
          location.innerHTML = data.location;
          location.setAttribute(
            "href",
            "https://www.google.com/maps/place/" + data.location
          );
        } else {
          location.innerHTML = "Not Available";
          location.parentElement.classList.add("unavailable");
        }

        if (data.twitter_username) {
          twitter.parentElement.classList.remove("unavailable");
          twitter.innerHTML = "@" + data.twitter_username;
          twitter.setAttribute("href", "https://twitter.com/" + data.twitter);
        } else {
          twitter.innerHTML = "Not Available";
          twitter.parentElement.classList.add("unavailable");
        }

        if (data.company) {
          company.parentElement.classList.remove("unavailable");
          company.innerHTML = data.company;
          company.style.pointerEvents = "none";
        } else {
          company.innerHTML = "Not Available";
          company.parentElement.classList.add("unavailable");
        }

        if (data.blog) {
          website.parentElement.classList.remove("unavailable");
          website.innerHTML = data.blog;
          website.setAttribute("href", data.blog);
        } else {
          website.innerHTML = "Not Available";
          website.parentElement.classList.add("unavailable");
        }
      } else errorText.classList.remove("hidden");
    });
});
