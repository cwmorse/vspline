//JQuery
$(document).ready(function(){
    
   
	$('.menu').click(function(){
		$('#nav-icon4').toggleClass('open');
	});

    $('.social_media_item').hover(function(){
       $(this).find('img').toggleClass('display_none'); 
    });
    
    setSketchfabWidth();
    $('.video_paused').click(function(){
       $(this).css('display','none'); 
       $(this).parent().find('.video_play').css('display','block');
       $(this).parent().find('.feature_video')[0].play();
    });
    $('.video_cancel').click(function(){
        $(this).parent().css('display','none'); 
        $(this).parent().find('.feature_video')[0].pause();
        $(this).parent().parent().find('.video_paused').css('display','block');
    });
    $('.video_poster').hover(function(){
       $(this).parent().find('.play')[0].src ='images/Play_hover.png';
    }, function(){
        $(this).parent().find('.play')[0].src='images/play.png';
    });
    
//    
//    //Bind animate function to on-click for nav links
	$('a[href^="#"]').on('click',function (e) {
	    e.preventDefault();

	    var target = this.hash;
	    var $target = $(target);

	    $('html, body').stop().animate({
	        'scrollTop': $target.offset().top - 20
        }, 500, 'swing', function () {
	        window.location.hash = target;// - $('nav').outerHeight();
	    });
	});
           
  
    //Calculate the height of <header>
    //Use outerHeight() instead of height() if have padding
    var aboveHeight = $('header').outerHeight();
              //var aboveHeight = 50;
    
    //Window resize
    $(window).resize(function(){
        setBannerVideo();
        setSketchfabWidth();
        if($(window).width()>1000){
            $('.menu').css('display','none');
            $('.dropdown').css('display','none'); 
        }else{
            $('.menu').css('display','block');            
            $('.dropdown').css('display','none'); 
        }
    });
    
    //when scroll
    $(window).scroll(function(){ 
        if ($('header').attr('id') == "transparent"){        
            setNavOpacity();
        } else {
            checkBackgroundImg();
        }         
            
    });
    
    if ($('header').attr('id') == "transparent"){
        var v = $('.video')[0];
        v.play();
    }
    
   
    
    $('.playpause').click(function(){v.paused?v.play():v.pause();});       
    //CLick video to play/pause
    //$('.video').click(function(){this.paused?this.play():this.pause();});
    
    $('.menu').click(function(){
        var d = $('.dropdown');
        if (d.css('display')=='none'){
            d.css('display','block');
            $('nav').css('background-color',"rgba(100,100,100,1");
        } else {
             d.css('display','none'); 
            if ($('header').attr('id') == "transparent"){
                setNavOpacity();
            }
        }
    });
    
    $('.dropdown').click(function(){
       $('.menu').css('display','block');
        $('#nav-icon4').toggleClass('open');
       $('.dropdown').css('display','none');  
    });
    
    if ($('header').attr('id') == "transparent"){
//         var opacity = $(window).scrollTop() / aboveHeight;    
//         var nav_color = "rgba(100,100,100,"+ String(opacity) +")";
//         var box_shadow = " 0px 1px 5px -1px rgba(0,0,0," + String(Math.min(opacity, 0.7)) +")";
//         $('nav').css('background-color',nav_color);
//            $('nav').css('box-shadow',box_shadow);
         setNavOpacity();
         setBannerVideo();
        setSketchfabWidth();
        }
    	 
}); 

function setNavOpacity(){
     var opacity = $(window).scrollTop() / $('header').outerHeight();    
         var nav_color = "rgba(100,100,100,"+ String(opacity) +")";
         var box_shadow = " 0px 1px 5px -1px rgba(0,0,0," + String(Math.min(opacity, 0.7)) +")";
         $('nav').css('background-color',nav_color);
            $('nav').css('box-shadow',box_shadow);    
}
function checkBackgroundImg(){
    if($(window).scrollTop() > 450){
        $('.bannerimage').css('opacity','0');
    } else {
        $('.bannerimage').css('opacity','1');
    }
}

//function showMenu(){
//     //$('.menu').css('display','none');
//    var d = $('.dropdown');
//        if (d.css('display')=='none'){
//            d.css('display','block'); 
//        } else {
//             d.css('display','none'); 
//        } 
//}


//Set size and position of banner video
function setBannerVideo(){
    var vid_ratio = 1920/900; //video file resolution
    var w = $(window).width();
    var h = $(window).height();
    var screen_ratio = w/h;
    var vid = $('.video');
    
    if (screen_ratio<vid_ratio){         
        vid.css('height', h);
        vid.css('width', 'auto');
        vid.css('left', (h*vid_ratio - w)/-2);
    } else {
        vid.css('width', w);
        vid.css('height', 'auto');
    }
}

function setSketchfabWidth(){
   var elem =  $('.sketchfab_gallery').find('iframe');
   elem.css('height',elem.width());
}

//Load video on click
function loadVideo(sender, id)
{
	
 var video = sender.childNodes[1];
 var mp4 = video.childNodes[1];
		
  if(mp4.src=="") {
   mp4.src = "videos/" + id;		
   video.load();
   video.play();
  } else {
	  video.paused?video.play():video.pause();
  }
}

//Load videos XML doc
function loadXMLDoc() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    //if (this.readyState == 4 && this.status == 200) {
      myFunction(this);
    //}
  };
  xmlhttp.open("GET", "videos.xml", true);
  xmlhttp.send();
    
    
   
}   

//Parse Feature Video Clips Gallery XML
function myFunction(xml) {
  var i, j;
  var xmlDoc = xml.responseXML;
  var vidGallery="";
  var y = xmlDoc.getElementsByTagName("category");
  
  for (j = 0; j<y.length; j++){
      
      
      vidGallery += "<div class=\"features\" onclick=\"youTubePlay(\'" + y[j].getElementsByTagName("youtube")[0].childNodes[0].nodeValue + "\')\"   >";     
      
      vidGallery += "<img class=\"feature_img\"  src=\"images/About/" + y[j].getElementsByTagName("thumb")[0].childNodes[0].nodeValue + ".png\" >";
    
      vidGallery += "<h2>"+y[j].getElementsByTagName("title")[0].childNodes[0].nodeValue + "</h2>";
      
      vidGallery += "<div class=\"img_wrapper\"><img class=\"play\"  src=\"images/play.png\"></div>";
      
      vidGallery += "</div></div>";
  }
  
  document.getElementById("vids").innerHTML = vidGallery;
    
   
//      $('.play').hover(function(){
//        this.src="images/Play_hover.png";
//    },function(){
//        this.src="images/play.png";
//    } );
    
//    $('.features').hover(function(){
//        this.childNodes[2].childNodes[0].src="images/Play_hover.png";
//    },function(){
//        this.childNodes[2].childNodes[0].src="images/play.png";
//    } );
   
    $('.feature_img').hover(function(){        this.parentNode.childNodes[2].childNodes[0].src="images/Play_hover.png";
    },function(){
        this.parentNode.childNodes[2].childNodes[0].src="images/play.png";
    } );
}

function onPlayHover(){
 document.getElementsByClassName("play")[0].src="images/Play_hover.png";
}
function onPlayLeave(){
 document.getElementsByClassName("play")[0].src="images/play.png";
}




    
    
      // 3. This function creates an <iframe> (and YouTube player)
      //    after the API code downloads.
     
//      function onYouTubeIframeAPIReady() {
//          player = new T.Player('player', {
//          height: '450',
//          width: '800',
//          videoId: 'zdCebQRlLZQ',
//          events: {
//            'onReady': onPlayerReady,
//            'onStateChange': onPlayerStateChange
//          }
//        });
//          
//}
 var player;
function youTubePlay(vid_id){
        
        if (player){
            //stopVideo();
            player.loadVideoById(vid_id);
        } else {
        
        
        player = new YT.Player('player', {
          height: '450',
          width: '800',
          videoId: vid_id,
          events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
          }
        });
        }
    
   var player_div = $('#youtube_player');
   player_div.css('visibility', 'visible');
    $('#white').css('visibility','visible');
    $('html').css('overflow','hidden');
    var l = ($(window).width() - 800) / 2 - 50;
    //player_div.css('left', l);
        
      }

      // 4. The API will call this function when the video player is ready.
      function onPlayerReady(event) {
          //event.target.setSize(100,100);
        event.target.playVideo();
      }

      // 5. The API calls this function when the player's state changes.
      //    The function indicates that when playing a video (state=1),
      //    the player should play for six seconds and then stop.
//      var done = false;
      function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.PLAYING && !done) {
          setTimeout(stopVideo, 6000);
          done = true;
            
        }
      }


      function stopVideo() {
        player.stopVideo();
        //player.destroy();
      }
      function hideVideo(){ 
         player.stopVideo(); $('#youtube_player').css('visibility', 'hidden');
          $('#white').css('visibility','hidden');
          $('html').css('overflow','auto');
      }

    
    function vidPlay(){
        $(this).css('display','none');
        
    }