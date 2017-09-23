//hi

(function (window) {

				//Should loop over classlist when picking up 'open' class
			 	var menu = document.getElementsByClassName('prim-nav')[0];
			 	var elem = document.getElementsByClassName('menu')[0];
				

				function hasClass(el, className) {
				  if (el.classList)
				    return el.classList.contains(className)
				  else
				    return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))
				}

				function addClass(el, className) {
				  if (el.classList)
				    el.classList.add(className)
				  else if (!hasClass(el, className)) el.className += " " + className
				}

				function removeClass(el, className) {
				  if (el.classList)
				    el.classList.remove(className)
				  else if (hasClass(el, className)) {
				    var reg = new RegExp('(\\s|^)' + className + '(\\s|$)')
				    el.className=el.className.replace(reg, ' ')
				  }
				}

				//On Menu click check for class open do relevant ternary
				elem.addEventListener("click", function(){
					hasClass(menu, 'open') ? removeClass(menu, 'open') : addClass(menu, 'open');
				});


				// Close the dropdown menu if the user clicks outside of the main area
				window.onclick = function(event) {
				  if (!event.target.matches('.menu')) {
				    var dropdown = document.getElementsByClassName("prim-nav");
				    for (var i = 0; i < dropdown.length; i++) {
				      var openDropdown = dropdown[i];
				      if (openDropdown.classList.contains('open')) {
				        openDropdown.classList.remove('open');
				      }
				    }
				  }
				}

			
	 		})(window);