const envVariables = [];
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview
    var street = $('#street').val();
    var city = $('#city').val();
    var address = street + ", " + city;
    
    $greeting.text('So, you want to live at ' + address + '?');

    console.log("google API:" +  envVariables.GOOGLE_STREETVIEW_API_KEY);
    // console.log(address);

    var streetViewUrl = 'http://maps.googleapis.com/maps/api/streetview?key='+ envVariables.GOOGLE_STREETVIEW_API_KEY+'&size=600x300&location=' + address + '';
    
    //$body.append('<img class="bgimg" src="' + streetViewUrl + '">');
    $('.bgimg').attr("src", streetViewUrl);

    // 1600 pennsylvania ave, washington dc


    // YOUR CODE GOES HERE!
    var headline = "New York Times Articles About " + city;
    $nytHeaderElem.text(headline);

    var NYT_url = "https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=glocations:"+ city+ "&api-key=" + envVariables.NYT_API_KEY;
    //var list_articles = $.getJSON(NYT_url);
    
    $.getJSON(NYT_url, function(data){
        console.log(data.response.docs);
        var items = [];
        $.each(data.response.docs, function(key, val){
            items.push("<li id='" + key + "'>" + '<a target="_blank" href="' + val.web_url +'">'+ val.headline.main + "</a><p>" + val.lead_paragraph + "</p></li>");
        });
        
        $nytElem.append(items);
        console.log("items: " +  items.length);
    });

    


    return false;
};

$('#form-container').submit(loadData);

// loadData();
