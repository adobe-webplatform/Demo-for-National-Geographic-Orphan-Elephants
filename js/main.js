			document.body.onload = function () {
				if (checkRegionsSupport() !== true) {
					var story = document.getElementById('story');
					var content = document.getElementById('content');
					
					var inst = document.getElementById('instructions');
					inst.style.display = 'block';
					story.style.display = 'none';
					content.style.display = 'none';
					
				}

				(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
			  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
			  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
			  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

			  ga('create', 'UA-43400812-1', 'adobe-webplatform.github.io');
			  ga('send', 'pageview');
			}
			
			function checkRegionsSupport() {
				var flowFromProperty = "webkitFlowFrom";
			    var flowIntoProperty = "webkitFlowInto";

			    if (!flowFromProperty || !flowIntoProperty){
			      return false;
			    }

			    var container = document.createElement('div');
			    var content = document.createElement('div');
			    var region = document.createElement('div');

			    var flowName = 'modernizr_flow_for_regions_check';

			    content.innerText = 'M';
			    container.style.cssText = 'top: 150px; left: 150px; padding: 0px;';
			    region.style.cssText = 'width: 50px; height: 50px; padding: 42px;';

			    region.style[flowFromProperty] = flowName;
			    container.appendChild(content);
			    container.appendChild(region);
			    document.body.appendChild(container);

			    var flowedRect, delta;
			    var plainRect = content.getBoundingClientRect();


			    content.style[flowIntoProperty] = flowName;
			    flowedRect = content.getBoundingClientRect();

			    delta = parseInt(flowedRect.left - plainRect.left, 10);
			    document.body.removeChild(container);
			    content = region = container = undefined;

			    return (delta == 42);
			}

			document.addEventListener('orientationchange', function () {
				location.reload(); //fix for ipad
			});

			//workaround height: auto issue on iOS
			var iOS = (navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false);

			if (iOS === true) {
				document.body.className = 'mobile';

				var pages = document.getElementsByClassName('page');
				var namedFlow = document.webkitGetNamedFlows()[0];
				setTimeout(function () {
					if (namedFlow.overset) {
						addPage();
					}
				}, 100);

			} else {
				var regions = document.getElementsByClassName('region');
				regions[regions.length - 1].className += " last";
			}

			function addPage() {
				var article = document.getElementById('story');
				var namedFlow = document.webkitGetNamedFlows()[0];

				var page = document.createElement('div');
				page.className = 'page no-vert-margin';

				var region = document.createElement('div');
				region.className = 'column region no-vert-margin';

				page.appendChild(region);
				article.appendChild(page);

				setTimeout(function () {
					if (namedFlow.overset) {
						addPage();
					} 
				}, 100)
			}