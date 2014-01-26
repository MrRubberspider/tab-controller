$(document).ready( function() {
  $('.tabs').tabController({
  	useUrlChange: true
  });

  $('.tabs-b').tabController({
  	useUrlChange: false
  });
});