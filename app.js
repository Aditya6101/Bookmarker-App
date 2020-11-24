const form = document.querySelector(".form");

form.addEventListener("submit", saveBookmark);
function saveBookmark(e) {
  const siteName = document.querySelector(".siteName").value;
  const siteURL = document.querySelector(".siteURL").value;

  if (!validation(siteName, siteURL)) {
    return false;
  }

  const bookMarkObj = {
    name: siteName,
    url: siteURL,
  };

  if (localStorage.getItem("bookmarks") === null) {
    const bookmarks = [];
    bookmarks.push(bookMarkObj);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  } else {
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    bookmarks.push(bookMarkObj);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }
  form.reset();
  displayBookmarks();
  e.preventDefault();
}

function removeBookmark(url) {
  const bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  for (let i = 0; i < bookmarks.length; i++) {
    if (bookmarks[i].url == url) {
      bookmarks.splice(i, 1);
    }
  }
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  displayBookmarks();
}

function displayBookmarks() {
  const bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  const bookmarksList = document.querySelector(".bookmarksList");
  bookmarksList.innerHTML = "";

  for (let i = 0; i < bookmarks.length; i++) {
    const siteName = bookmarks[i].name;
    const siteURL = bookmarks[i].url;
    bookmarksList.innerHTML +=
      '<div class="bookmark-div">' +
      "<h3>" +
      siteName +
      "</h3>" +
      '<button class="btn open-btn">' +
      '<a target="_blank" href="' +
      siteURL +
      '">Open</a>' +
      "</button>" +
      "<button onclick=\"removeBookmark('" +
      siteURL +
      '\')" class="btn remove-btn">' +
      "Remove" +
      "</button>" +
      "</div>";
  }
}

function validation(siteName, siteURL) {
  if (!siteName || !siteURL) {
    alert("Please fill in the Form");
    return false;
  }

  let expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
  let regex = new RegExp(expression);

  if (!siteURL.match(regex)) {
    alert("Please use a valid URL");
    return false;
  }
  return true;
}
