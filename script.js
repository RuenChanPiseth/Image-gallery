const searchBox = document.querySelector(".search-box");
const inputBox = document.querySelector("input[type='text']");
const searchButton = document.querySelector(".search-box button");
const displayWrapper = document.querySelector(".display-wrapper");
const container = document.querySelector(".container");
const closeButton = document.querySelector("i.fa-xmark.display");
const displayImg = document.querySelector(".img-wrapper>img");
let currentPage = 1;
let perPage = 15;
const seeMoreButton = document.querySelector("button.see-more");
const refreshButton = document.querySelector("button.refresh");
const apiKey = "FVFzMMNPCg7dTdsg067Dhnoob0k7DBQp7BDoaDX9wEwz4Wg1RMafdYD7";

function fetchAPI(api) {
  const fetchs = fetch(api, {
    headers: { Authorization: apiKey },
  })
    .then((res) => res.json())
    .then((data) => {
      const photosData = data.photos
        .map((pho) => {
          return ` <div class="wrapper">
        <li>
          <img src="${pho.src.large2x}" alt="${pho.alt} id="${pho.i}" />
        </li>
        <i class="fa-solid fa-user"></i>
        <p class="pharagraph">${pho.photographer}</p>
        <i class="fa-solid fa-download first-download"></i>
      </div>`;
        })
        .join("");
      container.innerHTML = photosData;
      addEventListener();
    });
}

fetchAPI(
  `https://api.pexels.com/v1/curated?page=${currentPage}&per_page=${perPage}`
);

function addEventListener() {
  const imgClick = document.querySelectorAll(".wrapper");
  imgClick.forEach((img) => {
    img.addEventListener("click", (e) => {
      if (
        !e.target.classList.contains("fa-solid") &&
        !e.target.classList.contains("pharagraph")
      ) {
        displayImg.src = e.target.src;
        if ((displayImg.src = e.target.src)) {
          displayWrapper.classList.add("show");
        }
        closeButton.addEventListener("click", () => {
          displayWrapper.classList.remove("show");
        });
      }
    });
  });
}
function downloadImage(imageUrl, filename) {
  fetch(imageUrl)
    .then((response) => response.blob())
    .then((blob) => {
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
}

function handleClick(e) {
  let url;
  let fileName;
  if (e.target.classList.contains("fa-download")) {
    url = e.target.parentElement.children[0].children[0].src;
    fileName = "";
    downloadImage(url, fileName);
  }
}

function showMore(e) {
  perPage += 5;
  if (searchButton.click()) {
    searchPhoto(
      `https://api.pexels.com/v1/search?query=${nameSearch.toLowerCase()}&per_page=${perPage}`
    );
  } else {
    fetchAPI(
      `https://api.pexels.com/v1/curated?page=${currentPage}&per_page=${perPage}`
    );
  }
}
function searchPhoto(apiSearch) {
  fetch(apiSearch, {
    headers: {
      Authorization: apiKey,
    },
  })
    .then((res) => res.json())
    .then((newData) => {
      const newImg = newData.photos
        .map((np) => {
          return `<div class="wrapper">
        <li>
          <img src="${np.src.large2x}" alt="${np.alt}" />
        </li>
        <i class="fa-solid fa-user"></i>
        <p class="pharagraph">${np.photographer}</p>
        <i class="fa-solid fa-download"></i>
      </div>`;
        })
        .join("");
      container.innerHTML = newImg;
      addEventListener();
    });
}
function searchImgShow() {
  let nameSearch = inputBox.value;
  if (inputBox.value == "") {
    return;
  }
  searchPhoto(
    `https://api.pexels.com/v1/search?query=${nameSearch.toLowerCase()}&per_page=${perPage}`
  );
  refreshButton.classList.add("show-refresh");
}
refreshButton.addEventListener("click", () => {
  window.location.reload();
});

searchButton.addEventListener("click", searchImgShow);
seeMoreButton.addEventListener("click", showMore);
window.document.addEventListener("click", handleClick);
