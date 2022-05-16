const api_keys = window.API_KEYS;

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

    
    console.log(api_keys)
    
    $greeting.text('So, you want to live at ' + address + '?');
    var streetViewUrl = 'http://maps.googleapis.com/maps/api/streetview?key='+ api_keys.GOOGLE_API_KEY+'&size=600x300&location=' + address + '';
    $('.bgimg').attr("src", streetViewUrl);

   

    var NYT_url = "https://api.nytimes.com/svc/search/v2/articleseAAAAAAarch.json?fq=glocations:"+ city+ "&api-key=" + api_keys.NYT_API_KEY;
    var headline = "New York Times Articles ";
    $.getJSON(NYT_url, function(data){
        // console.log(data.response.docs);
        var items = [];
        $.each(data.response.docs, function(key, val){
            items.push("<li id='" + key + "'>" + '<a target="_blank" href="' + val.web_url +'">'+ val.headline.main + "</a><p>" + val.lead_paragraph + "</p></li>");
        });
        
        $nytElem.append(items);
        console.log("items: " +  items.length);
        $nytHeaderElem.text(headline +" About "+ city);
    }).fail(function(data, textStatus, xhr){
        console.log("fail in the get json data");
        $nytHeaderElem.text(headline + " Could Not Be Loaded");
    })
    
    

    return false;
};

$('#form-container').submit(loadData);

// loadData();
