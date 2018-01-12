
var memory_array = ['A','A','B','B','C','C','D','D','E','E','F','F','G','G','H','H','I','I','J','J','K','K','L','L'];
var memory_values = [];
var memory_tile_ids = [];
var tiles_flipped = 0;
Array.prototype.memory_tile_shuffle = function(){
    var i = this.length, j, temp;
    while(--i > 0){
        j = Math.floor(Math.random() * (i+1));
        temp = this[j];
        this[j] = this[i];
        this[i] = temp;
    }
}
function newBoard(){
	tiles_flipped = 0;
	var output = '';
    memory_array.memory_tile_shuffle();
	for(var i = 0; i < memory_array.length; i++){
		output += '<div id="tile_'+i+'" onclick="memoryFlipTile(this,\''+ memory_array[i] +'\')"><img class="bkgImg" src="london'+ memory_array[i] +'.jpg"/></div>';
	}
	document.getElementById('memory_board').innerHTML = output;
}
function memoryFlipTile(tile,val){
    console.log(this);
    console.log(val);
    var x = '';
    x = tile.getElementsByClassName("bkgImg");
    console.log(x);
    x[0].style.display = "block";
    if(memory_values.length < 2){
		
		//tile.innerHTML = val;
		if(memory_values.length == 0){
			memory_values.push(val);
			memory_tile_ids.push(tile.id);
		} else if(memory_values.length == 1){
            console.log('aaa... ' + memory_values[0]);
            console.log('bbb... ' + memory_values[1]);
			memory_values.push(val);
			memory_tile_ids.push(tile.id);
			if(memory_values[0] == memory_values[1]){
				tiles_flipped += 2;
				// Clear both arrays
				memory_values = [];
            	memory_tile_ids = [];
				// Check to see if the whole board is cleared
				if(tiles_flipped == memory_array.length){
					alert("Board cleared... generating new board");
					document.getElementById('memory_board').innerHTML = "";
					newBoard();
				}
			} else {
                console.log('super flip....');
				function flip2Back(){
				    // Flip the 2 tiles back over
				    var tile_1 = document.getElementById(memory_tile_ids[0]);
                    var tile_2 = document.getElementById(memory_tile_ids[1]);
                    x = tile_1.getElementsByClassName("bkgImg");
                    x[0].style.display = "none";
                    x = tile_2.getElementsByClassName("bkgImg");
                    x[0].style.display = "none";
				    tile_1.style.background = 'url(london.jpg) no-repeat';
				    tile_2.style.background = 'url(london.jpg) no-repeat';
				    // Clear both arrays
				    memory_values = [];
            	    memory_tile_ids = [];
				}
                setTimeout(flip2Back, 500);
			}
		}
	}
}

document.addEventListener("DOMContentLoaded", function(){
      document.getElementById('ajax-upload').addEventListener("submit", function(e){
        e.preventDefault()
        var form = e.target
        var data = new FormData(form)
        
        var request = new XMLHttpRequest()
        
        request.onreadystatechange = function(){
          document.getElementById("result").innerText = request.responseText
        }
        
        request.open(form.method, form.action)
        request.send(data)
      })
    })
