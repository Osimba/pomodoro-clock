$(document).ready(main());

function main(){
  //Variables for the break time
  var break_time = Number(document.getElementById("bTime").innerHTML);
  var x;
  var bFlag = false; //True is break session is running
  var dist1 = break_time*60*1000; 
  //Variables for the session time
  var session_time = Number(document.getElementById("sTime").innerHTML);
  var y;
  var dist2 = session_time*60*1000; 
  //Variables for Timer
  var hr_timer;
  var min_timer;
  var sec_timer;
  var tToggle = 0; //0 Off; 1 On
  
  
  $("#Timer").html(session_time);
  
  // Function for running break Timer
  function break_start(){
    if(dist1 <= 0) {
      clearTimeout(x);
      dist2 = session_time*60*1000;
      bFlag = false;
      session_start();
      return;
    }
    
    dist1 -= 1000;
    hr_timer = Math.floor((dist1 % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    min_timer = Math.floor((dist1 % (1000 * 60 * 60)) / (1000 * 60));
    sec_timer = Math.floor((dist1 % (1000 * 60)) / 1000);
    $("#Session").html("Break Time: ");
    $("#Timer").html("");
    if(hr_timer) $("#Timer").append(hr_timer + ":");
    if(min_timer) $("#Timer").append(min_timer + ":");
    $("#Timer").append(padding(sec_timer));
    x = setTimeout(break_start, 1000);
  }
  
  //Function for running session timer
  function session_start(){
    if(dist2 <= 0) {
      clearTimeout(y);
      dist1 = break_time*60*1000;
      bFlag = true;
      break_start();
      return;
    } 
    
    dist2 -= 1000;
    hr_timer = Math.floor((dist2 % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    min_timer = Math.floor((dist2 % (1000 * 60 * 60)) / (1000 * 60));
    sec_timer = Math.floor((dist2 % (1000 * 60)) / 1000);
    $("#Session").html("Session Time: ");
    $("#Timer").html("");
    if(hr_timer) $("#Timer").append(hr_timer + ":");
    if(min_timer) $("#Timer").append(min_timer + ":");
    $("#Timer").append(padding(sec_timer));
    y = setTimeout(session_start, 1000);
  }
  
  //Function for updating Break Time
  function break_update(){
    $("#bTime").html(break_time);
    if(bFlag) $("#Timer").html(break_time);
    dist1 = break_time*60*1000;
    $("#start_stop").html("<i class='fa fa-play' aria-hidden='true'></i> Start");
  }
  //Function for updating Session Time
  function session_update(){
    $("#sTime").html(session_time);
    if(!bFlag) $("#Timer").html(session_time);
    dist2 = session_time*60*1000;
    $("#start_stop").html("<i class='fa fa-play' aria-hidden='true'></i> Start");
  }
  
  //Add one to break time
  $("#Bplus").on('click', function(){
    if(tToggle) return;
    if(break_time >= 99) return;
    break_time++;
    break_update();
    
  });
  
  //Subtract one to break time
  $("#Bminus").on('click', function(){
    if(tToggle) return;
    if(break_time <= 1) return;
    break_time--;
    break_update();
  });
  
  //Add one to break time
  $("#Splus").on('click', function(){
    if(tToggle) return;
    if(session_time >= 99) return;
    session_time++;
    session_update();
    
  });
  
  //Subtract one to break time
  $("#Sminus").on('click', function(){
    if(tToggle) return;
    if(session_time <= 1) return;
    session_time--;
    session_update();
  });
  
  $("#start_stop").on('click', function() {
    if(!tToggle) {
      tToggle = 1;
      $("#start_stop").html("<i class='fa fa-pause' aria-hidden='true'></i> Pause"); 
      if(bFlag) break_start();
      else session_start();
    } else {
      tToggle = 0;
      $("#start_stop").html("<i class='fa fa-play' aria-hidden='true'></i> Resume");
      clearTimeout(x);
      clearTimeout(y);
    }
  });
  
  function padding(num) {
   
     return (num < 10 ? '0' : '') + num;
   
}
  
}