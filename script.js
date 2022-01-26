var scene= new THREE.Scene();

var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight,0.1,1000);
camera.position.z = 5;

var renderer = new THREE.WebGLRenderer({antialias: true});

renderer.setClearColor("#e5e5e5");

renderer.setSize(window.innerWidth,window.innerHeight);

document.body.appendChild(renderer.domElement);

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth,window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2;


var geometry = new THREE.BoxGeometry(0,0,0);
var material = new THREE.MeshLambertMaterial({color:0xCCFF00});
meshX = -10;
for(var i = 0; i<15; i++) {
    var mesh = new THREE.Mesh(geometry,material);
    mesh.position.x = (Math.random() - 0.5) * 10;
    mesh.position.y = (Math.random() - 0.5) * 10;
    mesh.position.z = (Math.random() - 0.5) * 10;
    scene.add(mesh);
    meshX+=1;
}
    
// var mesh = new THREE.Mesh(geometry,material);

// mesh.rotation.set(1,2,1);

// scene.add(mesh);

// var geometry = new THREE.BoxGeometry(0,0,0);
// var material = new THREE.MeshLambertMaterial({color:0xCCFF00});
// var mesh = new THREE.Mesh(geometry,material);

// mesh.position.set(0,2,0);
// mesh.rotation.set(1,2,1);

// scene.add(mesh);

// var geometry = new THREE.BoxGeometry(0,0,0);
// var material = new THREE.MeshLambertMaterial({color:0xCCFF00});
// var mesh = new THREE.Mesh(geometry,material);

// mesh.position.set(0,-2,0);
// mesh.rotation.set(1,2,1);

// scene.add(mesh);

var light = new THREE.PointLight(0xFFFFFF, 1, 500);
light.position.set(10,0,25);
scene.add(light);


var render = function() {
    requestAnimationFrame(render);
    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.01;
    mesh.rotation.z -= 0.01;
    renderer.render(scene, camera);
};


function onMouseMove(event) {
    event.preventDefault();

    mouse.x = (event.clientX / window.innerWidth)*2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse,camera);
    var intersects = raycaster.intersectObjects(scene.children, true);
    for (var i = 0; i < intersects.length; i++) {
        intersects[i].object.material.color.set(0xff0000);
        this.tl = new TimelineMax({paused: true});
        this.tl.to(intersects[i].object.scale,1, {x: 2, ease: Expo.easeOut});
        this.tl.to(intersects[i].object.scale,.5, {y: 2, ease: Expo.easeOut});
        this.tl.to(intersects[i].object.rotation,1, {y: Math.PI*5, ease: Expo.easeOut});
        this.tl.to(intersects[i].object.scale,.5, {y: .5, ease: Expo.easeOut});
        this.tl.to(intersects[i].object.scale,.5, {x: .5, ease: Expo.easeOut});

        
    };

};


render();


//this.tl = new TimelineMax().delay(1);
// this.tl = new TimelineMax({paused: true});
// this.tl.to(this.mesh.scale,1, {x: 2, ease: Expo.easeOut});
// this.tl.to(this.mesh.scale,.5, {y: 2, ease: Expo.easeOut}):
// this.tl.to(this.mesh.rotation,1, {y: Math.PI*5, ease: Expo.easeOut});
// this.tl.to(this.mesh.scale,.5, {y: .5, ease: Expo.easeOut});
// this.tl.to(this.mesh.scale,.5, {x: .5, ease: Expo.easeOut});

document.body.addEventListener('mousemove', () => {
    this.tl.play();
})
window.addEventListener('mousemove', onMouseMove);

