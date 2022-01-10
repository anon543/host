/*

  MiraculousHUB 2021 
  Menu Support Script

*/

// align the wave on click
$(".list-wrap li").click(function () {
  dis = $(this);
  align(dis);
  for(var i=0;i<document.querySelectorAll(".tab").length;i++){
      document.querySelectorAll(".tab")[i].style.display="none";
  }
  var ind=dis.index();
  document.querySelectorAll(".tab")[ind].style.display="block";
});
window.addEventListener("resize", function () {
  align(dis);
});
$('body').on('keydown', function (e) {
  var code = e.keyCode || e.which;

  if (code == 9 || code==39) {
    e.preventDefault()
    if (dis.is(':last-child')) {
      $(".list-wrap li:nth-child(1)").trigger("click");
    } else
    {
      dis.next().trigger("click");
    }

  }
  if (code == 37) {
    e.preventDefault()
    if (dis.is(':first-child')) {
      $(".list-wrap li:nth-child(5)").trigger("click");
    } else
    {
      dis.prev().trigger("click");
    }

  }
});

function paramChange(p, v, reload) {
  var url = new URL(window.location.href);
  url.searchParams.set(p, v);
  if(reload){
    try {
      window.location.href = window.location.href.split('?')[0] + "?" + params.toString();
    } catch (e) {}
  }else{
    try{
      window.history.replaceState(null, null, "/"+v);
    }catch(e){
      try{
        window.history.replaceState(null, null, url);
      }catch(e){}
    }
  }
}

function align(dis) {
  // get index of item
  var index = dis.index() + 1;
  // add active class to the new item
  $(".list-wrap li").removeClass("active");
  dis.delay(100).queue(function () {
    dis.addClass('active').dequeue();
  });
  // move the wave
  var left = index * window.innerWidth * 0.1925 - 0.197657394 * window.innerWidth;
  $("#wave").css('left', left);
  // set the background color
  var color = dis.data('color');
  $("body").css('background', color);
  // set the text
  $(".page").text(dis.attr("title"));
  var tabNames=["home","news","episodes","specials","credits"];
  paramChange("tab", tabNames[dis.index()], false)
}
