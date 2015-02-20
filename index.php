<?php
	require 'vendor/autoload.php';
	$api = new SpotifyWebAPI\SpotifyWebAPI();
	$track = $api->getTrack('1aUwYQlraYDS9VjlLquvTT');
?>

<!doctype html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="initial-scale=1.0">
	<title>index</title>
	<link href="http://fonts.googleapis.com/css?family=Ubuntu+Condensed:400,400" rel="stylesheet" type="text/css">
	<link rel="stylesheet" href="css/standardize.css">
	<link rel="stylesheet" href="css/index-grid.css">
	<link rel="stylesheet" href="css/index.css">
	<link rel="stylesheet" href="css/debug.css">
</head>
<body class="body page-index clearfix">	
	<nav class="nav-main clearfix">
		<div class="container clearfix">
			<div class="logo clearfix">
				<div class="logo-image"></div>
				<span class="logo-text">SPOTIFART</span>
			</div>
			<div class="menu"></div>
		</div>
	</nav>
	<div class="container content clearfix">
		<img class="image" title="<?php echo $track->name ?> by <?php echo $track->artists[0]->name ?> from the <?php echo $track->album->album_type?> <?php echo $track->album->name ?>" src="<?php echo $track->album->images[0]->url ?>">
		<div class="meta clearfix">
			<div class="infobox clearfix">
				<div class="albuminfo clearfix">
				<span class="album"><?php echo $track->album->name ?></span>
				<span class="artist"><?php echo $track->artists[0]->name ?></span>
				</div>
				<button class="launch">OPEN IN SPOTIFY</button>
				<div class="social">
					<div class="width25 facebook clearfix">
						<div class="icon-facebook"></div>
					</div>
					<div class="width25 google clearfix">
						<div class="icon-google"></div>
					</div>
					<div class="width25 twitter clearfix">
						<div class="icon-twitter"></div>
					</div>
					<div class="width25 imgur clearfix">
						<div class="icon-imgur"></div>
					</div>
				</div>
			</div>
			<div class="player"></div>
		</div>
	</div>

	<ul class="debug more">
		<li class="button-more">Debug
			<ul>
				<li class="full-details">
					<?php
						echo '<pre>';
						print_r($track);
						echo '</pre>';
					?>
				</li>
			</ul>
		</li>
	</ul>


</body>
</html>