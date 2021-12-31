const feed = document.getElementById('feed');

fetch('http://localhost:5000/')
  .then(response => {return response.json()})
  .then(data => {
    data.forEach(links => {
      const link = `<li><a href="${links.link}">${links.text}</a></li>`;
      feed.insertAdjacentHTML("beforeend", link);
    });
  })
  .catch(err => console.log(err))