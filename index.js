 
(function () {
	"use strict";
	const Status = {
		OPEN: 1,
		CLOSE: 2,
		NONE: 3,
	};
	Object.freeze(Status);
	 
	const devtools = {
		isOpen: false,
		lastFire: Status.NONE,
		disableWindow : ()=>{
			eval(`
			setInterval(() => {
				console.clear();
				document.documentElement.innerHTML=""
				debugger
			}, 10);`);
		}
	};
	var element = new Image();
	Object.defineProperty(element, "id", {
		get: function () {
			devtools.isOpen = true;
		},
	});
	devtools.isOpen = false;

	const emitEvent = (isOpen) => {
		var Ev = new CustomEvent("devtoolschange");
		Ev.isOpen = isOpen;
		setTimeout(()=>{
			window.dispatchEvent(Ev);
		},100)
	};

	const main = () => {
		devtools.isOpen = false;
		console.dir(element);
		var currentFire = devtools.isOpen ? Status.OPEN : Status.CLOSE;
		if (devtools.lastFire == Status.NONE || currentFire != devtools.lastFire) {
			// alert('fsdf')
			emitEvent(devtools.isOpen);
			devtools.lastFire = currentFire;
		}
			requestAnimationFrame(main);
	};
	requestAnimationFrame(main);

	if (typeof module !== "undefined" && module.exports) {
		module.exports = devtools;
	} else {
		window.devtools = devtools;
	}
})();
