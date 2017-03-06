var urlProfile = 'https://api.github.com/users/piotrberebecki';
var urlRepos = 'https://api.github.com/users/piotrberebecki/repos';
var langCount;
var starCount;

function makeRequest(url, cb) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);

  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var jsonObj = JSON.parse(xhr.responseText);
      cb(jsonObj);
    }
  }
  xhr.send();
}


function showUserProfile(data) {
  imgDOM.src = data.avatar_url;
  repoNumberDOM.textContent = data.public_repos;
}


function handleRepoResults(reposArr) {
  // showUserLanguages
  showUserLanguages(reposArr);

  // showTopRepo
  showTopRepo(reposArr);
}


function showUserLanguages(data) {
  langDOM.textContent = getLang(data);
}


function getLang(data) {
  return data.map(function(repo){
    return repo.language
  }).join(' ');
}


function showTopRepo(data) {
  // show top repo
}


var imgDOM = document.getElementById('github-user-avatar');
var repoNumberDOM = document.getElementById('github-user-repos');
var langDOM = document.getElementById('github-repos-languages');


makeRequest(urlProfile, showUserProfile);
makeRequest(urlRepos, handleRepoResults);
