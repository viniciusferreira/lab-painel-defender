;(function($)
{
	'use strict';
	$(document).ready(function()
	{
		var $tabs=$('a[data-toggle="tab"]'),
		manageHash = function()
		{
			$tabs.each(function() {
				if (this.hash === window.location.hash) {
					$(this).tab('show');
				}
			});
		};
		$tabs.on('click',function(){
			window.location.hash=this.hash;
		});
		$(window).on('hashchange',function()
		{
			manageHash();
		})
/*		if (window.location.hash==='')
			window.location.hash=$tabs[0].hash;
		manageHash();
*/	});
})(window.jQuery);
