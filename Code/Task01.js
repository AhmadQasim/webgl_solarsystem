var timePrev = Date.now();
var total_sphere=16;
var animation=true;
var orbits = false;
function main() {
	$("#webgl").height($(window).height());
	$("#webgl").width($(window).height()*2);
	var info = {
		INTRO: "<h1>Solar System Simulation</h1>Use up and down arrow keys to move forward, left,right arrow keys to angle sideways. Use numkey 2 and 8 to angle downward or upward and numkey 3 and 9 to change level.<br>Planet sizes, rotation speed, axis rotation, distance from sun and each other are scaled to real.<br> Public: <a href='http://solarsystemmodel.neocities.org/' target='_blank'>Simulation</a>",
		SUN: "<h1>SUN</h1><br>Compared with the billions of other stars in the universe, the sun is unremarkable. But for Earth and the other planets that revolve around it, the sun is a powerful center of attention. It holds the solar system together; pours life-giving light, heat, and energy on Earth; and generates space weather. <br>Wikipedia: <a href='https://en.wikipedia.org/wiki/Sun' target='_blank'>The Sun Wiki</a>",
		MERCURY: "<h1>MERCURY</h1><br> Mercury's elliptical orbit takes the small planet as close as 29 million miles (47 million kilometers) and as far as 43 million miles (70 million kilometers) from the sun. If one could stand on the scorching surface of Mercury when it is at its closest point to the sun, the sun would appear almost three times as large as it does when viewed from Earth.<br><a href='http://nssdc.gsfc.nasa.gov/planetary/factsheet/mercuryfact.html' target='_blank'>Click for Complete Stats</a><br>Wikipedia: <a href='https://en.wikipedia.org/wiki/Mercury_(planet)' target='_blank'>Mercury Wiki</a>",
		VENUS: "<h1>VENUS</h1><br> Venus and Earth are similar in size, mass, density, composition, and distance from the sun. There, however, is where the similarities end.Venus is covered by a thick, rapidly spinning atmosphere, creating a scorched world with temperatures hot enough to melt lead and a surface pressure 90 times that of Earth. Because of its proximity to Earth and the way its clouds reflect sunlight, Venus appears to be the brightest planet in the sky.<br><a href='http://nssdc.gsfc.nasa.gov/planetary/factsheet/venusfact.html' target='_blank'>Click for Complete Stats</a><br>Wikipedia: <a href='https://en.wikipedia.org/wiki/Venus' target='_blank'>Venus Wiki</a>",
		EARTH: "<h1>EARTH</h1><br> Earth, our home planet, is the only planet in our solar system known to harbor life. All of the things we need to survive are provided under a thin layer of atmosphere that separates us from the uninhabitable void of space. Earth is made up of complex, interactive systems that are often unpredictable. Air, water, land, and life—including humans—combine forces to create a constantly changing world that we are striving to understand.<br><a href='http://nssdc.gsfc.nasa.gov/planetary/factsheet/earthfact.html' target='_blank'>Click for Complete Stats</a><br>Wikipedia: <a href='https://en.wikipedia.org/wiki/Earth' target='_blank'>Earth Wiki</a>",
		MARS: "<h1>MARS</h1><br> Mars is a small rocky body once thought to be very Earthlike. Like the other terrestrial planets—Mercury, Venus, and Earth—its surface has been changed by volcanism, impacts from other bodies, movements of its crust, and atmospheric effects such as dust storms. It has polar ice caps that grow and recede with the change of seasons; areas of layered soils near the Martian poles suggest that the planet's climate has changed more than once, perhaps caused by a regular change in the planet's orbit.<br><a href='http://nssdc.gsfc.nasa.gov/planetary/factsheet/marsfact.html' target='_blank'>Click for Complete Stats</a><br>Wikipedia: <a href='https://en.wikipedia.org/wiki/Mars' target='_blank'>Mars Wiki</a>",
		JUPITER: "<h1>JUPITER</h1><br> The most massive planet in our solar system, with four planet-size moons and many smaller satellites, Jupiter forms a kind of miniature solar system. Jupiter resembles a star in composition. In fact, if it had been about eighty times more massive, it would have become a star rather than a planet.On January 7, 1610, using his primitive telescope, astronomer Galileo Galilei saw four small 'stars' near Jupiter. He had discovered Jupiter's four largest moons, now called Io, Europa, Ganymede, and Callisto. Collectively, these four moons are known today as the Galilean satellites.<br><a href='http://nssdc.gsfc.nasa.gov/planetary/factsheet/jupiterfact.html' target='_blank'>Click for Complete Stats</a><br>Wikipedia: <a href='https://en.wikipedia.org/wiki/Jupiter' target='_blank'>Jupiter Wiki</a>",
		SATURN: "<h1>SATURN</h1><br> Saturn was the most distant of the five planets known to the ancients. In 1610, Italian astronomer Galileo Galilei was the first to gaze at Saturn through a telescope. To his surprise, he saw a pair of objects on either side of the planet. He sketched them as separate spheres and wrote that Saturn appeared to be triple-bodied. In 1659, Dutch astronomer Christiaan Huygens, using a more powerful telescope than Galileo's, proposed that Saturn was surrounded by a thin, flat ring.<br><a href='http://nssdc.gsfc.nasa.gov/planetary/factsheet/saturnfact.html' target='_blank'>Click for Complete Stats</a><br>Wikipedia: <a href='https://en.wikipedia.org/wiki/Saturn' target='_blank'>Saturn Wiki</a>",
		URANUS: "<h1>URANUS</h1><br> Once considered one of the blander-looking planets, Uranus has been revealed as a dynamic world with some of the brightest clouds in the outer solar system and 11 rings. The first planet found with the aid of a telescope, Uranus was discovered in 1781 by astronomer William Herschel. The seventh planet from the sun is so distant that it takes 84 years to complete one orbit.<br><a href='http://nssdc.gsfc.nasa.gov/planetary/factsheet/uranusfact.html' target='_blank'>Click for Complete Stats</a><br>Wikipedia: <a href='https://en.wikipedia.org/wiki/Uranus' target='_blank'>Uranus Wiki</a>",
		NEPTUNE: "<h1>NEPTUNE</h1><br> The eighth planet from the sun, Neptune was the first planet located through mathematical predictions rather than through regular observations of the sky. (Galileo had recorded it as a fixed star during observations with his small telescope in 1612 and 1613).<br><a href='http://nssdc.gsfc.nasa.gov/planetary/factsheet/neptunefact.html' target='_blank'>Click for Complete Stats</a><br>Wikipedia: <a href='https://en.wikipedia.org/wiki/Neptune' target='_blank'>Neptune Wiki</a>",
		PLUTO: "<h1>PLUTO</h1><br> The world was introduced to dwarf planets in 2006, when petite Pluto was stripped of its planet status and reclassified as a dwarf planet. The International Astronomical Union (IAU) currently recognizes two other dwarf planets, Eris and Ceres.<br><a href='http://nssdc.gsfc.nasa.gov/planetary/factsheet/plutofact.html' target='_blank'>Click for Complete Stats</a><br>Wikipedia: <a href='https://en.wikipedia.org/wiki/Pluto' target='_blank'>Pluto Wiki</a>"
	};

	var canvas = document.getElementById('webgl');
	var gl = getWebGLContext(canvas);
	if (!gl){
		console.log('Failed to find context');
	}
	
	var program = initShaders( gl, "vertex-shader", "fragment-shader" );
	gl.useProgram (program);
	gl.program = program;
	
	var numberOfVertices = initVertices(program, gl);
	if (!initTextures(gl, numberOfVertices)) {
		console.log("Texture init failed");
	}
	
	gl.enable(gl.DEPTH_TEST);

	var center = {x:0.0,y:1.0,z:-35.0};
	var focus = {x:0.0,y:1.0,z:35.0};

	var projectionMatrix = mat4.create();
	mat4.perspective(projectionMatrix,Math.PI/4,2.0,0.01,500.0);
	initProjection(gl,projectionMatrix);
	var viewMatrix = mat4.create();
	mat4.lookAt(viewMatrix,[center.x,center.y,center.z],[focus.x,focus.y,focus.z],[0.0,1.0,0.0]);
	initViewing(gl,viewMatrix);
	$('#overlay').fadeIn('slow');
	$('#popupBox').fadeIn('slow');
	$('#popupContent').fadeIn('slow');
	$('#text').html(info.INTRO);
	animation=false;

	var currentangle=0.0;
	var curr_up = 0.0;
	var prev = center.x;

	document.onkeydown = function(ev){
		if(ev.keyCode == 39) { 
			currentangle=currentangle-0.01;
			var res = coords([center.x,center.z],0.01,currentangle);
			focus.x = res[0];focus.z=res[1];
			mat4.lookAt(viewMatrix,[center.x,center.y,center.z],[focus.x,focus.y,focus.z],[0.0,1.0,0.0]);
			initViewing(gl,viewMatrix);
		} else if (ev.keyCode == 37) {
			currentangle=currentangle+0.01;
			var res = coords([center.x,center.z],0.01,currentangle);
			focus.x = res[0];focus.z=res[1];
			mat4.lookAt(viewMatrix,[center.x,center.y,center.z],[focus.x,focus.y,focus.z],[0.0,1.0,0.0]);
			initViewing(gl,viewMatrix);
		} else if (ev.keyCode == 38) {
			var m = (focus.x-center.x)/(focus.z-center.z);
			var c = center.x-(m*center.z);
			center.z=center.z+0.1;
			center.x=(m*center.z)+c;
			mat4.translate(viewMatrix,viewMatrix,[prev-center.x,0.0,-0.1]);
			initViewing(gl,viewMatrix);
			prev=center.x;
		} else if (ev.keyCode == 40) {
			var m = (focus.x-center.x)/(focus.z-center.z);
			var c = center.x-(m*center.z);
			center.z=center.z-0.1;
			center.x=(m*center.z)+c;
			mat4.translate(viewMatrix,viewMatrix,[prev-center.x,0.0, 0.1]);
			initViewing(gl,viewMatrix);
			prev = center.x;
		}
		else if (ev.keyCode == 104) {
			curr_up=curr_up+0.01;
			var res=coords([center.y,center.z],0.01,curr_up);
			focus.y=res[0];focus.z=res[1];
			mat4.lookAt(viewMatrix,[center.x,center.y,center.z],[focus.x,focus.y,focus.z],[0.0,1.0,0.0]);
			initViewing(gl,viewMatrix);
		}
		else if (ev.keyCode == 98) {
			curr_up=curr_up-0.01;
			var res=coords([center.y,center.z],0.01,curr_up);
			focus.y=res[0];focus.z=res[1];
			mat4.lookAt(viewMatrix,[center.x,center.y,center.z],[focus.x,focus.y,focus.z],[0.0,1.0,0.0]);
			initViewing(gl,viewMatrix);
		} else if (ev.keyCode == 105) {
			center.y+=0.1;focus.y+=0.1;
			mat4.lookAt(viewMatrix,[center.x,center.y,center.z],[focus.x,focus.y,focus.z],[0.0,1.0,0.0]);
			initViewing(gl,viewMatrix);
		} else if (ev.keyCode == 99) {
			center.y-=0.1;focus.y-=0.1;
			mat4.lookAt(viewMatrix,[center.x,center.y,center.z],[focus.x,focus.y,focus.z],[0.0,1.0,0.0]);
			initViewing(gl,viewMatrix);
		}
	};

	$('#overlay, .close').click(function () {
		$('#overlay').fadeOut('slow');
		$('#popupBox').fadeOut('slow');
		$('#popupContent').fadeOut('slow');
		animation=true;
		mat4.lookAt(viewMatrix,[center.x,center.y,center.z],[focus.x,focus.y,focus.z],[0.0,1.0,0.0]);
		initViewing(gl,viewMatrix);
	});

	var gui = new dat.GUI();

	var positions = {
		PAUSE: function(){
			if(animation) animation=false;
			else animation=true;
		},
		SUN: function(){
			mat4.lookAt(viewMatrix,[0.0,0.0,-3.0],[0.0,0.0,30.0],[0.0,1.0,0.0]);
			initViewing(gl,viewMatrix);
			$('#overlay').fadeIn('slow');
			$('#popupBox').fadeIn('slow');
			$('#popupContent').fadeIn('slow');
			$('#text').html(info.SUN);
			animation=false;
		},
		MERCURY: function(){
			mat4.lookAt(viewMatrix,[0.0,0.0,0.0],[0.0,0.0,0.0],[0.0,1.0,0.0]);
			mat4.translate(viewMatrix,viewMatrix,[0.0,0.0,1.2]);
			mat4.rotateY(viewMatrix,viewMatrix,-rotateangle);
			initViewing(gl,viewMatrix);
			$('#overlay').fadeIn('slow');
			$('#popupBox').fadeIn('slow');
			$('#popupContent').fadeIn('slow');
			$('#text').html(info.MERCURY);
			animation=false;
		},
		VENUS: function(){
			mat4.lookAt(viewMatrix,[0.0,0.0,0.0],[0.0,0.0,0.0],[0.0,1.0,0.0]);
			mat4.translate(viewMatrix,viewMatrix,[0.0,0.0,1.5]);
			mat4.rotateY(viewMatrix,viewMatrix,rotateangle*-0.39);
			initViewing(gl,viewMatrix);
			$('#overlay').fadeIn('slow');
			$('#popupBox').fadeIn('slow');
			$('#popupContent').fadeIn('slow');
			$('#text').html(info.VENUS);
			animation=false;
		},
		EARTH: function(){
			mat4.lookAt(viewMatrix,[0.0,0.0,0.0],[0.0,0.0,0.0],[0.0,1.0,0.0]);
			mat4.translate(viewMatrix,viewMatrix,[0.0,0.0,2.2]);
			mat4.rotateY(viewMatrix,viewMatrix,rotateangle*-0.24);
			initViewing(gl,viewMatrix);
			$('#overlay').fadeIn('slow');
			$('#popupBox').fadeIn('slow');
			$('#popupContent').fadeIn('slow');
			$('#text').html(info.EARTH);
			animation=false;
		},
		MARS: function(){
			mat4.lookAt(viewMatrix,[0.0,0.0,0.0],[0.0,0.0,0.0],[0.0,1.0,0.0]);
			mat4.translate(viewMatrix,viewMatrix,[0.0,0.0,3.3]);
			mat4.rotateY(viewMatrix,viewMatrix,rotateangle*-0.12);
			initViewing(gl,viewMatrix);
			$('#overlay').fadeIn('slow');
			$('#popupBox').fadeIn('slow');
			$('#popupContent').fadeIn('slow');
			$('#text').html(info.MARS);
			animation=false;
		},
		JUPITER: function(){
			mat4.lookAt(viewMatrix,[0.0,0.0,0.0],[0.0,0.0,0.0],[0.0,1.0,0.0]);
			mat4.translate(viewMatrix,viewMatrix,[0.0,0.0,9.906]);
			mat4.rotateY(viewMatrix,viewMatrix,rotateangle*-0.02);
			initViewing(gl,viewMatrix);
			$('#overlay').fadeIn('slow');
			$('#popupBox').fadeIn('slow');
			$('#popupContent').fadeIn('slow');
			$('#text').html(info.JUPITER);
			animation=false;
		},
		SATURN: function(){
			mat4.lookAt(viewMatrix,[0.0,0.0,0.0],[0.0,0.0,0.0],[0.0,1.0,0.0]);
			mat4.translate(viewMatrix,viewMatrix,[0.0,0.0,18.5]);
			mat4.rotateY(viewMatrix,viewMatrix,rotateangle*-0.008);
			initViewing(gl,viewMatrix);
			$('#overlay').fadeIn('slow');
			$('#popupBox').fadeIn('slow');
			$('#popupContent').fadeIn('slow');
			$('#text').html(info.SATURN);
			animation=false;
		},
		URANUS: function(){
			mat4.lookAt(viewMatrix,[0.0,0.0,0.0],[0.0,0.0,0.0],[0.0,1.0,0.0]);
			mat4.translate(viewMatrix,viewMatrix,[0.0,0.0,25.1]);
			mat4.rotateY(viewMatrix,viewMatrix,rotateangle*-0.002);
			initViewing(gl,viewMatrix);
			$('#overlay').fadeIn('slow');
			$('#popupBox').fadeIn('slow');
			$('#popupContent').fadeIn('slow');
			$('#text').html(info.URANUS);
			animation=false;
		},
		NEPTUNE: function(){
			mat4.lookAt(viewMatrix,[0.0,0.0,0.0],[0.0,0.0,0.0],[0.0,1.0,0.0]);
			mat4.translate(viewMatrix,viewMatrix,[0.0,0.0,28.3]);
			mat4.rotateY(viewMatrix,viewMatrix,rotateangle*-0.0015);
			initViewing(gl,viewMatrix);
			$('#overlay').fadeIn('slow');
			$('#popupBox').fadeIn('slow');
			$('#popupContent').fadeIn('slow');
			$('#text').html(info.NEPTUNE);
			animation=false;
		},
		PLUTO: function(){
			mat4.lookAt(viewMatrix,[0.0,0.0,0.0],[0.0,0.0,0.0],[0.0,1.0,0.0]);
			mat4.translate(viewMatrix,viewMatrix,[0.0,0.0,29.5]);
			mat4.rotateY(viewMatrix,viewMatrix,rotateangle*-0.001);
			initViewing(gl,viewMatrix);
			$('#overlay').fadeIn('slow');
			$('#popupBox').fadeIn('slow');
			$('#popupContent').fadeIn('slow');
			$('#text').html(info.PLUTO);
			animation=false;
		},
		ORBITS:false
	}

	gui.add(positions, 'PAUSE');
	gui.add(positions, 'SUN');
	gui.add(positions, 'MERCURY');
	gui.add(positions, 'VENUS');
	gui.add(positions, 'EARTH');
	gui.add(positions, 'MARS');
	gui.add(positions, 'JUPITER');
	gui.add(positions, 'SATURN');
	gui.add(positions, 'URANUS');
	gui.add(positions, 'NEPTUNE');
	gui.add(positions, 'PLUTO');
	gui.add(positions, 'ORBITS').onChange(function(value){
		orbits = value;
	});

	var rotateangle = 0.0;
	var time, elapsed;
	var tick = function(){
		if (animation) rotateangle = animate(rotateangle, time, elapsed);
		else timePrev = Date.now();
		render(gl, numberOfVertices, rotateangle);
		requestAnimationFrame(tick);
	}
	tick();
}

function animate(rotateangle, time, elapsed){
	time = Date.now();
	elapsed = time - timePrev;
	timePrev = time;

	return (rotateangle + (elapsed / 1000));
}

function render (gl, numberOfVertices, angle){
	gl.clearColor(0.0, 0.0, 0.0, 1.0);
	gl.clear(gl.COLOR_BUFFER_BIT);
	gl.clear(gl.DEPTH_BUFFER_BIT);

	var indexlength = numberOfVertices/16*6;

	mat4.identity(mvMatrix);
	initTransformations(gl,mvMatrix,[1.0,1.0,1.0,1.0]);
	gl.drawElements(gl.TRIANGLES, indexlength, gl.UNSIGNED_SHORT, 0);

	mat4.identity(mvMatrix);
	mat4.rotateY(mvMatrix,mvMatrix,angle);
	mat4.translate(mvMatrix,mvMatrix,[0.0,0.0,-1.38]);
	mat4.rotateY(mvMatrix,mvMatrix,angle);
	mat4.scale(mvMatrix,mvMatrix,[0.019,0.019,0.019]);
	initTransformations(gl,mvMatrix,[1.0,1.0,1.0,1.0]);
	gl.drawElements(gl.TRIANGLES, indexlength, gl.UNSIGNED_SHORT, indexlength*2);	//Mercury

	mat4.identity(mvMatrix);
	mat4.rotateY(mvMatrix,mvMatrix,angle*0.39);
	mat4.translate(mvMatrix,mvMatrix,[0.0,0.0,-1.94]);
	mat4.rotateY(mvMatrix,mvMatrix,angle);
	mat4.scale(mvMatrix,mvMatrix,[0.047,0.047,0.047]);
	initTransformations(gl,mvMatrix,[1.0,1.0,1.0,1.0]);
	gl.drawElements(gl.TRIANGLES, indexlength, gl.UNSIGNED_SHORT, indexlength*4);	//Venus

	mat4.identity(mvMatrix);
	mat4.rotateY(mvMatrix,mvMatrix,angle*0.24);
	mat4.translate(mvMatrix,mvMatrix,[0.0,0.0,-2.5]);
	mat4.rotateY(mvMatrix,mvMatrix,angle);
	mat4.scale(mvMatrix,mvMatrix,[0.05,0.05,0.05]);
	initTransformations(gl,mvMatrix,[1.0,1.0,1.0,1.0]);
	gl.drawElements(gl.TRIANGLES, indexlength, gl.UNSIGNED_SHORT, indexlength*6);	//Earth

	mat4.identity(mvMatrix);
	mat4.rotateY(mvMatrix,mvMatrix,angle*0.12);
	mat4.translate(mvMatrix,mvMatrix,[0.0,0.0,-3.5]);
	mat4.rotateY(mvMatrix,mvMatrix,angle);
	mat4.scale(mvMatrix,mvMatrix,[0.026,0.026,0.026]);
	initTransformations(gl,mvMatrix,[1.0,1.0,1.0,1.0]);
	gl.drawElements(gl.TRIANGLES, indexlength, gl.UNSIGNED_SHORT, indexlength*8);	//Mars

	mat4.identity(mvMatrix);
	mat4.rotateY(mvMatrix,mvMatrix,angle*0.02);
	mat4.translate(mvMatrix,mvMatrix,[0.0,0.0,-10.906]);
	mat4.rotateY(mvMatrix,mvMatrix,angle);
	mat4.scale(mvMatrix,mvMatrix,[0.2,0.2,0.2]);
	initTransformations(gl,mvMatrix,[1.0,1.0,1.0,1.0]);
	gl.drawElements(gl.TRIANGLES, indexlength, gl.UNSIGNED_SHORT, indexlength*10);	//Jupiter

	mat4.identity(mvMatrix);
	mat4.rotateY(mvMatrix,mvMatrix,angle*0.008);
	mat4.translate(mvMatrix,mvMatrix,[0.0,0.0,-19.5]);
	mat4.rotateY(mvMatrix,mvMatrix,angle);
	mat4.scale(mvMatrix,mvMatrix,[0.15,0.15,0.15]);
	initTransformations(gl,mvMatrix,[1.0,1.0,1.0,1.0]);
	gl.drawElements(gl.TRIANGLES, indexlength, gl.UNSIGNED_SHORT, indexlength*12);	//Saturn

	mat4.identity(mvMatrix);
	mat4.rotateY(mvMatrix,mvMatrix,angle*0.002);
	mat4.translate(mvMatrix,mvMatrix,[0.0,0.0,-26.1]);
	mat4.rotateY(mvMatrix,mvMatrix,angle);
	mat4.scale(mvMatrix,mvMatrix,[0.16,0.16,0.16]);
	initTransformations(gl,mvMatrix,[1.0,1.0,1.0,1.0]);
	gl.drawElements(gl.TRIANGLES, indexlength, gl.UNSIGNED_SHORT, indexlength*14);	//Uranus

	mat4.identity(mvMatrix);
	mat4.rotateY(mvMatrix,mvMatrix,angle*0.0015);
	mat4.translate(mvMatrix,mvMatrix,[0.0,0.0,-29.3]);
	mat4.rotateY(mvMatrix,mvMatrix,angle);
	mat4.scale(mvMatrix,mvMatrix,[0.14,0.14,0.14]);
	initTransformations(gl,mvMatrix,[1.0,1.0,1.0,1.0]);
	gl.drawElements(gl.TRIANGLES, indexlength, gl.UNSIGNED_SHORT, indexlength*16);	//Neptune

	mat4.identity(mvMatrix);
	mat4.rotateY(mvMatrix,mvMatrix,angle*0.001);
	mat4.translate(mvMatrix,mvMatrix,[0.0,0.0,-29.9]);
	mat4.rotateY(mvMatrix,mvMatrix,angle);
	mat4.scale(mvMatrix,mvMatrix,[0.009,0.009,0.009]);
	initTransformations(gl,mvMatrix,[1.0,1.0,1.0,1.0]);
	gl.drawElements(gl.TRIANGLES, indexlength, gl.UNSIGNED_SHORT, indexlength*18);	//Pluto

	mat4.identity(mvMatrix);
	mat4.translate(mvMatrix,mvMatrix,[0.1,0.0,0.0]);
	mat4.rotateY(mvMatrix,mvMatrix,angle*0.24);
	mat4.translate(mvMatrix,mvMatrix,[0.0,0.0,-2.5]);
	mat4.scale(mvMatrix,mvMatrix,[0.009,0.009,0.009]);
	initTransformations(gl,mvMatrix,[1.0,1.0,1.0,1.0]);
	gl.drawElements(gl.TRIANGLES, indexlength, gl.UNSIGNED_SHORT, indexlength*20);	//earth moon

	mat4.identity(mvMatrix);
	mat4.translate(mvMatrix,mvMatrix,[0.05,0.0,0.0]);
	mat4.rotateY(mvMatrix,mvMatrix,angle*0.12);
	mat4.translate(mvMatrix,mvMatrix,[0.0,0.0,-3.5]);
	mat4.scale(mvMatrix,mvMatrix,[0.005,0.005,0.005]);
	initTransformations(gl,mvMatrix,[1.0,1.0,1.0,1.0]);
	gl.drawElements(gl.TRIANGLES, indexlength, gl.UNSIGNED_SHORT, indexlength*26);	//mars moon1

	mat4.identity(mvMatrix);
	mat4.translate(mvMatrix,mvMatrix,[-0.05,0.0,0.0]);
	mat4.rotateY(mvMatrix,mvMatrix,angle*0.12);
	mat4.translate(mvMatrix,mvMatrix,[0.0,0.0,-3.5]);
	mat4.scale(mvMatrix,mvMatrix,[0.005,0.005,0.005]);
	initTransformations(gl,mvMatrix,[1.0,1.0,1.0,1.0]);
	gl.drawElements(gl.TRIANGLES, indexlength, gl.UNSIGNED_SHORT, indexlength*28);	//mars moon2

	mat4.identity(mvMatrix);
	initTransformations(gl,mvMatrix,[1.0,1.0,1.0,1.0]);
	gl.drawArrays(gl.TRIANGLE_STRIP,  numberOfVertices/16*16, 5);	//Sky

	mat4.identity(mvMatrix);
	initTransformations(gl,mvMatrix,[1.0,1.0,1.0,1.0]);
	gl.drawArrays(gl.TRIANGLE_STRIP,  numberOfVertices/16*16+5, 5);	//Sky

	mat4.identity(mvMatrix);
	initTransformations(gl,mvMatrix,[1.0,1.0,1.0,1.0]);
	gl.drawArrays(gl.TRIANGLE_STRIP,  numberOfVertices/16*16+10, 5);	//Sky

	mat4.identity(mvMatrix);
	initTransformations(gl,mvMatrix,[1.0,1.0,1.0,1.0]);
	gl.drawArrays(gl.TRIANGLE_STRIP,  numberOfVertices/16*16+15, 5);	//Sky

	mat4.identity(mvMatrix);
	initTransformations(gl,mvMatrix,[1.0,1.0,1.0,1.0]);
	gl.drawArrays(gl.TRIANGLE_STRIP,  numberOfVertices/16*16+20, 5);	//Sky

	mat4.identity(mvMatrix);
	initTransformations(gl,mvMatrix,[1.0,1.0,1.0,1.0]);
	gl.drawArrays(gl.TRIANGLE_STRIP,  numberOfVertices/16*16+25, 5);	//Sky

	if (orbits){
	mat4.identity(mvMatrix);
	initTransformations(gl,mvMatrix,[0.9,0.9,0.9,0.7]);
	gl.drawArrays(gl.LINE_STRIP, numberOfVertices/16*16+30, 63); //orbit 1

	mat4.identity(mvMatrix);
	mat4.scale(mvMatrix,mvMatrix,[1.40,0.0,1.40]);
	initTransformations(gl,mvMatrix,[1.0,1.0,1.0,0.7]);
	gl.drawArrays(gl.LINE_STRIP, numberOfVertices/16*16+30, 63); //orbit 2

	mat4.identity(mvMatrix);
	mat4.scale(mvMatrix,mvMatrix,[1.81,0.0,1.81]);
	initTransformations(gl,mvMatrix,[1.0,1.0,1.0,0.7]);
	gl.drawArrays(gl.LINE_STRIP, numberOfVertices/16*16+30, 63); //orbit 3

	mat4.identity(mvMatrix);
	mat4.scale(mvMatrix,mvMatrix,[2.53,0.0,2.53]);
	initTransformations(gl,mvMatrix,[1.0,1.0,1.0,0.7]);
	gl.drawArrays(gl.LINE_STRIP, numberOfVertices/16*16+30, 63); //orbit 4

	mat4.identity(mvMatrix);
	mat4.scale(mvMatrix,mvMatrix,[7.90,0.0,7.90]);
	initTransformations(gl,mvMatrix,[1.0,1.0,1.0,0.7]);
	gl.drawArrays(gl.LINE_STRIP, numberOfVertices/16*16+30, 63);//orbit 5

	mat4.identity(mvMatrix);
	mat4.scale(mvMatrix,mvMatrix,[14.13,0.0,14.13]);
	initTransformations(gl,mvMatrix,[1.0,1.0,1.0,0.7]);
	gl.drawArrays(gl.LINE_STRIP, numberOfVertices/16*16+30, 63); //orbit 6

	mat4.identity(mvMatrix);
	mat4.scale(mvMatrix,mvMatrix,[18.91,0.0,18.91]);
	initTransformations(gl,mvMatrix,[1.0,1.0,1.0,0.7]);
	gl.drawArrays(gl.LINE_STRIP, numberOfVertices/16*16+30, 63); //orbit 7

	mat4.identity(mvMatrix);
	mat4.scale(mvMatrix,mvMatrix,[21.23,0.0,21.23]);
	initTransformations(gl,mvMatrix,[1.0,1.0,1.0,0.7]);
	gl.drawArrays(gl.LINE_STRIP, numberOfVertices/16*16+30, 63); //orbit 8

	mat4.identity(mvMatrix);
	mat4.scale(mvMatrix,mvMatrix,[21.67,0.0,21.67]);
	initTransformations(gl,mvMatrix,[1.0,1.0,1.0,0.7]);
	gl.drawArrays(gl.LINE_STRIP, numberOfVertices/16*16+30, 63); //orbit 9
	}

	mat4.identity(mvMatrix);
	mat4.rotateY(mvMatrix,mvMatrix,angle*0.008);
	mat4.translate(mvMatrix,mvMatrix,[0.0,0.0,-19.5]);
	initTransformations(gl,mvMatrix,[0.5,0.5,0.5,1.0]);
	gl.drawArrays(gl.TRIANGLE_STRIP, numberOfVertices/16*16+30+63, 126); //Saturn Rings

	mat4.identity(mvMatrix);
	mat4.rotateY(mvMatrix,mvMatrix,angle*0.002);
	mat4.translate(mvMatrix,mvMatrix,[0.0,0.0,-26.1]);
	initTransformations(gl,mvMatrix,[0.5,0.5,0.5,1.0]);
	gl.drawArrays(gl.TRIANGLE_STRIP, numberOfVertices/16*16+30+63, 126); //Uranus Rings

}


function coords(center, size, angle) {
	var result=[];
	result.push((Math.sin(angle) * size) + center[0]);	//generating the points on a circle using polar coordinates
	result.push((Math.cos(angle) * size) + center[1]);
	return result;
}

function orbit(center, radius) {
	var result=[];
	var stepSize = 0.1;
	for (d = 0; d <= (2*Math.PI)-stepSize; d += stepSize) {
		result.push((Math.sin(d) * radius) + center[0]);
		result.push(0.0);
		result.push((Math.cos(d) * radius) + center[1]);
		result.push(1.0);
		result.push(1.0);
	}
	result.push(result[0]);
	result.push(result[1]);
	result.push(result[2]);
	result.push(result[3]);
	result.push(result[4]);
	return result;
}

function disk(center, radius) {
	var result=[];
	var stepSize = 0.05;
	var toggle = true;
	for (d = 0; d <= (2*Math.PI)-stepSize; d += stepSize) {
		if (toggle){
			result.push((Math.sin(d) * radius) + center[0]);
			result.push(0.0);
			result.push((Math.cos(d) * radius) + center[1]);
			result.push(0.75);
			result.push(0.75);
			toggle=false;
		}
		else {
			result.push((Math.sin(d) * (radius-0.1)) + center[0]);
			result.push(0.0);
			result.push((Math.cos(d) * (radius-0.1)) + center[1]);
			result.push(0.75);
			result.push(0.75);
			toggle=true;
		}
	}
	result.push(result[0]);
	result.push(result[1]);
	result.push(result[2]);
	result.push(result[3]);
	result.push(result[4]);
	return result;
}

function sphere_vertices(){
	var factors = [[0,0],[0.25,0],[0.5,0],[0.75,0],[0,-0.25],[0.25,-0.25],[0.5,-0.25],[0.75,-0.25],[0,-0.5],[0.25,-0.5],[0.5,-0.5],[0.75,-0.5],[0,-0.75],[0.25,-0.75],[0.5,-0.75],[0.75,-0.75]];
	var latitudeBands = 30;
	var longitudeBands = 30;
	var radius = 1.0;
	var vertexPositionData = [];
	var indexData=[];
	var textureCoordData = [];
	for (var latNumber=0; latNumber <= latitudeBands; latNumber++) {
		var theta = latNumber * Math.PI / latitudeBands;
		var sinTheta = Math.sin(theta);
		var cosTheta = Math.cos(theta);
		for (var longNumber=0; longNumber <= longitudeBands; longNumber++) {
			var phi = longNumber * 2 * Math.PI / longitudeBands;
			var sinPhi = Math.sin(phi);
			var cosPhi = Math.cos(phi);
			var x = cosPhi * sinTheta;
			var y = cosTheta;
			var z = sinPhi * sinTheta;
			var u = 1 - (longNumber / longitudeBands)*-0.25;
			var v = 1 - (latNumber / latitudeBands)*0.25;
			var first = (latNumber * (longitudeBands + 1)) + longNumber;
            var second = first + longitudeBands + 1;
			vertexPositionData.push(radius * x);
			vertexPositionData.push(radius * y);
			vertexPositionData.push(radius * z);
			vertexPositionData.push(u);
			vertexPositionData.push(v);
            indexData.push(first);
            indexData.push(second);
            indexData.push(first + 1);
            indexData.push(second);
            indexData.push(second + 1);
            indexData.push(first + 1);
		}
	}

	var len = vertexPositionData.length;
	var indexlen = indexData.length;
	var len1 = len/5;
	var vertices=[];
	var indexes=[];

	for (var i=0;i<total_sphere;i++){
		indexes=indexes.concat(indexData.slice());
		vertices=vertices.concat(vertexPositionData.slice());
		for (var k=0;k<len;k+=5){
			vertices[len*i+k+3] = vertexPositionData[k+3]+factors[i][0];
			vertices[len*i+k+4] = vertexPositionData[k+4]+factors[i][1];
		}
		for (var j=0;j<indexlen;j+=6){
			indexes[indexlen*i+j]=indexData[j]+(len1*i);
			indexes[indexlen*i+j+1]=indexData[j+1]+(len1*i);
			indexes[indexlen*i+j+2]=indexData[j+2]+(len1*i);
			indexes[indexlen*i+j+3]=indexData[j+3]+(len1*i);
			indexes[indexlen*i+j+4]=indexData[j+4]+(len1*i);
			indexes[indexlen*i+j+5]=indexData[j+5]+(len1*i);
		}
	}
	return [vertices, indexes];
}

function initVertices(program, gl){
	var background = [
		-52.0, 30.0, 40.0,  1.0, 0.0,	//front
		-52.0, -30.0, 40.0 ,1.0, 0.25, 
		52.0, 30.0, 40.0, 0.75, 0.0,
		52.0, -30.0, 40.0, 0.75, 0.25,
		-52.0, 30.0, 40.0,  1.0, 0.0,
		-52.0, 30.0, -40.0,  1.0, 0.0,	//back
		-52.0, -30.0, -40.0 ,1.0, 0.25, 
		52.0, 30.0, -40.0, 0.75, 0.0,
		52.0, -30.0, -40.0, 0.75, 0.25,
		-52.0, 30.0, -40.0,  1.0, 0.0,
		50.0, 30.0, 42.0,  1.0, 0.0,	//left
		50.0, 30.0, -42.0 ,1.0, 0.25, 
		50.0, -30.0, 42.0, 0.75, 0.0,
		50.0, -30.0, -42.0, 0.75, 0.25,
		50.0, 30.0, 42.0,  1.0, 0.0,
		-50.0, 30.0, 42.0,  1.0, 0.0,	//right
		-50.0, 30.0, -42.0 ,1.0, 0.25, 
		-50.0, -30.0, 42.0, 0.75, 0.0,
		-50.0, -30.0, -42.0, 0.75, 0.25,
		-50.0, 30.0, 42.0,  1.0, 0.0,
		-52.0, 28.0, 42.0,  1.0, 0.0,	//up
		-52.0, 28.0, -42.0 ,1.0, 0.25, 
		52.0, 28.0, 42.0, 0.75, 0.0,
		52.0, 28.0, -42.0, 0.75, 0.25,
		-52.0, 28.0, 42.0,  1.0, 0.0,
		-52.0, -28.0, 42.0,  1.0, 0.0,	//down
		-52.0, -28.0, -42.0 ,1.0, 0.25, 
		52.0, -28.0, 42.0, 0.75, 0.0,
		52.0, -28.0, -42.0, 0.75, 0.25,
		-52.0, -28.0, 42.0,  1.0, 0.0,
		];
		var data=sphere_vertices();
		var vertices = data[0];
		var index = data[1];
		var verticesDim = [];
		verticesDim["posV"] = 3;
		verticesDim["posT"] = 2;
		verticesDim["Tot"] = 5;

		var numberOfVertices = vertices.length / (verticesDim["Tot"]);
		vertices=vertices.concat(background);
		vertices=vertices.concat(orbit([0.0,0.0],1.38));
		vertices=vertices.concat(disk([0.0,0.0],0.3));
		vertices = flatten(vertices);

		var ELEMENT_SIZE = vertices.BYTES_PER_ELEMENT;

		var vertexBuffer = gl.createBuffer();
		if (!vertexBuffer){ console.log('Failed to create the buffer object ');	return -1;}

		gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

		var a_Position = gl.getAttribLocation(program, 'a_Position');
		if (a_Position < 0) { console.log ("Failed to Get Position"); return;	}

		gl.vertexAttribPointer(a_Position, verticesDim["posV"], gl.FLOAT, false, ELEMENT_SIZE*verticesDim["Tot"], 0);
		gl.enableVertexAttribArray(a_Position);

		var a_TexCoord = gl.getAttribLocation(program, 'a_TexCoord');
		if (a_TexCoord < 0) { console.log ("Failed to Get Texture"); return;	}

		gl.vertexAttribPointer(a_TexCoord, verticesDim["posT"], gl.FLOAT, false, ELEMENT_SIZE*verticesDim["Tot"], ELEMENT_SIZE*verticesDim["posV"]);
		gl.enableVertexAttribArray(a_TexCoord);

		moonVertexIndexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, moonVertexIndexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(index), gl.STATIC_DRAW);

		return numberOfVertices;
	}

	function initTextures(gl, numberOfVertices){
	var texture = gl.createTexture();   // Create a texture object
	if (!texture) {	console.log('Failed to create the texture object');	return false;	}

	var u_Sampler = gl.getUniformLocation(gl.program, "u_Sampler");
	if (!u_Sampler) {	console.log('Failed to get the storage location of u_Sampler');	return false;	}

	var image = new Image();  // Create the image object
	if (!image) {	console.log('Failed to create the image object');	return false;	}
	
	image.onload = function(){ loadTexture(gl, numberOfVertices, texture, u_Sampler, image); };
	image.src = '../resources/textures.jpg';

	return true;
}


function loadTexture (gl, numberOfVertices, texture, u_sampler, image){
	gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1); // Flip the image's y axis
	gl.activeTexture(gl.TEXTURE0);
	gl.bindTexture(gl.TEXTURE_2D, texture);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
	gl.uniform1i(u_sampler, 0);
}

function initTransformations(gl, modelMatrix,acolor){
	var transformationMatrix = gl.getUniformLocation(gl.program, 'transformationMatrix');
	gl.uniformMatrix4fv(transformationMatrix, false, flatten(modelMatrix));
	var color = gl.getUniformLocation(gl.program, 'color');
	gl.uniform4f(color, acolor[0],acolor[1],acolor[2],acolor[3]);
}
function initViewing(gl, modelMatrix){
	var viewMatrix = gl.getUniformLocation(gl.program, 'viewMatrix');
	gl.uniformMatrix4fv(viewMatrix, false, flatten(modelMatrix));
}
function initProjection(gl, modelMatrix){
	var projectionMatrix = gl.getUniformLocation(gl.program, 'projectionMatrix');
	gl.uniformMatrix4fv(projectionMatrix, false, flatten(modelMatrix));
}