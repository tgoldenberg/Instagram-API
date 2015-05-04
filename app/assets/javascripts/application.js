// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .
$(document).ready(function() {

  $.ajax({
    type: "GET",
    dataType: "jsonp",
    cache: false,
    url: "https://api.instagram.com/v1/users/self/media/recent/?access_token=2053654095.8fd8872.8110806e6b3f4bedbd2e58ec28ed2f9a",
    success: function(data) {
      console.log(data);
      for (var i = 0; i < 10; i++) {
      $('.pics').append("<a target='_blank' href='" + data.data[i].link +
      "'><img src='" + data.data[i].images.low_resolution.url +"'></img></a>");
      }
    }
  });

  $('#location-photos').click(function() {
    var geocoder = new google.maps.Geocoder();
    var location = $('#location-field').val();
    console.log(location);
    var url ="";

    geocoder.geocode( { 'address': location}, function(results, status) {

    if (status == google.maps.GeocoderStatus.OK) {
        var latitude = results[0].geometry.location.lat();
        var longitude = results[0].geometry.location.lng();
        console.log(latitude);
        url = "https://api.instagram.com/v1/media/search?lat=" + latitude + "&lng=" + longitude;
        console.log(url);
        $.ajax({
          type: 'GET',
          dataType: 'jsonp',
          cache: false,
          url: "https://api.instagram.com/v1/media/search?lat=" + latitude + "&lng=" + longitude + "&distance=10000?client_id=8fd88729ccb74495ae9aaad32606fe7d&access_token=2053654095.8fd8872.8110806e6b3f4bedbd2e58ec28ed2f9a",
          success: function(data) {
            console.log(data);
            $('.location-pics').html('');
            for(var i = 0; i < 100; i++) {
              $('.location-pics').append("<a target='_blank' href='" + data.data[i].link +
              "'><img src='" + data.data[i].images.low_resolution.url + "'></img></a>");
            }
          }
        });
      }
    });


  });



  var menuToggle = $('#js-mobile-menu').unbind();
  $('#js-navigation-menu').removeClass("show");

  menuToggle.on('click', function(e) {
    e.preventDefault();
    $('#js-navigation-menu').slideToggle(function(){
      if($('#js-navigation-menu').is(':hidden')) {
        $('#js-navigation-menu').removeAttr('style');
      }
    });
  });
  $('.accordion-tabs').each(function(index) {
    $(this).children('li').first().children('a').addClass('is-active').next().addClass('is-open').show();
  });

  $('.accordion-tabs').on('click', 'li > a', function(event) {
    if (!$(this).hasClass('is-active')) {
      event.preventDefault();
      var accordionTabs = $(this).closest('.accordion-tabs');
      accordionTabs.find('.is-open').removeClass('is-open').hide();

      $(this).next().toggleClass('is-open').toggle();
      accordionTabs.find('.is-active').removeClass('is-active');
      $(this).addClass('is-active');
    } else {
      event.preventDefault();
    }
  });
});
