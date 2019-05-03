function getRepos(searchRepo){
    const url = `https://api.github.com/users/${searchRepo}/repos`

    fetch(url)
    .then(response => {
        if (response.ok){
            return response.json();
        }
        throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
        $('#js-error-message').text(`Something went wrong: ${err.message}`);
    })
}


function displayResults(responseJson){
    $('.results').empty();
    responseJson.forEach(function(repo){
    $(".results").append(`<li>${repo.name} ${repo.owner.url}</li>`)
    $('#result-list').removeClass('hidden');
})
}
    

function handleSubmit(){
    $("form").submit(event=> {
        event.preventDefault();
        const searchRepo = $("#js-search-repo").val();
        getRepos(searchRepo);
        
    })
}


$(handleSubmit());

// Requirements:
// The user must be able to search for a GitHub user handle.
// The search must trigger a call to GitHub's API.
// The repos associated with that handle must be displayed on the page.
// You must display the repo name and link to the repo URL.
// The user must be able to make multiple searches and see only the results for the current search.